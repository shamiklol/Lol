import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { gsap } from '../core/fx.js';
import { clock } from '../core/clock.js';
import { Field } from './field.js';
import { Swarm } from './swarm.js';

const MODES = {
  field: { off: [0, 1.3, 11], look: [0, 3.3, 0], dust: 1, thread: 1, tokens: 1 },
  dim: { off: [0, 1.3, 11], look: [0, 3.3, 0], dust: 0.55, thread: 0.6, tokens: 0.45 },
  title: { off: [-1.5, 0.6, 14], look: [0, 1.4, 0], dust: 0.8, thread: 1, tokens: 1 },
  agent: { off: [0, 3.2, 17], look: [0, 3.2, 0], dust: 0.7, thread: 0.5, tokens: 0.5 },
  calm: { off: [0, 1.6, 13], look: [0, 3.2, 0], dust: 0.8, thread: 0.9, tokens: 0.7 },
};

export class GL {
  constructor(canvas, { count, lite = false }) {
    this.canvas = canvas;
    this.count = count;
    this.lite = lite;
    this.index = 0;
    this.u = 0;
    this.travel = 0;
    this.mouse = new THREE.Vector2();
    this.mouseT = new THREE.Vector2();
    this.extras = [];
    this.mode = 'field';
    this.cam = { off: new THREE.Vector3(...MODES.field.off), look: new THREE.Vector3(...MODES.field.look) };
    this.shake = 0;
    this.paused = false;
  }

  async init() {
    const r = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
    r.setClearColor(0x05060b, 1);
    r.autoClear = true;
    this.renderer = r;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 400);
    this.field = new Field(this.count, { lite: this.lite });
    this.scene.add(this.field.group);
    try {
      await document.fonts.load('500 44px "IBM Plex Mono"');
    } catch (e) {
      /* canvas falls back to monospace */
    }
    this.field.buildTokens();
    this.swarm = new Swarm();

    this.composer = new EffectComposer(r);
    this.pass = new RenderPass(this.scene, this.camera);
    this.pass2 = new RenderPass(this.swarm.scene, this.swarm.camera);
    this.pass2.clear = false;
    this.pass2.clearDepth = true;
    this.bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.75, 0.5, 0.12);
    this.composer.addPass(this.pass);
    this.composer.addPass(this.pass2);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());

    addEventListener('resize', () => this.resize());
    addEventListener('pointermove', (e) => {
      this.mouseT.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    });
    this.resize();
    this.placeCamera(0);
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const w = innerWidth;
    const h = innerHeight;
    const pr = this.lite ? 1 : Math.min(devicePixelRatio, 1.75);
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.k = Math.min(w / 1920, h / 1080);
    this.swarm.resize(w, h, this.k);
  }

  setLite(on) {
    this.lite = on;
    this.resize();
  }

  setMode(name, duration = 1.4) {
    const m = MODES[name] || MODES.field;
    this.mode = name;
    gsap.to(this.cam.off, { x: m.off[0], y: m.off[1], z: m.off[2], duration, ease: 'power3.inOut' });
    gsap.to(this.cam.look, { x: m.look[0], y: m.look[1], z: m.look[2], duration, ease: 'power3.inOut' });
    gsap.to(this.field.dustMat.uniforms.uOpacity, { value: m.dust, duration });
    gsap.to(this.field.threadMat.uniforms.uOpacity, { value: m.thread, duration });
    if (this.field.tokMat) gsap.to(this.field.tokMat.uniforms.uOpacity, { value: m.tokens, duration });
  }

  goTo(index, { dir = 1, instant = false, def = {}, actChange = false } = {}) {
    const prev = this.index;
    this.index = index;
    const target = this.field.nodeU[index];
    this.setMode(def.gl || 'field', instant ? 0 : 1.4);
    if (this.tween) this.tween.kill();
    if (instant) {
      this.u = target;
      return;
    }
    const hops = Math.abs(index - prev);
    const duration = Math.min(2.2, 1.05 + (hops - 1) * 0.12);
    const boost = this.field.threadMat.uniforms.uBoost;
    this.travel = 1;
    this.tween = gsap.to(this, {
      u: target,
      duration,
      ease: 'power3.inOut',
      onComplete: () => {
        this.travel = 0;
      },
    });
    gsap.fromTo(boost, { value: actChange ? 1.2 : 0.5 }, { value: 0, duration: duration + 0.6, ease: 'power2.out' });
    gsap.fromTo(this.field.uniforms.uBoost, { value: actChange ? 1.5 : 0.35 }, { value: 0, duration: duration + 0.8, ease: 'power2.out' });
    if (actChange) {
      this.shake = 1;
      gsap.to(this, { shake: 0, duration: 1.2, ease: 'power2.out' });
    }
  }

  placeCamera(t) {
    const base = this.field.curve.getPointAt(Math.max(0, Math.min(1, this.u)));
    this.mouse.lerp(this.mouseT, 0.04);
    const sh = this.shake * 0.25;
    this.camera.position.set(
      base.x + this.cam.off.x + this.mouse.x * 0.9 + Math.sin(t * 43) * sh,
      base.y + this.cam.off.y - this.mouse.y * 0.55 + Math.cos(t * 37) * sh,
      base.z + this.cam.off.z,
    );
    // look slightly ahead along the thread while traveling
    const ahead = this.field.curve.getPointAt(Math.min(1, this.u + this.travel * 0.004));
    this.camera.lookAt(ahead.x + this.cam.look.x, ahead.y + this.cam.look.y, ahead.z + this.cam.look.z);
  }

  frame(t) {
    this.field.update(t, this.index, this.u);
    this.field.setPacket(this.u + 0.012, this.travel);
    this.swarm.uniforms.uTime.value = t;
    this.placeCamera(t);
    for (const x of this.extras) x.update?.(t, this);
    if (this.lite) {
      this.renderer.autoClear = true;
      this.renderer.render(this.scene, this.camera);
      if (this.swarm.active) {
        this.renderer.autoClear = false;
        this.renderer.clearDepth();
        this.renderer.render(this.swarm.scene, this.swarm.camera);
      }
    } else {
      this.pass2.enabled = this.swarm.active;
      this.composer.render();
    }
  }

  loop() {
    requestAnimationFrame(this.loop);
    if (this.paused || clock.manualMode) return;
    this.frame(clock.now());
  }

  /** Stage-pixel position of a world point (for DOM labels over 3D). */
  project(v, out = { x: 0, y: 0, visible: true }) {
    const p = v.clone().project(this.camera);
    const w = innerWidth;
    const h = innerHeight;
    const sx = (p.x * 0.5 + 0.5) * w;
    const sy = (-p.y * 0.5 + 0.5) * h;
    out.x = (sx - w / 2) / this.k + 960;
    out.y = (sy - h / 2) / this.k + 540;
    out.visible = p.z < 1;
    return out;
  }
}
