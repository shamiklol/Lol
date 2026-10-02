import qrcode from 'qrcode-generator';
import { gsap } from '../core/fx.js';
import { store } from '../core/store.js';
import { CONFIG } from '../config.js';
import { NOTES } from '../content/notes.js';
import { BUILD } from '../content/buildStats.js';

const qrUrl = () => store.get('qrUrl', '') || CONFIG.qrUrl;

function qrBlock(label) {
  const url = qrUrl();
  if (!url) {
    return `<div class="qr qr--empty"><div class="qr-frame"><span class="mono">QR</span><em>tez orada</em></div><p class="small">${label}</p></div>`;
  }
  const q = qrcode(0, 'M');
  q.addData(url);
  q.make();
  const n = q.getModuleCount();
  let rects = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) rects += `<rect x="${c}" y="${r}" width="1.02" height="1.02"/>`;
  return `<div class="qr"><svg viewBox="-2 -2 ${n + 4} ${n + 4}" class="qr-svg" role="img" aria-label="QR: ${url}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/>${rects}</svg><p class="small">${label}</p></div>`;
}

// ---------------------------------------------------------------- Bonus skills
const SKILLS = [
  ['maktab-prompt', 'Oddiy soʻrovingizni MAKTAB boʻyicha kuchli promptga aylantiradi'],
  ['prompt-doctor', 'Ishlamayotgan promptning sababini topadi va tuzatadi'],
  ['prompt-evals', 'Promptni koʻp misolda sinab, qayerda adashishini koʻrsatadi'],
  ['few-shot-studio', 'Prompt uchun yaxshi va har xil misollar tayyorlaydi'],
  ['structured-output', 'Javobni aniq shaklda — jadval yoki roʻyxat qilib oladi'],
  ['prompt-chain-architect', 'Katta ishni qadamlarga boʻlib beradi'],
  ['tool-contract-writer', 'Agent tool’lari uchun tushunarli yoʻriqnoma yozadi'],
  ['agent-system-prompt', 'Agentga yoʻriqnoma yozadi: roli, qoidalari, qachon toʻxtashi'],
];
const bonus = {
  id: 'bonus',
  act: 3,
  station: 4,
  title: 'Bonus: 8 ta skill',
  time: 70,
  gl: 'calm',
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Bonus · sizga sovgʻa</div>
    <h2 class="h1 kinetic"><span class="ink-warm">8 ta skill</span> — prompt yozish uchun</h2>
  </header>
  <div class="bn-wrap">
    <div class="bn-grid">
      ${SKILLS.map(
        ([n, d], i) => `
        <div class="bn-card panel" data-in="${2 + i * 0.25}" data-anim="up">
          <div class="bn-top"><span class="mono">${n}</span><i class="bn-check">✓</i></div>
          <p>${d}</p>
          <div class="bn-bar"><i></i></div>
        </div>`,
      ).join('')}
    </div>
    <aside class="bn-side" data-in="5" data-anim="right">
      <div class="bn-qr" data-qr></div>
      <p class="small bn-where">Claude’ga bir marta qoʻshasiz — kerak boʻlganda oʻzi ishlatadi. Telefonga ilova oʻrnatgandek.</p>
      <div class="bn-repos" data-repos></div>
    </aside>
  </div>`,
  setup(el) {
    const render = () => {
      el.querySelector('[data-qr]').innerHTML = qrBlock(CONFIG.qrLabel);
      const repos = CONFIG.repos || [];
      el.querySelector('[data-repos]').innerHTML = repos.length
        ? `<p class="mono small">Agent repozitoriylari</p>${repos.map((r) => `<a href="${r.url}" target="_blank" rel="noopener">${r.name}<span>${r.note || ''}</span></a>`).join('')}`
        : '';
    };
    render();
    addEventListener('deck:settings', render);
  },
  enter(el, ctx, info) {
    const bars = el.querySelectorAll('.bn-bar i');
    const checks = el.querySelectorAll('.bn-check');
    if (info.instant) {
      gsap.set(bars, { scaleX: 1 });
      gsap.set(checks, { autoAlpha: 1, scale: 1 });
      return null;
    }
    const tl = gsap.timeline();
    gsap.set(bars, { scaleX: 0, transformOrigin: '0 50%' });
    gsap.set(checks, { autoAlpha: 0, scale: 0.4 });
    bars.forEach((b, i) => {
      const at = 0.8 + i * 0.28;
      tl.to(b, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, at);
      tl.to(checks[i], { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' }, at + 0.85);
      tl.call(() => ctx.sound?.play('tick'), null, at + 0.85);
    });
    return tl;
  },
  notes: NOTES.bonus,
};

// ---------------------------------------------------------------- Meta finale
const meta = {
  id: 'meta',
  act: 3,
  station: 4,
  title: 'Bu taqdimotni kim yigʻdi?',
  time: 90,
  gl: 'dim',
  html: `
  <div class="mt-q" data-step-out="1">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--model)">Oxirgi misol</div>
    <h2 class="h-xl kinetic">Bir savol: bu taqdimotni <span class="ink">kim yigʻdi?</span></h2>
  </div>
  <div class="mt-a" data-step="1" data-anim="fade">
    <header class="head">
      <div class="eyebrow" style="--accent:var(--data)">Javob</div>
      <h2 class="h1">Uni <span class="ink-warm">AI agent</span> yigʻdi. Men vazifa qoʻydim, yoʻnaltirdim va tekshirdim.</h2>
    </header>
    <div class="mt-chain">
      ${BUILD.phases
        .map(
          ([t, tool, d], i) => `
        <div class="mt-step" data-step="2" data-delay="${(i * 0.12).toFixed(2)}" data-anim="up">
          <span class="mono">${String(i + 1).padStart(2, '0')}</span>
          <b>${t}</b>
          <code>${tool}</code>
          <em>${d}</em>
        </div>`,
        )
        .join('')}
    </div>
    <div class="mt-stats" data-step="2" data-delay="0.9">
      ${BUILD.stats.map(([v, l]) => `<div><b class="tabular">${v}</b><span>${l}</span></div>`).join('')}
    </div>
  </div>
  <p class="mt-punch" data-step="3">Bugungi hamma gʻoya — <b class="hl-prompt">prompt logikasi</b>, <b class="hl-tool">tool&nbsp;chaining</b>, <b class="hl-data">sikl</b> — shu taqdimot ichida ishladi.</p>`,
  notes: NOTES.meta,
};

// ---------------------------------------------------------------- Final
const final = {
  id: 'final',
  act: 3,
  station: 4,
  title: 'Yakun va savollar',
  time: 60,
  gl: 'title',
  hideHud: true,
  html: `
  <div class="fn-wrap">
    <div class="fn-left">
      <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Yakun · 3 ta asosiy fikr</div>
      <ol class="fn-list">
        <li data-in="1"><b>Prompt — stajyorga vazifa.</b> MAKTAB bilan yozing.</li>
        <li data-in="2"><b>Tool — modelning qoʻli.</b> Agent — ularni oʻzi ishlatadigan yordamchi.</li>
        <li data-in="3"><b>Oddiydan boshlang:</b> prompt → chain → agent.</li>
      </ol>
      <h2 class="fn-q swarm-src ink">Savollar?</h2>
    </div>
    <div class="fn-right" data-in="4" data-anim="right">
      <div data-qr></div>
      <div class="fn-who">
        <b>${CONFIG.speaker}</b>
        <span class="mono">${CONFIG.brand}</span>
      </div>
    </div>
  </div>`,
  setup(el) {
    const render = () => (el.querySelector('[data-qr]').innerHTML = qrBlock('Materiallar va skill-paket'));
    render();
    addEventListener('deck:settings', render);
    this.q = el.querySelector('.fn-q');
  },
  enter(el, ctx, info) {
    const gl = ctx.gl;
    if (!gl || info.instant) {
      gsap.set(this.q, { autoAlpha: 1 });
      return null;
    }
    gsap.set(this.q, { autoAlpha: 0 });
    requestAnimationFrame(() => {
      gl.swarm.sampleFrom([this.q], ctx.stage, gl.k, { step: 3, max: gl.lite ? 3000 : 6500, colors: ['#ffb547', '#a07dff', '#3fe0ff'] });
      gl.swarm.show();
      const u = gl.swarm.uniforms;
      u.uT.value = 0;
      u.uOut.value = 0;
      gsap.timeline({ delay: 0.6 })
        .to(u.uT, { value: 1.6, duration: 2.6, ease: 'power2.inOut' })
        .to(this.q, { autoAlpha: 1, duration: 0.8 }, 1.9)
        .to(u.uOut, { value: 1, duration: 1.2, ease: 'power2.in' }, 2.3);
    });
    return null;
  },
  leave(el, ctx) {
    ctx.gl?.swarm.hide();
  },
  notes: NOTES.final,
};

export default [bonus, meta, final];
