import * as THREE from 'three';
import { gsap } from '../core/fx.js';
import { glowTexture } from './textures.js';

// The same six tools appear in the assembly showpiece and in the live lab.
export const TOOLS = [
  { id: 'search_events', label: 'Tadbirlar', sub: 'search_events' },
  { id: 'get_weather', label: 'Ob-havo', sub: 'get_weather' },
  { id: 'calculate', label: 'Kalkulyator', sub: 'calculate' },
  { id: 'convert_currency', label: 'Valyuta', sub: 'convert_currency' },
  { id: 'create_report', label: 'Hisobot', sub: 'create_report' },
  { id: 'send_message', label: 'Xabar', sub: 'send_message' },
];

const COL = {
  model: new THREE.Color('#a07dff'),
  prompt: new THREE.Color('#3fe0ff'),
  tool: new THREE.Color('#ffb547'),
  data: new THREE.Color('#6dffb8'),
};

const coreVert = /* glsl */ `
attribute vec3 aDir; attribute float aSeed;
uniform float uBuild; uniform float uTime; uniform float uPulse; uniform float uPR;
varying float vA; varying float vSeed;
void main(){
  float b = clamp(uBuild * 1.5 - aSeed * 0.5, 0.0, 1.0);
  b = 1.0 - pow(1.0 - b, 3.0);
  float n = sin(aDir.x * 4.0 + uTime * 1.3) * sin(aDir.y * 5.0 - uTime) * 0.09;
  vec3 p = aDir * (1.55 + n + uPulse * 0.28) * b;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (2.2 + aSeed * 2.8) * uPR * (24.0 / -mv.z);
  vA = b * (0.45 + 0.55 * sin(uTime * 2.0 + aSeed * 30.0));
  vSeed = aSeed;
}`;
const coreFrag = /* glsl */ `
uniform float uOpacity;
varying float vA; varying float vSeed;
void main(){
  vec2 c = gl_PointCoord - 0.5; float r = length(c);
  float a = smoothstep(0.5, 0.0, r);
  vec3 col = mix(vec3(0.63, 0.49, 1.0), vec3(0.25, 0.88, 1.0), vSeed);
  gl_FragColor = vec4(col * (0.9 + a), a * vA * uOpacity);
}`;

const beamVert = /* glsl */ `
attribute float aT; varying float vT;
void main(){ vT = aT; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const beamFrag = /* glsl */ `
uniform float uTime; uniform float uOpacity; uniform vec3 uColor; uniform float uHot;
varying float vT;
void main(){
  float dash = step(0.55, fract(vT * 9.0 - uTime * 1.6));
  gl_FragColor = vec4(uColor, (0.18 + dash * 0.5 + uHot) * uOpacity);
}`;

const loopVert = /* glsl */ `
varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const loopFrag = /* glsl */ `
uniform float uDraw; uniform float uPhase; uniform float uOpacity; uniform float uGlow; uniform float uTime;
varying vec2 vUv;
void main(){
  float a = vUv.x;
  if (a > uDraw) discard;
  float d = fract(uPhase - a);
  float head = pow(1.0 - d, 14.0);
  float idle = 0.5 + 0.5 * sin(a * 60.0 - uTime * 3.0);
  vec3 col = mix(vec3(0.43, 1.0, 0.72), vec3(1.0), head * 0.6);
  float al = (0.1 + idle * 0.05 + head * 0.9 * uGlow) * uOpacity;
  gl_FragColor = vec4(col, al);
}`;

function ringTexture(text) {
  const c = document.createElement('canvas');
  c.width = 4096;
  c.height = 64;
  const g = c.getContext('2d');
  g.font = '500 30px "IBM Plex Mono", monospace';
  g.fillStyle = '#fff';
  g.textBaseline = 'middle';
  let x = 0;
  while (x < c.width) {
    g.fillText(text, x, 33);
    x += g.measureText(text).width;
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

const easeBack = (t) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export class AgentScene {
  constructor(gl) {
    this.gl = gl;
    this.group = new THREE.Group();
    this.p = { core: 0, rings: 0, memory: 0, loop: 0, loopDraw: 0, glow: 0, pulse: 0, phase: 0, fade: 0, spin: 0 };
    this.toolP = TOOLS.map(() => ({ t: 0, glow: 0, flash: 0 }));
    this.packets = [];
    this.labelLayer = null;
    this.tmp = new THREE.Vector3();
    this.buildCore();
    this.buildRings();
    this.buildTools();
    this.buildMemory();
    this.buildLoop();
    this.buildPacketPool();
    this.group.visible = false;
  }

  // ---------- construction ----------
  buildCore() {
    const N = 1700;
    const dir = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      dir.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(dir.slice(), 3));
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    this.coreMat = new THREE.ShaderMaterial({
      vertexShader: coreVert,
      fragmentShader: coreFrag,
      uniforms: { uBuild: { value: 0 }, uTime: { value: 0 }, uPulse: { value: 0 }, uPR: { value: Math.min(devicePixelRatio, 2) }, uOpacity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.core = new THREE.Points(g, this.coreMat);
    this.core.frustumCulled = false;
    this.group.add(this.core);

    // inner filaments
    const segs = [];
    const pts = [];
    for (let i = 0; i < 140; i++) {
      const a = new THREE.Vector3().randomDirection().multiplyScalar(1.35);
      const b = a.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(0.9)).setLength(1.35);
      pts.push(a, b);
    }
    pts.forEach((v) => segs.push(v.x, v.y, v.z));
    const fg = new THREE.BufferGeometry();
    fg.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
    this.filMat = new THREE.LineBasicMaterial({ color: 0x9f86ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    this.filaments = new THREE.LineSegments(fg, this.filMat);
    this.group.add(this.filaments);

    this.coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: 0xa07dff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    this.coreGlow.scale.setScalar(6);
    this.group.add(this.coreGlow);
    this.seed = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    this.seed.scale.setScalar(0.8);
    this.group.add(this.seed);
  }

  buildRings() {
    const texts = [
      'ROL: Shams.labs demo agenti   ·   ',
      'MAQSAD: vazifani oxirigacha bajarish   ·   ',
      'QOIDALAR: faqat tool maʼlumotiga tayan · taxmin qilma · 8 qadamdan oshma   ·   ',
    ];
    this.rings = texts.map((text, i) => {
      const tex = ringTexture(text);
      tex.repeat.set(2, 1);
      const r = 2.25 + i * 0.32;
      const geo = new THREE.CylinderGeometry(r, r, 0.22, 160, 1, true);
      const front = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, color: COL.prompt, transparent: true, opacity: 0, side: THREE.FrontSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      const back = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, color: COL.prompt, transparent: true, opacity: 0, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      const holder = new THREE.Group();
      holder.add(front, back);
      holder.rotation.set([0.35, -0.5, 0.9][i], 0, [0.2, -0.35, 0.1][i]);
      this.group.add(holder);
      return { holder, front, back, speed: [0.22, -0.16, 0.12][i] };
    });
  }

  buildTools() {
    const hex = new THREE.CylinderGeometry(0.62, 0.62, 0.24, 6, 1);
    hex.rotateX(Math.PI / 2);
    hex.rotateZ(Math.PI / 6);
    const edges = new THREE.EdgesGeometry(hex);
    const glow = glowTexture(128, 'rgba(255,255,255,1)', 'rgba(255,200,120,0.4)');
    this.tools = TOOLS.map((t, i) => {
      const a = (i / TOOLS.length) * Math.PI * 2;
      const target = new THREE.Vector3(Math.cos(a) * 4.9, Math.sin(a) * 3.05, Math.sin(a) * -0.9);
      const start = target.clone().multiplyScalar(3.4).add(new THREE.Vector3(0, 0, 6));
      const g = new THREE.Group();
      const face = new THREE.Mesh(hex, new THREE.MeshBasicMaterial({ color: 0x1b1407, transparent: true, opacity: 0 }));
      const edge = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: COL.tool, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: COL.tool, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.scale.setScalar(2.6);
      g.add(halo, face, edge);
      this.group.add(g);
      // beam core → tool
      const bg = new THREE.BufferGeometry();
      bg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      bg.setAttribute('aT', new THREE.BufferAttribute(new Float32Array([0, 1]), 1));
      const bm = new THREE.ShaderMaterial({
        vertexShader: beamVert,
        fragmentShader: beamFrag,
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uColor: { value: COL.tool.clone() }, uHot: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const beam = new THREE.Line(bg, bm);
      beam.frustumCulled = false;
      this.group.add(beam);
      return { ...t, g, face, edge, halo, beam, target, start, pos: start.clone() };
    });
  }

  buildMemory() {
    this.memGroup = new THREE.Group();
    this.memGroup.position.set(0, -3.55, 0);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.014, 8, 180),
      new THREE.MeshBasicMaterial({ color: COL.data, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    ring.rotation.x = Math.PI / 2;
    this.memRing = ring;
    const blocks = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.12, 0.08, 0.12),
      new THREE.MeshBasicMaterial({ color: COL.data, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
      30,
    );
    this.memBlocks = blocks;
    this.memGroup.add(ring, blocks);
    this.group.add(this.memGroup);
  }

  buildLoop() {
    this.loopGroup = new THREE.Group();
    this.loopGroup.rotation.set(1.18, 0, 0.08);
    this.loopMat = new THREE.ShaderMaterial({
      vertexShader: loopVert,
      fragmentShader: loopFrag,
      uniforms: { uDraw: { value: 0 }, uPhase: { value: 0 }, uOpacity: { value: 0 }, uGlow: { value: 0 }, uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(6.5, 0.028, 8, 320), this.loopMat);
    this.loopGroup.add(torus);
    const glow = glowTexture();
    this.loopNodes = [0.25, 0.583, 0.917].map((f) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: COL.data, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      const a = f * Math.PI * 2;
      s.position.set(Math.cos(a) * 6.5, Math.sin(a) * 6.5, 0);
      s.scale.setScalar(1.2);
      s.userData.f = f;
      this.loopGroup.add(s);
      return s;
    });
    this.group.add(this.loopGroup);
  }

  buildPacketPool() {
    const tex = glowTexture(128, 'rgba(255,255,255,1)', 'rgba(255,255,255,0.45)');
    this.pool = Array.from({ length: 8 }, () => {
      const trail = Array.from({ length: 9 }, (_, k) => {
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
        s.scale.setScalar(k === 0 ? 0.75 : 0.6 - k * 0.05);
        this.group.add(s);
        return s;
      });
      return { trail, active: false, t: 0, from: null, to: null, color: new THREE.Color() };
    });
  }

  // ---------- helpers ----------
  toolIndex(name) {
    return TOOLS.findIndex((t) => t.id === name);
  }

  toolPos(i) {
    return this.tools[i].pos;
  }

  corePos() {
    return new THREE.Vector3(0, 0, 0);
  }

  /** Animate a data packet between two local points; returns the tween (seekable). */
  packet(fromFn, toFn, { dur = 0.9, color = '#ffffff', lift = 1.6, persist = false } = {}) {
    const slot = { t: 0, fromFn, toFn, color: new THREE.Color(color), lift, on: 0, persist };
    this.packets.push(slot);
    return gsap.fromTo(
      slot,
      { t: 0, on: 1 },
      {
        t: 1,
        duration: dur,
        ease: 'power2.inOut',
        onComplete: () => (slot.on = 0),
        onReverseComplete: () => (slot.on = 0),
      },
    );
  }

  callTool(i, { dur = 0.9, persist = false } = {}) {
    const tl = gsap.timeline();
    tl.add(this.packet(() => this.corePos(), () => this.toolPos(i), { dur, color: '#ffd28a', persist }));
    tl.fromTo(this.toolP[i], { glow: 0 }, { glow: 1, duration: 0.3, ease: 'power2.out' }, dur - 0.1);
    tl.fromTo(this.toolP[i], { flash: 1 }, { flash: 0, duration: 0.8, ease: 'power2.out' }, dur - 0.1);
    return tl;
  }

  returnTool(i, { dur = 0.9, persist = false } = {}) {
    const tl = gsap.timeline();
    tl.add(this.packet(() => this.toolPos(i), () => this.corePos(), { dur, color: '#8dffc9', persist }));
    tl.to(this.toolP[i], { glow: 0, duration: 0.6 }, 0.2);
    tl.fromTo(this.p, { pulse: 1 }, { pulse: 0, duration: 0.8, ease: 'power2.out' }, dur - 0.05);
    return tl;
  }

  think(dur = 0.8) {
    const tl = gsap.timeline();
    tl.fromTo(this.p, { pulse: 0.6 }, { pulse: 0, duration: dur, ease: 'power2.out' });
    tl.to(this.p, { phase: `+=${1 / 3}`, duration: dur, ease: 'power2.inOut' }, 0);
    return tl;
  }

  setBuilt(on = true) {
    Object.assign(this.p, on ? { core: 1, rings: 1, memory: 1, loop: 1, loopDraw: 1, glow: 1 } : { core: 0, rings: 0, memory: 0, loop: 0, loopDraw: 0, glow: 0 });
    this.toolP.forEach((t) => Object.assign(t, { t: on ? 1 : 0, glow: 0, flash: 0 }));
  }

  show(on, dur = 0.8) {
    gsap.to(this.p, { fade: on ? 1 : 0, duration: dur, ease: 'power2.inOut' });
  }

  attachLabels(layer) {
    this.labelLayer = layer;
    if (!layer) return;
    if (layer._lab) {
      this.lab = layer._lab;
      return;
    }
    layer.innerHTML = `
      <div class="ag-l ag-l-core"><b>LLM</b><span>model</span></div>
      <div class="ag-l ag-l-mem"><b>Xotira</b><span>kontekst · uzoq muddatli</span></div>
      ${['Oʻyla', 'Harakat qil', 'Kuzat'].map((n, i) => `<div class="ag-l ag-l-loop" data-k="${i}"><b>${n}</b></div>`).join('')}
      ${TOOLS.map((t, i) => `<div class="ag-l ag-l-tool" data-i="${i}"><b>${t.label}</b><span>${t.sub}</span></div>`).join('')}`;
    this.lab = {
      core: layer.querySelector('.ag-l-core'),
      mem: layer.querySelector('.ag-l-mem'),
      loop: [...layer.querySelectorAll('.ag-l-loop')],
      tools: [...layer.querySelectorAll('.ag-l-tool')],
    };
    layer._lab = this.lab;
  }

  // ---------- per frame ----------
  update(t, gl) {
    const f = this.p.fade;
    this.group.visible = f > 0.002;
    if (!this.group.visible) {
      if (this.labelLayer) this.labelLayer.style.opacity = 0;
      return;
    }
    const p = this.p;
    this.group.rotation.y = Math.sin(t * 0.15) * 0.12 + p.spin;
    this.group.updateMatrixWorld();

    // core
    this.coreMat.uniforms.uBuild.value = p.core;
    this.coreMat.uniforms.uTime.value = t;
    this.coreMat.uniforms.uPulse.value = p.pulse;
    this.coreMat.uniforms.uOpacity.value = f;
    this.core.rotation.y = t * 0.12;
    this.filaments.rotation.y = -t * 0.08;
    this.filMat.opacity = 0.22 * p.core * f;
    this.coreGlow.material.opacity = (0.25 + p.pulse * 0.5) * p.core * f;
    this.coreGlow.scale.setScalar(4.5 + p.pulse * 2);
    this.seed.material.opacity = Math.max(0, 1 - p.core * 2) * Math.min(1, p.core * 20 + 0.001) * f;

    // prompt rings
    this.rings.forEach((r, i) => {
      const k = Math.max(0, Math.min(1, p.rings * 3 - i));
      r.holder.scale.setScalar(0.6 + 0.4 * k);
      r.front.rotation.y = t * r.speed;
      r.back.rotation.y = t * r.speed;
      r.front.material.opacity = 0.9 * k * f;
      r.back.material.opacity = 0.18 * k * f;
    });

    // tools
    this.tools.forEach((tool, i) => {
      const tp = this.toolP[i];
      const k = Math.max(0, Math.min(1, tp.t));
      const e = k < 1 ? easeBack(k) : 1;
      tool.pos.copy(tool.start).lerp(tool.target, e);
      tool.pos.y += Math.sin(t * 0.8 + i) * 0.08 * k;
      tool.g.position.copy(tool.pos);
      tool.g.rotation.z = (1 - k) * 2.2 + Math.sin(t * 0.6 + i) * 0.05;
      tool.g.scale.setScalar(0.5 + 0.5 * k + tp.flash * 0.25);
      const vis = Math.min(1, k * 2.5) * f;
      tool.face.material.opacity = 0.88 * vis;
      tool.edge.material.opacity = (0.75 + tp.glow * 0.25) * vis;
      tool.halo.material.opacity = (0.12 + tp.glow * 0.6 + tp.flash * 0.9) * vis;
      tool.halo.scale.setScalar(2.2 + tp.flash * 2.5 + tp.glow * 0.8);
      const arr = tool.beam.geometry.attributes.position.array;
      const from = tool.pos.clone().setLength(1.7);
      arr.set([from.x, from.y, from.z, tool.pos.x, tool.pos.y, tool.pos.z]);
      tool.beam.geometry.attributes.position.needsUpdate = true;
      tool.beam.material.uniforms.uTime.value = t;
      tool.beam.material.uniforms.uOpacity.value = (k >= 0.999 ? 1 : 0) * f * 0.8;
      tool.beam.material.uniforms.uHot.value = tp.glow * 0.5;
    });

    // memory
    this.memRing.material.opacity = 0.45 * p.memory * f;
    this.memBlocks.material.opacity = 0.5 * p.memory * f;
    this.memGroup.scale.setScalar(0.7 + 0.3 * p.memory);
    const m = new THREE.Matrix4();
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + t * 0.35;
      m.makeTranslation(Math.cos(a) * 1.9, Math.sin(t * 2 + i) * 0.05, Math.sin(a) * 1.9);
      this.memBlocks.setMatrixAt(i, m);
    }
    this.memBlocks.instanceMatrix.needsUpdate = true;

    // loop
    const lu = this.loopMat.uniforms;
    lu.uDraw.value = p.loopDraw;
    lu.uPhase.value = p.phase + 0.25;
    lu.uOpacity.value = p.loop * f;
    lu.uGlow.value = p.glow;
    lu.uTime.value = t;
    this.loopNodes.forEach((s) => {
      const on = p.loopDraw >= s.userData.f ? 1 : 0;
      const d = Math.abs(((p.phase + 0.25 - s.userData.f + 1.5) % 1) - 0.5);
      s.material.opacity = on * p.loop * f * (0.35 + 0.65 * Math.max(0, 1 - d * 6) * p.glow);
    });

    // packets
    let slot = 0;
    for (const pk of this.packets) {
      if (!(pk.t > 0 && pk.t < 1) || slot >= this.pool.length) continue;
      const pool = this.pool[slot++];
      const a = pk.fromFn();
      const b = pk.toFn();
      const c = a.clone().add(b).multiplyScalar(0.5);
      c.z += pk.lift;
      c.y += pk.lift * 0.4;
      pool.trail.forEach((s, k) => {
        const tt = Math.max(0, Math.min(1, pk.t - k * 0.025));
        const u = 1 - tt;
        s.position.set(
          u * u * a.x + 2 * u * tt * c.x + tt * tt * b.x,
          u * u * a.y + 2 * u * tt * c.y + tt * tt * b.y,
          u * u * a.z + 2 * u * tt * c.z + tt * tt * b.z,
        );
        s.material.color.copy(pk.color);
        s.material.opacity = f * (1 - k / pool.trail.length) * (pk.t > 0 && pk.t < 1 ? 1 : 0);
      });
    }
    for (; slot < this.pool.length; slot++) this.pool[slot].trail.forEach((s) => (s.material.opacity = 0));
    this.packets = this.packets.filter((pk) => pk.persist || pk.on || pk.t < 1);

    this.updateLabels(gl, f);
  }

  updateLabels(gl, f) {
    const L = this.labelLayer;
    if (!L || !this.lab) return;
    L.style.opacity = f;
    const w = new THREE.Vector3();
    const place = (el, local, alpha) => {
      w.copy(local).applyMatrix4(this.group.matrixWorld);
      const s = gl.project(w);
      el.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px) translate(-50%, -50%)`;
      el.style.opacity = alpha;
    };
    const p = this.p;
    place(this.lab.core, new THREE.Vector3(0, 0, 2.2), Math.min(1, p.core * 1.5));
    place(this.lab.mem, new THREE.Vector3(0, -4.25, 0.8), p.memory);
    this.lab.loop.forEach((el, i) => {
      const s = this.loopNodes[i];
      w.copy(s.position);
      const on = p.loopDraw >= s.userData.f ? 1 : 0;
      place(el, w.applyMatrix4(this.loopGroup.matrix), on * p.loop);
    });
    this.lab.tools.forEach((el, i) => {
      const k = Math.max(0, Math.min(1, this.toolP[i].t));
      place(el, this.tools[i].pos.clone().add(new THREE.Vector3(0, -1.0, 0)), k > 0.85 ? 1 : 0);
      el.classList.toggle('is-hot', this.toolP[i].glow > 0.3);
    });
  }
}
