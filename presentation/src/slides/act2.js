import { gsap } from '../core/fx.js';
import { codeLines } from '../core/code.js';
import { NOTES } from '../content/notes.js';

const lit = (el, lines = []) => {
  el.querySelectorAll('.line').forEach((l) => {
    const n = +l.dataset.l;
    l.classList.toggle('is-hot', lines.includes(n));
    l.classList.toggle('is-dim', lines.length > 0 && !lines.includes(n));
  });
};

// ---------------------------------------------------------------- Act card
const card = {
  id: 'act2',
  act: 2,
  station: 3,
  title: 'II qism · AI Agent Tool Chaining',
  time: 20,
  gl: 'calm',
  html: `
  <div class="act-card act-card--2">
    <div class="act-num act-num--2" data-in="0" data-anim="depth">II</div>
    <div class="act-text">
      <div class="eyebrow" data-in="1" data-decode style="--accent:var(--tool)">II qism</div>
      <h2 class="h-xl kinetic">Agent <span class="ink-warm">Tool Chaining</span></h2>
      <p class="lead" data-in="3">Modelga qoʻl beramiz — va u ishlay boshlaydi</p>
    </div>
  </div>`,
  notes: NOTES.act2,
};

// ---------------------------------------------------------------- Hands
const TOOL_DEF = `{
  "name": "get_weather",
  "description": "Shahar va sana boʻyicha ob-havo
    prognozini qaytaradi. Sana: YYYY-MM-DD.",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": { "type": "string" },
      "date": { "type": "string" }
    },
    "required": ["city"]
  }
}`;

const hands = {
  id: 'hands',
  act: 2,
  station: 3,
  title: 'Modelning qoʻli yoʻq',
  time: 85,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Muammo</div>
    <h2 class="h1 kinetic">Modelning miyasi bor, <span class="ink-warm">qoʻli yoʻq</span></h2>
  </header>
  <div class="hd-grid">
    <div class="hd-limits">
      <div class="hd-lim panel" data-in="2"><b class="mono">01</b><div><h3 class="h3">Bilimi muzlatilgan</h3><p class="body">Oʻqitilgan sanadan keyingi voqealarni bilmaydi.</p></div></div>
      <div class="hd-lim panel" data-in="3"><b class="mono">02</b><div><h3 class="h3">Hisobda adashadi</h3><p class="body">Katta sonlar va aniq hisob — zaif joyi.</p></div></div>
      <div class="hd-lim panel" data-in="4"><b class="mono">03</b><div><h3 class="h3">Harakat qila olmaydi</h3><p class="body">Xat yubora olmaydi, bazaga yoza olmaydi.</p></div></div>
      <p class="hd-eq" data-step="1"><span class="hl-tool">Vosita (tool)</span> = modelning <b class="ink-warm">qoʻli</b></p>
    </div>
    <div class="hd-right" data-step="1" data-anim="right">
      <div class="panel window hd-code">
        <div class="window-bar"><i></i><i></i><i></i><span>vosita tavsifi · JSON</span></div>
        <pre class="code window-body">${codeLines(TOOL_DEF, 'json')}</pre>
      </div>
      <div class="hd-call hd-c1" data-step="2"><b>name</b> — nima qilishini aytadi</div>
      <div class="hd-call hd-c2" data-step="3"><b>description</b> — qachon va qanday ishlatish. <em>Bu ham prompt!</em></div>
      <div class="hd-call hd-c3" data-step="4"><b>input_schema</b> — model aynan shu shaklda soʻraydi</div>
    </div>
  </div>`,
  step(el, ctx, n) {
    const map = { 2: [2], 3: [3, 4], 4: [5, 6, 7, 8, 9, 10, 11, 12] };
    lit(el.querySelector('.hd-code'), map[n] || []);
    el.querySelector('.hd-grid').classList.toggle('is-callouts', n >= 2);
  },
  notes: NOTES.hands,
};

// ---------------------------------------------------------------- Function calling flow
const LANES = [
  ['Foydalanuvchi', 'text-2', 150],
  ['Ilova · sizning kodingiz', 'prompt', 620],
  ['Claude', 'model', 1090],
  ['Vosita · API', 'tool', 1520],
];
const MSGS = [
  [0, 1, '«Ertaga Samarqandda yomgʻir yogʻadimi?»', 'text-2'],
  [1, 2, 'xabar + tools: [get_weather]', 'prompt'],
  [2, 1, 'tool_use → get_weather({ city: "Samarqand" })', 'model'],
  [1, 3, 'GET /weather?city=Samarqand', 'prompt'],
  [3, 1, '{ "yomgʻir": "70%", "harorat": 14 }', 'tool'],
  [1, 2, 'tool_result → { … }', 'prompt'],
  [2, 0, '«Ha, ehtimoli 70%. Soyabon oling.»', 'model'],
];
const flow = {
  id: 'flow',
  act: 2,
  station: 3,
  title: 'Tool calling qanday ishlaydi',
  time: 115,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Mexanika</div>
    <h2 class="h1 kinetic">Tool calling <span class="ink-warm">qanday ishlaydi</span></h2>
  </header>
  <svg class="sq" viewBox="0 0 1664 650" data-in="2" data-anim="fade" aria-label="Tool calling ketma-ketligi">
    <defs><marker id="sqa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
    ${LANES.map(
      ([n, c, x]) => `<g class="sq-lane" style="--c:var(--${c})"><rect x="${x - 125}" y="0" width="250" height="52" rx="26"/><text x="${x}" y="33" text-anchor="middle">${n}</text><line x1="${x}" y1="60" x2="${x}" y2="640"/></g>`,
    ).join('')}
    ${MSGS.map(([a, b, label, c], i) => {
      const y = 104 + i * 70;
      const x1 = LANES[a][2];
      const x2 = LANES[b][2];
      const dir = x2 > x1 ? 1 : -1;
      const mid = (x1 + x2) / 2;
      return `<g class="sq-msg" data-m="${i + 1}" style="--c:var(--${c})">
        <path d="M${x1 + dir * 8} ${y} H${x2 - dir * 12}" class="sq-line"/>
        <circle class="sq-dot" r="7" cx="${x1}" cy="${y}"/>
        <text x="${mid}" y="${y - 14}" text-anchor="middle" class="sq-label">${label}</text>
        <text x="${Math.min(x1, x2) - 40}" y="${y + 6}" text-anchor="end" class="sq-n">${i + 1}</text>
      </g>`;
    }).join('')}
  </svg>
  <div class="sq-stop chip" data-c="model" data-step="3" data-anim="scale">stop_reason: "tool_use"</div>
  <div class="sq-punch panel" data-step="8" data-anim="up">Model vositani <b class="hl-danger">oʻzi ishga tushirmaydi</b> — faqat soʻraydi. Bajaradigan — <b class="hl-prompt">sizning kodingiz</b>.</div>`,
  setup(el) {
    this.msgs = [...el.querySelectorAll('.sq-msg')];
  },
  enter() {
    this.msgs.forEach((m) => {
      gsap.set(m, { autoAlpha: 0 });
      gsap.set(m.querySelector('.sq-line'), { drawSVG: '0%' });
    });
  },
  step(el, ctx, n, info) {
    this.msgs.forEach((m, i) => {
      const k = i + 1;
      const line = m.querySelector('.sq-line');
      const dot = m.querySelector('.sq-dot');
      const on = n >= k;
      m.classList.toggle('is-now', n === k);
      if (on && !m._on && !info.instant) {
        gsap.set(m, { autoAlpha: 1 });
        const x1 = LANES[MSGS[i][0]][2];
        const x2 = LANES[MSGS[i][1]][2];
        gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut' });
        gsap.fromTo(dot, { attr: { cx: x1 } }, { attr: { cx: x2 - (x2 > x1 ? 14 : -14) }, duration: 0.8, ease: 'power2.inOut' });
        gsap.fromTo(m.querySelector('.sq-label'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3 });
        ctx.sound?.play('pulse');
      } else {
        gsap.set(m, { autoAlpha: on ? 1 : 0 });
        gsap.set(line, { drawSVG: on ? '100%' : '0%' });
        const x1 = LANES[MSGS[i][0]][2];
        const x2 = LANES[MSGS[i][1]][2];
        gsap.set(dot, { attr: { cx: on ? x2 - (x2 > x1 ? 14 : -14) : x1 } });
      }
      m._on = on;
    });
  },
  leave() {
    this.msgs.forEach((m) => (m._on = false));
  },
  notes: NOTES.flow,
};

// ---------------------------------------------------------------- Agent loop
const LOOP_CODE = `messages = [vazifa]
while True:
    javob = claude(messages, tools)       # Oʻyla
    if javob.stop_reason != "tool_use":
        break                             # tayyor
    natija = bajar(javob.tool_calls)      # Harakat qil
    messages += [javob, natija]           # Kuzat`;

const loop = {
  id: 'loop',
  act: 2,
  station: 4,
  title: 'Agent = model + vositalar + sikl',
  time: 80,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--data)">Agent formulasi</div>
    <h2 class="h1 kinetic">Agent = model + vositalar + <span class="ink-warm">sikl</span></h2>
  </header>
  <div class="lp-grid">
    <div class="panel window lp-code" data-in="2" data-anim="left">
      <div class="window-bar"><i></i><i></i><i></i><span>agent.py · 7 qator</span></div>
      <pre class="code window-body">${codeLines(LOOP_CODE, 'py')}</pre>
    </div>
    <div class="lp-ring" data-in="3" data-anim="scale">
      <svg viewBox="-260 -260 520 520" aria-hidden="true">
        <circle r="200" class="lp-track"/>
        <circle r="200" class="lp-energy"/>
        ${[
          ['Oʻyla', -90, 'model'],
          ['Harakat qil', 30, 'tool'],
          ['Kuzat', 150, 'data'],
        ]
          .map(([n, a, c], i) => {
            const r = (a * Math.PI) / 180;
            return `<g class="lp-node" data-k="${i + 1}" style="--c:var(--${c})" transform="translate(${(Math.cos(r) * 200).toFixed(1)} ${(Math.sin(r) * 200).toFixed(1)})"><circle r="58"/><text y="7" text-anchor="middle">${n}</text></g>`;
          })
          .join('')}
        <text class="lp-center" y="-6" text-anchor="middle">agent</text>
        <text class="lp-center2" y="24" text-anchor="middle">sikli</text>
      </svg>
    </div>
  </div>
  <div class="lp-stop" data-step="4">
    <span class="takeaway-label mono">Toʻxtash shartlari</span>
    <span class="chip" data-c="data">vazifa bajarildi</span>
    <span class="chip" data-c="tool">qadamlar limiti</span>
    <span class="chip" data-c="danger">inson tasdigʻi</span>
  </div>`,
  step(el, ctx, n) {
    const map = { 1: [3], 2: [4, 5], 3: [6, 7] };
    lit(el.querySelector('.lp-code'), map[n] || []);
    el.querySelectorAll('.lp-node').forEach((g) => g.classList.toggle('is-hot', +g.dataset.k === n));
  },
  notes: NOTES.loop,
};

// ---------------------------------------------------------------- Patterns
const P = [
  ['Ketma-ket zanjir', 'Bir halqaning chiqishi — keyingisining kirishi. Oraliqda darvoza.', 'reja → matn → tarjima', 'prompt',
    `<path class="pt-p" d="M30 75 H330"/><circle class="pt-n" cx="30" cy="75" r="14"/><circle class="pt-n" cx="130" cy="75" r="14"/><rect class="pt-g" x="215" y="61" width="28" height="28" transform="rotate(45 229 75)"/><circle class="pt-n" cx="330" cy="75" r="14"/>`],
  ['Yoʻnaltirish', 'Kirishni tasniflab, mos yoʻlga yuborish.', 'savol · shikoyat · qaytarish', 'model',
    `<path class="pt-p" d="M30 75 H120"/><path class="pt-p" d="M150 75 C220 75 220 25 320 25"/><path class="pt-p" d="M150 75 H320"/><path class="pt-p" d="M150 75 C220 75 220 125 320 125"/><circle class="pt-n" cx="30" cy="75" r="14"/><rect class="pt-g" x="118" y="61" width="28" height="28" transform="rotate(45 132 75)"/><circle class="pt-n" cx="330" cy="25" r="12"/><circle class="pt-n" cx="330" cy="75" r="12"/><circle class="pt-n" cx="330" cy="125" r="12"/>`],
  ['Parallellashtirish', 'Boʻlaklarga boʻlib yoki bir necha ovoz bilan bir vaqtda ishlash.', 'kodni 3 tomondan tekshirish', 'tool',
    `<path class="pt-p" d="M30 75 C100 75 100 25 180 25 C260 25 260 75 330 75"/><path class="pt-p" d="M30 75 H330"/><path class="pt-p" d="M30 75 C100 75 100 125 180 125 C260 125 260 75 330 75"/><circle class="pt-n" cx="30" cy="75" r="14"/><circle class="pt-n" cx="180" cy="25" r="12"/><circle class="pt-n" cx="180" cy="75" r="12"/><circle class="pt-n" cx="180" cy="125" r="12"/><circle class="pt-n" cx="330" cy="75" r="14"/>`],
  ['Orkestrator va ishchilar', 'Bosh model vazifani oʻzi boʻladi va ishchilarga tarqatadi.', 'koʻp faylli kod oʻzgarishi', 'data',
    `<path class="pt-p" d="M60 75 L200 20"/><path class="pt-p" d="M60 75 L200 60"/><path class="pt-p" d="M60 75 L200 100"/><path class="pt-p" d="M60 75 L200 140"/><path class="pt-p" d="M200 20 L330 75 M200 60 L330 75 M200 100 L330 75 M200 140 L330 75"/><circle class="pt-n pt-big" cx="60" cy="75" r="22"/><circle class="pt-n" cx="200" cy="20" r="10"/><circle class="pt-n" cx="200" cy="60" r="10"/><circle class="pt-n" cx="200" cy="100" r="10"/><circle class="pt-n" cx="200" cy="140" r="10"/><circle class="pt-n" cx="330" cy="75" r="14"/>`],
  ['Baholovchi va yaxshilovchi', 'Biri yozadi, ikkinchisi baholaydi — mezonga yetguncha.', 'adabiy tarjima', 'prompt',
    `<path class="pt-p" d="M90 60 C170 10 190 10 270 60"/><path class="pt-p" d="M270 90 C190 140 170 140 90 90"/><circle class="pt-n pt-big" cx="70" cy="75" r="24"/><circle class="pt-n pt-big" cx="290" cy="75" r="24"/><text x="70" y="81" text-anchor="middle" class="pt-t">yoz</text><text x="290" y="81" text-anchor="middle" class="pt-t">baho</text>`],
  ['Avtonom agent', 'Reja, vositalar va toʻxtash vaqtini model oʻzi tanlaydi.', 'kodlash agenti', 'tool',
    `<circle class="pt-p" cx="180" cy="75" r="58"/><circle class="pt-n pt-big" cx="180" cy="75" r="22"/><rect class="pt-h" x="36" y="18" width="34" height="34" rx="6"/><rect class="pt-h" x="36" y="98" width="34" height="34" rx="6"/><rect class="pt-h" x="290" y="18" width="34" height="34" rx="6"/><rect class="pt-h" x="290" y="98" width="34" height="34" rx="6"/><path class="pt-p" d="M70 35 L150 62 M70 115 L150 88 M290 35 L210 62 M290 115 L210 88"/>`],
];
const patterns = {
  id: 'patterns',
  act: 2,
  station: 4,
  title: 'Zanjirning 6 naqshi',
  time: 200,
  html: `
  <header class="head pt-head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--model)">Anthropic · Building Effective Agents</div>
    <h2 class="h1 kinetic">Zanjirning <span class="ink">6 naqshi</span></h2>
  </header>
  <div class="pt-grid">
    ${P.map(
      ([t, d, ex, c, svg], i) => `
      <article class="pt-card panel" data-p="${i + 1}" style="--c:var(--${c})" data-in="${2 + i * 0.5}" data-anim="flip">
        <div class="pt-top"><span class="mono">0${i + 1}</span><span class="chip">${i < 5 ? 'ish oqimi' : 'agent'}</span></div>
        <svg viewBox="0 0 360 150" class="pt-svg" aria-hidden="true">${svg}<circle class="pt-pk" r="7" cx="-20" cy="-20"/></svg>
        <h3 class="h3">${t}</h3>
        <p class="small">${d}</p>
        <p class="pt-ex mono">misol: ${ex}</p>
      </article>`,
    ).join('')}
  </div>
  <div class="pt-punch panel" data-step="7" data-anim="up"><b>Oddiydan boshlang.</b> Murakkablikni faqat natija talab qilsa qoʻshing: bitta prompt → zanjir → ish oqimi → agent.</div>`,
  setup(el) {
    this.cards = [...el.querySelectorAll('.pt-card')];
  },
  step(el, ctx, n, info) {
    this.cards.forEach((c, i) => {
      const on = n === i + 1;
      c.classList.toggle('is-hot', on);
      c.classList.toggle('is-dim', n >= 1 && n <= 6 && !on);
      if (on && !info.instant) {
        const paths = c.querySelectorAll('.pt-p');
        gsap.fromTo(paths, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, stagger: 0.12, ease: 'power2.inOut' });
        const pk = c.querySelector('.pt-pk');
        const route = paths[Math.min(1, paths.length - 1)];
        gsap.fromTo(pk, { autoAlpha: 1 }, { duration: 1.6, delay: 0.4, motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] }, ease: 'power1.inOut', onComplete: () => gsap.to(pk, { autoAlpha: 0, duration: 0.3 }) });
      }
    });
  },
  notes: NOTES.patterns,
};

// ---------------------------------------------------------------- ACI: tool description is a prompt
const BAD = `{
  "name": "search",
  "description": "Qidiradi"
}`;
const GOOD = `{
  "name": "crm_search_customers",
  "description": "CRM’dan mijozni ism yoki telefon
    boʻyicha qidiradi. 10 tagacha natija qaytaradi.
    Buyurtmalar uchun emas — crm_get_orders’dan
    foydalaning.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string",
        "description": "Ism yoki +998 bilan telefon" }
    },
    "required": ["query"]
  }
}`;
const aci = {
  id: 'aci',
  act: 2,
  station: 4,
  title: 'Vosita tavsifi — bu ham prompt',
  time: 80,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Agent–kompyuter interfeysi</div>
    <h2 class="h1 kinetic">Vosita tavsifi — <span class="ink-warm">bu ham prompt</span></h2>
  </header>
  <div class="ac-grid">
    <div class="ac-col">
      <div class="panel window ac-bad" data-in="2" data-anim="left">
        <div class="window-bar"><i></i><i></i><i></i><span>yomon</span></div>
        <pre class="code window-body">${codeLines(BAD, 'json')}</pre>
      </div>
      <ol class="ac-rules">
        <li data-step="1"><b>Nom</b> — aniq va prefiks bilan: crm_search, crm_update</li>
        <li data-step="2"><b>Tavsif</b> — yangi xodimga tushuntirgandek: qachon ishlatish va qachon emas</li>
        <li data-step="3"><b>Xato matni</b> — oʻrgatsin: «sana YYYY-MM-DD formatida boʻlsin»</li>
        <li data-step="4"><b>Kam, lekin aniq</b>: 40 ta mayda emas, 8 ta kuchli vosita</li>
        <li data-step="5"><b>Qisqa natija</b> — faqat kerakli maʼlumot: kontekst qimmat</li>
      </ol>
    </div>
    <div class="panel window ac-good" data-in="3" data-anim="right">
      <div class="window-bar"><i></i><i></i><i></i><span>yaxshi</span></div>
      <pre class="code window-body">${codeLines(GOOD, 'json')}</pre>
    </div>
  </div>`,
  step(el, ctx, n) {
    const map = { 1: [2], 2: [3, 4, 5, 6], 3: [11, 12] };
    lit(el.querySelector('.ac-good'), map[n] || []);
  },
  notes: NOTES.aci,
};

// ---------------------------------------------------------------- MCP
const APPS = ['Claude', 'IDE', 'Agent'];
const SVCS = ['GitHub', 'Slack', 'Baza', 'Drive', 'CRM'];
const mcp = {
  id: 'mcp',
  act: 2,
  station: 4,
  title: 'MCP — AI uchun USB-C',
  time: 85,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--tool)">Model Context Protocol</div>
    <h2 class="h1 kinetic">MCP — sunʼiy intellekt uchun <span class="ink-warm">USB-C</span></h2>
  </header>
  <div class="mc-wrap">
    <svg class="mc-svg" viewBox="0 0 1100 520" data-in="2" data-anim="fade" aria-label="MCP sxemasi">
      ${APPS.map((a, i) => `<g class="mc-node mc-app" transform="translate(40 ${70 + i * 170})"><rect width="210" height="74" rx="18"/><text x="105" y="46" text-anchor="middle">${a}</text></g>`).join('')}
      ${SVCS.map((s, i) => `<g class="mc-node mc-svc" transform="translate(850 ${20 + i * 104})"><rect width="210" height="70" rx="18"/><text x="105" y="44" text-anchor="middle">${s}</text></g>`).join('')}
      <g class="mc-tangle">${APPS.map((_, i) => SVCS.map((__, j) => `<path d="M250 ${107 + i * 170} C520 ${107 + i * 170} 580 ${55 + j * 104} 850 ${55 + j * 104}"/>`).join('')).join('')}</g>
      <g class="mc-hub-lines">${APPS.map((_, i) => `<path d="M250 ${107 + i * 170} C360 ${107 + i * 170} 400 260 480 260"/>`).join('')}${SVCS.map((_, j) => `<path d="M620 260 C700 260 740 ${55 + j * 104} 850 ${55 + j * 104}"/>`).join('')}</g>
      <g class="mc-hub"><rect x="480" y="215" width="140" height="90" rx="22"/><text x="550" y="270" text-anchor="middle">MCP</text></g>
    </svg>
    <div class="mc-side">
      <div class="mc-count panel" data-step-out="2"><b class="tabular">3 × 5 = 15</b><span>alohida integratsiya</span></div>
      <div class="mc-count mc-count2 panel" data-step="2"><b class="tabular">3 + 5 = 8</b><span>bitta protokol orqali</span></div>
      <div class="mc-facts" data-step="3">
        <span class="chip" data-c="tool">Tools — amallar</span>
        <span class="chip" data-c="data">Resources — maʼlumotlar</span>
        <span class="chip" data-c="prompt">Prompts — shablonlar</span>
        <p class="small">2024-yil noyabrda Anthropic taqdim etgan ochiq standart. 2025-yil dekabridan — Linux Foundation qoshidagi Agentic AI Foundation loyihasi.</p>
      </div>
    </div>
  </div>`,
  setup(el) {
    this.tangle = el.querySelectorAll('.mc-tangle path');
    this.hubLines = el.querySelectorAll('.mc-hub-lines path');
    this.hub = el.querySelector('.mc-hub');
  },
  enter() {
    gsap.set(this.tangle, { drawSVG: '0%', autoAlpha: 1 });
    gsap.set(this.hubLines, { drawSVG: '0%' });
    gsap.set(this.hub, { autoAlpha: 0, scale: 0.5, transformOrigin: '550px 260px' });
  },
  step(el, ctx, n, info) {
    const d = info.instant ? 0 : 1;
    if (n >= 1) gsap.to(this.tangle, { drawSVG: '100%', autoAlpha: n >= 2 ? 0.06 : 0.75, duration: d * 1.2, stagger: d ? 0.03 : 0, ease: 'power2.inOut' });
    else gsap.to(this.tangle, { drawSVG: '0%', duration: d * 0.4 });
    gsap.to(this.hub, { autoAlpha: n >= 2 ? 1 : 0, scale: n >= 2 ? 1 : 0.5, duration: d * 0.8, ease: 'back.out(2)' });
    gsap.to(this.hubLines, { drawSVG: n >= 2 ? '100%' : '0%', duration: d, stagger: d ? 0.06 : 0, delay: n >= 2 ? d * 0.3 : 0, ease: 'power2.inOut' });
    if (n === 2 && !info.instant) ctx.sound?.play('snap');
  },
  notes: NOTES.mcp,
};

// ---------------------------------------------------------------- Context engineering
const SEGS = [
  ['Tizim prompti', 6, 6, 'prompt'],
  ['Vositalar tavsifi', 14, 6, 'tool'],
  ['Suhbat tarixi', 26, 9, 'model'],
  ['Hujjatlar', 30, 12, 'data'],
  ['Vosita natijalari', 34, 10, 'danger'],
];
const context = {
  id: 'context',
  act: 2,
  station: 4,
  title: 'Kontekst muhandisligi',
  time: 95,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--data)">Context engineering</div>
    <h2 class="h1 kinetic">Kontekst — <span class="ink-warm">cheklangan ish stoli</span></h2>
  </header>
  <div class="cx-bar-wrap" data-in="2" data-anim="fade">
    <div class="cx-scale mono"><span>0</span><span>kontekst oynasi</span><span class="cx-limit">limit</span></div>
    <div class="cx-bar">
      ${SEGS.map(([n, a, b, c]) => `<div class="cx-seg" style="--c:var(--${c})" data-a="${a}" data-b="${b}"><span>${n}</span></div>`).join('')}
      <div class="cx-over mono" data-over>toʻlib ketdi!</div>
    </div>
    <div class="cx-legend">${SEGS.map(([n, , , c]) => `<span style="--c:var(--${c})"><i></i>${n}</span>`).join('')}</div>
  </div>
  <div class="cx-tech">
    <div class="cx-t panel" data-step="2"><b>Siqish</b><span>eski tarix qisqa xulosaga aylanadi (compaction)</span></div>
    <div class="cx-t panel" data-step="2" data-delay="0.1"><b>Kerak boʻlganda yuklash</b><span>hujjatning faqat kerakli qismi olinadi</span></div>
    <div class="cx-t panel" data-step="2" data-delay="0.2"><b>Subagentlar</b><span>har biri toza kontekstda ishlaydi, faqat xulosa qaytaradi</span></div>
    <div class="cx-t panel" data-step="2" data-delay="0.3"><b>Skills</b><span>avval faqat nom va tavsif — kerak boʻlsa toʻliq ochiladi</span></div>
  </div>
  <div class="cx-quote" data-step="3">Prompt muhandisligi — <b class="hl-prompt">nima deyish</b>. Kontekst muhandisligi — <b class="ink-warm">model nimani koʻrishi</b>.</div>`,
  setup(el) {
    this.segs = [...el.querySelectorAll('.cx-seg')];
    this.over = el.querySelector('[data-over]');
  },
  apply(n, instant) {
    const d = instant ? 0 : 1.2;
    this.segs.forEach((s, i) => {
      const w = n === 0 ? 0 : n === 1 ? +s.dataset.a : +s.dataset.b;
      gsap.to(s, { width: `${w}%`, duration: d, delay: instant ? 0 : i * 0.12, ease: 'expo.inOut' });
    });
    gsap.to(this.over, { autoAlpha: n === 1 ? 1 : 0, duration: d * 0.4, delay: n === 1 && !instant ? 0.9 : 0 });
  },
  enter() {
    this.apply(0, true);
  },
  step(el, ctx, n, info) {
    this.apply(n, info.instant);
  },
  notes: NOTES.context,
};

// ---------------------------------------------------------------- Failures & defenses
const FAILS = [
  ['Cheksiz sikl', 'Qadamlar limiti va byudjet'],
  ['Toʻqib chiqarilgan parametr', 'Sxema tekshiruvi + oʻrgatuvchi xato matni'],
  ['Prompt injection (vosita natijasida)', 'Tashqi matn — buyruq emas, maʼlumot. Ruxsatlar minimal'],
  ['Notoʻgʻri vosita tanlash', 'Aniq tavsif, kamroq vosita'],
  ['Qaytarib boʻlmaydigan harakat', 'Inson tasdigʻi (human-in-the-loop)'],
  ['«Qora quti»', 'Trace, log va evallar'],
];
const failures = {
  id: 'failures',
  act: 2,
  station: 4,
  title: 'Agent qayerda sinadi',
  time: 80,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--danger)">Ishonchlilik</div>
    <h2 class="h1 kinetic">Agent qayerda sinadi — <span class="ink-cool">va qanday himoyalanadi</span></h2>
  </header>
  <div class="fl-grid">
    ${FAILS.map(
      ([a, b], i) => `
      <div class="fl-card" data-f="${i}" data-in="${2 + i * 0.4}" data-anim="flip">
        <div class="fl-inner">
          <div class="fl-face fl-front panel"><span class="mono">xavf 0${i + 1}</span><b>${a}</b></div>
          <div class="fl-face fl-back panel"><span class="mono">himoya</span><b>${b}</b></div>
        </div>
      </div>`,
    ).join('')}
  </div>`,
  steps: 3,
  step(el, ctx, n, info) {
    el.querySelectorAll('.fl-inner').forEach((c, i) => {
      const flip = n >= Math.floor(i / 2) + 1;
      gsap.to(c, { rotationY: flip ? 180 : 0, duration: info.instant ? 0 : 1.1, delay: info.instant ? 0 : (i % 2) * 0.15, ease: 'expo.inOut' });
    });
  },
  notes: NOTES.failures,
};

export const act2a = [card, hands, flow, loop, patterns];
export const act2b = [aci, mcp, context, failures];
