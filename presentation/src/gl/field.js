import * as THREE from 'three';
import { glowTexture, tokenAtlas } from './textures.js';

export const SPACING = 12;

export function nodePos(i) {
  return new THREE.Vector3(i * SPACING, Math.sin(i * 0.9) * 2.0 + Math.cos(i * 0.37) * 1.1, Math.cos(i * 0.6) * 3.0);
}

const ACT_COLORS = [
  [new THREE.Color('#3fe0ff'), new THREE.Color('#a07dff')],
  [new THREE.Color('#3fe0ff'), new THREE.Color('#7f9bff')],
  [new THREE.Color('#a07dff'), new THREE.Color('#ffb547')],
  [new THREE.Color('#ffb547'), new THREE.Color('#6dffb8')],
];

const dustVert = /* glsl */ `
uniform float uTime; uniform float uPR; uniform float uBoost;
attribute float aSize; attribute float aSeed; attribute vec3 aColor;
varying vec3 vColor; varying float vA;
void main(){
  vec3 p = position;
  p.x += sin(uTime*0.13 + aSeed*12.0)*0.45;
  p.y += cos(uTime*0.11 + aSeed*7.0)*0.45;
  vec4 mv = modelViewMatrix*vec4(p,1.0);
  gl_Position = projectionMatrix*mv;
  float d = -mv.z;
  gl_PointSize = aSize*uPR*(30.0/max(d,0.5))*(1.0+uBoost*0.8);
  float tw = 0.55+0.45*sin(uTime*(0.8+aSeed*1.7)+aSeed*50.0);
  vA = tw*smoothstep(70.0,6.0,d)*smoothstep(0.4,3.0,d)*0.8;
  vColor = aColor;
}`;
const dustFrag = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor; varying float vA;
void main(){
  vec2 c = gl_PointCoord-0.5; float r = length(c);
  float a = smoothstep(0.5,0.0,r); a *= a;
  gl_FragColor = vec4(vColor*(0.8+a), a*vA*uOpacity);
}`;

const tokVert = /* glsl */ `
uniform float uTime; uniform vec2 uGrid;
attribute vec2 aCell; attribute float aScale; attribute float aSeed; attribute vec3 aColor;
varying vec2 vUv; varying vec3 vColor; varying float vA;
void main(){
  vec3 base = (instanceMatrix*vec4(0.0,0.0,0.0,1.0)).xyz;
  base.y += sin(uTime*0.2+aSeed*9.0)*0.6;
  base.x += sin(uTime*0.05+aSeed*3.0)*1.2;
  vec4 mv = modelViewMatrix*vec4(base,1.0);
  mv.xy += position.xy*aScale;
  gl_Position = projectionMatrix*mv;
  vUv = vec2((aCell.x+uv.x)/uGrid.x, 1.0-(aCell.y+1.0-uv.y)/uGrid.y);
  float d = -mv.z;
  vA = smoothstep(85.0,22.0,d)*smoothstep(5.0,14.0,d)*(0.32+0.2*sin(uTime*0.7+aSeed*20.0));
  vColor = aColor;
}`;
const tokFrag = /* glsl */ `
uniform sampler2D uAtlas; uniform float uOpacity;
varying vec2 vUv; varying vec3 vColor; varying float vA;
void main(){
  float t = texture2D(uAtlas, vUv).a;
  gl_FragColor = vec4(vColor, t*vA*uOpacity);
}`;

const threadVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const threadFrag = /* glsl */ `
uniform float uTime; uniform float uProgress; uniform float uBoost; uniform float uLen; uniform float uOpacity;
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
varying vec2 vUv;
void main(){
  float s = vUv.x;
  float passed = smoothstep(uProgress+0.004, uProgress-0.004, s);
  float pulse = pow(fract(s*uLen*0.06 - uTime*0.32), 22.0);
  vec3 col = s < 0.5 ? mix(uA, uB, s*2.0) : mix(uB, uC, (s-0.5)*2.0);
  float a = mix(0.07, 0.42, passed) + pulse*0.9*passed + uBoost*0.5;
  gl_FragColor = vec4(col*(1.0+pulse*1.6+uBoost), a*uOpacity);
}`;

export class Field {
  constructor(count, { lite = false } = {}) {
    this.count = count;
    this.group = new THREE.Group();
    this.points = Array.from({ length: count }, (_, i) => nodePos(i));
    this.curve = new THREE.CatmullRomCurve3(this.points, false, 'centripetal', 0.5);
    this.lite = lite;
    this.uniforms = { uTime: { value: 0 }, uBoost: { value: 0 } };
    this.buildDust();
    this.buildThread();
    this.buildNodes();
    this.buildPacket();
  }

  buildDust() {
    const n = this.lite ? 900 : 2600;
    const span = this.count * SPACING;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const size = new Float32Array(n);
    const seed = new Float32Array(n);
    const palette = [new THREE.Color('#dfe8ff'), new THREE.Color('#3fe0ff'), new THREE.Color('#a07dff'), new THREE.Color('#ffb547')];
    for (let i = 0; i < n; i++) {
      pos[i * 3] = -25 + Math.random() * (span + 50);
      pos[i * 3 + 1] = -12 + Math.random() * 30;
      pos[i * 3 + 2] = -36 + Math.random() * 44;
      const r = Math.random();
      const c = palette[r < 0.6 ? 0 : r < 0.8 ? 1 : r < 0.93 ? 2 : 3];
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.6 + Math.pow(Math.random(), 3) * 3.2;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    this.dustMat = new THREE.ShaderMaterial({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      uniforms: { uTime: this.uniforms.uTime, uBoost: this.uniforms.uBoost, uPR: { value: Math.min(devicePixelRatio, 2) }, uOpacity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.dust = new THREE.Points(g, this.dustMat);
    this.dust.frustumCulled = false;
    this.group.add(this.dust);
  }

  buildTokens() {
    const n = this.lite ? 90 : 260;
    const { tex, cols, rows, count } = tokenAtlas();
    const geo = new THREE.PlaneGeometry(1, 0.156);
    this.tokMat = new THREE.ShaderMaterial({
      vertexShader: tokVert,
      fragmentShader: tokFrag,
      uniforms: { uTime: this.uniforms.uTime, uAtlas: { value: tex }, uGrid: { value: new THREE.Vector2(cols, rows) }, uOpacity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.InstancedMesh(geo, this.tokMat, n);
    const cell = new Float32Array(n * 2);
    const scale = new Float32Array(n);
    const seed = new Float32Array(n);
    const color = new Float32Array(n * 3);
    const m = new THREE.Matrix4();
    const span = this.count * SPACING;
    for (let i = 0; i < n; i++) {
      const x = -20 + Math.random() * (span + 40);
      m.makeTranslation(x, -8 + Math.random() * 26, -58 + Math.random() * 40);
      mesh.setMatrixAt(i, m);
      const k = Math.floor(Math.random() * count);
      cell[i * 2] = k % cols;
      cell[i * 2 + 1] = Math.floor(k / cols);
      scale[i] = 2.4 + Math.random() * 3.4;
      seed[i] = Math.random();
      const t = Math.min(1, Math.max(0, x / span));
      const act = ACT_COLORS[Math.min(3, Math.floor(t * 4))];
      const c = act[Math.random() < 0.5 ? 0 : 1];
      color.set([c.r, c.g, c.b], i * 3);
    }
    geo.setAttribute('aCell', new THREE.InstancedBufferAttribute(cell, 2));
    geo.setAttribute('aScale', new THREE.InstancedBufferAttribute(scale, 1));
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1));
    geo.setAttribute('aColor', new THREE.InstancedBufferAttribute(color, 3));
    mesh.frustumCulled = false;
    this.tokens = mesh;
    this.group.add(mesh);
  }

  buildThread() {
    const segs = this.count * 60;
    const geo = new THREE.TubeGeometry(this.curve, segs, 0.028, 6, false);
    this.threadMat = new THREE.ShaderMaterial({
      vertexShader: threadVert,
      fragmentShader: threadFrag,
      uniforms: {
        uTime: this.uniforms.uTime,
        uBoost: { value: 0 },
        uProgress: { value: 0 },
        uLen: { value: this.curve.getLength() },
        uOpacity: { value: 1 },
        uA: { value: new THREE.Color('#3fe0ff') },
        uB: { value: new THREE.Color('#a07dff') },
        uC: { value: new THREE.Color('#ffb547') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.thread = new THREE.Mesh(geo, this.threadMat);
    this.thread.frustumCulled = false;
    this.group.add(this.thread);
    // arc-length parameter of every node, so progress can stop exactly on it
    const lengths = this.curve.getLengths(this.count * 200);
    const total = lengths[lengths.length - 1];
    this.nodeU = this.points.map((_, i) => {
      const t = i / (this.count - 1);
      const idx = Math.round(t * (lengths.length - 1));
      return lengths[idx] / total;
    });
  }

  buildNodes() {
    const tex = glowTexture();
    this.nodeSprites = this.points.map((p) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0x9fdcff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 }));
      s.position.copy(p);
      s.scale.setScalar(0.55);
      this.group.add(s);
      return s;
    });
  }

  buildPacket() {
    const tex = glowTexture(128, 'rgba(255,255,255,1)', 'rgba(160,230,255,0.5)');
    this.packet = [];
    for (let i = 0; i < 14; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: i === 0 ? 0xffffff : 0x7fe6ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
      s.scale.setScalar(i === 0 ? 1.1 : 0.9 - i * 0.05);
      this.group.add(s);
      this.packet.push(s);
    }
  }

  setPacket(u, visible) {
    this.packet.forEach((s, i) => {
      const t = Math.max(0, Math.min(1, u - i * 0.0018));
      s.position.copy(this.curve.getPointAt(t));
      s.material.opacity = visible * (1 - i / this.packet.length) * 0.75;
    });
  }

  update(t, currentIndex, u) {
    this.uniforms.uTime.value = t;
    this.threadMat.uniforms.uProgress.value = u;
    this.nodeSprites.forEach((s, i) => {
      const cur = i === currentIndex;
      const passed = this.nodeU[i] <= u + 0.0005;
      const pulse = cur ? 0.9 + Math.sin(t * 2.4) * 0.25 : 1;
      s.scale.setScalar((cur ? 0.6 : 0.38) * pulse);
      s.material.opacity = cur ? 0.5 : passed ? 0.32 : 0.14;
    });
  }
}
