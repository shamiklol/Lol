import { gsap, countUp } from '../core/fx.js';
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
      <p class="lead" data-in="3">Model matnni qanday oʻqiydi — va biz qanday yozishimiz kerak</p>
    </div>
  </div>`,
  notes: NOTES.act1,
};

// ---------------------------------------------------------------- Tokens
const UZ = 'Sunʼiy intellekt agentlari bugun biznesni oʻzgartirmoqda.';
const EN = 'AI agents are changing business today.';

const tokens = {
  id: 'tokens',
  act: 1,
  station: 0,
  title: 'Model tokenlarni oʻqiydi',
  time: 90,
  gl: 'dim',
  html: `
  <div class="tk-grid">
    <div class="tk-left">
      <header class="head">
        <div class="eyebrow" data-in="0" data-decode>Model nimani koʻradi?</div>
        <h2 class="h1 kinetic">Model soʻzni emas, <span class="ink-cool">tokenni</span> oʻqiydi</h2>
      </header>
      <ul class="tk-points">
        <li data-step="1"><b class="hl-tool">~2–2,7×</b> Oʻzbekcha matn inglizchaga qaraganda koʻproq token oladi: kontekst tezroq toʻladi, narx oshadi.</li>
        <li data-step="2"><b class="hl-prompt">Chegara</b> Teglar va sarlavhalar model uchun aniq chegara boʻladi — matn «bir boʻtqa» boʻlib qolmaydi.</li>
        <li data-step="2"><b class="hl-model">Ehtimol</b> Model har safar keyingi tokenni ehtimollik boʻyicha tanlaydi. Prompt shu ehtimollarni boshqaradi.</li>
      </ul>
      <p class="small tk-foot" data-in="6">GPT-4o tokenizatori (o200k) misolida. Claude tokenizatori boshqacha, lekin ishlash usuli bir xil.</p>
    </div>
    <div class="tk-right panel" data-in="2" data-anim="right" data-interactive>
      <div class="tk-row">
        <div class="tk-head"><span class="chip" data-c="prompt">Oʻzbekcha</span><b class="tk-count tabular" data-count="uz">0</b><span class="small">token</span></div>
        <textarea class="tk-input" id="tk-uz" rows="2" spellcheck="false">${UZ}</textarea>
        <div class="tk-chips" data-chips="uz"></div>
      </div>
      <div class="tk-row">
        <div class="tk-head"><span class="chip" data-c="model">English</span><b class="tk-count tabular" data-count="en">0</b><span class="small">token</span></div>
        <textarea class="tk-input" id="tk-en" rows="2" spellcheck="false">${EN}</textarea>
        <div class="tk-chips" data-chips="en"></div>
      </div>
      <div class="tk-ratio"><span class="small">farq</span><b class="ink tabular" data-ratio>×1.0</b></div>
      <p class="small tk-try">Oʻzingiz yozib koʻring — tokenlar shu zahoti qayta hisoblanadi.</p>
    </div>
  </div>`,
  async setup(el) {
    const { encode, decode } = await import('gpt-tokenizer/encoding/o200k_base');
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const render = (key) => {
      const text = el.querySelector(`#tk-${key}`).value;
      const ids = encode(text);
      const box = el.querySelector(`[data-chips="${key}"]`);
      box.innerHTML = ids
        .map((id, i) => {
          const piece = decode([id]).replace(/ /g, '·');
          return `<span class="tk-chip c${i % 5}"><i>${esc(piece)}</i><sub>${id}</sub></span>`;
        })
        .join('');
      el.querySelector(`[data-count="${key}"]`).textContent = ids.length;
      return ids.length;
    };
    const update = (animate) => {
      const u = render('uz');
      const e = render('en');
      const r = el.querySelector('[data-ratio]');
      r.textContent = `×${(u / Math.max(1, e)).toFixed(1)}`;
      if (animate) {
        gsap.fromTo(el.querySelectorAll('.tk-chip'), { autoAlpha: 0, y: 14, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(2)' });
      }
    };
    el.querySelectorAll('.tk-input').forEach((t) => t.addEventListener('input', () => update(false)));
    this.update = update;
    update(false);
  },
  enter() {
    this.update?.(true);
  },
  notes: NOTES.tokens,
};

// ---------------------------------------------------------------- Prompt = program
const CODE = `const mijoz = "{{ism}}";
if (xabar.til === "ru") javob.til = "ru";
for (const sharh of sharhlar) baholash(sharh);
function tahlil() { /* muammo → sabab → yechim */ }
return { kayfiyat, sabab, taklif };`;

const PROMPT = `Mijoz ismi: {{ism}}
Agar xabar ruscha boʻlsa — ruscha javob ber.
Har bir sharh uchun kayfiyatni aniqla.
Tahlil: 1) muammo 2) sabab 3) yechim.
Faqat JSON qaytar: kayfiyat, sabab, taklif.`;

const MAP = ['oʻzgaruvchi', 'shart', 'sikl', 'funksiya', 'natija'];

const program = {
  id: 'program',
  act: 1,
  station: 1,
  title: 'Prompt — tabiiy tildagi dastur',
  time: 105,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>Asosiy gʻoya</div>
    <h2 class="h1 kinetic">Prompt — <span class="ink-cool">tabiiy tildagi dastur</span></h2>
  </header>
  <div class="pg-grid">
    <div class="panel window pg-code" data-in="2" data-anim="left">
      <div class="window-bar"><i></i><i></i><i></i><span>dastur.js</span></div>
      <pre class="code window-body">${codeLines(CODE, 'js')}</pre>
    </div>
    <div class="pg-mid" aria-hidden="true">
      ${MAP.map((m, i) => `<div class="pg-link" data-step="${i + 1}" data-anim="scale"><span>${m}</span></div>`).join('')}
    </div>
    <div class="panel window pg-prompt" data-in="3" data-anim="right">
      <div class="window-bar"><i></i><i></i><i></i><span>prompt.txt</span></div>
      <pre class="code window-body">${codeLines(PROMPT, 'prompt')}</pre>
    </div>
  </div>
  <div class="pg-punch" data-step="6" data-anim="up">
    <span>Model — interpretator.</span> <b class="ink">Siz — dasturchi.</b>
  </div>`,
  step(el, ctx, n) {
    const lines = n >= 1 && n <= 5 ? [n] : [];
    el.querySelectorAll('.pg-code, .pg-prompt').forEach((w) => lit(w, lines));
    el.querySelectorAll('.pg-link').forEach((l, i) => l.classList.toggle('is-hot', i + 1 === n));
  },
  notes: NOTES.program,
};

// ---------------------------------------------------------------- MAKTAB
const LAYERS = [
  ['M', 'Maqsad', 'Nima kerak va nima uchun', 'Maqsad: kechikkan buyurtma haqidagi shikoyatga javob yoz — mijoz bizda qolsin.', 'prompt'],
  ['A', 'Agar', 'Shartlar va cheklovlar', 'Agar buyurtma raqami yoʻq boʻlsa — avval uni soʻra. Chegirma 10% dan oshmasin.', 'danger'],
  ['K', 'Kontekst', 'Kim, kim uchun, qanday vaziyatda', 'Sen — onlayn doʻkon yordam xizmati mutaxassissan. Mijoz 2 yildan beri xarid qiladi.', 'model'],
  ['T', 'Tartib', 'Javob qanday koʻrinishda va qancha hajmda', 'Tartib: 1) uzr 2) yechim 3) keyingi qadam. 80 soʻzdan oshmasin.', 'tool'],
  ['A', 'Aniq misol', 'Qanday javob kerakligini misolda koʻrsatish', '<misol>Hurmatli Aziza opa, kechikish uchun uzr soʻraymiz…</misol>', 'data'],
  ['B', 'Baholash', 'Javobni yuborishdan oldin oʻzini tekshirish', 'Yuborishdan oldin tekshir: yechim aniqmi? Ohang samimiymi?', 'prompt'],
];

const maktab = {
  id: 'maktab',
  act: 1,
  station: 1,
  title: 'MAKTAB freymvorki',
  time: 150,
  html: `
  <header class="head mk-head">
    <div class="eyebrow" data-in="0" data-decode>Freymvork</div>
    <h2 class="h1 kinetic"><span class="ink">MAKTAB</span>: promptning 6 qatlami</h2>
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
    .join('')}</div>`,
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
    this.pose(n, info.instant);
  },
  notes: NOTES.maktab,
};

// ---------------------------------------------------------------- Agar (logic)
const AGAR = `Mijoz xabarining turini aniqla va shunday harakat qil:
Agar maʼlumot yetarli boʻlmasa → taxmin qilma, soʻra.
Agar turi = "qaytarish" va ≤ 14 kun → qaytarish tartibini yubor.
Agar turi = "qaytarish" va > 14 kun → boshqa variant taklif qil.
Agar turi = "texnik" → 2 ta savol berib, muammoni aniqla.
Aks holda → operatorga yoʻnalt: {"handoff": true}`;

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
  time: 95,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>M · <b>A</b> · K · T · A · B</div>
    <h2 class="h1 kinetic"><span class="ink-cool">«Agar»</span> — promptdagi logika</h2>
  </header>
  <div class="ag-grid">
    <div class="panel window ag-code" data-in="2" data-anim="left">
      <div class="window-bar"><i></i><i></i><i></i><span>yordam-xizmati.prompt</span></div>
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
      ${node(20, 268, 180, 64, 'Mijoz xabari', '', 'text-2', 's0')}
      ${diamond(350, 300, 100, 62, 'Maʼlumot', 'yetarlimi?', 'prompt', 's1')}
      ${node(250, 86, 200, 64, 'Taxmin qilma —', 'aniqlab soʻra', 'danger', 's1')}
      ${diamond(610, 300, 90, 58, 'Turi?', '', 'model', 's2')}
      ${node(752, 58, 220, 68, 'qaytarish · ≤14 kun', 'Qaytarish tartibi', 'data', 's2')}
      ${node(752, 188, 220, 68, 'qaytarish · >14 kun', 'Boshqa variant', 'tool', 's2')}
      ${node(752, 318, 220, 68, 'texnik', '2 ta savol', 'model', 's3')}
      ${node(752, 448, 220, 68, 'aks holda', 'Operatorga', 'text-2', 's4')}
    </svg>
  </div>
  <div class="ag-punch panel" data-step="5" data-anim="up">
    Har bir <b class="hl-prompt">«agar»</b>ning <b class="hl-data">«aks holda»</b>si boʻlsin. Ochiq qolgan shox — <b class="hl-danger">gallyutsinatsiyaga eshik</b>.
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

// ---------------------------------------------------------------- Tuzilma
const XMLP = `<hujjat>
  … 40 sahifalik ijara shartnomasi …
</hujjat>
<qoidalar>
  Faqat hujjatdagi maʼlumotga tayan.
  Har bir javobga hujjatdan aniq parcha keltir.
</qoidalar>
<savol>
  Shartnomani muddatidan oldin bekor qilsa boʻladimi?
</savol>`;
const SCHEMA = `{
  "type": "object",
  "properties": {
    "javob":   { "enum": ["ha", "yoʻq", "shartli"] },
    "manba":   { "type": "string" },
    "ishonch": { "type": "number" }
  },
  "required": ["javob", "manba"]
}`;
const OUT = `{
  "javob": "shartli",
  "manba": "7.2-band: 60 kun oldin yozma xabar berilsa…",
  "ishonch": 0.92
}`;

const tuzilma = {
  id: 'tuzilma',
  act: 1,
  station: 1,
  title: 'Tartib: teg va sxema',
  time: 90,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>M · A · K · <b>T</b> · A · B</div>
    <h2 class="h1 kinetic"><span class="ink-cool">Tartib:</span> teg va sxema</h2>
  </header>
  <div class="tz-grid">
    <div class="tz-left">
      <div class="panel window" data-in="2" data-anim="left">
        <div class="window-bar"><i></i><i></i><i></i><span>kirish · XML teglar</span></div>
        <pre class="code window-body tz-in">${codeLines(XMLP, 'prompt')}</pre>
      </div>
      <div class="tz-tips" data-step="3">
        <span class="chip" data-c="prompt">Uzun hujjat — tepada, savol — oxirida</span>
        <span class="chip" data-c="model">Teg — model uchun chegara</span>
        <span class="chip" data-c="tool">Structured outputs: javob sxemaga qatʼiy mos</span>
      </div>
    </div>
    <div class="tz-right">
      <div class="panel window" data-step="1" data-anim="right">
        <div class="window-bar"><i></i><i></i><i></i><span>chiqish · JSON sxema</span></div>
        <pre class="code window-body tz-schema">${codeLines(SCHEMA, 'json')}</pre>
      </div>
      <div class="panel window tz-out" data-step="2" data-anim="up">
        <div class="window-bar"><i></i><i></i><i></i><span>model javobi</span></div>
        <pre class="code window-body">${codeLines(OUT, 'json')}</pre>
        <div class="tz-checks">
          <span class="chip" data-c="data">✓ javob ∈ enum</span>
          <span class="chip" data-c="data">✓ manba — hujjatdan</span>
          <span class="chip" data-c="data">✓ majburiy maydonlar bor</span>
        </div>
      </div>
    </div>
  </div>`,
  step(el, ctx, n, info) {
    if (n >= 2 && !info.instant) {
      gsap.fromTo(el.querySelectorAll('.tz-checks .chip'), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, stagger: 0.25, duration: 0.6, delay: 0.5, ease: 'expo.out' });
    }
  },
  notes: NOTES.tuzilma,
};

// ---------------------------------------------------------------- Andoza (few-shot)
const DOTS = 44;
const andoza = {
  id: 'andoza',
  act: 1,
  station: 1,
  title: 'Aniq misol kuchi',
  time: 75,
  html: `
  <div class="an-grid">
    <div class="an-left">
      <header class="head">
        <div class="eyebrow" data-in="0" data-decode>M · A · K · T · <b>A</b> · B</div>
        <h2 class="h1 kinetic"><span class="ink-cool">Aniq misol:</span> bitta yaxshi misol oʻnta qoidadan kuchli</h2>
      </header>
      <ul class="an-tips">
        <li data-in="3">Misollar <b>xilma-xil</b> boʻlsin: oddiy, murakkab va nostandart holat.</li>
        <li data-in="4">Misollarni <b class="hl-model">&lt;misol&gt;</b> teglariga oʻrang — qoidalardan ajralib tursin.</li>
        <li data-in="5">Model misoldagi <b class="hl-danger">hamma narsani</b> koʻchiradi: uzunlikni ham, xatoni ham.</li>
      </ul>
    </div>
    <div class="an-right panel" data-in="2" data-anim="right">
      <div class="an-top">
        <span class="chip" data-c="danger" data-step-out="1">0 ta misol · javoblar tarqoq</span>
        <span class="chip an-chip2" data-c="data" data-step="1">3 ta misol · javoblar bir nishonda</span>
      </div>
      <svg class="an-target" viewBox="-300 -230 600 460" aria-hidden="true">
        <circle r="210" class="an-ring"/><circle r="140" class="an-ring"/><circle r="70" class="an-ring"/><circle r="16" class="an-bull"/>
        ${Array.from({ length: DOTS }, (_, i) => `<circle class="an-dot" r="7" data-i="${i}"/>`).join('')}
      </svg>
      <div class="an-examples" data-step="1">
        <span class="mono">&lt;misol&gt; oddiy</span><span class="mono">&lt;misol&gt; murakkab</span><span class="mono">&lt;misol&gt; nostandart</span>
      </div>
    </div>
  </div>`,
  setup(el) {
    const rnd = (a) => (Math.random() - 0.5) * a;
    this.dots = [...el.querySelectorAll('.an-dot')].map((d) => {
      const ang = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 190;
      const ta = Math.random() * Math.PI * 2;
      const tr = Math.sqrt(Math.random()) * 38;
      return { el: d, wide: [Math.cos(ang) * r + rnd(40), Math.sin(ang) * r * 0.9 + rnd(30)], tight: [Math.cos(ta) * tr, Math.sin(ta) * tr] };
    });
    this.dots.forEach((d) => gsap.set(d.el, { attr: { cx: d.wide[0], cy: d.wide[1] } }));
  },
  step(el, ctx, n, info) {
    const tight = n >= 1;
    this.dots.forEach((d, i) => {
      const p = tight ? d.tight : d.wide;
      gsap.to(d.el, { attr: { cx: p[0], cy: p[1] }, duration: info.instant ? 0 : 1.4, delay: info.instant ? 0 : i * 0.012, ease: 'expo.inOut' });
      d.el.classList.toggle('is-tight', tight);
    });
  },
  notes: NOTES.andoza,
};

// ---------------------------------------------------------------- Fikrlash (reasoning)
const OLD = `Qadam-baqadam oʻyla.
1) Avval matnni oʻqi.
2) Keyin asosiy fikrlarni yoz.
3) Soʻng ularni tartibla.
4) Oxirida xulosa chiqar.`;
const NEW = `<maqsad>Investor 1 daqiqada oʻqiydigan xulosa.</maqsad>
<talab>Raqamlar aniq, xavflar yashirilmagan.</talab>
<cheklov>120 soʻz. Jargon yoʻq.</cheklov>
Javob berishdan oldin raqamlarni manba bilan solishtir.`;

const fikrlash = {
  id: 'fikrlash',
  act: 1,
  station: 1,
  title: 'Reasoning modellar',
  time: 90,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>Yangi avlod · 2026</div>
    <h2 class="h1 kinetic">Reasoning modellar: <span class="ink-cool">qadamni emas, maqsadni bering</span></h2>
  </header>
  <div class="fk-grid">
    <div class="panel window fk-old" data-in="2" data-anim="left">
      <div class="window-bar"><i></i><i></i><i></i><span>oldin · har qadamni yozib berardik</span></div>
      <pre class="code window-body">${codeLines(OLD, 'prompt')}</pre>
    </div>
    <div class="fk-vs mono" data-in="3" aria-hidden="true">→</div>
    <div class="panel window fk-new" data-in="4" data-anim="right">
      <div class="window-bar"><i></i><i></i><i></i><span>hozir · maqsad + talab</span></div>
      <pre class="code window-body">${codeLines(NEW, 'prompt')}</pre>
    </div>
  </div>
  <div class="fk-effort panel" data-step="1" data-anim="up">
    <div class="fk-effort-head"><b>effort</b><span class="small">model qancha oʻylashini oʻzi tanlaydi — siz faqat chegarasini berasiz</span></div>
    <div class="fk-scale">
      ${['low', 'medium', 'high', 'xhigh', 'max'].map((l, i) => `<div class="fk-lvl" style="--i:${i}"><i></i><span class="mono">${l}</span></div>`).join('')}
    </div>
    <div class="fk-notes">
      <span><b class="hl-data">Oddiy vazifa</b> → low: tez va arzon</span>
      <span><b class="hl-tool">Murakkab tahlil</b> → high: chuqurroq, sekinroq</span>
    </div>
  </div>`,
  step(el, ctx, n, info) {
    if (n >= 1 && !info.instant) {
      gsap.fromTo(el.querySelectorAll('.fk-lvl i'), { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'expo.out' });
    }
  },
  notes: NOTES.fikrlash,
};

// ---------------------------------------------------------------- Baholash (evals)
const VERSIONS = [
  ['v1', 19, 'prompt'],
  ['v2', 24, 'model'],
  ['v3', 28, 'data'],
];
const baholash = {
  id: 'baholash',
  act: 1,
  station: 1,
  title: 'Testsiz prompt — taxmin',
  time: 90,
  html: `
  <header class="head">
    <div class="eyebrow" data-in="0" data-decode>M · A · K · T · A · <b>B</b></div>
    <h2 class="h1 kinetic"><span class="ink-cool">Baholash:</span> testsiz prompt — bu taxmin</h2>
  </header>
  <div class="ev-flow" data-in="2" data-anim="fade">
    <div class="ev-step panel"><span class="mono small">1</span><b>Prompt</b><em>v1</em></div>
    <i class="ev-arrow"></i>
    <div class="ev-step panel"><span class="mono small">2</span><b>Test toʻplami</b><em>30 ta real holat</em></div>
    <i class="ev-arrow"></i>
    <div class="ev-step panel"><span class="mono small">3</span><b>LLM-hakam</b><em>jadval boʻyicha baho qoʻyadi</em></div>
    <i class="ev-arrow"></i>
    <div class="ev-step panel"><span class="mono small">4</span><b>Xatolar tahlili</b><em>→ yangi versiya</em></div>
  </div>
  <div class="ev-bottom">
    <div class="ev-chart panel" data-step="1" data-anim="up">
      ${VERSIONS.map(
        ([v, ok, c], i) => `
        <div class="ev-bar" style="--c:var(--${c})" data-step="${i + 1}" data-anim="fade">
          <b class="tabular" data-pct="${Math.round((ok / 30) * 100)}">0%</b>
          <div class="ev-col"><i style="height:${(ok / 30) * 100}%"></i></div>
          <span class="mono">${v} · ${ok}/30</span>
        </div>`,
      ).join('')}
    </div>
    <div class="ev-fails panel" data-step="1" data-anim="right">
      <p class="mono small">v1 da 11 ta xato qayerda?</p>
      <div class="ev-fail"><span>Format buzilgan</span><i style="--w:5"></i><b>5</b></div>
      <div class="ev-fail"><span>Ohang notoʻgʻri</span><i style="--w:4"></i><b>4</b></div>
      <div class="ev-fail"><span>Fakt xatosi</span><i style="--w:2"></i><b>2</b></div>
      <p class="small ev-tip">Xato turini koʻrsangiz — promptning qaysi qatlamini tuzatishni bilasiz.</p>
    </div>
  </div>`,
  step(el, ctx, n, info) {
    el.querySelectorAll('.ev-bar').forEach((b, i) => {
      const on = n >= i + 1;
      const col = b.querySelector('.ev-col i');
      const pct = b.querySelector('[data-pct]');
      if (on && !b._on) {
        if (info.instant) {
          gsap.set(col, { scaleY: 1 });
          pct.textContent = pct.dataset.pct + '%';
        } else {
          gsap.fromTo(col, { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 1.2, ease: 'expo.out' });
          countUp(pct, +pct.dataset.pct, { suffix: '%', duration: 1.2 });
        }
      }
      if (!on) {
        gsap.set(col, { scaleY: 0 });
        pct.textContent = '0%';
      }
      b._on = on;
    });
  },
  leave(el) {
    el.querySelectorAll('.ev-bar').forEach((b) => (b._on = false));
  },
  notes: NOTES.baholash,
};

// ---------------------------------------------------------------- Prompt lab
const LEVELS = [
  ['', 'Termos haqida tavsif yoz.'],
  ['M', 'Maqsad: marketpleysdagi termos sahifasi uchun sotadigan tavsif yoz.'],
  ['A', 'Agar biror xususiyat berilmagan boʻlsa — oʻylab topma.'],
  ['K', 'Kontekst: 0,5 l, 12 soat issiq saqlaydi, zanglamas poʻlat. Xaridor — talabalar va haydovchilar.'],
  ['T', 'Tartib: sarlavha (60 belgigacha) + 3 ta afzallik + 1 ta chaqiriq.'],
  ['A', '<misol>Sarlavha: Ertalabki choy — kechgacha issiq</misol>'],
  ['B', 'Yuborishdan oldin tekshir: raqamlar kontekstdagiga mosmi?'],
];
const SCORES = [12, 30, 44, 61, 75, 88, 96];
const OUT_WEAK = 'Termos — issiqlikni saqlaydigan idish. U choy va kofe uchun qulay. Sifatli materialdan tayyorlangan. Uyda va safarda foydalanish mumkin.';
const OUT_STRONG = `Sarlavha: Ertalab damlangan choy — kechqurun ham issiq
• 12 soat issiqlik: darsdan keyin ham choyingiz sovumaydi
• 0,5 litr: kun boʻyi yetadi, sumkaga bemalol sigʻadi
• Zanglamas poʻlat: hid va taʼm qoldirmaydi
Buyurtma bering — qishki tongingiz issiq choy bilan boshlansin.`;

const lab = {
  id: 'lab',
  act: 1,
  station: 1,
  title: 'Prompt laboratoriyasi',
  time: 95,
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
        <div class="lb-score"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="lb-track"/><circle cx="22" cy="22" r="19" class="lb-arc"/></svg><b class="tabular" data-score>12</b></div>
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
    const score = el.querySelector('[data-score]');
    const arc = el.querySelector('.lb-arc');
    const C = 2 * Math.PI * 19;
    arc.style.strokeDasharray = C;
    this.level = 0;
    const promptFor = (lv) => (lv === 0 ? LEVELS[0][1] : LEVELS.slice(1, lv + 1).map((l) => l[1]).join('\n'));
    this.apply = (lv, instant) => {
      this.level = lv;
      range.value = lv;
      el.querySelector('[data-level]').textContent = `${lv} / 6`;
      ta.value = promptFor(lv);
      el.querySelectorAll('[data-li]').forEach((s) => s.classList.toggle('on', +s.dataset.li <= lv));
      const sc = SCORES[lv];
      gsap.to(arc, { strokeDashoffset: C * (1 - sc / 100), duration: instant ? 0 : 0.9, ease: 'expo.out' });
      if (instant) score.textContent = sc;
      else countUp(score, sc, { duration: 0.9 });
      score.dataset.from = sc;
      mode.textContent = 'namuna javob';
      out.textContent = lv >= 6 ? OUT_STRONG : lv >= 3 ? OUT_WEAK.replace('Sifatli materialdan tayyorlangan.', 'Hajmi 0,5 litr, 12 soat issiq saqlaydi.') : OUT_WEAK;
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
  time: 75,
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
        ${i < LINKS.length - 1 ? `<div class="ch-contract" data-k="${i}"><i></i><span class="mono">${i === 1 ? 'tekshiruv ✓' : 'JSON'}</span></div>` : ''}`,
      ).join('')}
    </div>
  </div>
  <div class="ch-benefits" data-step="2">
    <span class="chip" data-c="prompt">Har bir qadam — bitta vazifa</span>
    <span class="chip" data-c="model">Qadamlar orasida — aniq format</span>
    <span class="chip" data-c="tool">Xato qayerda ekani darhol koʻrinadi</span>
    <span class="chip" data-c="data">Har bir qadam alohida test qilinadi</span>
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

export default [card, tokens, program, maktab, agar, tuzilma, andoza, fikrlash, baholash, lab, chain];
