import { gsap, kineticIn } from '../core/fx.js';
import { sunMark } from '../core/hud.js';
import { codeLines } from '../core/code.js';
import { CONFIG } from '../config.js';
import { NOTES } from '../content/notes.js';
import { errText } from '../core/live.js';

// ---------------------------------------------------------------- 1 · Title
const title = {
  id: 'title',
  act: 0,
  station: 0,
  title: 'Titul',
  time: 55,
  gl: 'title',
  hideHud: true,
  html: `
  <div class="t-wrap">
    <div class="eyebrow" data-in="0" style="--accent:var(--tool)">${CONFIG.brand} · Maʼruza · 2026</div>
    <h1 class="t-title">
      <span class="t-line swarm-src ink">Prompt Logic</span>
      <span class="t-line swarm-src ink">&amp; AI Agent</span>
      <span class="t-line swarm-src ink">Tool Chaining</span>
    </h1>
    <p class="t-sub" data-in="2">Promptdan agentgacha: logika, tool’lar va chain’lar</p>
    <div class="t-speaker" data-in="3">
      ${sunMark('t-sun')}
      <div><b>${CONFIG.speaker}</b><span>${CONFIG.brand}</span></div>
    </div>
    <div class="t-hint" data-in="4"><span class="kbd">Space</span> boshlash</div>
  </div>`,
  setup(el) {
    this.lines = [...el.querySelectorAll('.t-line')];
  },
  enter(el, ctx, info) {
    const gl = ctx.gl;
    const lines = this.lines;
    const tl = gsap.timeline();
    if (!gl || info.instant) {
      gsap.set(lines, { autoAlpha: 1, y: 0 });
      return tl;
    }
    gsap.set(lines, { autoAlpha: 0 });
    // particles need the final layout, so sample on the next frame
    requestAnimationFrame(() => {
      gl.swarm.sampleFrom(lines, ctx.stage, gl.k, { step: 3, max: gl.lite ? 4000 : 9000 });
      gl.swarm.show();
      const u = gl.swarm.uniforms;
      u.uT.value = 0;
      u.uOut.value = 0;
      gsap.timeline()
        .to(u.uT, { value: 1.6, duration: 3.0, ease: 'power2.inOut' })
        .to(lines, { autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out' }, 2.1)
        .to(u.uOut, { value: 1, duration: 1.4, ease: 'power2.in' }, 2.5);
    });
    return tl;
  },
  leave(el, ctx) {
    ctx.gl?.swarm.hide();
  },
  notes: NOTES.title,
};

// ---------------------------------------------------------------- 2 · Hook
const PROMPT_A = 'Kofexona uchun marketing strategiya yozib ber.';
const PROMPT_B = `<maqsad>Toshkentdagi yangi kofexona uchun 4 haftalik Instagram reja.</maqsad>
<kontekst>Byudjet: 5 mln soʻm. Auditoriya: 18–25 yoshli talabalar.
Yaqinida 3 ta universitet bor.</kontekst>
<shartlar>Agar gʻoya byudjetdan oshsa — arzonroq variant taklif qil.</shartlar>
<format>Jadval: hafta | gʻoya | format | KPI. Oxirida umumiy xarajat.</format>`;

const ANSWER_A = `Kofexona uchun marketing strategiyasi:
1. Maqsadli auditoriyani aniqlang.
2. Ijtimoiy tarmoqlarda faol boʻling.
3. Sifatli kontent yarating.
4. Aksiya va chegirmalar oʻtkazing.
5. Mijozlar fikrini tinglang.`;

const ANSWER_B_ROWS = [
  ['1', '«Imtihon kechasi»: 22:00 dan keyin talabalarga −20%', 'Reels', '15 000 koʻrish'],
  ['2', 'Fakultetlar kofe bellashuvi: talabalar ovoz beradi', 'Soʻrovnoma', '400 ovoz'],
  ['3', '«Bir stakan — bir kitob»: kitob almashish burchagi', 'Karusel', '120 saqlash'],
  ['4', 'Talaba-barista kuni: mehmon oʻzi kofe damlaydi', 'Jonli efir', '60 tashrif'],
];

const hook = {
  id: 'hook',
  act: 0,
  station: 0,
  title: 'Bir xil model, ikki xil prompt',
  time: 115,
  gl: 'dim',
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>Tajriba</div>
    <h2 class="h1 kinetic" style="max-width:1300px">Bir xil model. <span class="ink">Ikki xil prompt.</span></h2>
  </header>
  <div class="hook-grid">
    <article class="panel hook-card hook-a" data-in="2" data-anim="left">
      <div class="hook-top"><span class="chip" data-c="danger">A · oddiy prompt</span><span class="hook-model mono">Claude</span></div>
      <pre class="code hook-prompt">${codeLines(PROMPT_A, 'prompt')}</pre>
      <div class="hook-arrow" aria-hidden="true"></div>
      <div class="hook-out" data-out="a"><div class="hook-typed mono" data-typed="a"></div></div>
      <div class="hook-tags" data-step="1">
        <span class="chip">umumiy</span><span class="chip">oʻlchab boʻlmaydi</span><span class="chip">hamma uchun — hech kim uchun</span>
      </div>
    </article>
    <article class="panel hook-card hook-b" data-in="3" data-anim="right">
      <div class="hook-top"><span class="chip" data-c="prompt">B · logikali prompt</span><span class="hook-model mono">Claude</span></div>
      <pre class="code hook-prompt">${codeLines(PROMPT_B, 'prompt')}</pre>
      <div class="hook-arrow" aria-hidden="true"></div>
      <div class="hook-out" data-out="b">
        <table class="hook-table" data-table>
          <thead><tr><th>Hafta</th><th>Gʻoya</th><th>Format</th><th>KPI</th></tr></thead>
          <tbody>${ANSWER_B_ROWS.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
        <div class="hook-total mono" data-total>Umumiy xarajat: 4,6 mln soʻm ✓ byudjet ichida</div>
        <div class="hook-typed mono" data-typed="b" hidden></div>
      </div>
      <div class="hook-tags" data-step="2">
        <span class="chip" data-c="data">aniq</span><span class="chip" data-c="data">oʻlchanadi</span><span class="chip" data-c="data">bajarsa boʻladi</span>
      </div>
    </article>
  </div>
  <div class="hook-punch" data-step="3" data-anim="scale">
    <span>Model bir xil edi.</span><b class="ink">Logika boshqa edi.</b>
  </div>
  <div class="live-bar" data-in="5">
    <button class="btn" data-live><span class="dot" style="color:var(--data)"></span>Jonli sinash</button>
    <span class="live-note small" data-live-note>Ikkala prompt Claude’ga bir vaqtda ketadi</span>
  </div>`,
  setup(el, ctx) {
    const typedA = el.querySelector('[data-typed="a"]');
    const table = el.querySelector('[data-table]');
    const total = el.querySelector('[data-total]');
    const typedB = el.querySelector('[data-typed="b"]');
    const note = el.querySelector('[data-live-note]');
    this.reset = () => {
      typedA.textContent = '';
      gsap.set(table.querySelectorAll('tr'), { autoAlpha: 0, y: 12 });
      gsap.set(total, { autoAlpha: 0 });
      typedB.hidden = true;
      table.hidden = false;
      total.hidden = false;
    };
    this.showA = (instant) => {
      if (instant) typedA.textContent = ANSWER_A;
      else {
        const o = { n: 0 };
        gsap.to(o, { n: ANSWER_A.length, duration: 1.6, ease: 'none', onUpdate: () => (typedA.textContent = ANSWER_A.slice(0, o.n | 0)) });
      }
    };
    this.showB = (instant) => {
      const rows = table.querySelectorAll('tr');
      if (instant) {
        gsap.set(rows, { autoAlpha: 1, y: 0 });
        gsap.set(total, { autoAlpha: 1 });
      } else {
        gsap.to(rows, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.18, ease: 'expo.out' });
        gsap.to(total, { autoAlpha: 1, duration: 0.6, delay: rows.length * 0.18 });
      }
    };
    this.reset();

    let ctl = null;
    el.querySelector('[data-live]').addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      if (ctl) {
        ctl.abort();
        return;
      }
      const mode = await ctx.live.mode();
      if (mode === 'offline') {
        note.textContent = errText({ code: 'offline' });
        return;
      }
      ctl = new AbortController();
      btn.lastChild.textContent = 'Toʻxtatish';
      note.textContent = 'Claude oʻylayapti…';
      typedA.textContent = '…';
      table.hidden = true;
      total.hidden = true;
      typedB.hidden = false;
      typedB.textContent = '…';
      const suffix = '\n\nJavobni oʻzbek tilida yoz. 180 soʻzdan oshmasin.';
      const run = (p, out) =>
        ctx.live.ask(p + suffix, { signal: ctl.signal, onText: (t) => (out.textContent = t) }).catch((err) => {
          if (err?.code !== 'cancelled') note.textContent = errText(err);
        });
      await Promise.all([run(PROMPT_A, typedA), run(PROMPT_B, typedB)]);
      note.textContent = mode === 'artifact' ? 'Jonli javob: Claude (sizning hisobingiz orqali)' : 'Jonli javob: Claude API';
      btn.lastChild.textContent = 'Jonli sinash';
      ctl = null;
    });
  },
  enter() {
    this.reset();
  },
  step(el, ctx, n, info) {
    el.classList.toggle('is-punch', n >= 3);
    if (n >= 1) this.showA(info.instant);
    if (n >= 2) this.showB(info.instant);
    if (n < 1) el.querySelector('[data-typed="a"]').textContent = '';
    if (n < 2) gsap.set(el.querySelectorAll('[data-table] tr, [data-total]'), { autoAlpha: 0 });
  },
  notes: NOTES.hook,
};

// ---------------------------------------------------------------- 3 · Route
const STOPS = [
  ['Prompt', 'Model matnni qanday oʻqiydi', 'prompt'],
  ['Logika', 'Promptni dastur kabi yozamiz', 'prompt'],
  ['Chain', 'Katta vazifani qadamlarga boʻlamiz', 'model'],
  ['Tool’lar', 'Modelga qoʻl beramiz: tool calling', 'tool'],
  ['Agent', 'Oʻzi reja tuzib, oʻzi bajaradigan tizim', 'data'],
];

const route = {
  id: 'route',
  act: 0,
  station: 0,
  title: 'Bugungi yoʻl',
  time: 50,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>Bugungi yoʻl</div>
    <h2 class="h1 kinetic">45 daqiqa: <span class="ink">promptdan agentgacha</span></h2>
  </header>
  <div class="route">
    <svg class="route-line" viewBox="0 0 1664 40" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#3fe0ff"/><stop offset=".5" stop-color="#a07dff"/><stop offset="1" stop-color="#6dffb8"/></linearGradient></defs>
      <path d="M20 20 H1644" stroke="url(#rg)" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>
    ${STOPS.map(
      ([name, desc, c], i) => `
      <div class="route-stop" style="--c:var(--${c})">
        <i class="route-dot"></i>
        <span class="route-n mono">0${i + 1}</span>
        <h3 class="h3">${name}</h3>
        <p class="small">${desc}</p>
      </div>`,
    ).join('')}
  </div>
  <div class="takeaway" data-in="8">
    <span class="takeaway-label mono">Oʻzingiz bilan olib ketasiz</span>
    <span class="chip" data-c="prompt">MAKTAB freymvorki</span>
    <span class="chip" data-c="model">6 ta chaining patterni</span>
    <span class="chip" data-c="tool">jonli agent</span>
    <span class="chip" data-c="data">8 ta bonus skill</span>
  </div>`,
  enter(el) {
    const tl = gsap.timeline();
    tl.fromTo(el.querySelector('.route-line path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, ease: 'power2.inOut' }, 0.3);
    tl.fromTo(
      el.querySelectorAll('.route-stop'),
      { autoAlpha: 0, y: 40, filter: 'blur(8px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.2, ease: 'expo.out' },
      0.45,
    );
    tl.fromTo(el.querySelectorAll('.route-dot'), { scale: 0 }, { scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(3)' }, 0.5);
    return tl;
  },
  notes: NOTES.route,
};

export default [title, hook, route];
export { kineticIn };
