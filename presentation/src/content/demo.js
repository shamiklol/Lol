// Page tools for the live agent. Data is fictional and marked "demo" everywhere it shows.

const EVENTS = {
  toshkent: [
    { id: 'e1', nomi: 'AI Builders Meetup', sana: '2026-10-10', joy: 'IT hub, Toshkent', narx_som: 0, format: 'oflayn' },
    { id: 'e2', nomi: 'Prompt Engineering Workshop', sana: '2026-10-17', joy: 'Kovorking markazi, Toshkent', narx_som: 150000, format: 'oflayn' },
    { id: 'e3', nomi: 'Agents & Automation Day', sana: '2026-10-24', joy: 'Universitet auditoriyasi, Toshkent', narx_som: 250000, format: 'gibrid' },
  ],
  samarqand: [
    { id: 'e4', nomi: 'Samarqand Tech Talks', sana: '2026-10-15', joy: 'Registon yaqinidagi kovorking', narx_som: 50000, format: 'oflayn' },
    { id: 'e5', nomi: 'AI for Tourism Hackathon', sana: '2026-10-26', joy: 'Universitet kampusi, Samarqand', narx_som: 0, format: 'oflayn' },
  ],
};

const WEATHER = {
  '2026-10-10': { harorat: 21, yogin_ehtimoli: 10, holat: 'quyoshli' },
  '2026-10-17': { harorat: 17, yogin_ehtimoli: 60, holat: 'yomgʻirli' },
  '2026-10-24': { harorat: 15, yogin_ehtimoli: 20, holat: 'bulutli' },
};

const RATES = { UZS: 1, USD: 12700, EUR: 13900, RUB: 145 };

const norm = (s) => String(s || '').toLowerCase().replace(/[ʻʼ'‘’`]/g, '').trim();

function hashWeather(city, date) {
  let h = 0;
  for (const ch of city + date) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return { harorat: 10 + (h % 14), yogin_ehtimoli: (h >> 3) % 80, holat: ['quyoshli', 'bulutli', 'yomgʻirli'][(h >> 5) % 3] };
}

export function createDemoTools(ui) {
  return [
    {
      name: 'search_events',
      description: 'Berilgan shahar va oy boʻyicha tadbirlarni qidiradi. Natija: tadbirlar roʻyxati (nomi, sana, joy, narx soʻmda). Demo maʼlumotlar.',
      input_schema: {
        type: 'object',
        properties: {
          city: { type: 'string', description: 'Shahar nomi, masalan: Toshkent' },
          month: { type: 'string', description: 'Oy, YYYY-MM formatida, masalan: 2026-10' },
          topic: { type: 'string', description: 'Mavzu, masalan: AI (ixtiyoriy)' },
        },
        required: ['city', 'month'],
      },
      run({ city, month }) {
        const key = norm(city).startsWith('samar') ? 'samarqand' : norm(city).startsWith('tosh') || norm(city).startsWith('tash') ? 'toshkent' : null;
        const list = (key ? EVENTS[key] : []).filter((e) => !month || e.sana.startsWith(String(month).slice(0, 7)));
        return { demo: true, soni: list.length, tadbirlar: list };
      },
    },
    {
      name: 'get_weather',
      description: 'Shahar va sana boʻyicha ob-havo prognozini qaytaradi: harorat (°C), yogʻingarchilik ehtimoli (%), holat. Sana formati: YYYY-MM-DD. Demo maʼlumotlar.',
      input_schema: {
        type: 'object',
        properties: {
          city: { type: 'string', description: 'Shahar nomi' },
          date: { type: 'string', description: 'Sana, YYYY-MM-DD' },
        },
        required: ['city', 'date'],
      },
      run({ city, date }) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) throw new Error('Sana YYYY-MM-DD formatida boʻlishi kerak, masalan: 2026-10-17');
        return { demo: true, city, date, ...(WEATHER[date] || hashWeather(norm(city), date)) };
      },
    },
    {
      name: 'calculate',
      description: 'Arifmetik ifodani aniq hisoblaydi. Faqat raqamlar, + - * / va qavslar. Masalan: 450000*2 + 180000*3. Hisob-kitobni hech qachon oʻzing qilma — shu tool’dan foydalan.',
      input_schema: {
        type: 'object',
        properties: { expression: { type: 'string', description: 'Ifoda, masalan: (3*120000)*2' } },
        required: ['expression'],
      },
      run({ expression }) {
        const ex = String(expression).replace(/\s+/g, '').replace(/,/g, '.');
        if (!/^[\d.+\-*/()]+$/.test(ex)) throw new Error('Faqat raqamlar va + - * / ( ) ruxsat etilgan');
        // eslint-disable-next-line no-new-func
        const v = Function(`"use strict";return (${ex})`)();
        if (!Number.isFinite(v)) throw new Error('Natija son emas');
        return { ifoda: expression, natija: Math.round(v * 100) / 100 };
      },
    },
    {
      name: 'convert_currency',
      description: 'Summani bir valyutadan boshqasiga oʻtkazadi. Valyutalar: UZS, USD, EUR, RUB. Demo kurs (1 USD = 12 700 soʻm).',
      input_schema: {
        type: 'object',
        properties: {
          amount: { type: 'number', description: 'Summa' },
          from: { type: 'string', description: 'Qaysi valyutadan: UZS, USD, EUR, RUB' },
          to: { type: 'string', description: 'Qaysi valyutaga' },
        },
        required: ['amount', 'from', 'to'],
      },
      run({ amount, from, to }) {
        const f = String(from).toUpperCase();
        const t = String(to).toUpperCase();
        if (!RATES[f] || !RATES[t]) throw new Error('Qoʻllab-quvvatlanadigan valyutalar: UZS, USD, EUR, RUB');
        const v = (Number(amount) * RATES[f]) / RATES[t];
        return { demo_kurs: true, summa: Number(amount), dan: f, ga: t, natija: Math.round(v * 100) / 100 };
      },
    },
    {
      name: 'create_report',
      description: 'Yakuniy hisobotni ekranda koʻrsatadi. Vazifa oxirida bir marta chaqiring. Qisqa boʻlimlar: har birida sarlavha va 1–2 gap.',
      input_schema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Hisobot sarlavhasi' },
          sections: {
            type: 'array',
            description: 'Boʻlimlar',
            items: { type: 'object', properties: { heading: { type: 'string' }, text: { type: 'string' } }, required: ['heading', 'text'] },
          },
        },
        required: ['title', 'sections'],
      },
      run({ title, sections }) {
        ui?.report?.(String(title), Array.isArray(sections) ? sections.slice(0, 5) : []);
        return { ok: true, hisobot_id: 'R-' + (100 + Math.floor(Math.random() * 900)) };
      },
    },
    {
      name: 'send_message',
      description: 'Xabarni qabul qiluvchiga yuboradi (demo: xabar ekranda koʻrinadi). Faqat vazifada yuborish soʻralgan boʻlsa ishlating.',
      input_schema: {
        type: 'object',
        properties: {
          to: { type: 'string', description: 'Qabul qiluvchi, masalan: Jamoa (Telegram)' },
          text: { type: 'string', description: 'Xabar matni, 300 belgigacha' },
        },
        required: ['to', 'text'],
      },
      run({ to, text }) {
        ui?.message?.(String(to), String(text).slice(0, 400));
        return { ok: true, yetkazildi: true, kanal: 'demo' };
      },
    },
  ];
}

export const AGENT_RULES = `Sen — Shams.labs taqdimotidagi demo agentsan. Foydalanuvchi vazifasini berilgan tool’lar yordamida bajar.
Qoidalar:
- Faqat tool’lar qaytargan maʼlumotga tayan, hech narsani oʻylab topma.
- Bir-biriga bogʻliq boʻlmagan tool’larni bir vaqtda (parallel) chaqir.
- Hisob-kitobni oʻzing qilma — calculate tool’idan foydalan.
- Oxirida create_report bilan hisobot tuz; vazifada yuborish soʻralgan boʻlsa, send_message bilan yubor.
- 8 ta tool chaqiruvidan oshma.
- Yakuniy javobni oʻzbek tilida, 3–4 gapda yoz.`;

export const PRESETS = [
  {
    id: 'events',
    label: 'Tadbir tanlash',
    task: 'Oktabrda Toshkentda boʻladigan AI tadbirlarini top, har biri uchun ob-havoni tekshir, eng mosini tanla va jamoaga qisqa xabar yubor.',
  },
  {
    id: 'budget',
    label: 'Safar byudjeti',
    task: 'Samarqandga 3 kishilik 2 kunlik safar byudjetini hisobla va dollarda hisobot tuz. Mehmonxona — bir kecha 450 000 soʻm (2 kecha), poyezd — kishi boshiga 180 000 soʻm, ovqat — kishi boshiga kuniga 120 000 soʻm.',
  },
];

// Recorded runs replayed when no live connection is available (and by the showpiece).
// Each event: [delaySeconds, kind, payload]
export const TRACES = {
  events: [
    [0.6, 'think', 'Reja: tadbirlarni topaman → har biri uchun ob-havoni tekshiraman → eng mosini tanlab, hisobot tuzaman → jamoaga yuboraman.'],
    [1.2, 'call', { name: 'search_events', input: { city: 'Toshkent', month: '2026-10', topic: 'AI' } }],
    [1.4, 'result', { name: 'search_events', summary: '3 ta tadbir: 10, 17, 24-oktabr' }],
    [0.8, 'call', { name: 'get_weather', input: { city: 'Toshkent', date: '2026-10-10' } }],
    [0.15, 'call', { name: 'get_weather', input: { city: 'Toshkent', date: '2026-10-17' } }],
    [0.15, 'call', { name: 'get_weather', input: { city: 'Toshkent', date: '2026-10-24' } }],
    [1.3, 'result', { name: 'get_weather', summary: '10-okt: +21°C, quyoshli · 17-okt: yomgʻir 60% · 24-okt: bulutli' }],
    [0.9, 'think', 'Eng mosi — 10-oktabr: bepul va havo quyoshli.'],
    [0.8, 'call', { name: 'create_report', input: { title: 'Oktabrdagi AI tadbirlari', sections: 3 } }],
    [1.1, 'result', { name: 'create_report', summary: 'hisobot R-214 tayyor' }],
    [0.6, 'call', { name: 'send_message', input: { to: 'Jamoa (Telegram)', text: 'AI Builders Meetup, 10-oktabr…' } }],
    [1.0, 'result', { name: 'send_message', summary: 'yetkazildi' }],
    [0.8, 'final', 'Eng mos variant — 10-oktabrdagi «AI Builders Meetup»: bepul, havo quyoshli (+21°C). 17-oktabrda yomgʻir ehtimoli 60%. Hisobot tayyor va jamoaga yuborildi.'],
  ],
  budget: [
    [0.6, 'think', 'Reja: xarajatlarni calculate bilan hisoblayman → dollarga oʻtkazaman → hisobot tuzaman.'],
    [1.0, 'call', { name: 'calculate', input: { expression: '450000*2 + 180000*3 + 120000*3*2' } }],
    [1.1, 'result', { name: 'calculate', summary: '2 160 000 soʻm' }],
    [0.6, 'call', { name: 'convert_currency', input: { amount: 2160000, from: 'UZS', to: 'USD' } }],
    [1.0, 'result', { name: 'convert_currency', summary: '≈ 170,08 USD (demo kurs)' }],
    [0.7, 'call', { name: 'create_report', input: { title: 'Samarqand safari byudjeti', sections: 3 } }],
    [1.0, 'result', { name: 'create_report', summary: 'hisobot R-318 tayyor' }],
    [0.8, 'final', 'Jami: 2 160 000 soʻm ≈ 170 USD (demo kurs). Eng katta xarajat — mehmonxona (42%). Hisobot ekranda.'],
  ],
};

export const TRACE_REPORTS = {
  events: {
    title: 'Oktabrdagi AI tadbirlari',
    sections: [
      { heading: 'Tavsiya', text: 'AI Builders Meetup — 10-oktabr, bepul, havo quyoshli (+21°C).' },
      { heading: 'Zaxira variant', text: 'Prompt Engineering Workshop — 17-oktabr, 150 000 soʻm, yomgʻir ehtimoli 60%.' },
      { heading: 'Keyingi qadam', text: 'Roʻyxatdan oʻtish havolasini jamoaga yuborish.' },
    ],
    message: ['Jamoa (Telegram)', 'Doʻstlar, 10-oktabr kuni AI Builders Meetup boʻladi — bepul, havo ham zoʻr. Boramizmi?'],
  },
  budget: {
    title: 'Samarqand safari byudjeti',
    sections: [
      { heading: 'Jami', text: '2 160 000 soʻm ≈ 170 USD (demo kurs).' },
      { heading: 'Tarkibi', text: 'Mehmonxona 900 000 · poyezd 540 000 · ovqat 720 000 soʻm.' },
      { heading: 'Eʼtibor', text: 'Eng katta xarajat — mehmonxona (42%). Arzonroq variantlarni solishtirib koʻring.' },
    ],
  },
};
