import { gsap } from '../core/fx.js';
import { codeLines, highlight } from '../core/code.js';
import { NOTES } from '../content/notes.js';
import { errText } from '../core/live.js';

const lit = (el, lines = []) => {
  el.querySelectorAll('.line').forEach((l) => {
    const n = +l.dataset.l;
    l.classList.toggle('is-hot', lines.includes(n));
    l.classList.toggle('is-dim', lines.length > 0 && !lines.includes(n));
  });
};

// ---------------------------------------------------------------- Act card
const card = {
  id: 'act1',
  act: 1,
  station: 0,
  title: 'I qism · Prompt Logic',
  time: 20,
  gl: 'calm',
  html: `
  <div class="act-card">
    <div class="act-num" data-in="0" data-anim="depth">I</div>
    <div class="act-text">
      <div class="eyebrow" data-in="1" data-decode>I qism</div>
      <h2 class="h-xl kinetic">Prompt <span class="ink-cool">Logic</span></h2>
      <p class="lead" data-in="3">Stajyorga vazifani qanday berish kerak</p>
    </div>
  </div>`,
  notes: NOTES.act1,
};

// ---------------------------------------------------------------- MAKTAB
const LAYERS = [
  ['M', 'Maqsad', 'Nima kerak va nima uchun', 'Maqsad: rezyumeni vakansiyaga solishtir — rahbar 1 daqiqada qaror qilsin.', 'prompt'],
  ['A', 'Agar', 'Nima mumkin, nima mumkin emas', 'Agar biror maʼlumot rezyumeda boʻlmasa — «nomaʼlum» deb yoz, oʻylab topma.', 'danger'],
  ['K', 'Kontekst', 'Kim yozyapti, kimga, qanday vaziyatda', 'Sen — IT kompaniya HR xodimisan. Vakansiya: backend dasturchi, Python, 3+ yil.', 'model'],
  ['T', 'Tartib', 'Javob qanday koʻrinishda boʻlsin', 'Tartib: kuchli tomonlar, kamchiliklar, xulosa — suhbatga chaqirish yoki yoʻq.', 'tool'],
  ['A', 'Aniq misol', 'Tayyor javob namunasi', 'Misol: «Kuchli: Java — 5 yil. Kamchilik: Python yoʻq. Xulosa: chaqirmaslik.»', 'data'],
  ['B', 'Baholash', 'Yuborishdan oldin oʻzini tekshirish', 'Yuborishdan oldin tekshir: har bir fikr rezyumedagi faktga asoslanganmi?', 'prompt'],
];

const maktab = {
  id: 'maktab',
  act: 1,
  station: 1,
  title: 'MAKTAB formulasi',
  time: 200,
  html: `
  <header class="head mk-head">
    <div class="eyebrow" data-in="0" data-decode>Formula</div>
    <h2 class="h1 kinetic"><span class="ink">MAKTAB</span>: promptning 6 qismi</h2>
  </header>
  <div class="mk-stage" data-in="2" data-anim="fade">
    <div class="mk-stack">
      <div class="mk-plate panel"></div>
      ${LAYERS.map(
        ([l, name, desc, text, c], i) => `
        <div class="mk-row" style="--c:var(--${c})" data-i="${i}">
          <b class="mk-letter">${l}</b>
          <div class="mk-body">
            <span class="mk-name">${name} <em>${desc}</em></span>
            <p class="mk-text mono">${highlight(text, 'prompt')}</p>
          </div>
        </div>`,
      ).join('')}
    </div>
  </div>
  <div class="mk-word" data-step="2" aria-hidden="true">${'MAKTAB'
    .split('')
    .map((ch, i) => `<span style="--c:var(--${LAYERS[i][4]})">${ch}</span>`)
    .join('')}</div>
  <div class="mk-result panel" data-step="3" data-anim="up">
    <span class="chip" data-c="data">Natija — Claude xulosasi</span>
    <div class="mk-answer">
      <p><b>Nomzod:</b> Jasur Karimov</p>
      <p><b>Kuchli tomonlar:</b> Python — 4 yil, bank loyihasida ishlagan, 3 kishilik jamoani boshqargan.</p>
      <p><b>Kamchiliklar:</b> Docker tajribasi yoʻq. Ingliz tili — nomaʼlum.</p>
      <p><b>Xulosa:</b> suhbatga chaqirish. Docker va ingliz tilini suhbatda tekshirish kerak.</p>
    </div>
    <div class="mk-checks">
      <span class="chip" data-c="model">K · vakansiyaga solishtirildi</span>
      <span class="chip" data-c="danger">A · «nomaʼlum» — oʻylab topmadi</span>
      <span class="chip" data-c="tool">T · kuchli → kamchilik → xulosa</span>
      <span class="chip" data-c="prompt">B · har bir fikr — faktdan</span>
    </div>
  </div>`,
  setup(el) {
    this.stack = el.querySelector('.mk-stack');
    this.rows = [...el.querySelectorAll('.mk-row')];
    this.plate = el.querySelector('.mk-plate');
    this.letters = el.querySelectorAll('.mk-letter');
    this.names = el.querySelectorAll('.mk-name');
  },
  pose(state, instant) {
    const d = instant ? 0 : 1.4;
    const e = 'expo.inOut';
    if (state === 0) {
      gsap.to(this.stack, { rotationX: 0, rotationZ: 0, scale: 1, x: 0, y: 0, duration: d, ease: e });
      this.rows.forEach((r, i) => gsap.to(r, { z: 0, y: i * 70, x: 0, duration: d, ease: e }));
      gsap.to(this.plate, { autoAlpha: 1, duration: d * 0.6 });
      gsap.to(this.letters, { autoAlpha: 0, x: -20, duration: d * 0.5 });
      gsap.to(this.names, { autoAlpha: 0, height: 0, duration: d * 0.5 });
    } else if (state === 1) {
      gsap.to(this.stack, { rotationX: 54, rotationZ: -28, scale: 0.86, x: 40, y: 40, duration: d, ease: e });
      this.rows.forEach((r, i) => gsap.to(r, { z: (5 - i) * 78, y: i * 70, x: 0, duration: d, ease: e, delay: instant ? 0 : i * 0.06 }));
      gsap.to(this.plate, { autoAlpha: 0.25, duration: d });
      gsap.to(this.letters, { autoAlpha: 1, x: 0, duration: d, stagger: instant ? 0 : 0.08, ease: 'expo.out' });
      gsap.to(this.names, { autoAlpha: 0, height: 0, duration: d * 0.5 });
    } else {
      gsap.to(this.stack, { rotationX: 0, rotationZ: 0, scale: 1, x: 0, y: -30, duration: d, ease: e });
      this.rows.forEach((r, i) => gsap.to(r, { z: 0, y: i * 104, x: 0, duration: d, ease: e }));
      gsap.to(this.plate, { autoAlpha: 0, duration: d * 0.5 });
      gsap.to(this.letters, { autoAlpha: 1, x: 0, duration: d * 0.5 });
      gsap.to(this.names, { autoAlpha: 1, height: 'auto', duration: d, stagger: instant ? 0 : 0.06, ease: 'expo.out' });
    }
  },
  step(el, ctx, n, info) {
    this.pose(Math.min(n, 2), info.instant);
    gsap.to([this.stack, ...el.querySelectorAll('.mk-word span')], { opacity: n >= 3 ? 0.12 : 1, duration: info.instant ? 0 : 0.6 });
  },
  notes: NOTES.maktab,
};

// ---------------------------------------------------------------- Agar (logic)
const AGAR = `Rezyumeni oʻqi va shunday qil:
Agar maʼlumot yetmasa → taxmin qilma, nomzoddan soʻra.
Agar Python bor va 3+ yil tajriba → suhbatga chaqir.
Agar tajriba 3 yildan kam → junior lavozimni taklif qil.
Agar maosh talabi byudjetdan yuqori → rahbarga yubor.
Aks holda → muloyim rad javobi yoz.`;

const node = (x, y, w, h, t1, t2, c, cls = '') => `
  <g class="fc-node ${cls}" style="--c:var(--${c})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>
    ${t2 ? `<text x="${x + 18}" y="${y + 28}" class="fc-t1">${t1}</text><text x="${x + 18}" y="${y + 54}" class="fc-t2">${t2}</text>` : `<text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" class="fc-t2">${t1}</text>`}
  </g>`;
const diamond = (cx, cy, rw, rh, t1, t2, c, cls = '') => `
  <g class="fc-node fc-diamond ${cls}" style="--c:var(--${c})">
    <path d="M${cx} ${cy - rh} L${cx + rw} ${cy} L${cx} ${cy + rh} L${cx - rw} ${cy} Z"/>
    <text x="${cx}" y="${cy - (t2 ? 4 : -7)}" text-anchor="middle" class="fc-t2">${t1}</text>
    ${t2 ? `<text x="${cx}" y="${cy + 22}" text-anchor="middle" class="fc-t2">${t2}</text>` : ''}
  </g>`;

const agar = {
  id: 'agar',
  act: 1,
  station: 1,
  title: '«Agar» — promptdagi logika',
  time: 120,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>M · <b>A</b> · K · T · A · B</div>
    <h2 class="h1 kinetic"><span class="ink-cool">«Agar»</span> — promptdagi logika</h2>
  </header>
  <div class="ag-grid">
    <div class="panel window ag-code" data-in="2" data-anim="left">
      <div class="window-bar"><i></i><i></i><i></i><span>prompt</span></div>
      <pre class="code window-body">${codeLines(AGAR, 'prompt')}</pre>
    </div>
    <svg class="ag-flow" viewBox="0 0 980 600" data-in="3" data-anim="fade" aria-label="Qaror daraxti">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>
      </defs>
      <g class="fc-edges">
        <path class="fc-e s1" d="M200 300 H250"/>
        <path class="fc-e s1" d="M350 238 V150" />
        <path class="fc-e s2" d="M450 300 H520"/>
        <path class="fc-e s2" d="M700 300 C730 300 730 92 752 92"/>
        <path class="fc-e s2" d="M700 300 C735 300 735 222 752 222"/>
        <path class="fc-e s3" d="M700 300 C735 300 735 352 752 352"/>
        <path class="fc-e s4" d="M700 300 C730 300 730 482 752 482"/>
      </g>
      <text x="360" y="200" class="fc-lab s1">yoʻq</text>
      <text x="466" y="290" class="fc-lab s2">ha</text>
      ${node(20, 268, 180, 64, 'Rezyume', '', 'text-2', 's0')}
      ${diamond(350, 300, 100, 62, 'Maʼlumot', 'yetarlimi?', 'prompt', 's1')}
      ${node(250, 86, 200, 64, 'Taxmin qilma —', 'nomzoddan soʻra', 'danger', 's1')}
      ${diamond(610, 300, 90, 58, 'Mosmi?', '', 'model', 's2')}
      ${node(752, 58, 220, 68, 'Python · 3+ yil', 'Suhbatga chaqir', 'data', 's2')}
      ${node(752, 188, 220, 68, '3 yildan kam', 'Junior taklif qil', 'tool', 's2')}
      ${node(752, 318, 220, 68, 'maosh yuqori', 'Rahbarga yubor', 'model', 's3')}
      ${node(752, 448, 220, 68, 'aks holda', 'Muloyim rad javobi', 'text-2', 's4')}
    </svg>
  </div>
  <div class="ag-punch panel" data-step="5" data-anim="up">
    Har bir <b class="hl-prompt">«agar»</b>ning <b class="hl-data">«aks holda»</b>si boʻlsin. Yoʻl koʻrsatilmagan joyda model <b class="hl-danger">oʻzi toʻqib chiqaradi</b>.
  </div>`,
  setup(el) {
    this.edges = el.querySelectorAll('.fc-e');
  },
  enter(el) {
    gsap.set(el.querySelectorAll('.fc-node:not(.s0), .fc-lab'), { autoAlpha: 0 });
    gsap.set(this.edges, { drawSVG: '0%', autoAlpha: 0 });
  },
  step(el, ctx, n, info) {
    const d = info.instant ? 0 : 0.9;
    const map = { 1: [2], 2: [3, 4], 3: [5], 4: [6], 5: [] };
    lit(el.querySelector('.ag-code'), map[n] || []);
    for (let s = 1; s <= 4; s++) {
      const on = n >= s;
      gsap.to(el.querySelectorAll(`.fc-node.s${s}, .fc-lab.s${s}`), { autoAlpha: on ? 1 : 0, scale: on ? 1 : 0.9, transformOrigin: '50% 50%', duration: d * 0.8, stagger: d ? 0.12 : 0, ease: 'expo.out' });
      gsap.to(el.querySelectorAll(`.fc-e.s${s}`), { drawSVG: on ? '100%' : '0%', autoAlpha: on ? 1 : 0, duration: d, ease: 'power2.inOut' });
    }
  },
  notes: NOTES.agar,
};

// ---------------------------------------------------------------- Prompt lab
const LEVELS = [
  ['', 'Haftalik hisobot yoz.'],
  ['M', 'Maqsad: rahbarim 1 daqiqada oʻqib, nima boʻlganini va mendan nima kerakligini bilsin.'],
  ['A', 'Agar biror narsa yozuvlarimda boʻlmasa — oʻylab topma. Raqamlarni oʻzgartirma.'],
  ['K', 'Kontekst: men sotuv menejeriman. Yozuvlarim: 12 mijoz bilan uchrashdim, 3 ta shartnoma imzolandi, yangi narx roʻyxati tayyorlanyapti, yetkazib beruvchi 5 kun kechikyapti, chegirma boʻyicha rahbar qarori payshanbagacha kerak.'],
  ['T', 'Tartib: 4 boʻlim — Bajarildi, Jarayonda, Muammo, Sizdan kerak.'],
  ['A', 'Misol qator: «Muammo: printer buzildi — usta chaqirildi.»'],
  ['B', 'Tekshir: raqamlar toʻgʻrimi? «Sizdan kerak»da muddat bormi?'],
];
const OUT_WEAK = 'Bu hafta samarali ishladim. Koʻplab uchrashuvlar oʻtkazildi, rejalar bajarilmoqda. Kelgusi haftada ham ishni davom ettiramiz.';
const OUT_MID = 'Bu hafta 12 mijoz bilan uchrashdim va 3 ta shartnoma imzolandi. Narx roʻyxati ustida ishlayapmiz. Yetkazib beruvchi biroz kechikyapti. Chegirma masalasini ham hal qilish kerak.';
const OUT_STRONG = `✓ Bajarildi: 12 mijoz bilan uchrashuv, 3 ta shartnoma imzolandi.
… Jarayonda: yangi narx roʻyxati tayyorlanyapti.
! Muammo: yetkazib beruvchi 5 kun kechikyapti.
→ Sizdan kerak: chegirma boʻyicha qaror — payshanbagacha.`;

const lab = {
  id: 'lab',
  act: 1,
  station: 1,
  title: 'Prompt laboratoriyasi',
  time: 150,
  steps: 6,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>Jonli · Prompt laboratoriyasi</div>
    <h2 class="h1 kinetic">Promptni <span class="ink">qatlamma-qatlam</span> kuchaytiramiz</h2>
  </header>
  <div class="lb-grid" data-interactive>
    <div class="lb-left panel" data-in="2" data-anim="left">
      <div class="lb-letters">
        ${'MAKTAB'.split('').map((ch, i) => `<span data-li="${i + 1}">${ch}</span>`).join('')}
      </div>
      <textarea class="lb-prompt mono" id="lb-prompt" spellcheck="false" aria-label="Prompt matni"></textarea>
      <div class="lb-range">
        <label for="lb-level" class="mono small">qatlamlar</label>
        <input type="range" id="lb-level" min="0" max="6" step="1" value="0">
        <span class="mono small" data-level>0 / 6</span>
      </div>
    </div>
    <div class="lb-right panel" data-in="3" data-anim="right">
      <div class="lb-out-head">
        <span class="chip" data-mode>namuna javob</span>
        <button class="btn primary" data-run><span class="dot"></span>Claude’da ishga tushirish</button>
      </div>
      <div class="lb-out mono" data-out></div>
      <p class="small lb-status" data-status></p>
    </div>
  </div>`,
  setup(el, ctx) {
    const ta = el.querySelector('#lb-prompt');
    const range = el.querySelector('#lb-level');
    const out = el.querySelector('[data-out]');
    const status = el.querySelector('[data-status]');
    const mode = el.querySelector('[data-mode]');
    this.level = 0;
    const promptFor = (lv) => (lv === 0 ? LEVELS[0][1] : LEVELS.slice(1, lv + 1).map((l) => l[1]).join('\n'));
    this.apply = (lv, instant) => {
      this.level = lv;
      range.value = lv;
      el.querySelector('[data-level]').textContent = `${lv} / 6`;
      ta.value = promptFor(lv);
      ta.scrollTop = ta.scrollHeight;
      el.querySelectorAll('[data-li]').forEach((s) => s.classList.toggle('on', +s.dataset.li <= lv));
      mode.textContent = 'namuna javob';
      out.textContent = lv >= 6 ? OUT_STRONG : lv >= 3 ? OUT_MID : OUT_WEAK;
      out.classList.toggle('is-strong', lv >= 6);
      if (!instant) gsap.fromTo(out, { autoAlpha: 0.2, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5 });
      status.textContent = '';
    };
    range.addEventListener('input', () => this.apply(+range.value));
    let ctl = null;
    el.querySelector('[data-run]').addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      if (ctl) return ctl.abort();
      const m = await ctx.live.mode();
      if (m === 'offline') {
        status.textContent = errText({ code: 'offline' });
        return;
      }
      ctl = new AbortController();
      btn.lastChild.textContent = 'Toʻxtatish';
      mode.textContent = m === 'artifact' ? 'jonli · Claude' : 'jonli · Claude API';
      out.textContent = '';
      status.textContent = 'Claude oʻylayapti…';
      try {
        await ctx.live.ask(`${ta.value}\n\nJavobni oʻzbek tilida yoz.`, { signal: ctl.signal, onText: (t) => ((out.textContent = t), (status.textContent = '')) });
      } catch (err) {
        status.textContent = errText(err);
      }
      btn.lastChild.textContent = 'Claude’da ishga tushirish';
      ctl = null;
    });
    this.apply(0, true);
  },
  step(el, ctx, n, info) {
    this.apply(n, info.instant);
  },
  notes: NOTES.lab,
};

// ---------------------------------------------------------------- Chain (decomposition)
const LINKS = [
  ['1', 'Yigʻish', 'manbalardan maʼlumot', 'prompt'],
  ['2', 'Tahlil', 'asosiy fikr va raqamlar', 'model'],
  ['3', 'Yozish', 'hisobot qoralamasi', 'tool'],
  ['4', 'Tekshirish', 'faktlar va format', 'data'],
];
const chain = {
  id: 'chain',
  act: 1,
  station: 2,
  title: 'Bitta ulkan prompt oʻrniga — chain',
  time: 90,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--model)">Boʻlib ishlash</div>
    <h2 class="h1 kinetic">Bitta ulkan prompt oʻrniga — <span class="ink">chain</span></h2>
  </header>
  <div class="ch-stage">
    <div class="ch-mono panel">
      <span class="chip" data-c="danger">bitta ulkan prompt</span>
      <p class="mono">«Maʼlumot yigʻ, tahlil qil, hisobot yoz, tarjima qil, faktlarni tekshir va chiroyli formatla…»</p>
    </div>
    <div class="ch-links">
      ${LINKS.map(
        ([n, t, d, c], i) => `
        <div class="ch-link panel" style="--c:var(--${c})"><span class="mono">${n}</span><b>${t}</b><em>${d}</em></div>
        ${i < LINKS.length - 1 ? `<div class="ch-contract" data-k="${i}"><i></i><span class="mono">${i === 1 ? 'tekshiruv ✓' : 'natija →'}</span></div>` : ''}`,
      ).join('')}
    </div>
  </div>
  <div class="ch-benefits" data-step="2">
    <span class="chip" data-c="prompt">Har bir qadam — bitta vazifa</span>
    <span class="chip" data-c="model">Natija keyingi qadamga oʻtadi</span>
    <span class="chip" data-c="tool">Xato qayerda ekani darhol koʻrinadi</span>
    <span class="chip" data-c="data">Har qadamni alohida yaxshilash mumkin</span>
  </div>
  <p class="ch-tease" data-step="3">Keyingi qadam: chain’ga <b class="ink-warm">qoʻl</b> qoʻshamiz →</p>`,
  setup(el) {
    this.mono = el.querySelector('.ch-mono');
    this.links = [...el.querySelectorAll('.ch-link')];
    this.contracts = [...el.querySelectorAll('.ch-contract')];
  },
  enter(el, ctx, info) {
    gsap.set(this.links, { autoAlpha: 0, scale: 0.7 });
    gsap.set(this.contracts, { autoAlpha: 0 });
    if (!info.instant) gsap.fromTo(this.mono, { autoAlpha: 0, scale: 0.9, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1, delay: 0.35, ease: 'expo.out' });
  },
  step(el, ctx, n, info) {
    const d = info.instant ? 0 : 1;
    const split = n >= 1;
    gsap.killTweensOf([this.mono, ...this.links, ...this.contracts]);
    gsap.to(this.mono, { autoAlpha: split ? 0 : 1, scale: split ? 1.1 : 1, filter: split ? 'blur(12px)' : 'blur(0px)', duration: d * 0.6 });
    gsap.to(this.links, { autoAlpha: split ? 1 : 0, scale: split ? 1 : 0.7, x: 0, duration: d, stagger: d ? 0.12 : 0, delay: split ? d * 0.25 : 0, ease: 'back.out(1.6)' });
    gsap.to(this.contracts, { autoAlpha: split ? 1 : 0, duration: d * 0.6, stagger: d ? 0.12 : 0, delay: split ? d * 0.7 : 0 });
    if (split && !info.instant) ctx.sound?.play('snap');
  },
  notes: NOTES.chain,
};

export default [card, maktab, agar, lab, chain];
