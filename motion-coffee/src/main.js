// «Сначала — кофе.» — a light 20 s vertical motion piece, drawn entirely in Canvas 2D.
// Every frame is a pure function of t (seeded randomness only), so previews match the final.
const params = new URLSearchParams(location.search);
const S = parseFloat(params.get('scale') || '1');
const W = 1080, H = 1920, DUR = 20, FPS = 30, BEAT = 0.625;

const C = {
  cream: '#FFF3E3', cream2: '#F7E6CF', brown: '#3B2416', coffee: '#5A3420', coffeeDeep: '#3E2314',
  crema: '#C68B57', foam: '#F8E7CD', foamShade: '#E9CFAE', yellow: '#FFC93C', sun: '#FFD45C', ray: '#FFE3A0',
  pink: '#FF9E9E', blush: '#FF8F8F', white: '#FFFFFF', end: '#4A2A18',
};
const EMOJI = '"Noto Color Emoji", "DejaVu Sans"';

// ---------- math ----------
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const ss = (a, b, t) => { const x = prog(t, a, b); return x * x * (3 - 2 * x); };
const eOutCubic = x => 1 - Math.pow(1 - x, 3);
const eInCubic = x => x * x * x;
const eInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const eOutBack = (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
const eOutElastic = x => x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
function rnd(seed) { let t = (seed * 2654435761 + 0x6D2B79F5) | 0; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
function mulberry(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// ---------- canvas ----------
const out = document.getElementById('out');
out.width = Math.round(W * S); out.height = Math.round(H * S);
const ctx = out.getContext('2d');
const acc = document.createElement('canvas'); acc.width = out.width; acc.height = out.height;
const actx = acc.getContext('2d');

const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const CYR = 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116';
async function loadFonts() {
  const faces = [];
  for (const w of [600, 800, 900]) for (const [sub, range] of [['latin', LATIN], ['cyrillic', CYR]])
    faces.push(new FontFace('Unb', `url(/assets/fonts/unbounded-${sub}-${w}-normal.woff2)`, { weight: String(w), unicodeRange: range }));
  for (const w of [400, 700]) for (const [sub, range] of [['latin', LATIN], ['cyrillic', CYR]])
    faces.push(new FontFace('Cav', `url(/assets/fonts/caveat-${sub}-${w}-normal.woff2)`, { weight: String(w), unicodeRange: range }));
  for (const f of faces) { await f.load(); document.fonts.add(f); }
  await document.fonts.ready;
}

function font(weight, size, fam = 'Unb') { ctx.font = `${weight} ${size}px ${fam === 'Unb' ? 'Unb' : 'Cav'}, ${EMOJI}`; }
function metrics(str) { const m = ctx.measureText(str); return { w: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent }; }
// text centred on (x, y) by its real glyph box, optional outline + hard shadow
function label(str, x, y, { fill = C.brown, stroke = null, lw = 0, shadow = null, sx = 0, sy = 0 } = {}) {
  const m = metrics(str); const bx = x - m.w / 2, by = y + (m.asc - m.desc) / 2;
  ctx.lineJoin = 'round';
  if (shadow) {
    ctx.fillStyle = shadow; ctx.strokeStyle = shadow; ctx.lineWidth = lw;
    if (stroke) ctx.strokeText(str, bx + sx, by + sy);
    ctx.fillText(str, bx + sx, by + sy);
  }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeText(str, bx, by); }
  ctx.fillStyle = fill; ctx.fillText(str, bx, by);
  return m;
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

// ---------- shared bits ----------
function background(color = C.cream) {
  ctx.fillStyle = color; ctx.fillRect(-2, -2, W + 4, H + 4);
}
function polka(t, alpha, seed = 3) {
  const r = mulberry(seed);
  ctx.fillStyle = `rgba(232,206,170,${alpha})`;
  for (let i = 0; i < 26; i++) {
    const x = r() * W, y = ((r() * (H + 200) - t * (8 + r() * 14)) % (H + 200) + H + 200) % (H + 200) - 100, rr = 6 + r() * 16;
    ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill();
  }
}
function sparkle(x, y, size, a, color = C.yellow, rot = 0) {
  if (a <= 0 || size <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= a;
  ctx.beginPath();
  for (let k = 0; k < 4; k++) {
    const ang = k * Math.PI / 2;
    ctx.lineTo(Math.cos(ang) * size, Math.sin(ang) * size);
    ctx.quadraticCurveTo(0, 0, Math.cos(ang + Math.PI / 4) * size * 0.18, Math.sin(ang + Math.PI / 4) * size * 0.18);
    ctx.quadraticCurveTo(0, 0, Math.cos(ang + Math.PI / 2) * size, Math.sin(ang + Math.PI / 2) * size);
  }
  ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.09); ctx.strokeStyle = C.brown; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.restore();
}
function steam(x, y, t, a, spread = 58, len = 210, width = 9, color = '199,160,122') {
  if (a <= 0) return;
  for (let k = 0; k < 3; k++) {
    const ph = k * 2.1, n = 26;
    ctx.beginPath();
    for (let j = 0; j <= n; j++) {
      const u = j / n, yy = y - u * len * (0.85 + 0.15 * Math.sin(t * 1.3 + ph));
      const xx = x + (k - 1) * spread + 18 * Math.sin(u * 6 - t * 4 + ph) * u;
      j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
    }
    const g = ctx.createLinearGradient(0, y, 0, y - len);
    g.addColorStop(0, `rgba(${color},0)`); g.addColorStop(0.3, `rgba(${color},${0.75 * a})`); g.addColorStop(1, `rgba(${color},0)`);
    ctx.strokeStyle = g; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke();
  }
}

// =====================================================================
// MASCOT — a glass mug with a face. Origin = bottom centre of the glass.
// =====================================================================
const TOPY = -400, HWT = 190, HWB = 165, RB = 55;
const IN = { hwt: HWT - 17, hwb: HWB - 17, bot: -36, rb: 40 };
function bodyPath(hwt, hwb, bot, rb, top = TOPY) {
  ctx.beginPath();
  ctx.moveTo(-hwt, top); ctx.lineTo(-hwb, bot - rb);
  ctx.quadraticCurveTo(-hwb, bot, -hwb + rb, bot); ctx.lineTo(hwb - rb, bot);
  ctx.quadraticCurveTo(hwb, bot, hwb, bot - rb); ctx.lineTo(hwt, top); ctx.closePath();
}
const levelY = L => lerp(IN.bot, TOPY + 46, L);
function waveLine(y, amp, t, fromX = -260, toX = 260) {
  for (let x = fromX; x <= toX; x += 8) {
    const yy = y + amp * Math.sin(x * 0.034 + t * 7) + amp * 0.45 * Math.sin(x * 0.071 - t * 11);
    x === fromX ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
  }
}
function fillBelow(y, amp, t, color) {
  ctx.beginPath(); waveLine(y, amp, t); ctx.lineTo(260, 60); ctx.lineTo(-260, 60); ctx.closePath();
  ctx.fillStyle = color; ctx.fill();
}
function haloStroke(lw) { // brown line with a cream halo so face reads on glass and on coffee
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(255,246,232,0.95)'; ctx.lineWidth = lw + 9; ctx.stroke();
  ctx.strokeStyle = C.brown; ctx.lineWidth = lw; ctx.stroke();
}
function drawEye(x, y, f) {
  const happy = f.happy, open = f.open;
  if (happy < 1) {
    ctx.save(); ctx.globalAlpha *= 1 - happy;
    if (open < 0.12) { ctx.beginPath(); ctx.arc(x, y - 14, 27, 0.18 * Math.PI, 0.82 * Math.PI); haloStroke(7); }
    else {
      const rx = 31, ry = 37 * open * (1 + 0.12 * f.sparkle);
      ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7);
      ctx.fillStyle = '#fff'; ctx.fill(); haloStroke(5);
      ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, rx - 2, Math.max(1, ry - 2), 0, 0, 7); ctx.clip();
      const pr = 16 * (0.85 + 0.35 * f.sparkle), px = x + f.lx * 9, py = y + f.ly * 10;
      ctx.fillStyle = C.brown; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px - pr * 0.35, py - pr * 0.4, pr * 0.36, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(px + pr * 0.35, py + pr * 0.3, pr * 0.16, 0, 7); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  if (happy > 0) {
    ctx.save(); ctx.globalAlpha *= happy;
    ctx.beginPath(); ctx.arc(x, y + 14, 27, 1.17 * Math.PI, 1.83 * Math.PI); haloStroke(8);
    ctx.restore();
  }
}
function drawFace(f) {
  const ey = -222;
  // blush
  if (f.blush > 0) {
    ctx.fillStyle = `rgba(255,143,143,${0.6 * f.blush})`;
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * 108, -170, 27, 15, 0, 0, 7); ctx.fill(); }
  }
  drawEye(-68, ey, f);
  drawEye(68, ey, { ...f, happy: Math.max(f.happy, f.wink) });
  // mouths
  const my = -150;
  if (f.snore > 0) {
    ctx.save(); ctx.globalAlpha *= f.snore;
    ctx.beginPath(); ctx.ellipse(0, my + 4, 11 + 3 * f.breath, 13 + 5 * f.breath, 0, 0, 7);
    ctx.fillStyle = C.brown; ctx.fill(); haloStroke(3);
    ctx.restore();
  }
  if (f.smile > 0) {
    ctx.save(); ctx.globalAlpha *= f.smile;
    ctx.beginPath(); ctx.arc(0, my - 22, 30, 0.22 * Math.PI, 0.78 * Math.PI); haloStroke(7);
    ctx.restore();
  }
  if (f.grin > 0) {
    const o = f.grin;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(-50, my - 6); ctx.lineTo(50, my - 6); ctx.ellipse(0, my - 6, 50, 46 * o, 0, 0, Math.PI); ctx.closePath();
    ctx.fillStyle = C.brown; ctx.fill(); haloStroke(5);
    ctx.clip();
    ctx.fillStyle = '#FF7A7A'; ctx.beginPath(); ctx.ellipse(0, my - 6 + 46 * o, 30, 22 * o, 0, 0, 7); ctx.fill();
    ctx.restore();
  }
}
// m: { level, foam, amp, face, t, stream:{from:[x,y]} (local) }
function drawMug(m) {
  const t = m.t;
  // shadow + saucer
  ctx.fillStyle = 'rgba(59,36,22,0.13)'; ctx.beginPath(); ctx.ellipse(0, 50, 305, 30, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 10, 285, 46, 0, 0, 7); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 4, 196, 27, 0, 0, 7); ctx.lineWidth = 4; ctx.strokeStyle = '#E6D5BF'; ctx.stroke();
  // handle
  ctx.beginPath(); ctx.moveTo(HWT - 14, TOPY + 78);
  ctx.bezierCurveTo(HWT + 150, TOPY + 60, HWT + 150, -95, HWB - 6, -112);
  ctx.lineCap = 'round'; ctx.strokeStyle = C.brown; ctx.lineWidth = 48; ctx.stroke();
  ctx.strokeStyle = '#EEF5F3'; ctx.lineWidth = 33; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(HWT + 30, TOPY + 92); ctx.bezierCurveTo(HWT + 104, TOPY + 92, HWT + 108, -150, HWT + 60, -138);
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 7; ctx.stroke();
  // glass back wall
  bodyPath(HWT, HWB, 0, RB); ctx.fillStyle = 'rgba(236,246,245,0.75)'; ctx.fill();
  // liquid
  if (m.level > 0.001 || m.stream) {
    ctx.save(); bodyPath(IN.hwt, IN.hwb, IN.bot, IN.rb, TOPY + 10); ctx.clip();
    const y = levelY(m.level), amp = m.amp;
    if (m.foam > 0) fillBelow(y - 58 * m.foam, amp * 0.6, t, C.foam);
    fillBelow(y, amp, t, C.crema);
    const g = ctx.createLinearGradient(0, y, 0, IN.bot);
    g.addColorStop(0, '#7B4A2B'); g.addColorStop(1, C.coffeeDeep);
    fillBelow(y + 13, amp, t, g);
    if (m.foam > 0) { // foam bubbles
      const r = mulberry(17);
      for (let i = 0; i < 22; i++) {
        const bx = -150 + r() * 300, by = y - 10 - r() * 44 * m.foam, br = 3 + r() * 7;
        ctx.beginPath(); ctx.arc(bx, by, br * m.foam, 0, 7); ctx.strokeStyle = C.foamShade; ctx.lineWidth = 2.5; ctx.stroke();
      }
    }
    // rising bubbles in the coffee
    const r2 = mulberry(5);
    for (let i = 0; i < 14; i++) {
      const sp = 40 + r2() * 70, ph = r2() * 10, bx = -140 + r2() * 280;
      const by = IN.bot - ((t * sp + ph * 40) % Math.max(1, IN.bot - y));
      if (by < y + 18) continue;
      ctx.beginPath(); ctx.arc(bx, by, 3 + r2() * 4, 0, 7); ctx.fillStyle = 'rgba(214,160,112,0.45)'; ctx.fill();
    }
    ctx.restore();
  }
  // stream (local coords), drawn inside the glass opening region only above the liquid
  if (m.stream) drawStream(m.stream, levelY(m.level), t);
  // front glass + face + highlights + outline
  bodyPath(HWT, HWB, 0, RB); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fill();
  drawFace(m.face);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  roundRect(-HWT + 30, TOPY + 42, 15, 250, 8); ctx.fill();
  roundRect(-HWB + 26, -88, 13, 30, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; roundRect(HWT - 44, TOPY + 60, 10, 110, 5); ctx.fill();
  bodyPath(HWT, HWB, 0, RB); ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-HWB + 24, -30); ctx.lineTo(HWB - 24, -30); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(59,36,22,0.25)'; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, TOPY, HWT, 18, 0, 0, 7); ctx.lineWidth = 6; ctx.strokeStyle = C.brown; ctx.stroke();
}
function drawStream(s, surfY, t) {
  const [x0, y0] = s.from, x1 = 118, y1 = surfY;
  const cx = x1 - 6, cy = y0 + 20;
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const u = i / 40, a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u;
    pts.push([a * x0 + b * cx + c * x1 + 3 * Math.sin(t * 31 + u * 9) * u, a * y0 + b * cy + c * y1]);
  }
  const lo = Math.floor(s.tail * 40), hi = Math.ceil(s.head * 40);
  if (hi - lo < 1) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(-400, -2000, 800, surfY + 2000 + 6); ctx.clip();
  ctx.beginPath();
  for (let i = lo; i <= hi; i++) { const w = lerp(13, 8, i / 40); i === lo ? ctx.moveTo(pts[i][0] - w, pts[i][1]) : ctx.lineTo(pts[i][0] - w, pts[i][1]); }
  for (let i = hi; i >= lo; i--) { const w = lerp(13, 8, i / 40); ctx.lineTo(pts[i][0] + w, pts[i][1]); }
  ctx.closePath(); ctx.fillStyle = '#5E3520'; ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.beginPath(); for (let i = lo; i <= hi; i++) i === lo ? ctx.moveTo(pts[i][0] - 4, pts[i][1]) : ctx.lineTo(pts[i][0] - 4, pts[i][1]);
  ctx.strokeStyle = 'rgba(214,150,100,0.7)'; ctx.lineWidth = 4; ctx.stroke();
  ctx.restore();
}
const FACE0 = { open: 0, happy: 0, wink: 0, sparkle: 0, lx: 0, ly: 0, blush: 0, snore: 0, breath: 0, smile: 0, grin: 0 };

// ---------- the coffee pot ----------
const SPOUT = [176, -80];
function drawPot() {
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // handle
  ctx.beginPath(); ctx.moveTo(-92, -62); ctx.bezierCurveTo(-190, -70, -190, 70, -112, 66);
  ctx.strokeStyle = C.brown; ctx.lineWidth = 26; ctx.stroke();
  // spout
  ctx.beginPath(); ctx.moveTo(78, -62); ctx.quadraticCurveTo(150, -84, SPOUT[0], SPOUT[1] - 10);
  ctx.lineTo(SPOUT[0] + 4, SPOUT[1] + 8); ctx.quadraticCurveTo(140, -54, 104, -10); ctx.closePath();
  ctx.fillStyle = C.yellow; ctx.fill(); ctx.strokeStyle = C.brown; ctx.lineWidth = 7; ctx.stroke();
  // body
  ctx.beginPath(); ctx.moveTo(-84, -96); ctx.lineTo(84, -96); ctx.quadraticCurveTo(100, -96, 104, -80);
  ctx.lineTo(126, 70); ctx.quadraticCurveTo(130, 100, 98, 100); ctx.lineTo(-98, 100); ctx.quadraticCurveTo(-130, 100, -126, 70);
  ctx.lineTo(-104, -80); ctx.quadraticCurveTo(-100, -96, -84, -96); ctx.closePath();
  ctx.fillStyle = C.yellow; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.save(); ctx.clip();
  ctx.fillStyle = C.brown; ctx.fillRect(-140, -12, 280, 30);
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; roundRect(-86, -76, 14, 56, 7); ctx.fill(); roundRect(-92, 34, 14, 40, 7); ctx.fill();
  ctx.restore();
  // lid + knob
  roundRect(-96, -128, 192, 36, 16); ctx.fillStyle = C.brown; ctx.fill();
  ctx.beginPath(); ctx.arc(0, -142, 19, 0, 7); ctx.fill();
}

// =====================================================================
// SCENE 1 — ALARM (0–2.5 s): split-flap clock 06:59 → 07:00
// =====================================================================
function flapCard(cx, cy, w, h, oldS, newS, t0, t) {
  const p = prog(t, t0, t0 + 0.32), p1 = clamp(p * 2), p2 = clamp(p * 2 - 1);
  ctx.save(); ctx.translate(cx, cy);
  ctx.fillStyle = 'rgba(59,36,22,0.18)'; roundRect(-w / 2 + 10, -h / 2 + 16, w, h, 52); ctx.fill();
  const half = (str, top, scaleY = 1, shade = 0) => {
    ctx.save();
    ctx.beginPath(); top ? ctx.rect(-w / 2, -h / 2, w, h / 2) : ctx.rect(-w / 2, 0, w, h / 2); ctx.clip();
    ctx.scale(1, scaleY);
    roundRect(-w / 2, -h / 2, w, h, 52); ctx.fillStyle = C.brown; ctx.fill();
    font(900, 380); label(str, 0, 6, { fill: C.cream });
    if (shade) { ctx.fillStyle = `rgba(0,0,0,${shade})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
    ctx.restore();
  };
  half(p1 > 0 ? newS : oldS, true);
  half(p2 >= 1 ? newS : oldS, false);
  if (p > 0 && p < 1) {
    if (p1 < 1) half(oldS, true, 1 - eInCubic(p1), 0.35 * p1);
    else half(newS, false, eOutCubic(p2), 0.35 * (1 - p2));
  }
  ctx.fillStyle = C.cream; ctx.fillRect(-w / 2, -3, w, 6);
  for (const s of [-1, 1]) { roundRect(s * (w / 2) - 9, -24, 18, 48, 8); ctx.fillStyle = '#6B4A36'; ctx.fill(); }
  ctx.restore();
}
const RINGS = [[0.62, 1.05], [1.15, 1.6]];
function ringAmt(t) { let a = 0; for (const [s, e] of RINGS) if (t >= s && t < e) a = Math.max(a, 1 - 0.4 * prog(t, s, e)); return a; }
function sceneAlarm(t) {
  background(); polka(t, 0.35, 3);
  const shake = ringAmt(t);
  const jx = shake * 14 * Math.sin(t * 95), jr = shake * 0.035 * Math.sin(t * 81);
  ctx.save(); ctx.translate(W / 2 + jx, 0); ctx.rotate(jr); ctx.translate(-W / 2, 0);
  const pop = eOutBack(prog(t, -0.14, 0.2), 2);
  ctx.save(); ctx.translate(W / 2, 830); ctx.scale(lerp(0.6, 1, pop), lerp(0.6, 1, pop)); ctx.globalAlpha = clamp(pop * 1.4); ctx.translate(-W / 2, -830);
  flapCard(W / 2, 560, 700, 450, '06', '07', 0.42, t);
  flapCard(W / 2, 1090, 700, 450, '59', '00', 0.24, t);
  ctx.restore(); ctx.restore();
  // ДЗЫНЬ! bursts
  const bursts = [[0.62, 250, 300, -0.25, 'ДЗЫНЬ!'], [0.9, 840, 825, 0.18, 'ДЗЫНЬ!'], [1.18, 250, 1330, -0.12, 'ДЗЫНЬ!']];
  for (const [t0, x, y, rot, s] of bursts) {
    const p = prog(t, t0, t0 + 0.28); if (t < t0) continue;
    const out_ = 1 - ss(1.55, 1.75, t);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot + 0.04 * Math.sin(t * 40) * shake);
    const sc = 0.72 * eOutBack(p, 3) * out_; ctx.scale(sc, sc);
    // burst star
    ctx.beginPath();
    for (let k = 0; k < 24; k++) { const r = k % 2 ? 140 : 200, a = k / 24 * Math.PI * 2; ctx.lineTo(Math.cos(a) * r * 1.35, Math.sin(a) * r * 0.75); }
    ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.lineJoin = 'round'; ctx.stroke();
    font(900, 70); label(s, 0, 0, { fill: C.yellow, stroke: C.brown, lw: 12 });
    ctx.restore();
  }
  // caption
  const cp = eOutCubic(prog(t, 1.62, 1.98));
  if (cp > 0) {
    font(700, 112, 'Cav'); ctx.globalAlpha = cp;
    label('понедельник…', W / 2, 1440 + 30 * (1 - cp), { fill: C.brown });
    ctx.globalAlpha = 1;
  }
}

// =====================================================================
// SCENES 2+3 — SLEEPY MUG + THE POUR (2.5–7.5 s)
// =====================================================================
const MUG = { x: W / 2 - 40, y: 1190 };
const POUR = { start: 5.5, end: 7.18 };
const level23 = t => 0.8 * eInOutCubic(prog(t, 5.62, 7.3));
function potState(t) {
  const enter = eOutBack(prog(t, 4.95, 5.4), 1.4), tilt = eOutCubic(prog(t, 5.25, 5.55)) * (1 - eInOutCubic(prog(t, 7.12, 7.36)));
  const exit = eInCubic(prog(t, 7.3, 7.6));
  return { x: lerp(-280, 300, enter) - 500 * exit, y: lerp(260, 520, enter) - 500 * exit, rot: 0.78 * tilt - 0.15 * (1 - enter) };
}
function loadingBar(t, p, alpha, done) {
  if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha = alpha;
  const y = 1430, w = 640, x = W / 2 - w / 2;
  const dp = eOutBack(prog(t, 7.3, 7.6), 2.5);
  if (!done) {
    font(800, 44);
    const dots = '.'.repeat(Math.floor(t * 3) % 4);
    const m = metrics('мозг загружается...');
    ctx.fillStyle = C.brown; ctx.fillText('мозг загружается' + dots, W / 2 - m.w / 2, y - 62);
  } else {
    ctx.save(); ctx.translate(W / 2, y - 76); ctx.scale(dp, dp); font(900, 52); label('мозг: готов!', 0, 0, { fill: C.brown }); ctx.restore();
  }
  roundRect(x, y - 22, w, 48, 24); ctx.fillStyle = '#F2DFC6'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.brown; ctx.stroke();
  if (p > 0) { ctx.save(); roundRect(x, y - 22, w, 48, 24); ctx.clip(); ctx.fillStyle = C.yellow; ctx.fillRect(x, y - 22, w * p, 48);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; for (let k = -2; k < 30; k++) { const sx = x + k * 40 + (t * 60) % 40; ctx.beginPath(); ctx.moveTo(sx, y + 26); ctx.lineTo(sx + 20, y + 26); ctx.lineTo(sx + 44, y - 22); ctx.lineTo(sx + 24, y - 22); ctx.fill(); }
    ctx.restore(); roundRect(x, y - 22, w, 48, 24); ctx.lineWidth = 6; ctx.strokeStyle = C.brown; ctx.stroke(); }
  font(800, 28); label(`${Math.round(p * 100)}%`, W / 2, y + 2, { fill: C.brown });
  ctx.restore();
}
function sceneMug(t) {
  background(); polka(t, 0.35, 3);
  const L = level23(t);
  const pouring = t >= POUR.start && t < POUR.end + 0.3;
  const amp = 3 + 8 * ss(5.6, 5.8, t) * (1 - ss(7.1, 7.3, t)) + 9 * Math.exp(-Math.max(0, t - 7.2) / 0.25) * (t > 7.2 ? Math.sin((t - 7.2) * 18) : 0);
  // face
  const open = t < 5.85 ? 0 : eOutBack(prog(t, 5.85, 7.25), 1.2);
  const pop = eOutBack(prog(t, 7.25, 7.45), 3);
  const breath = 0.5 + 0.5 * Math.sin(t * 2.6);
  const face = { ...FACE0, open: Math.min(open, 1.05), sparkle: pop, lx: -0.35 * ss(5.4, 5.9, t) * (1 - ss(7.1, 7.3, t)), ly: -0.85 * ss(5.4, 5.9, t) * (1 - ss(7.1, 7.3, t)),
    snore: 1 - ss(5.5, 5.8, t), breath, smile: ss(5.75, 6.0, t) * (1 - ss(7.22, 7.32, t)), grin: 0.85 * ss(7.25, 7.4, t), blush: 0.9 * ss(7.25, 7.5, t) };
  // body squash: breathing while asleep, little jump of joy at 100%
  const jump = t > 7.25 ? Math.sin(Math.PI * prog(t, 7.25, 7.5)) : 0;
  const sq = 0.018 * breath * face.snore + 0.06 * Math.sin(Math.PI * prog(t, 7.22, 7.3));
  const pot = potState(t);
  // stream in mug-local coords
  let stream = null;
  if (pouring) {
    const c = Math.cos(pot.rot), s = Math.sin(pot.rot);
    const sxw = pot.x + SPOUT[0] * c - SPOUT[1] * s, syw = pot.y + SPOUT[0] * s + SPOUT[1] * c;
    stream = { from: [sxw - MUG.x, syw - MUG.y], head: ss(POUR.start, POUR.start + 0.2, t), tail: ss(POUR.end, POUR.end + 0.18, t) };
  }
  // the mug
  ctx.save(); ctx.translate(MUG.x, MUG.y - 60 * jump); ctx.scale(1 + sq, 1 - sq);
  drawMug({ level: L, foam: 0, amp, face, t, stream });
  ctx.restore();
  // splash droplets
  const r = mulberry(77);
  for (let k = 0; k < 90; k++) {
    const ts = 5.64 + k * 0.018, vx = (r() - 0.5) * 520, vy = -(250 + r() * 380), size = 4 + r() * 6;
    if (ts > POUR.end + 0.1) break;
    const a = t - ts; if (a < 0 || a > 0.42) continue;
    const x = MUG.x + 118 + vx * a, y = MUG.y + levelY(level23(ts)) + vy * a + 0.5 * 2400 * a * a;
    if (y > MUG.y + levelY(level23(t)) + 4) continue;
    ctx.beginPath(); ctx.arc(x, y, size * (1 - a * 1.2), 0, 7); ctx.fillStyle = '#6A3C23'; ctx.fill();
  }
  // zzz
  for (let k = 0; k < 6; k++) {
    const ts = 2.55 + k * 0.5, a = t - ts; if (a < 0 || a > 1.7 || ts > 5.3) continue;
    const al = ss(0, 0.2, a) * (1 - ss(1.2, 1.7, a)) * (1 - ss(5.0, 5.35, t));
    ctx.save(); ctx.globalAlpha = al;
    ctx.translate(MUG.x + 170 + 90 * a + 16 * Math.sin(a * 5), MUG.y + TOPY - 30 - 230 * a); ctx.rotate(-0.25 + 0.15 * Math.sin(a * 3));
    font(700, 70 + (k % 3) * 22, 'Cav'); label(k % 2 ? 'Z' : 'z', 0, 0, { fill: C.brown, stroke: C.cream, lw: 10 });
    ctx.restore();
  }
  // steam once the coffee is in
  steam(MUG.x, MUG.y + TOPY - 24, t, ss(6.6, 7.4, t));
  // pot
  if (t >= 4.95) { ctx.save(); ctx.translate(pot.x, pot.y); ctx.rotate(pot.rot); drawPot(); ctx.restore(); }
  // sparkles at 100%
  if (t > 7.25) {
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * Math.PI * 2 + 0.3, p = eOutCubic(prog(t, 7.25, 7.55));
      sparkle(MUG.x + Math.cos(a) * (230 + 120 * p), MUG.y - 220 + Math.sin(a) * (230 + 120 * p) * 0.9, 26 * Math.sin(Math.PI * prog(t, 7.25, 7.6)), 1, k % 2 ? C.yellow : '#fff', a);
    }
  }
  // loading bar
  const p = lerp(0.03, 1, eInOutCubic(prog(t, 5.62, 7.3)));
  loadingBar(t, p, ss(2.55, 2.9, t), t >= 7.3);
}

// =====================================================================
// SCENE 4 — LATTE ART (7.5–10 s), top view
// =====================================================================
const HEART = (() => {
  const pts = [];
  for (let i = 0; i < 240; i++) {
    const th = i / 240 * Math.PI * 2;
    pts.push([16 * Math.pow(Math.sin(th), 3), -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))]);
  }
  let y0 = 1e9, y1 = -1e9; for (const p of pts) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  const cy = (y0 + y1) / 2; return pts.map(([x, y]) => [x / 16, (y - cy) / 16]);
})();
function milkShape(R, k, scale = 1) {
  ctx.beginPath();
  HEART.forEach(([hx, hy], i) => {
    const th = i / 240 * Math.PI * 2;
    const x = lerp(Math.sin(th) * R, hx * R * 1.32, k) * scale, y = lerp(-Math.cos(th) * R, hy * R * 1.32 + 6, k) * scale;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.closePath();
}
function sceneLatte(t) {
  background('#FBEBD6');
  // checked tablecloth hint
  ctx.fillStyle = 'rgba(232,200,160,0.35)';
  for (let x = 0; x < W; x += 120) for (let y = 0; y < H; y += 120) if (((x + y) / 120) % 2 === 0) ctx.fillRect(x, y, 120, 120);
  const cx = W / 2, cy = 880;
  const zin = eOutCubic(prog(t, 7.5, 7.95));
  const zout = eInCubic(prog(t, 9.8, 9.95));
  const sc = lerp(0.72, 1, zin) * lerp(1, 0.55, zout), rot = -0.1 + 0.08 * (t - 7.5) + 0.9 * zout;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc);
  ctx.save(); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(59,36,22,0.14)'; ctx.beginPath(); ctx.arc(22, 30, 445, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0, 440, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 385, 0, 7); ctx.lineWidth = 4; ctx.strokeStyle = '#EADBC6'; ctx.stroke();
  // handle
  roundRect(320, -42, 190, 84, 42); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 345, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, 322, 0, 7); ctx.fillStyle = '#F3EADF'; ctx.fill();
  ctx.restore();
  // coffee disc (unrotated so the art stays upright)
  ctx.beginPath(); ctx.arc(0, 0, 306, 0, 7);
  const g = ctx.createRadialGradient(-40, -50, 20, 0, 0, 306);
  g.addColorStop(0, '#C98A52'); g.addColorStop(0.55, '#9A5A33'); g.addColorStop(1, '#4E2C19');
  ctx.fillStyle = g; ctx.fill();
  ctx.save(); ctx.clip();
  // crema swirl
  ctx.strokeStyle = 'rgba(232,180,128,0.25)'; ctx.lineWidth = 5;
  for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(0, 0, 60 + k * 50, t * 0.5 + k, t * 0.5 + k + 1.8); ctx.stroke(); }
  // milk
  const R = 150 * eOutCubic(prog(t, 7.75, 8.75)) + 10 * ss(8.75, 9.2, t);
  const k = eOutBack(prog(t, 8.85, 9.3), 1.3);
  if (R > 0.5) {
    milkShape(R, k); ctx.fillStyle = '#FFF7EC'; ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(214,170,120,0.55)'; ctx.stroke();
    const rings = ss(8.0, 8.75, t);
    for (const f of [0.78, 0.58, 0.38]) { milkShape(R, k, f * (0.6 + 0.4 * rings)); ctx.lineWidth = 7; ctx.strokeStyle = `rgba(222,186,140,${0.75 * rings})`; ctx.stroke(); }
  }
  // impact ripple
  if (t > 7.75 && t < 8.85) {
    const rp = ((t - 7.75) * 1.6) % 1;
    ctx.beginPath(); ctx.arc(0, -10, 20 + 60 * rp, 0, 7); ctx.lineWidth = 4; ctx.strokeStyle = `rgba(255,255,255,${0.6 * (1 - rp)})`; ctx.stroke();
  }
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, 306, 0, 7); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(59,36,22,0.5)'; ctx.stroke();
  ctx.restore();
  // milk stream (screen space)
  const on = t >= 7.62 && t < 9.5;
  if (on) {
    const pullY = lerp(-R * 0.72, R * 1.15, eInOutCubic(prog(t, 8.85, 9.2)));
    const py = cy + (t < 8.85 ? -10 : pullY) * sc;
    const lift = eInCubic(prog(t, 9.2, 9.47)), head = eOutCubic(prog(t, 7.62, 7.75));
    const top = -50, bottom = lerp(top, py, head) - (py - top) * lift * 1.02;
    const wob = 5 * Math.sin(t * 23);
    if (bottom > top + 2) {
      roundRect(cx - 10 + wob, top, 20, bottom - top, 10); ctx.fillStyle = '#FFF9F0'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.brown; ctx.stroke();
      ctx.fillStyle = 'rgba(230,200,160,0.7)'; ctx.fillRect(cx + 1 + wob, top, 4, bottom - top - 10);
    }
  }
  // caption
  const rp = eInOutCubic(prog(t, 9.2, 9.6));
  if (rp > 0) {
    font(700, 150, 'Cav'); const m = metrics('идеально.');
    ctx.save(); ctx.beginPath(); ctx.rect(W / 2 - m.w / 2 - 20, 1300, (m.w + 40) * rp, 260); ctx.clip();
    ctx.globalAlpha = 1 - zout; label('идеально.', W / 2, 1420, { fill: C.brown });
    ctx.restore();
  }
}

// =====================================================================
// SCENE 5 — ENERGY (10–15 s)
// =====================================================================
const CHIPS = [
  [10.625, 380, 290, -0.06, '⚡ бодрость +100', '#FFFFFF'],
  [11.25, 700, 410, 0.05, '💡 идеи +50', '#FFD3C9'],
  [11.875, 390, 530, -0.04, '😄 настроение ↑', '#CDEFD9'],
  [12.5, 690, 650, 0.05, '🚀 планы +∞', C.yellow],
];
const HOP0 = 10.625, HOP1 = 14.375;
function hop(t) {
  if (t < HOP0 || t >= HOP1) return { y: 0, sq: 0 };
  const p = ((t - HOP0) / BEAT) % 1;
  return { y: -70 * 4 * p * (1 - p), sq: 0.1 * Math.exp(-p / 0.07) - 0.05 * Math.sin(Math.PI * p) + 0.06 * Math.exp(-(1 - p) / 0.05) };
}
function bean(x, y, r, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.72, 0, 0, 7); ctx.fillStyle = '#7A4526'; ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = C.brown; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r * 0.8, 0); ctx.bezierCurveTo(-r * 0.3, -r * 0.35, r * 0.3, r * 0.35, r * 0.8, 0);
  ctx.lineWidth = 3.5; ctx.strokeStyle = '#C58A5C'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.restore();
}
function chip(t, [t0, x, y, rot, text, fill], i) {
  if (t < t0) return;
  const p = prog(t, t0, t0 + 0.32), sc = eOutBack(p, 2.4);
  ctx.save(); ctx.translate(x, y + 7 * Math.sin(t * 2.2 + i * 1.7)); ctx.rotate(rot + (1 - sc) * 0.35 + 0.02 * Math.sin(t * 1.7 + i)); ctx.scale(sc, sc);
  font(800, 38); const m = metrics(text); const w = m.w + 64, h = 86;
  roundRect(-w / 2 + 7, -h / 2 + 9, w, h, 43); ctx.fillStyle = C.brown; ctx.fill();
  roundRect(-w / 2, -h / 2, w, h, 43); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = C.brown; ctx.stroke();
  label(text, 0, 0, { fill: C.brown });
  ctx.restore();
}
function sceneEnergy(t, base = { x: W / 2, y: 1290 }) {
  background(); polka(t, 0.35, 3);
  // sun
  const sp = eOutBack(prog(t, 9.95, 10.4), 1.6);
  if (sp > 0) {
    ctx.save(); ctx.translate(W / 2, 1000); ctx.rotate((t - 10) * 0.22);
    for (let k = 0; k < 14; k++) {
      ctx.save(); ctx.rotate(k / 14 * Math.PI * 2);
      roundRect(-22, -(400 + 40) * sp - 130 * sp, 44, 130 * sp, 22); ctx.fillStyle = C.ray; ctx.fill(); ctx.restore();
    }
    ctx.restore();
    ctx.beginPath(); ctx.arc(W / 2, 1000, 400 * sp, 0, 7); ctx.fillStyle = C.sun; ctx.fill();
    ctx.beginPath(); ctx.arc(W / 2, 1000, 330 * sp, 0, 7); ctx.fillStyle = '#FFDD7A'; ctx.fill();
  }
  // sparkles (twinkle)
  const r = mulberry(31);
  for (let i = 0; i < 9; i++) {
    const x = 90 + r() * 900, y = 260 + r() * 1150, ph = r() * 3, sz = 14 + r() * 16;
    if (Math.abs(x - W / 2) < 330 && y > 760) continue;
    const tw = Math.pow(Math.max(0, Math.sin((t * 1.6 + ph) * Math.PI)), 3) * ss(10.2, 10.6, t);
    sparkle(x, y, sz * tw, 1, i % 3 ? C.yellow : '#fff', ph);
  }
  // mug
  const pin = eOutBack(prog(t, 9.95, 10.22), 2.2), h = hop(t);
  const squat = 0.07 * Math.sin(Math.PI * prog(t, 14.38, 14.62));
  const face = { ...FACE0, open: 1, happy: 1 - ss(14.3, 14.45, t), sparkle: 1, blush: 0.9, grin: 0.95, wink: 0 };
  ctx.save(); ctx.translate(base.x, base.y + h.y); ctx.scale((1 + h.sq + squat) * pin, (1 - h.sq - squat) * pin);
  drawMug({ level: 0.8, foam: 1, amp: 3 + 4 * Math.abs(h.sq) * 10, face, t, stream: null });
  ctx.restore();
  steam(base.x, base.y + h.y + TOPY * pin - 30, t, ss(10.3, 10.6, t));
  // beans burst
  const rb = mulberry(91);
  for (let i = 0; i < 26; i++) {
    const vx = (rb() - 0.5) * 1500, vy = -(1100 + rb() * 900), sz = 22 + rb() * 14, sr = (rb() - 0.5) * 16, delay = rb() * 0.08;
    const a = t - 10.0 - delay; if (a <= 0) continue;
    const x = base.x + vx * a, y = base.y + TOPY + 40 + vy * a + 0.5 * 2800 * a * a;
    if (y > H + 80) continue;
    bean(x, y, sz, sr * a);
  }
  CHIPS.forEach((c, i) => chip(t, c, i));
  // title
  const title = 'ПОЕХАЛИ!';
  if (t >= 13.75) {
    font(900, 118); const chars = [...title], ws = chars.map(c => ctx.measureText(c).width), tw = ws.reduce((a, b) => a + b, 0);
    let x = W / 2 - tw / 2;
    chars.forEach((c, j) => {
      const p = prog(t, 13.75 + j * 0.045, 13.75 + j * 0.045 + 0.35), y = lerp(180, 0, eOutBack(p, 2.6));
      const wob = 6 * Math.sin(t * 9 + j) * ss(14.1, 14.3, t);
      ctx.save(); ctx.globalAlpha = clamp(p * 4); ctx.translate(x + ws[j] / 2, 1450 + y + wob);
      label(c, 0, 0, { fill: C.yellow, stroke: C.brown, lw: 14, shadow: C.brown, sx: 6, sy: 9 });
      ctx.restore(); x += ws[j];
    });
  }
}

// =====================================================================
// SCENE 6 — END CARD (15–20 s) after a coffee-wave wipe
// =====================================================================
function coffeeWave(t) {
  const p = eInOutCubic(prog(t, 14.55, 15.1));
  if (p <= 0) return;
  const y = lerp(H + 140, -260, p);
  ctx.save(); ctx.translate(W / 2, 0);
  ctx.beginPath(); for (let x = -W / 2 - 20; x <= W / 2 + 20; x += 10) { const yy = y - 40 + 36 * Math.sin(x * 0.012 + t * 9); x === -W / 2 - 20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
  ctx.lineTo(W, H + 400); ctx.lineTo(-W, H + 400); ctx.closePath(); ctx.fillStyle = C.crema; ctx.fill();
  ctx.beginPath(); for (let x = -W / 2 - 20; x <= W / 2 + 20; x += 10) { const yy = y + 36 * Math.sin(x * 0.012 + t * 9 + 0.6); x === -W / 2 - 20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
  ctx.lineTo(W, H + 400); ctx.lineTo(-W, H + 400); ctx.closePath(); ctx.fillStyle = C.end; ctx.fill();
  ctx.restore();
}
function sceneEnd(t) {
  background(C.end);
  const g = ctx.createRadialGradient(W / 2, 800, 50, W / 2, 800, 1100);
  g.addColorStop(0, 'rgba(120,72,40,0.55)'); g.addColorStop(1, 'rgba(74,42,24,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // drifting beans in the dark
  const r = mulberry(12);
  for (let i = 0; i < 10; i++) {
    const x = r() * W, y = ((r() * H - (t - 15) * (20 + r() * 25)) % H + H) % H, s = 16 + r() * 10;
    ctx.save(); ctx.globalAlpha = 0.18; bean(x, y, s, r() * 6 + (t - 15) * 0.3); ctx.restore();
  }
  // "Сначала —"
  font(800, 96);
  const words = ['Сначала', '—'], ws = words.map(w => ctx.measureText(w + ' ').width);
  let x = W / 2 - (ws[0] + ctx.measureText('—').width) / 2;
  words.forEach((w, j) => {
    const p = eOutCubic(prog(t, 15.0 + j * 0.12, 15.42 + j * 0.12));
    ctx.save(); ctx.globalAlpha = p; ctx.fillStyle = C.cream;
    const m = metrics(w); ctx.fillText(w, x, 570 + (m.asc - m.desc) / 2 + 70 * (1 - p)); ctx.restore();
    x += ws[j];
  });
  // "кофе."
  font(900, 236);
  const word = 'кофе.', chars = [...word], cw = chars.map(c => ctx.measureText(c).width), tw = cw.reduce((a, b) => a + b, 0);
  let cx = W / 2 - tw / 2;
  const jelly = Math.exp(-Math.max(0, t - 15.72) / 0.35) * Math.sin(Math.max(0, t - 15.72) * 22) * ss(15.67, 15.73, t);
  chars.forEach((c, j) => {
    const p = prog(t, 15.25 + j * 0.065, 15.25 + j * 0.065 + 0.42), sc = eOutBack(p, 2.6);
    if (p <= 0) { cx += cw[j]; return; }
    ctx.save(); ctx.translate(cx + cw[j] / 2, 800); ctx.scale(sc * (1 + 0.07 * jelly), sc * (1 - 0.07 * jelly)); ctx.rotate((1 - sc) * 0.4 * (j % 2 ? 1 : -1));
    label(c, 0, 0, { fill: C.yellow, stroke: C.brown, lw: 16, shadow: '#24130A', sx: 9, sy: 13 });
    ctx.restore(); cx += cw[j];
  });
  // handwritten line + underline
  const rp = eInOutCubic(prog(t, 16.1, 17.0));
  if (rp > 0) {
    font(700, 92, 'Cav'); const m = metrics('а потом — всё остальное');
    ctx.save(); ctx.beginPath(); ctx.rect(W / 2 - m.w / 2 - 10, 880, (m.w + 20) * rp, 150); ctx.clip();
    label('а потом — всё остальное', W / 2, 960, { fill: C.cream });
    ctx.restore();
    const up = eOutCubic(prog(t, 16.95, 17.4));
    if (up > 0) {
      ctx.beginPath();
      for (let i = 0; i <= 60 * up; i++) { const u = i / 60, xx = W / 2 - m.w / 2 + u * m.w, yy = 1022 + 7 * Math.sin(u * 14); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.strokeStyle = C.yellow; ctx.stroke();
    }
  }
  // mascot pops up and winks
  const mp = eOutBack(prog(t, 15.8, 16.4), 1.6);
  const wink = ss(18.0, 18.08, t) * (1 - ss(18.42, 18.5, t));
  const blink = t > 19.2 && t < 19.32 ? 1 : 0;
  const face = { ...FACE0, open: blink ? 0.05 : 1, sparkle: 1, blush: 0.9, grin: 0.6 + 0.3 * wink, wink, lx: 0.2 * Math.sin(t), ly: -0.2 };
  const bob = 8 * Math.sin((t - 15) * 2.6);
  const ms = 0.6;
  ctx.save(); ctx.translate(W / 2, lerp(H + 360, 1440, mp) + bob * mp); ctx.scale(ms, ms);
  ctx.rotate(0.05 * wink);
  drawMug({ level: 0.8, foam: 1, amp: 3, face, t, stream: null });
  ctx.restore();
  // steam -> heart
  const hy = 1440 + TOPY * ms - 105 + bob;
  steam(W / 2, 1440 + TOPY * ms - 16 + bob, t, 0.8 * ss(16.3, 16.8, t), 36, 120, 7, '255,236,214');
  const hp = eInOutCubic(prog(t, 17.3, 18.0));
  if (hp > 0) {
    ctx.save(); ctx.translate(W / 2 - 24, hy - 8 * (t - 17.3)); const s = 50 * (1 + 0.04 * Math.sin(t * 5));
    ctx.beginPath(); const n = Math.floor(HEART.length * hp);
    for (let i = 0; i <= n; i++) { const [hx, hy2] = HEART[(i + 120) % HEART.length]; i ? ctx.lineTo(hx * s, hy2 * s) : ctx.moveTo(hx * s, hy2 * s); }
    ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = `rgba(255,236,214,${0.9 * (1 - ss(19.3, 20, t) * 0.5)})`; ctx.stroke();
    ctx.restore();
  }
  // twinkles around the word
  for (let k = 0; k < 4; k++) {
    const pos = [[150, 690], [935, 660], [170, 900], [915, 880]][k];
    const tw = Math.pow(Math.max(0, Math.sin((t * 1.4 + k * 0.7) * Math.PI)), 3) * ss(16, 16.4, t);
    sparkle(pos[0], pos[1], 26 * tw, 1, C.yellow, k);
  }
}

// =====================================================================
// FRAME ENTRY + TRANSITIONS
// =====================================================================
function drawScene(t) {
  ctx.setTransform(S, 0, 0, S, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  if (t < 2.3) { sceneAlarm(t); }
  else if (t < 2.7) { // vertical pan from the clock down to the mug
    const e = eInOutCubic(prog(t, 2.3, 2.7));
    ctx.save(); ctx.translate(0, -H * e); sceneAlarm(t); ctx.restore();
    ctx.save(); ctx.translate(0, H * (1 - e)); sceneMug(t); ctx.restore();
  }
  else if (t < 7.5) {
    const z = eInCubic(prog(t, 7.36, 7.5));
    if (z > 0) { ctx.save(); ctx.translate(MUG.x, MUG.y + TOPY + 60); ctx.scale(1 + 2.6 * z, 1 + 2.6 * z); ctx.translate(-MUG.x, -(MUG.y + TOPY + 60)); }
    sceneMug(t);
    if (z > 0) ctx.restore();
  }
  else if (t < 9.95) sceneLatte(t);
  else if (t < 15.1) { sceneEnergy(t); coffeeWave(t); }
  else sceneEnd(t);
}
let grain = [];
function buildGrain() {
  for (let k = 0; k < 4; k++) {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    const im = g.createImageData(256, 256), r = mulberry(1000 + k);
    for (let i = 0; i < 256 * 256; i++) { const v = r() * 255 | 0; im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    g.putImageData(im, 0, 0); grain.push(c);
  }
}
function finish(c2, t) { // grain + gentle vignette, applied once per output frame
  c2.save(); c2.setTransform(1, 0, 0, 1, 0, 0);
  const vg = c2.createRadialGradient(out.width / 2, out.height / 2, out.height * 0.3, out.width / 2, out.height / 2, out.height * 0.75);
  vg.addColorStop(0, 'rgba(59,36,22,0)'); vg.addColorStop(1, `rgba(59,36,22,${t >= 15 ? 0.32 : 0.1})`);
  c2.fillStyle = vg; c2.fillRect(0, 0, out.width, out.height);
  c2.globalCompositeOperation = 'overlay'; c2.globalAlpha = 0.06;
  const fr = Math.round(t * FPS), pat = c2.createPattern(grain[fr % 4], 'repeat');
  c2.translate((rnd(fr) * 256) | 0, (rnd(fr + 5000) * 256) | 0);
  c2.fillStyle = pat; c2.fillRect(-256, -256, out.width + 512, out.height + 512);
  c2.restore();
}
// motion blur: running average of `mb` sub-frames across a 180° shutter
function frame(t, mb = 1) {
  if (mb <= 1) { drawScene(t); finish(ctx, t); return out; }
  for (let i = 0; i < mb; i++) {
    const ts = Math.max(0, t + ((i + 0.5) / mb - 0.5) * (0.5 / FPS));
    drawScene(ts);
    actx.setTransform(1, 0, 0, 1, 0, 0); actx.globalAlpha = 1 / (i + 1); actx.drawImage(out, 0, 0);
  }
  actx.globalAlpha = 1; finish(actx, t); return acc;
}
window.renderFrame = (t, q = 0.95, mb = 1) => frame(t, mb).toDataURL('image/jpeg', q);
window.renderSheet = (times, cols, mb = 1) => {
  const cw = out.width, ch = out.height, lab = 22;
  const rows = Math.ceil(times.length / cols);
  const sheet = document.createElement('canvas'); sheet.width = cols * (cw + 6) + 6; sheet.height = rows * (ch + lab + 6) + 6;
  const g = sheet.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, sheet.width, sheet.height);
  times.forEach((t, i) => {
    const src = frame(t, mb);
    const x = 6 + (i % cols) * (cw + 6), y = 6 + Math.floor(i / cols) * (ch + lab + 6);
    g.drawImage(src, x, y); g.fillStyle = '#eee'; g.font = '15px monospace'; g.fillText(`${t.toFixed(2)}s`, x + 4, y + ch + 17);
  });
  return sheet.toDataURL('image/jpeg', 0.88);
};
window.DURATION = DUR;
(async () => {
  try { await loadFonts(); buildGrain(); drawScene(0); window.ready = true; }
  catch (e) { window.initError = String(e && e.stack || e); }
})();
