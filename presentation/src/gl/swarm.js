import * as THREE from 'three';

const vert = /* glsl */ `
uniform float uT; uniform float uOut; uniform float uTime; uniform float uK; uniform float uPR;
uniform vec2 uView;
attribute vec3 aStart; attribute vec2 aTarget; attribute float aDelay; attribute float aSize; attribute vec3 aColor;
varying vec3 vColor; varying float vA;
void main(){
  float p = clamp((uT - aDelay) / 0.6, 0.0, 1.0);
  p = 1.0 - pow(1.0 - p, 4.0);
  vec2 tgt = vec2((aTarget.x - 960.0) * uK, (540.0 - aTarget.y) * uK);
  vec2 start = aStart.xy * uView * 0.75;
  vec2 pos = mix(start, tgt, p);
  float wob = (1.0 - p);
  pos += wob * vec2(sin(uTime * 1.3 + aDelay * 40.0), cos(uTime * 1.1 + aDelay * 33.0)) * 60.0 * uK;
  pos += p * vec2(sin(uTime * 2.0 + aDelay * 90.0), cos(uTime * 1.7 + aDelay * 70.0)) * 0.9 * uK;
  pos += uOut * vec2(sin(aDelay * 91.0) * 160.0, 90.0 + cos(aDelay * 57.0) * 140.0) * uK;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
  gl_PointSize = aSize * uPR * max(uK, 0.35) * (1.0 + wob * 2.5);
  vA = (0.25 + 0.75 * p) * (1.0 - uOut);
  vColor = aColor;
}`;
const frag = /* glsl */ `
varying vec3 vColor; varying float vA;
void main(){
  vec2 c = gl_PointCoord - 0.5; float r = length(c);
  float a = smoothstep(0.5, 0.0, r);
  gl_FragColor = vec4(vColor * (0.9 + a), a * vA);
}`;

/** Particles in stage-pixel space that assemble into real DOM text. */
export class Swarm {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
    this.uniforms = {
      uT: { value: 0 },
      uOut: { value: 0 },
      uTime: { value: 0 },
      uK: { value: 1 },
      uPR: { value: Math.min(devicePixelRatio, 2) },
      uView: { value: new THREE.Vector2(1920, 1080) },
    };
    this.points = null;
  }

  resize(w, h, k) {
    this.camera.left = -w / 2;
    this.camera.right = w / 2;
    this.camera.top = h / 2;
    this.camera.bottom = -h / 2;
    this.camera.updateProjectionMatrix();
    this.uniforms.uK.value = k;
    this.uniforms.uView.value.set(w, h);
  }

  /** Sample the glyph pixels of DOM elements (positions in stage px). */
  sampleFrom(elements, stageEl, k, { step = 3, max = 9000, colors = ['#3fe0ff', '#a07dff', '#ffb547'] } = {}) {
    const W = 1920;
    const H = 1080;
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d', { willReadFrequently: true });
    const sr = stageEl.getBoundingClientRect();
    g.fillStyle = '#fff';
    elements.forEach((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      g.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
      if ('letterSpacing' in g) g.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
      const text = el.textContent;
      const m = g.measureText(text);
      const asc = m.fontBoundingBoxAscent ?? size * 0.8;
      const desc = m.fontBoundingBoxDescent ?? size * 0.2;
      const left = (r.left - sr.left) / k;
      const top = (r.top - sr.top) / k;
      const h = r.height / k;
      const align = cs.textAlign;
      g.textAlign = align === 'center' ? 'center' : 'left';
      const x = align === 'center' ? left + r.width / k / 2 : left;
      g.fillText(text, x, top + (h - (asc + desc)) / 2 + asc);
    });
    const data = g.getImageData(0, 0, W, H).data;
    const pts = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 120) pts.push([x + (Math.random() - 0.5) * step, y + (Math.random() - 0.5) * step]);
      }
    }
    // shuffle + cap
    for (let i = pts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pts[i], pts[j]] = [pts[j], pts[i]];
    }
    const chosen = pts.slice(0, max);
    const minX = Math.min(...chosen.map((p) => p[0]));
    const maxX = Math.max(...chosen.map((p) => p[0]));
    const cols = colors.map((h) => new THREE.Color(h));
    this.build(chosen, (p) => {
      const t = (p[0] - minX) / Math.max(1, maxX - minX);
      const seg = Math.min(cols.length - 2, Math.floor(t * (cols.length - 1)));
      const lt = t * (cols.length - 1) - seg;
      return cols[seg].clone().lerp(cols[seg + 1], lt);
    });
  }

  build(pts, colorAt) {
    if (this.points) {
      this.scene.remove(this.points);
      this.points.geometry.dispose();
    }
    const n = pts.length;
    const start = new Float32Array(n * 3);
    const target = new Float32Array(n * 2);
    const delay = new Float32Array(n);
    const size = new Float32Array(n);
    const color = new Float32Array(n * 3);
    pts.forEach((p, i) => {
      const a = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 0.9;
      start.set([Math.cos(a) * r, Math.sin(a) * r * 0.9, 0], i * 3);
      target.set(p, i * 2);
      delay[i] = (p[0] / 1920) * 0.55 + Math.random() * 0.35;
      size[i] = 2.2 + Math.random() * 2.6;
      const c = colorAt(p);
      color.set([c.r, c.g, c.b], i * 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aStart', new THREE.BufferAttribute(start, 3));
    g.setAttribute('aTarget', new THREE.BufferAttribute(target, 2));
    g.setAttribute('aDelay', new THREE.BufferAttribute(delay, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(g, mat);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  get active() {
    return !!this.points && this.points.visible && this.uniforms.uOut.value < 1;
  }

  hide() {
    if (this.points) this.points.visible = false;
  }

  show() {
    if (this.points) this.points.visible = true;
  }
}
