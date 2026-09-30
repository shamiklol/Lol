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

// ---------------------------------------------------------------- Ecosystem
const ECO = [
  ['Promptni sinash', 'prompt', ['Claude Console', 'OpenAI Playground', 'Google AI Studio']],
  ['Agent SDK va freymvorklar', 'model', ['Claude Agent SDK', 'OpenAI Agents SDK', 'Google ADK', 'LangGraph', 'CrewAI', 'Microsoft Agent Framework', 'Mastra']],
  ['No-code avtomatlashtirish', 'tool', ['n8n', 'Make', 'Zapier', 'Dify', 'Flowise', 'Langflow']],
  ['Kodlash agentlari', 'data', ['Claude Code', 'Cursor', 'OpenAI Codex', 'GitHub Copilot']],
  ['Protokol va standartlar', 'tool', ['MCP', 'A2A', 'Agent Skills (SKILL.md)', 'AGENTS.md']],
  ['Monitoring va test', 'prompt', ['Langfuse', 'LangSmith', 'Braintrust', 'Promptfoo', 'Arize Phoenix']],
];
const ecosystem = {
  id: 'ecosystem',
  act: 3,
  station: 4,
  title: 'Asboblar xaritasi 2026',
  time: 60,
  gl: 'calm',
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--data)">Amaliyot</div>
    <h2 class="h1 kinetic">Asboblar xaritasi <span class="ink">2026</span></h2>
  </header>
  <div class="eco">
    <svg class="eco-lines" viewBox="0 0 1664 620" aria-hidden="true">
      ${[
        [270, 150],
        [832, 90],
        [1394, 150],
        [270, 470],
        [832, 530],
        [1394, 470],
      ]
        .map(([x, y]) => `<path d="M832 310 L${x} ${y}"/>`)
        .join('')}
    </svg>
    <div class="eco-hub"><b>agent</b><span class="mono">sizning tizimingiz</span></div>
    ${ECO.map(
      ([t, c, items], i) => `
      <div class="eco-card panel eco-${i}" style="--c:var(--${c})" data-in="${2 + i * 0.4}" data-anim="scale">
        <h3>${t}</h3>
        <div class="eco-items">${items.map((x) => `<span>${x}</span>`).join('')}</div>
      </div>`,
    ).join('')}
  </div>
  <div class="eco-start panel" data-step="1" data-anim="up">
    <b>Boshlash uchun:</b> Claude Console’da prompt → n8n yoki Agent SDK’da chain → MCP bilan tool’lar → Langfuse bilan monitoring
  </div>`,
  enter(el) {
    const tl = gsap.timeline();
    tl.fromTo(el.querySelectorAll('.eco-lines path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, stagger: 0.1, ease: 'power2.inOut' }, 0.4);
    tl.fromTo(el.querySelector('.eco-hub'), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'back.out(2)' }, 0.2);
    return tl;
  },
  notes: NOTES.ecosystem,
};

// ---------------------------------------------------------------- Bonus skills
const SKILLS = [
  ['maktab-prompt', 'Oddiy soʻrovni MAKTAB boʻyicha kuchli promptga aylantiradi'],
  ['prompt-doctor', 'Promptdagi xatolarni topadi, sababini aytadi va tuzatadi'],
  ['prompt-evals', 'Test toʻplami, baholash jadvali va LLM-hakam promptini yozadi'],
  ['few-shot-studio', 'Xilma-xil va nostandart misollar toʻplamini tuzadi'],
  ['structured-output', 'JSON sxema va unga qatʼiy mos javob beruvchi prompt'],
  ['prompt-chain-architect', 'Vazifani qadamlarga boʻladi va har qadamga tekshiruv qoʻyadi'],
  ['tool-contract-writer', 'Agent tool’lari uchun nom, tavsif va sxema yozadi'],
  ['agent-system-prompt', 'Agent tizim prompti: rol, qoidalar, toʻxtash shartlari'],
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
    <h2 class="h1 kinetic"><span class="ink-warm">8 ta skill</span> — prompt engineering uchun</h2>
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
      <p class="small bn-where">Claude.ai, Claude Code va Agent SDK’da ishlaydi. SKILL.md — ochiq standart: boshqa agentlar ham tushunadi.</p>
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
        <li data-in="1"><b>Prompt — dastur.</b> MAKTAB bilan yozing, test bilan oʻlchang.</li>
        <li data-in="2"><b>Tool — modelning qoʻli.</b> Tavsif ham prompt.</li>
        <li data-in="3"><b>Oddiydan boshlang:</b> prompt → chain → workflow → agent.</li>
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

export default [ecosystem, bonus, meta, final];
