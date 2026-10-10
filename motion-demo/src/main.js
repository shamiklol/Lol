// "СДЕЛАНО КОДОМ" — a 25 s motion demo where every pixel comes from drawFrame(t).
// Deterministic: each frame depends only on t (seeded randomness, no clocks).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as OT from 'opentype';

const opentype = OT.default || OT;
const params = new URLSearchParams(location.search);
const S = parseFloat(params.get('scale') || '1');
const W = 1920, H = 1080, DUR = 25, FPS = 30;

const C = { black: '#07070A', paper: '#F2EFE9', orange: '#FF5A1F', pink: '#FF2D78', cream: '#FFE2C6', ink: '#111111' };

// ---------- math ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const ss = (a, b, t) => { const x = prog(t, a, b); return x * x * (3 - 2 * x); };
const eOutCubic = x => 1 - Math.pow(1 - x, 3);
const eInCubic = x => x * x * x;
const eInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const eOutExpo = x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
const eOutBack = (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
function rnd(seed) { let t = (seed * 2654435761 + 0x6D2B79F5) | 0; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
function mulberry(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const beatPulse = (t, start, end, period = 0.5, decay = 0.09) => {
  if (t < start || t > end) return 0;
  const k = Math.floor((t - start) / period); const dt = t - (start + k * period);
  return Math.exp(-dt / decay);
};

// ---------- canvases ----------
const out = document.getElementById('out');
out.width = Math.round(W * S); out.height = Math.round(H * S);
const ctx = out.getContext('2d', { willReadFrequently: true });
const glCanvas = document.getElementById('gl');

async function loadFonts() {
  const list = [['IDBlack', 'InterDisplay-Black.otf'], ['IDThin', 'InterDisplay-Thin.otf'], ['IDXLight', 'InterDisplay-ExtraLight.otf'], ['Mono', 'DejaVuSansMono.ttf'], ['MonoB', 'DejaVuSansMono-Bold.ttf']];
  for (const [n, f] of list) { const ff = new FontFace(n, `url(/assets/fonts/${f})`); await ff.load(); document.fonts.add(ff); }
  await document.fonts.ready;
}

// ---------- scramble text ----------
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*+<>/=_АБВГДЖЗИЛПФЦЧШЭЮЯ';
function scramble(str, p, seed, t) {
  const n = str.length, fr = Math.floor(t * 24); let s = '';
  for (let i = 0; i < n; i++) {
    const ch = str[i], r = p * (n + 6) - i;
    if (r >= 6 || ch === ' ') s += r > 0 ? ch : ' ';
    else if (r > 0) s += GLYPHS[Math.floor(rnd(seed + i * 97 + fr * 13) * GLYPHS.length)];
    else s += ' ';
  }
  return s;
}

function setFont(size, fam) { ctx.font = `${size}px ${fam}`; }
function textMetrics(str) { const m = ctx.measureText(str); return { w: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent }; }
// draw text centered on (cx, cy) using real glyph bounds
function centerText(str, cx, cy) {
  const m = textMetrics(str);
  ctx.fillText(str, cx - m.w / 2, cy + (m.asc - m.desc) / 2);
  return m;
}

// =====================================================================
// SCENE 1 — GENESIS (0–3 s): a dot, a heartbeat, a decoded promise
// =====================================================================
function ring(cx, cy, t, t0, maxR, dur, lw, color = '255,90,31') {
  const p = prog(t, t0, t0 + dur); if (p <= 0 || p >= 1) return;
  ctx.strokeStyle = `rgba(${color},${(1 - p) * 0.9})`;
  ctx.lineWidth = lw * (1 - p) + 0.6;
  ctx.beginPath(); ctx.arc(cx, cy, maxR * eOutExpo(p), 0, Math.PI * 2); ctx.stroke();
}
function sceneIntro(t) {
  ctx.fillStyle = C.black; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 - 40;
  // dot grid, brightening near the dot
  const ga = ss(0.1, 1.0, t) * (1 - ss(2.6, 2.95, t));
  if (ga > 0) {
    for (let x = 40; x < W; x += 48) for (let y = 36; y < H; y += 48) {
      const d = Math.hypot(x - cx, y - cy);
      const wave = Math.max(0, 1 - Math.abs(d - 1500 * eOutExpo(prog(t, 0, 1.6))) / 140);
      const a = ga * (0.07 + 0.5 * wave);
      ctx.fillStyle = `rgba(255,${200 - 110 * wave | 0},${180 - 150 * wave | 0},${a})`;
      ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
    }
  }
  ring(cx, cy, t, 0, 1700, 1.5, 10);
  ring(cx, cy, t, 0.06, 1100, 1.3, 4, '255,255,255');
  let pulse = 0;
  for (const b of [0.5, 1.0, 1.5, 2.0]) {
    if (t >= b) pulse += Math.exp(-(t - b) / 0.08);
    ring(cx, cy, t, b, 300, 0.7, 3);
  }
  // the dot -> stretches into a blade of light
  const st = eInCubic(prog(t, 2.5, 3.0));
  const sc = 1 + 0.7 * pulse * (1 - st);
  const w = lerp(24, W * 1.4, st) * sc, h = lerp(24, 2, st) * sc;
  ctx.save();
  ctx.shadowColor = C.orange; ctx.shadowBlur = 50 + 40 * pulse;
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.roundRect(cx - w / 2, cy - h / 2, w, h, Math.min(w, h) / 2); ctx.fill();
  ctx.restore();
  // decoded copy
  const fade = 1 - ss(2.45, 2.75, t);
  if (fade > 0) {
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    setFont(34, 'Mono');
    ctx.fillStyle = `rgba(242,239,233,${0.9 * fade})`;
    ctx.fillText(scramble('// ни одного кадра, нарисованного руками', prog(t, 0.55, 1.5), 11, t), cx, cy + 150);
    setFont(34, 'MonoB');
    ctx.fillStyle = `rgba(255,90,31,${fade})`;
    ctx.fillText(scramble('drawFrame(t) → 100% код', prog(t, 1.35, 2.1), 23, t), cx, cy + 205);
    ctx.textAlign = 'left';
  }
}

// =====================================================================
// SCENE 2 — KINETIC TYPE (3–7 s): one word per beat
// =====================================================================
const WORDS = [
  { s: 'НИ', bg: C.black, fg: '#fff', mode: 'punch' },
  { s: 'ОДНОЙ', bg: C.orange, fg: C.black, mode: 'smear' },
  { s: 'КАМЕРЫ.', bg: C.paper, fg: C.black, mode: 'giant' },
  { s: 'НИ', bg: C.black, fg: '#fff', mode: 'glow' },
  { s: 'ОДНОЙ', bg: C.black, fg: '#fff', mode: 'outline' },
  { s: 'КИСТИ.', bg: C.paper, fg: C.black, mode: 'drop' },
  { s: 'ТОЛЬКО', bg: C.black, fg: '#fff', mode: 'track' },
  { s: 'КОД', bg: C.black, fg: C.orange, mode: 'kod' },
];
function wordIndex(t) { return clamp(Math.floor((t - 3) / 0.5), 0, 7); }
function sceneWords(t) {
  const i = wordIndex(t), wd = WORDS[i], u = t - (3 + i * 0.5);
  ctx.fillStyle = wd.bg; ctx.fillRect(0, 0, W, H);
  ctx.save();
  const k = Math.max(0, 1 - u / 0.12);
  ctx.translate((rnd(i * 7 + 1) - 0.5) * 50 * k, (rnd(i * 7 + 2) - 0.5) * 50 * k);
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  const cx = W / 2, cy = H / 2;
  ctx.fillStyle = wd.fg;
  switch (wd.mode) {
    case 'punch': {
      const p = eOutExpo(prog(u, 0, 0.25));
      setFont(600, 'IDBlack');
      ctx.translate(cx, cy); ctx.scale(lerp(1.35, 1, p), lerp(1.35, 1, p));
      ctx.filter = `blur(${(1 - p) * 18}px)`;
      centerText(wd.s, 0, 0);
      ctx.filter = 'none';
      break;
    }
    case 'smear': {
      setFont(400, 'IDBlack');
      const p = eOutExpo(prog(u, 0, 0.32));
      const x = lerp(1100, 0, p), step = 70 * (1 - p) + 2;
      for (let e = 8; e >= 1; e--) {
        ctx.fillStyle = `rgba(7,7,10,${0.09 * (9 - e) / 8})`;
        centerText(wd.s, cx + x + e * step, cy);
      }
      ctx.fillStyle = wd.fg; centerText(wd.s, cx + x, cy);
      // speed lines
      ctx.fillStyle = 'rgba(7,7,10,0.35)';
      for (let l = 0; l < 6; l++) {
        const ly = 250 + l * 110 + rnd(l + 40) * 40, lw = (1 - p) * (400 + rnd(l + 50) * 900);
        ctx.fillRect(W - lw * 0.6 + x * 0.3, ly, lw, 4);
      }
      break;
    }
    case 'giant': {
      setFont(560, 'IDBlack');
      const m = textMetrics(wd.s);
      const p = eOutCubic(prog(u, 0, 0.5));
      const x = lerp(60, W - m.w - 60, p);
      ctx.fillText(wd.s, x, cy + (m.asc - m.desc) / 2 + 20);
      setFont(26, 'MonoB'); ctx.fillStyle = C.orange;
      ctx.fillText('[ camera = null ]', 64, 140);
      break;
    }
    case 'glow': {
      const p = eOutCubic(prog(u, 0, 0.5));
      const R = 1100 * p + 100;
      const g = ctx.createRadialGradient(cx, H + 260, 0, cx, H + 260, R);
      g.addColorStop(0, 'rgba(255,90,31,0.95)'); g.addColorStop(0.45, 'rgba(255,45,120,0.45)'); g.addColorStop(1, 'rgba(255,45,120,0)');
      ctx.fillStyle = g; ctx.fillRect(-60, -60, W + 120, H + 120);
      const b = eOutCubic(prog(u, 0, 0.2));
      setFont(220, 'IDBlack'); ctx.fillStyle = '#fff';
      ctx.filter = `blur(${(1 - b) * 14}px)`; ctx.globalAlpha = b;
      centerText(wd.s, cx, cy - 30 * (1 - b));
      ctx.filter = 'none'; ctx.globalAlpha = 1;
      break;
    }
    case 'outline': {
      setFont(300, 'IDBlack');
      const p = eOutCubic(prog(u, 0, 0.5));
      const off = 300 * (1 - p);
      ctx.lineWidth = 3; ctx.strokeStyle = C.orange;
      for (let r = -3; r <= 3; r++) {
        const y = cy + r * 270 + off * (r === 0 ? 0 : 1) - (r === 0 ? 0 : 60 * p);
        const m = textMetrics(wd.s);
        if (r === 0) { ctx.fillStyle = '#fff'; ctx.fillText(wd.s, cx - m.w / 2, cy + (m.asc - m.desc) / 2); }
        else { ctx.globalAlpha = 0.9 - Math.abs(r) * 0.22; ctx.strokeText(wd.s, cx - m.w / 2, y + (m.asc - m.desc) / 2); ctx.globalAlpha = 1; }
      }
      break;
    }
    case 'drop': {
      setFont(420, 'IDBlack');
      const chars = [...wd.s], ws = chars.map(c => ctx.measureText(c).width);
      const total = ws.reduce((a, b) => a + b, 0); const m = textMetrics(wd.s);
      let x = cx - total / 2;
      chars.forEach((c, j) => {
        const p = prog(u, j * 0.035, j * 0.035 + 0.26);
        const y = lerp(-750, 0, eOutBack(p, 2.2)), rot = (1 - p) * 0.5 * (j % 2 ? 1 : -1);
        ctx.save(); ctx.translate(x + ws[j] / 2, cy + (m.asc - m.desc) / 2 + y); ctx.rotate(rot);
        ctx.fillText(c, -ws[j] / 2, 0); ctx.restore();
        x += ws[j];
      });
      break;
    }
    case 'track': {
      setFont(330, 'IDThin');
      const p = eOutExpo(prog(u, 0, 0.42));
      ctx.letterSpacing = `${lerp(260, 0, p)}px`;
      ctx.globalAlpha = clamp(p * 3);
      const m = textMetrics(wd.s);
      ctx.fillText(wd.s, cx - m.w / 2 + lerp(130, 0, p), cy + (m.asc - m.desc) / 2);
      ctx.letterSpacing = '0px'; ctx.globalAlpha = 1;
      break;
    }
    case 'kod': {
      setFont(640, 'IDBlack');
      const p = eOutExpo(prog(u, 0, 0.16));
      const z = 1 + 7 * eInCubic(prog(t, 6.72, 7.0));
      const sc = lerp(1.4, 1, p) * z;
      ctx.translate(cx, cy); ctx.scale(sc, sc);
      ctx.globalAlpha = 1 - ss(6.9, 7.0, t);
      ctx.filter = `blur(${eInCubic(prog(t, 6.75, 7.0)) * 6}px)`;
      ctx.shadowColor = C.orange; ctx.shadowBlur = 60;
      centerText(wd.s, 0, 0);
      ctx.filter = 'none'; ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      break;
    }
  }
  ctx.restore();
}

// =====================================================================
// THREE.JS — shared renderer
// =====================================================================
let renderer, composer, bloom, sceneA, camA, sceneB, camB;
let textMesh, chrome, streaks, streakData, points, pPos, P = {}, cards = [], cardGroup;
const NST = 1400, NP = 40000, TUNNEL_L = 240;

function makeEnv() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x040405);
  const strip = (w, h, color, k, pos, rot) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.rotation.set(...rot); env.add(m);
  };
  strip(16, 1.4, 0xffffff, 7, [0, 8, -1], [Math.PI / 2, 0, 0]);
  strip(1.2, 14, 0xff5a1f, 6, [-9, 0, 1], [0, Math.PI / 2, 0]);
  strip(1.2, 14, 0xff2d78, 6, [9, 0, 1], [0, -Math.PI / 2, 0]);
  strip(14, 0.5, 0xffffff, 5, [0, -2.5, -9], [0, 0, 0]);
  // soft warm sweep behind the camera so flat front faces get a gradient, not a blow-out
  for (let k = 0; k < 8; k++) strip(2.2, 12, k % 2 ? 0xff5a1f : 0xffe2c6, 0.12 + 0.05 * k, [-8 + k * 2.3, 0, 9.5], [0, Math.PI, 0]);
  strip(20, 2, 0xff5a1f, 1.2, [0, -8, 0], [-Math.PI / 2, 0, 0]);
  const pm = new THREE.PMREMGenerator(renderer);
  return pm.fromScene(env, 0.015).texture;
}

async function buildText(str) {
  const buf = await (await fetch('/assets/fonts/InterDisplay-Black.otf')).arrayBuffer();
  const font = opentype.parse(buf);
  const path = font.getPath(str, 0, 0, 100);
  for (const c of path.commands) { if ('y' in c) c.y = -c.y; if ('y1' in c) c.y1 = -c.y1; if ('y2' in c) c.y2 = -c.y2; }
  const svg = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${path.toPathData(3)}"/></svg>`);
  const shapes = []; for (const p of svg.paths) shapes.push(...SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(shapes, { depth: 28, curveSegments: 12, bevelEnabled: true, bevelThickness: 3.5, bevelSize: 2.2, bevelSegments: 5 });
  geo.computeBoundingBox(); const bb = geo.boundingBox;
  geo.translate(-(bb.max.x + bb.min.x) / 2, -(bb.max.y + bb.min.y) / 2, -(bb.max.z + bb.min.z) / 2);
  const s = 9 / (bb.max.x - bb.min.x); geo.scale(s, s, s);
  return { geo, w: 9, h: (bb.max.y - bb.min.y) * s, d: (bb.max.z - bb.min.z) * s };
}

const textRotY = t => t < 8.2 ? lerp(2.8, 0.25, eOutExpo(prog(t, 7, 8.2))) : 0.25 * Math.cos((t - 8.2) * 0.9);
const textRotX = t => 0.12 * Math.sin((t - 7) * 0.7);

function sampleTextPoints(str, tw, th, td, n) {
  const c = document.createElement('canvas'); c.width = 1800; c.height = 700;
  const g = c.getContext('2d'); g.fillStyle = '#fff'; g.font = '520px IDBlack'; g.textBaseline = 'alphabetic';
  const m = g.measureText(str); g.fillText(str, (1800 - m.width) / 2, 560);
  const d = g.getImageData(0, 0, 1800, 700).data;
  let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
  for (let y = 0; y < 700; y++) for (let x = 0; x < 1800; x++) if (d[(y * 1800 + x) * 4 + 3] > 128) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const r = mulberry(99), outp = new Float32Array(n * 3);
  let k = 0;
  while (k < n) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
    if (d[((y | 0) * 1800 + (x | 0)) * 4 + 3] > 128) {
      outp[k * 3] = ((x - x0) / (x1 - x0) - 0.5) * tw;
      outp[k * 3 + 1] = -((y - y0) / (y1 - y0) - 0.5) * th;
      outp[k * 3 + 2] = (r() - 0.5) * td;
      k++;
    }
  }
  return outp;
}

function buildParticles(text) {
  const r = mulberry(7);
  P.A = sampleTextPoints('КОД', text.w, text.h, text.d, NP);
  P.B = new Float32Array(NP * 3); P.Cc = new Float32Array(NP * 3); P.D = new Float32Array(NP * 3);
  P.dir = new Float32Array(NP * 3); P.mag = new Float32Array(NP); P.rr = new Float32Array(NP);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NP; i++) {
    const i3 = i * 3;
    // sphere (fibonacci)
    const y = 1 - (i / (NP - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i, R = 3.3 + (r() - 0.5) * 0.08;
    P.B[i3] = Math.cos(th) * rad * R; P.B[i3 + 1] = y * R; P.B[i3 + 2] = Math.sin(th) * rad * R;
    // torus knot (2,3)
    const u = r() * Math.PI * 2, pp = 2, q = 3, Rk = 2.5, rk = 1.05;
    const cx = (Rk + rk * Math.cos(q * u)) * Math.cos(pp * u), cy = (Rk + rk * Math.cos(q * u)) * Math.sin(pp * u), cz = rk * Math.sin(q * u);
    const a1 = r() * Math.PI * 2, a2 = Math.acos(2 * r() - 1), tr = 0.32 * Math.cbrt(r());
    P.Cc[i3] = cx + tr * Math.sin(a2) * Math.cos(a1); P.Cc[i3 + 1] = cy + tr * Math.sin(a2) * Math.sin(a1); P.Cc[i3 + 2] = cz + tr * Math.cos(a2);
    // galaxy (xz plane, 3 arms)
    const arm = i % 3, gr = 0.15 + 5.6 * Math.pow(r(), 1.6), ga = arm * (Math.PI * 2 / 3) + gr * 1.15 + (r() - 0.5) * (0.9 / (gr + 0.6));
    P.D[i3] = Math.cos(ga) * gr; P.D[i3 + 1] = (r() - 0.5) * 0.35 * Math.exp(-gr * 0.35); P.D[i3 + 2] = Math.sin(ga) * gr;
    // explosion
    const ex = P.A[i3] + (r() - 0.5) * 3, ey = P.A[i3 + 1] + (r() - 0.5) * 3, ez = (r() - 0.5) * 6;
    const l = Math.hypot(ex, ey, ez) || 1;
    P.dir[i3] = ex / l; P.dir[i3 + 1] = ey / l; P.dir[i3 + 2] = ez / l;
    P.mag[i] = 1.5 + 5 * r() * r();
    P.rr[i] = r();
  }
  const geo = new THREE.BufferGeometry();
  pPos = new Float32Array(NP * 3);
  const col = new Float32Array(NP * 3), size = new Float32Array(NP);
  const palette = [new THREE.Color(C.orange), new THREE.Color(C.pink), new THREE.Color(C.cream)];
  for (let i = 0; i < NP; i++) {
    const v = r(), c = palette[v < 0.55 ? 0 : v < 0.85 ? 1 : 2];
    const k = 0.35 + r() * 0.5;
    col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k;
    size[i] = 1.0 + r() * r() * 3.2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uScale: { value: S }, uOpacity: { value: 1 }, uBoost: { value: 1 } },
    vertexShader: `attribute float aSize; attribute vec3 aColor; varying vec3 vC; uniform float uScale; uniform float uBoost;
      void main(){ vC = aColor * uBoost; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = max(1.0, aSize * uScale * (10.0 / -mv.z)); }`,
    fragmentShader: `varying vec3 vC; uniform float uOpacity;
      void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.05, d) * uOpacity; gl_FragColor = vec4(vC * a, a); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  sceneA.add(points);
}

function buildTunnel() {
  const geo = new THREE.BoxGeometry(0.035, 0.035, 1); geo.translate(0, 0, -0.5);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  streaks = new THREE.InstancedMesh(geo, mat, NST);
  streaks.frustumCulled = false;
  const r = mulberry(3), cols = [new THREE.Color(C.orange), new THREE.Color(C.pink), new THREE.Color('#ffffff'), new THREE.Color(C.cream)];
  streakData = [];
  for (let i = 0; i < NST; i++) {
    const v = r();
    const c = cols[v < 0.45 ? 0 : v < 0.75 ? 1 : v < 0.88 ? 2 : 3].clone().multiplyScalar(0.5 + r() * 1.6);
    streaks.setColorAt(i, c);
    streakData.push({ a: r() * Math.PI * 2, rad: 2.4 + Math.pow(r(), 0.7) * 14, z0: r() * TUNNEL_L, sp: 0.6 + r() * 0.8 });
  }
  sceneA.add(streaks);
}
const tunnelVel = t => {
  let v = 16 + 560 * Math.exp(-Math.max(0, t - 7) / 0.22);
  v += 180 * ss(11, 12, t) * (t < 12 ? 1 : Math.exp(-(t - 12) / 0.35));
  v *= lerp(1, 0.25, ss(12, 13, t));
  return v;
};
function tunnelDist(t) { let d = 0; const dt = 1 / 600; for (let x = 7; x < t; x += dt) d += tunnelVel(x) * dt; return d; }
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
function updateTunnel(t) {
  const D = tunnelDist(t), v = tunnelVel(t);
  for (let i = 0; i < NST; i++) {
    const s = streakData[i];
    const z = ((s.z0 + D * s.sp) % TUNNEL_L) - TUNNEL_L + 10;
    const len = clamp(v * s.sp * 0.03, 0.25, 45);
    _p.set(Math.cos(s.a) * s.rad, Math.sin(s.a) * s.rad, z); _s.set(1, 1, len);
    _m.compose(_p, _q, _s); streaks.setMatrixAt(i, _m);
  }
  streaks.instanceMatrix.needsUpdate = true;
  streaks.material.opacity = lerp(1, 0.18, ss(12, 13.5, t)) * (1 - ss(16.3, 16.9, t));
}

// ---------------- card textures ----------------
function cardCanvas(draw, bg = '#fff') {
  const c = document.createElement('canvas'); c.width = 640; c.height = 400;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.beginPath(); g.roundRect(0, 0, 640, 400, 28); g.fill();
  g.save(); g.beginPath(); g.roundRect(0, 0, 640, 400, 28); g.clip(); draw(g); g.restore();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}
const mono = (g, s, size, x, y, color, bold) => { g.font = `${size}px ${bold ? 'MonoB' : 'Mono'}`; g.fillStyle = color; g.fillText(s, x, y); };
const big = (g, s, size, x, y, color, fam = 'IDBlack') => { g.font = `${size}px ${fam}`; g.fillStyle = color; g.fillText(s, x, y); };
const CARD_FRONTS = [
  [g => { const L = [['function', '#FF5A1F'], [' drawFrame(t) {', '#F2EFE9']]; mono(g, 'function drawFrame(t) {', 28, 36, 80, '#F2EFE9'); mono(g, 'function', 28, 36, 80, C.orange);
    mono(g, '  const p = ease(t / 0.5);', 28, 36, 135, '#bdb8b0'); mono(g, '  ring.scale = 1 + p;', 28, 36, 190, '#bdb8b0'); mono(g, '  bloom.strength = p;', 28, 36, 245, '#bdb8b0'); mono(g, '  return render(t);', 28, 36, 300, C.pink); mono(g, '}', 28, 36, 355, '#F2EFE9'); void L; }, '#111'],
  [g => { big(g, '60', 260, 40, 300, C.orange); mono(g, 'fps', 40, 440, 300, C.ink, true); mono(g, '// deterministic', 24, 40, 360, '#888'); }],
  [g => { g.fillStyle = C.ink; for (let i = 0; i < 48; i++) { const h = 30 + 140 * Math.abs(Math.sin(i * 0.45) * Math.cos(i * 0.13)) + 40 * rnd(i); g.fillRect(40 + i * 12, 200 - h / 2, 7, h); } mono(g, 'audio.wav — synthesized', 22, 40, 370, '#666'); }],
  [g => { const gr = g.createRadialGradient(320, 220, 10, 320, 220, 300); gr.addColorStop(0, C.orange); gr.addColorStop(0.6, C.pink); gr.addColorStop(1, C.paper); g.fillStyle = gr; g.fillRect(0, 0, 640, 400); mono(g, '#FF5A1F', 34, 36, 370, C.ink, true); }, C.paper],
  [g => { g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(320, 200, 150, 0, 7); g.stroke(); for (let k = 1; k < 6; k++) { g.beginPath(); g.ellipse(320, 200, 150 * Math.abs(Math.cos(k * 0.52)), 150, 0, 0, 7); g.stroke(); g.beginPath(); g.ellipse(320, 200, 150, 150 * Math.abs(Math.cos(k * 0.52)), 0, 0, 7); g.stroke(); } g.fillStyle = C.orange; g.beginPath(); g.arc(420, 120, 14, 0, 7); g.fill(); }],
  [g => { big(g, '0', 300, 40, 320, C.orange); big(g, 'ассетов', 64, 250, 300, '#F2EFE9'); }, '#111'],
  [g => { g.strokeStyle = '#ccc'; g.lineWidth = 2; g.strokeRect(60, 50, 520, 280); g.strokeStyle = C.orange; g.lineWidth = 7; g.beginPath(); for (let i = 0; i <= 100; i++) { const x = i / 100, y = eOutExpo(x); g.lineTo(60 + x * 520, 330 - y * 280); } g.stroke(); mono(g, 'easeOutExpo', 26, 60, 375, C.ink, true); }],
  [g => { g.fillStyle = C.ink; for (let x = 0; x < 20; x++) for (let y = 0; y < 13; y++) { const d = Math.hypot(x - 14, y - 4) / 16; g.beginPath(); g.arc(20 + x * 31, 18 + y * 30, 13 * (1 - d) + 1, 0, 7); g.fill(); } }],
  [g => { big(g, '40 000', 150, 36, 230, C.ink); mono(g, 'частиц · 1 шейдер', 30, 40, 320, C.orange, true); }],
  [g => { for (let x = 0; x < 6; x++) for (let y = 0; y < 4; y++) { g.fillStyle = (x + y * 3) % 5 === 0 ? C.orange : `hsl(30,6%,${20 + rnd(x * 9 + y) * 60}%)`; g.fillRect(28 + x * 100, 28 + y * 88, 86, 72); } }],
  [g => { mono(g, 't = 0.033', 76, 40, 230, C.ink, true); mono(g, '// один кадр', 26, 40, 320, C.ink); }, C.orange],
  [g => { const cs = [C.black, C.paper, C.orange, C.pink, C.cream]; cs.forEach((c, i) => { g.fillStyle = c; g.fillRect(i * 128, 0, 128, 300); }); mono(g, 'palette.js', 26, 30, 360, C.ink, true); }],
  [g => { const r = mulberry(1337); g.fillStyle = C.ink; for (let i = 0; i < 260; i++) { g.beginPath(); g.arc(r() * 640, r() * 300, 2 + r() * 6, 0, 7); g.fill(); } mono(g, 'seed: 1337', 34, 36, 370, C.orange, true); }],
  [g => { for (let k = 0; k < 5; k++) { g.strokeStyle = k === 2 ? C.orange : '#222'; g.lineWidth = k === 2 ? 6 : 2; g.beginPath(); for (let x = 0; x <= 640; x += 4) g.lineTo(x, 200 + Math.sin(x * 0.02 + k) * (30 + k * 18)); g.stroke(); } }],
  [g => { big(g, 'КОД → КАДР', 92, 34, 240, C.ink); }],
];
function cardBack(i) { return cardCanvas(g => { big(g, String(i + 1).padStart(2, '0'), 230, 36, 280, C.black); mono(g, 'card.flip()', 28, 40, 360, C.black, true); }, C.orange); }
function shadowTex() {
  const c = document.createElement('canvas'); c.width = 400; c.height = 280; const g = c.getContext('2d');
  g.filter = 'blur(26px)'; g.fillStyle = 'rgba(40,25,10,0.55)'; g.fillRect(60, 60, 280, 160);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const COLS = 5, ROWS = 3, CW = 2.8, CH = 1.75, GAP = 0.32;
function buildCards() {
  sceneB = new THREE.Scene(); sceneB.background = new THREE.Color(C.paper);
  camB = new THREE.PerspectiveCamera(35, W / H, 0.1, 200);
  cardGroup = new THREE.Group(); sceneB.add(cardGroup);
  const plane = new THREE.PlaneGeometry(CW, CH), sh = shadowTex();
  const r = mulberry(21);
  for (let i = 0; i < COLS * ROWS; i++) {
    const col = i % COLS, row = Math.floor(i / COLS);
    const [draw, bg] = CARD_FRONTS[i];
    const front = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map: cardCanvas(draw, bg), transparent: true }));
    const back = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map: cardBack(i), transparent: true }));
    back.rotation.y = Math.PI;
    const card = new THREE.Group(); card.add(front, back);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(CW * 1.45, CH * 1.6), new THREE.MeshBasicMaterial({ map: sh, transparent: true, depthWrite: false }));
    const holder = new THREE.Group(); holder.add(shadow, card);
    cardGroup.add(holder);
    const gx = (col - (COLS - 1) / 2) * (CW + GAP), gy = ((ROWS - 1) / 2 - row) * (CH + GAP);
    cards.push({ holder, card, shadow, col, row, gx, gy, spin: (r() - 0.5) * 1.2, rz: (r() - 0.5) * 0.35, d: Math.hypot(gx / 8, gy / 4) });
  }
}

async function initGL() {
  renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1); renderer.setSize(W * S, H * S, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  sceneA = new THREE.Scene(); sceneA.background = new THREE.Color(0x020203);
  camA = new THREE.PerspectiveCamera(40, W / H, 0.1, 400);
  const env = makeEnv();
  const text = await buildText('КОД');
  chrome = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.2, envMap: env, envMapIntensity: 1.35, clearcoat: 1, clearcoatRoughness: 0.06, emissive: new THREE.Color(C.orange), emissiveIntensity: 0, side: THREE.DoubleSide });
  textMesh = new THREE.Mesh(text.geo, chrome);
  sceneA.add(textMesh);
  buildTunnel();
  buildParticles(text);
  composer = new EffectComposer(renderer);
  composer.setPixelRatio(1); composer.setSize(W * S, H * S);
  composer.addPass(new RenderPass(sceneA, camA));
  bloom = new UnrealBloomPass(new THREE.Vector2(W * S, H * S), 0.8, 0.5, 0.6);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  buildCards();
}

const SHAPE_LABELS = [[12.45, 'sphere(r = 3.3)'], [13.95, 'torusKnot(p = 2, q = 3)'], [15.45, 'galaxy({ arms: 3 })'], [16.5, 'collapse()']];
function renderGLA(t) {
  updateTunnel(t);
  // camera
  const shake = 0.16 * ss(11, 12, t) * (t < 12.05 ? 1 : 0);
  camA.position.set(1.3 * Math.sin((t - 7) * 0.55) + shake * Math.sin(t * 91), 0.6 * Math.sin((t - 7) * 0.4) + shake * Math.cos(t * 77),
    t < 12 ? lerp(13.5, 10.5, ss(7.6, 12, t)) : lerp(lerp(10.5, 14.5, ss(12, 13.2, t)), 13.2, ss(13.2, 16.3, t)) - 3 * eInCubic(prog(t, 16.3, 17)));
  camA.lookAt(0, 0, 0);
  const pulse = beatPulse(t, 7, 17);
  if (t < 12) {
    textMesh.visible = true; points.visible = false;
    textMesh.position.set(0, 0, lerp(-150, 0, eOutExpo(prog(t, 7, 7.9))));
    textMesh.rotation.set(textRotX(t), textRotY(t), 0.05 * Math.sin((t - 7) * 0.5));
    textMesh.scale.setScalar(1 + 0.03 * pulse);
    chrome.emissiveIntensity = 1.6 * Math.pow(ss(11.1, 12, t), 2);
    bloom.strength = 0.55 + 0.6 * ss(11.2, 12, t); bloom.radius = 0.4; bloom.threshold = 0.85 - 0.45 * ss(11.2, 12, t);
  } else {
    textMesh.visible = false; points.visible = true;
    updateParticles(t);
    points.rotation.set(lerp(textRotX(12), 0.95, ss(15.3, 16.3, t)), textRotY(12) + 0.42 * (t - 12) + 3.5 * eInCubic(prog(t, 16.4, 17)), 0);
    points.scale.setScalar(1 + 0.035 * pulse);
    points.material.uniforms.uBoost.value = 1.9 + 2 * eInCubic(prog(t, 16.5, 17));
    bloom.strength = 0.85 + 0.35 * pulse; bloom.radius = 0.5; bloom.threshold = 0.16;
  }
  composer.render();
}
function stag(t, t0, t1, r) { return eInOutCubic(clamp((t - t0 - r * 0.35) / (t1 - t0))); }
function updateParticles(t) {
  const { A, B, Cc, D, dir, mag, rr } = P;
  const pe = eOutExpo(prog(t, 12, 12.8)), k4 = eInCubic(prog(t, 16.45, 17.0));
  for (let i = 0; i < NP; i++) {
    const i3 = i * 3, r = rr[i];
    let x = A[i3] + dir[i3] * mag[i] * pe, y = A[i3 + 1] + dir[i3 + 1] * mag[i] * pe, z = A[i3 + 2] + dir[i3 + 2] * mag[i] * pe;
    const k1 = stag(t, 12.45, 13.2, r);
    if (k1 > 0) { x = lerp(x, B[i3], k1); y = lerp(y, B[i3 + 1], k1); z = lerp(z, B[i3 + 2], k1); }
    const k2 = stag(t, 13.95, 14.7, r);
    if (k2 > 0) { x = lerp(x, Cc[i3], k2); y = lerp(y, Cc[i3 + 1], k2); z = lerp(z, Cc[i3 + 2], k2); }
    const k3 = stag(t, 15.45, 16.1, r);
    if (k3 > 0) { x = lerp(x, D[i3], k3); y = lerp(y, D[i3 + 1], k3); z = lerp(z, D[i3 + 2], k3); }
    const w = 0.035 * (1 - k4);
    x += w * Math.sin(t * 2.3 + r * 40); y += w * Math.sin(t * 1.9 + r * 57); z += w * Math.cos(t * 2.1 + r * 33);
    pPos[i3] = x * (1 - k4); pPos[i3 + 1] = y * (1 - k4); pPos[i3 + 2] = z * (1 - k4);
  }
  points.geometry.attributes.position.needsUpdate = true;
}

function renderGLB(t) {
  camB.position.set(0.6 * Math.sin((t - 17) * 0.5), -2.4, lerp(16, 13.2, eInOutCubic(prog(t, 17, 20.2))));
  camB.lookAt(0, -0.2, 0);
  cardGroup.rotation.set(lerp(-0.5, -0.3, ss(17, 20, t)), 0.12 * Math.sin((t - 17) * 0.8), lerp(0.1, 0.03, ss(17, 20, t)));
  const stackP = (i) => eInOutCubic(prog(t, 20.0 + i * 0.012, 20.45 + i * 0.012));
  const fly = eInCubic(prog(t, 20.5, 21.0));
  cards.forEach((c, i) => {
    const e = prog(t, 17.05 + c.d * 0.3, 17.6 + c.d * 0.3);
    const eb = eOutBack(e, 1.5);
    let x = c.gx * eb, y = c.gy * eb, z = -2 * (1 - eb);
    z += 0.22 * Math.sin((t - 19.4) * 6 - c.col * 0.9) * ss(19.3, 19.6, t) * (1 - ss(19.9, 20.1, t));
    const sp = stackP(i);
    x = lerp(x, 0, sp); y = lerp(y, 0, sp); z = lerp(z, i * 0.07, sp);
    z += fly * 15;
    c.holder.position.set(x, y, z);
    c.holder.scale.setScalar(Math.max(0.001, e > 0 ? lerp(0.05, 1, eOutCubic(e)) : 0.001));
    c.holder.rotation.z = lerp(c.spin * (1 - eOutCubic(e)), c.rz, sp);
    const f1 = eInOutCubic(prog(t, 18.0 + c.col * 0.07 + c.row * 0.04, 18.5 + c.col * 0.07 + c.row * 0.04));
    const f2 = eInOutCubic(prog(t, 19.0 + c.col * 0.07 + c.row * 0.04, 19.5 + c.col * 0.07 + c.row * 0.04));
    c.card.rotation.y = Math.PI * (f1 + f2);
    c.card.position.z = 0.35 * Math.sin(Math.PI * f1) + 0.35 * Math.sin(Math.PI * f2) + 0.05;
    c.shadow.position.set(0.12, -0.28, -0.02);
    c.shadow.material.opacity = (1 - sp) * clamp(e * 2);
  });
  renderer.render(sceneB, camB);
}

// =====================================================================
// SCENE 6 — END CARD (21–25 s)
// =====================================================================
function sceneEnd(t) {
  ctx.fillStyle = C.black; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 - 30;
  const br = 0.28 * ss(21, 22.2, t) * (0.85 + 0.15 * Math.sin((t - 21) * 2.4));
  const g = ctx.createRadialGradient(cx, cy + 40, 0, cx, cy + 40, 900);
  g.addColorStop(0, `rgba(255,90,31,${br})`); g.addColorStop(0.5, `rgba(255,45,120,${br * 0.35})`); g.addColorStop(1, 'rgba(255,45,120,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // dust
  const dr = mulberry(555);
  for (let i = 0; i < 140; i++) {
    const x = dr() * W, y = ((dr() * H - (t - 21) * (12 + dr() * 40)) % H + H) % H, s = 1 + dr() * 2.5;
    ctx.fillStyle = `rgba(255,${180 + dr() * 60 | 0},${150 + dr() * 80 | 0},${0.35 * ss(21, 21.8, t) * dr()})`;
    ctx.fillRect(x, y, s, s);
  }
  const p = eOutExpo(prog(t, 21.0, 22.1));
  setFont(150, 'IDBlack');
  ctx.letterSpacing = `${lerp(150, 0, p)}px`;
  const a = 'СДЕЛАНО ', b = 'КОДОМ.';
  const wa = ctx.measureText(a).width, wb = ctx.measureText(b).width, m = textMetrics(a + b);
  const x0 = cx - (wa + wb) / 2, by = cy + (m.asc - m.desc) / 2;
  ctx.globalAlpha = ss(21, 21.2, t);
  ctx.filter = `blur(${(1 - p) * 10}px)`;
  ctx.fillStyle = C.paper; ctx.fillText(a, x0, by);
  ctx.save(); ctx.shadowColor = C.orange; ctx.shadowBlur = 40 * p; ctx.fillStyle = C.orange; ctx.fillText(b, x0 + wa, by); ctx.restore();
  ctx.filter = 'none'; ctx.letterSpacing = '0px'; ctx.globalAlpha = 1;
  // underline draw-on
  const lp = eOutExpo(prog(t, 22.0, 22.7));
  ctx.fillStyle = C.orange; ctx.fillRect(x0, by + 46, (wa + wb) * lp, 6);
  // stats line
  ctx.textAlign = 'center';
  setFont(32, 'Mono'); ctx.fillStyle = `rgba(242,239,233,${0.85 * ss(22.25, 22.5, t)})`;
  ctx.fillText(scramble('0 камер · 0 кистей · 0 ассетов · 100% код', prog(t, 22.3, 23.3), 77, t), cx, by + 140);
  setFont(22, 'Mono'); ctx.fillStyle = `rgba(242,239,233,${0.4 * ss(23.3, 23.7, t)})`;
  ctx.fillText('// графика, 3D, частицы и звук — сгенерированы функцией drawFrame(t)', cx, by + 196);
  ctx.textAlign = 'left';
  // fade out
  const fo = ss(24.2, 25, t); if (fo > 0) { ctx.fillStyle = `rgba(0,0,0,${fo})`; ctx.fillRect(0, 0, W, H); }
}

// =====================================================================
// OVERLAYS + POST
// =====================================================================
function overlaysA(t) {
  ctx.textAlign = 'center'; setFont(28, 'MonoB');
  if (t > 8.0 && t < 11.6) {
    const a = ss(8.0, 8.2, t) * (1 - ss(11.3, 11.6, t));
    ctx.fillStyle = `rgba(242,239,233,${0.75 * a})`;
    ctx.fillText(scramble('new ExtrudeGeometry("КОД") · MeshPhysicalMaterial · 1 400 streaks', prog(t, 8.0, 9.0), 5, t), W / 2, H - 110);
  }
  for (let k = 0; k < SHAPE_LABELS.length; k++) {
    const [t0, label] = SHAPE_LABELS[k], t1 = k < 3 ? SHAPE_LABELS[k + 1][0] - 0.05 : 16.95;
    if (t < t0 || t > t1) continue;
    const a = ss(t0, t0 + 0.12, t) * (1 - ss(t1 - 0.15, t1, t));
    ctx.fillStyle = `rgba(242,239,233,${0.85 * a})`;
    ctx.fillText(scramble(label, prog(t, t0, t0 + 0.6), 300 + k * 31, t), W / 2, H - 110);
  }
  ctx.textAlign = 'left';
}
function isLight(t) {
  if (t >= 3 && t < 7) { const bg = WORDS[wordIndex(t)].bg; return bg === C.paper || bg === C.orange; }
  return t >= 17 && t < 21;
}
const SCENES = [[0, '01 / GENESIS'], [3, '02 / KINETIC TYPE'], [7, '03 / HYPERSPACE'], [12, '04 / 40 000 PARTICLES'], [17, '05 / CARD WALL'], [21, '06 / END']];
function hud(t) {
  const a = 0.55 * (1 - ss(21.3, 21.8, t)) * ss(0.15, 0.5, t);
  if (a <= 0) return;
  const c = isLight(t) ? `rgba(7,7,10,${a})` : `rgba(242,239,233,${a})`;
  ctx.fillStyle = c; setFont(19, 'Mono');
  ctx.textAlign = 'left'; ctx.fillText(`drawFrame(t = ${t.toFixed(3)})`, 48, 58);
  let name = SCENES[0][1]; for (const [s, n] of SCENES) if (t >= s) name = n;
  ctx.fillText(name, 48, H - 42);
  ctx.textAlign = 'right';
  ctx.fillText(`F ${String(Math.round(t * FPS)).padStart(4, '0')} / ${DUR * FPS}`, W - 48, 58);
  ctx.fillText('1920×1080 · 30 fps · 100% code', W - 48, H - 42);
  ctx.textAlign = 'left';
  // corner ticks
  ctx.strokeStyle = c; ctx.lineWidth = 2;
  for (const [x, y, dx, dy] of [[24, 24, 1, 1], [W - 24, 24, -1, 1], [24, H - 24, 1, -1], [W - 24, H - 24, -1, -1]]) {
    ctx.beginPath(); ctx.moveTo(x, y + dy * 18); ctx.lineTo(x, y); ctx.lineTo(x + dx * 18, y); ctx.stroke();
  }
}
const FLASHES = [[0, 0.9, 0.3], [3.0, 0.35, 0.12], [7.0, 1, 0.32], [12.0, 0.85, 0.28], [17.0, 1, 0.5], [21.0, 0.55, 0.3]];
const GLITCHES = [[2.82, 3.02, 0.7], [6.92, 7.0, 0.5], [11.86, 12.14, 1], [20.94, 21.06, 0.6]];
function glitch(amount, seed) {
  const w = out.width, h = out.height;
  const img = ctx.getImageData(0, 0, w, h), src = new Uint8ClampedArray(img.data), d = img.data;
  const rg = mulberry(seed), dx = Math.round(amount * 22 * S);
  let y = 0;
  while (y < h) {
    const sh = Math.max(1, Math.floor((6 + rg() * 70) * S));
    const off = rg() < 0.45 ? Math.round((rg() - 0.5) * amount * 220 * S) : 0;
    for (let yy = y; yy < Math.min(y + sh, h); yy++) {
      const row = yy * w;
      for (let x = 0; x < w; x++) {
        const i = (row + x) * 4;
        const xr = Math.min(w - 1, Math.max(0, x - off + dx)), xg = Math.min(w - 1, Math.max(0, x - off)), xb = Math.min(w - 1, Math.max(0, x - off - dx));
        d[i] = src[(row + xr) * 4]; d[i + 1] = src[(row + xg) * 4 + 1]; d[i + 2] = src[(row + xb) * 4 + 2];
      }
    }
    y += sh;
  }
  ctx.putImageData(img, 0, 0);
}
let grain = [];
function buildGrain() {
  for (let k = 0; k < 4; k++) {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    const im = g.createImageData(256, 256), r = mulberry(1000 + k);
    for (let i = 0; i < 256 * 256; i++) { const v = r() * 255 | 0; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    g.putImageData(im, 0, 0); grain.push(ctx.createPattern(c, 'repeat'));
  }
}
function post(t) {
  for (const [a, b, amt] of GLITCHES) if (t >= a && t < b) {
    const e = Math.sin(Math.PI * prog(t, a, b));
    ctx.setTransform(1, 0, 0, 1, 0, 0); glitch(amt * (0.4 + 0.6 * e), Math.floor(t * 30) + 7); ctx.setTransform(S, 0, 0, S, 0, 0);
  }
  for (const [t0, a, d] of FLASHES) {
    const p = prog(t, t0, t0 + d);
    if (t >= t0 && p < 1) { ctx.fillStyle = `rgba(255,252,246,${a * Math.pow(1 - p, 2)})`; ctx.fillRect(0, 0, W, H); }
  }
  const light = isLight(t);
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(0,0,0,${light ? 0.16 : 0.55})`);
  ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.09;
  const fr = Math.round(t * FPS);
  ctx.translate((rnd(fr) * 256) | 0, (rnd(fr + 5000) * 256) | 0);
  ctx.fillStyle = grain[fr % 4]; ctx.fillRect(-256, -256, out.width + 256, out.height + 256);
  ctx.restore();
  hud(t);
}

// =====================================================================
// FRAME ENTRY
// =====================================================================
function drawFrame(t) {
  ctx.setTransform(S, 0, 0, S, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none'; ctx.letterSpacing = '0px';
  if (t < 3) sceneIntro(t);
  else if (t < 7) sceneWords(t);
  else if (t < 17) { renderGLA(t); ctx.drawImage(glCanvas, 0, 0, W, H); overlaysA(t); }
  else if (t < 21) { renderGLB(t); ctx.drawImage(glCanvas, 0, 0, W, H); }
  else sceneEnd(t);
  post(t);
}

window.renderFrame = (t, q = 0.93) => { drawFrame(t); return out.toDataURL('image/jpeg', q); };
window.renderSheet = (times, cols) => {
  const cw = out.width, ch = out.height, lab = 22;
  const rows = Math.ceil(times.length / cols);
  const sheet = document.createElement('canvas'); sheet.width = cols * (cw + 6) + 6; sheet.height = rows * (ch + lab + 6) + 6;
  const g = sheet.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, sheet.width, sheet.height);
  times.forEach((t, i) => {
    drawFrame(t);
    const x = 6 + (i % cols) * (cw + 6), y = 6 + Math.floor(i / cols) * (ch + lab + 6);
    g.drawImage(out, x, y); g.fillStyle = '#eee'; g.font = '15px Mono'; g.fillText(`${t.toFixed(2)}s`, x + 4, y + ch + 17);
  });
  return sheet.toDataURL('image/jpeg', 0.85);
};
window.DURATION = DUR;

(async () => {
  try {
    await loadFonts();
    buildGrain();
    await initGL();
    drawFrame(7.5); drawFrame(13); drawFrame(18); // warm up shaders / textures
    window.ready = true;
  } catch (e) { window.initError = String(e && e.stack || e); console.error(e); }
})();
