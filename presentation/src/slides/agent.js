import * as THREE from 'three';
import { gsap } from '../core/fx.js';
import { NOTES } from '../content/notes.js';
import { TOOLS } from '../gl/agent.js';
import { PRESETS, TRACES, TRACE_REPORTS, AGENT_RULES, createDemoTools } from '../content/demo.js';
import { errText } from '../core/live.js';
import { clock } from '../core/clock.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const short = (o, n = 70) => {
  const s = typeof o === 'string' ? o : JSON.stringify(o);
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
};
const fmtT = (s) => {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
};

function traceLine(kind, t, a, b = '') {
  const K = { think: '◆ reja', call: '→ tool_use', result: '← tool_result', final: '✓ javob', error: '× xato', info: '· holat' };
  return `<div class="tr tr-${kind}"><span class="tr-t mono">${fmtT(t)}</span><span class="tr-k mono">${K[kind]}</span><span class="tr-a">${esc(a)}</span>${b ? `<code class="tr-b">${esc(b)}</code>` : ''}</div>`;
}

export function summarize(name, r) {
  if (!r) return '';
  if (r.error) return 'xato: ' + r.error;
  const x = r.result ?? r;
  switch (name) {
    case 'search_events':
      return `${x.soni} ta tadbir` + (x.tadbirlar?.length ? ': ' + x.tadbirlar.map((e) => e.sana.slice(5)).join(', ') : '');
    case 'get_weather':
      return `${x.date}: ${x.harorat}°C, ${x.holat}, yogʻin ${x.yogin_ehtimoli}%`;
    case 'calculate':
      return `= ${Number(x.natija).toLocaleString('uz-UZ')}`;
    case 'convert_currency':
      return `≈ ${x.natija} ${x.ga} (demo kurs)`;
    case 'create_report':
      return `hisobot ${x.hisobot_id} tayyor`;
    case 'send_message':
      return 'yetkazildi (demo)';
    default:
      return short(x, 60);
  }
}

// ---------------------------------------------------------------- Showpiece: assembly
const CAPS = [
  ['01', 'LLM', 'Miya bor, qoʻl yoʻq. Matn oladi — matn qaytaradi.'],
  ['02', 'Tizim prompti', 'Rol, maqsad va qoidalar — agentning xarakteri.'],
  ['03', 'Vositalar', 'Har biri — aniq kontrakt: nom, tavsif, sxema.'],
  ['04', 'Xotira', 'Qisqa muddatli — kontekst. Uzoq muddatli — fayl va baza.'],
  ['05', 'Sikl', 'Oʻyla → Harakat qil → Kuzat. Vazifa bajarilguncha.'],
  ['06', 'Ishga tushirish', 'Vazifa keldi: agent reja tuzadi va vositalarni zanjir qiladi.'],
  ['07', 'Tayyor', ''],
];
const STAGE_AT = [0, 7, 14, 27, 33, 40, 62, 71];
const RUN_SCALE = 1.45;

const assembly = {
  id: 'assembly',
  act: 2,
  station: 4,
  title: 'Shoupis: agentni yigʻamiz',
  time: 130,
  gl: 'agent',
  hideHud: false,
  steps: 6,
  html: `
  <div class="as-labels-wrap"><div class="as-labels ag-layer" aria-hidden="true"></div></div>
  <div class="as-shade" aria-hidden="true"></div>
  <div class="as-head">
    <div class="eyebrow" data-decode style="--accent:var(--tool)">Shoupis · agent yigʻilmoqda</div>
  </div>
  <div class="as-caps">
    ${CAPS.map(([n, t, d], i) => `<div class="as-cap" data-c="${i}"><span class="as-num mono">${n}<i>/07</i></span><h3>${t}</h3>${d ? `<p>${d}</p>` : ''}</div>`).join('')}
  </div>
  <div class="as-task panel"><span class="chip" data-c="prompt">vazifa</span><p>${PRESETS[0].task}</p></div>
  <div class="as-trace panel">
    <div class="as-trace-head mono"><span>trace</span><span>agent · 6 vosita</span></div>
    <div class="as-trace-body"></div>
  </div>
  <div class="as-final">
    <h2 class="as-final-t">Bu — <span class="ink-warm">agent</span>.</h2>
    <p class="as-final-s mono">model + prompt + vositalar + xotira + sikl</p>
  </div>
  <button class="btn as-play" data-play><span class="dot" style="color:var(--tool)"></span>Toʻliq ijro · 70 s</button>`,
  setup(el, ctx) {
    if (!ctx.gl) return;
    const gl = ctx.gl;
    const A = gl.ensureAgent(ctx.index);
    this.A = A;
    this.layer = el.querySelector('.as-labels');
    const caps = [...el.querySelectorAll('.as-cap')];
    const task = el.querySelector('.as-task');
    const trace = el.querySelector('.as-trace');
    const body = el.querySelector('.as-trace-body');
    const fin = el.querySelector('.as-final');

    // pre-render the trace so the timeline only reveals lines (seekable for video)
    let t = 0;
    const rows = [];
    for (const [dt, kind, payload] of TRACES.events) {
      t += dt * RUN_SCALE;
      if (kind === 'think' || kind === 'final') rows.push({ t, kind, html: traceLine(kind, t, payload) });
      if (kind === 'call') rows.push({ t, kind, name: payload.name, html: traceLine('call', t, payload.name, short(payload.input, 46)) });
      if (kind === 'result') rows.push({ t, kind, name: payload.name, html: traceLine('result', t, payload.name, payload.summary) });
    }
    body.innerHTML = rows.map((r) => r.html).join('');
    const lines = [...body.children];

    gsap.set(caps, { autoAlpha: 0, y: 30 });
    gsap.set([task, trace, fin], { autoAlpha: 0 });
    gsap.set(lines, { autoAlpha: 0, x: 20, display: 'none' });
    const wrap = el.querySelector('.as-labels-wrap');
    const shade = el.querySelector('.as-shade');
    gsap.set(shade, { autoAlpha: 0 });

    const cam = gl.cam;
    const orbit = { th: -0.3, r: 11, h: 3.2, x: 0 };
    const applyOrbit = () => {
      if (!this.active) return;
      cam.off.set(Math.sin(orbit.th) * orbit.r + orbit.x, orbit.h, Math.cos(orbit.th) * orbit.r);
      cam.look.set(orbit.x, 3.2, 0);
    };

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
    const S = STAGE_AT;
    const L = ['s0', 's1', 's2', 's3', 's4', 's5', 's6', 'end'];
    L.forEach((l, i) => tl.addLabel(l, S[i]));
    tl.eventCallback('onUpdate', applyOrbit);
    tl.to(orbit, { th: 0.32, duration: S[7], ease: 'none' }, 0);
    tl.to(orbit, { r: 13.5, duration: 7 }, 0);
    tl.to(orbit, { r: 16.5, duration: 6 }, S[1]);
    tl.to(orbit, { r: 18.5, duration: 10 }, S[2]);
    tl.to(orbit, { r: 19.5, h: 3.6, duration: 8 }, S[4]);
    tl.to(orbit, { x: 5.2, r: 21, duration: 2.4, ease: 'power3.inOut' }, S[5] + 2.4);
    tl.to(orbit, { x: 0, r: 30, h: 4.4, duration: 6, ease: 'power3.inOut' }, S[6]);

    // captions: one visible per stage
    caps.forEach((c, i) => {
      tl.to(c, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, S[i] + 0.2);
      if (i < caps.length - 1) tl.to(c, { autoAlpha: 0, y: -24, duration: 0.5, ease: 'power2.in' }, S[i + 1] - 0.1);
    });

    // 01 · core
    tl.fromTo(A.p, { fade: 0 }, { fade: 1, duration: 0.8 }, 0);
    tl.fromTo(A.p, { core: 0 }, { core: 1, duration: 5, ease: 'power2.inOut' }, 0.6);
    tl.fromTo(A.p, { pulse: 0 }, { pulse: 1, duration: 0.3, yoyo: true, repeat: 1 }, 5.6);
    // 02 · system prompt rings
    tl.fromTo(A.p, { rings: 0 }, { rings: 1, duration: 3.5 }, S[1] + 0.5);
    // 03 · tools
    TOOLS.forEach((_, i) => {
      const at = S[2] + 0.5 + i * 1.9;
      tl.fromTo(A.toolP[i], { t: 0 }, { t: 1, duration: 1.7, ease: 'power2.out' }, at);
      tl.fromTo(A.toolP[i], { flash: 0 }, { flash: 1, duration: 0.08, ease: 'none' }, at + 1.45);
      tl.to(A.toolP[i], { flash: 0, duration: 0.9, ease: 'power2.out' }, at + 1.55);
      tl.call(() => ctx.sound?.play('snap'), null, at + 1.45);
    });
    // 04 · memory
    tl.fromTo(A.p, { memory: 0 }, { memory: 1, duration: 2.6 }, S[3] + 0.4);
    // 05 · loop
    tl.fromTo(A.p, { loop: 0 }, { loop: 1, duration: 0.6 }, S[4] + 0.3);
    tl.fromTo(A.p, { loopDraw: 0 }, { loopDraw: 1, duration: 2.6, ease: 'power2.inOut' }, S[4] + 0.3);
    tl.fromTo(A.p, { glow: 0 }, { glow: 1, duration: 0.8 }, S[4] + 2.9);
    tl.fromTo(A.p, { phase: 0 }, { phase: 1, duration: 3.4, ease: 'power1.inOut' }, S[4] + 3.1);
    // 06 · run
    const R = S[5];
    tl.fromTo(task, { autoAlpha: 0, y: -30, scale: 1 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out' }, R + 0.2);
    tl.to(task, { autoAlpha: 0, scale: 0.35, y: 260, duration: 0.8, ease: 'power3.in' }, R + 2.6);
    tl.add(A.packet(() => new THREE.Vector3(0, 6.5, 1), () => A.corePos(), { dur: 0.9, color: '#9ff1ff', persist: true }), R + 3.0);
    tl.fromTo(trace, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'expo.out' }, R + 3.2);
    const T0 = R + 3.6;
    rows.forEach((r, i) => {
      const at = T0 + r.t;
      tl.set(lines[i], { display: 'grid' }, at);
      tl.to(lines[i], { autoAlpha: 1, x: 0, duration: 0.5, ease: 'expo.out' }, at);
      const ti = r.name ? A.toolIndex(r.name) : -1;
      if (r.kind === 'think') tl.add(A.think(0.9), at);
      if (r.kind === 'call' && ti >= 0) tl.add(A.callTool(ti, { dur: 0.8, persist: true }), at);
      if (r.kind === 'result' && ti >= 0) tl.add(A.returnTool(ti, { dur: 0.8, persist: true }), at);
      if (r.kind === 'final') tl.fromTo(A.p, { pulse: 0 }, { pulse: 1, duration: 0.25, yoyo: true, repeat: 1 }, at);
    });
    // 07 · final
    tl.to(trace, { autoAlpha: 0, x: 60, duration: 0.6 }, S[6]);
    tl.to(wrap, { autoAlpha: 0, duration: 1 }, S[6] + 1);
    tl.to(shade, { autoAlpha: 1, duration: 1.2 }, S[6] + 1.4);
    tl.fromTo(fin, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, S[6] + 1.8);
    tl.fromTo(A.p, { pulse: 0 }, { pulse: 1, duration: 0.4, yoyo: true, repeat: 1 }, S[6] + 1.8);
    tl.call(() => ctx.sound?.play('done'), null, S[6] + 1.8);
    tl.to({}, { duration: 0.1 }, S[7]);

    this.tl = tl;
    this.L = L;
    this.applyOrbit = applyOrbit;
    window.__agentShow = {
      tl,
      duration: S[7],
      prepare: () => {
        this.active = true;
        A.attachLabels(this.layer);
        tl.seek(0, false);
      },
      seek: (time) => {
        tl.seek(time, false);
        clock.setManual(time);
        gl.frame(time);
      },
    };

    el.querySelector('[data-play]').addEventListener('click', () => {
      tl.seek(0, false);
      tl.play();
      ctx.deck.step = 6;
    });
  },
  enter(el, ctx, info) {
    if (!this.A) return;
    this.active = true;
    this.A.attachLabels(this.layer);
    gsap.killTweensOf(ctx.gl.cam.off);
    gsap.killTweensOf(ctx.gl.cam.look);
    this.A.packets.forEach((p) => p.persist && (p.on = 0));
  },
  step(el, ctx, n, info) {
    if (!this.tl) return;
    const target = this.L[n + 1];
    if (info.entering && n === 0 && info.animated && info.dir > 0) {
      this.tl.seek(0);
      this.tl.tweenTo(target);
    } else if (info.instant || info.dir < 0) {
      this.tl.pause();
      this.tl.seek(target);
      this.applyOrbit();
    } else {
      this.tl.tweenTo(target);
    }
  },
  leave(el, ctx) {
    this.active = false;
    this.tl?.pause();
    const next = ctx.deck.defs[ctx.deck.index];
    if (this.A && next?.id !== 'live') this.A.show(false);
  },
  notes: NOTES.assembly,
};

// ---------------------------------------------------------------- Live agent
const live = {
  id: 'live',
  act: 2,
  station: 4,
  title: 'Jonli agent',
  time: 180,
  gl: 'agentLeft',
  html: `
  <div class="lv-labels ag-layer" aria-hidden="true"></div>
  <header class="lv-head">
    <div class="eyebrow" data-in="0" data-decode style="--accent:var(--data)">Jonli · haqiqiy tool chaining</div>
    <h2 class="h2 kinetic">Hozir yigʻgan agentimiz <span class="ink-warm">ishlaydi</span></h2>
  </header>
  <aside class="lv-panel panel" data-in="2" data-anim="right" data-interactive>
    <div class="lv-presets">
      ${PRESETS.map((p, i) => `<button class="lv-preset${i === 0 ? ' on' : ''}" data-preset="${p.id}">${p.label}</button>`).join('')}
      <button class="lv-preset" data-preset="custom">Oʻz vazifangiz</button>
    </div>
    <label class="sr-only" for="lv-task">Vazifa</label>
    <textarea id="lv-task" class="lv-task" rows="3" spellcheck="false">${PRESETS[0].task}</textarea>
    <div class="lv-actions">
      <button class="btn primary" data-run><span class="dot"></span>Ishga tushirish</button>
      <span class="chip" data-mode>tekshirilmoqda…</span>
      <span class="lv-timer mono tabular" data-timer>00:00.0</span>
    </div>
    <div class="lv-log" data-log aria-live="polite" data-empty="Vazifani tanlang va «Ishga tushirish»ni bosing. Har bir tool_use va tool_result shu yerda paydo boʻladi."></div>
    <div class="lv-final" data-final></div>
  </aside>
  <div class="lv-report panel" data-report></div>
  <div class="lv-msg" data-msg></div>`,
  setup(el, ctx) {
    const $ = (s) => el.querySelector(s);
    const log = $('[data-log]');
    const final = $('[data-final]');
    const timer = $('[data-timer]');
    const mode = $('[data-mode]');
    const report = $('[data-report]');
    const msg = $('[data-msg]');
    const ta = $('#lv-task');
    let preset = PRESETS[0].id;
    let running = null;
    let t0 = 0;
    let tick = 0;

    const elapsed = () => (performance.now() - t0) / 1000;
    const add = (kind, a, b) => {
      log.insertAdjacentHTML('beforeend', traceLine(kind, elapsed(), a, b));
      const row = log.lastElementChild;
      gsap.from(row, { autoAlpha: 0, x: 24, duration: 0.5, ease: 'expo.out' });
      log.scrollTop = log.scrollHeight;
    };
    const ui = {
      report(title, sections) {
        report.innerHTML = `<span class="chip" data-c="data">create_report</span><h3>${esc(title)}</h3>${sections
          .map((s) => `<div class="lv-sec"><b>${esc(s.heading)}</b><p>${esc(s.text)}</p></div>`)
          .join('')}`;
        gsap.fromTo(report, { autoAlpha: 0, y: 30, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out' });
      },
      message(to, text) {
        msg.innerHTML = `<div class="lv-msg-to mono">send_message → ${esc(to)}</div><div class="lv-bubble">${esc(text)}</div>`;
        gsap.fromTo(msg, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)' });
      },
    };
    const A = () => ctx.gl?.agent;

    const reset = () => {
      log.innerHTML = '';
      final.textContent = '';
      gsap.set([report, msg], { autoAlpha: 0 });
      timer.textContent = '00:00.0';
    };

    const setMode = async () => {
      const m = await ctx.live.mode();
      mode.textContent = m === 'artifact' ? 'jonli · Claude' : m === 'api' ? 'jonli · Claude API' : 'yozib olingan namoyish';
      mode.dataset.c = m === 'offline' ? 'tool' : 'data';
      return m;
    };
    this.setMode = setMode;

    const replay = async (id, signal) => {
      const events = TRACES[id] || TRACES.events;
      const rep = TRACE_REPORTS[id];
      for (const [dt, kind, p] of events) {
        await new Promise((r, j) => {
          const h = setTimeout(r, dt * 1000);
          signal.addEventListener('abort', () => (clearTimeout(h), j({ code: 'cancelled' })), { once: true });
        });
        const i = p?.name ? A()?.toolIndex(p.name) : -1;
        if (kind === 'think') {
          add('think', p);
          A()?.think(0.9);
        }
        if (kind === 'call') {
          add('call', p.name, short(p.input, 64));
          if (i >= 0) A()?.callTool(i, { dur: 0.8 });
          ctx.sound?.play('pulse');
          if (p.name === 'create_report' && rep) setTimeout(() => ui.report(rep.title, rep.sections), 700);
          if (p.name === 'send_message' && rep?.message) setTimeout(() => ui.message(...rep.message), 700);
        }
        if (kind === 'result') {
          add('result', p.name, p.summary);
          if (i >= 0) A()?.returnTool(i, { dur: 0.8 });
        }
        if (kind === 'final') {
          add('final', 'yakuniy javob');
          final.textContent = p;
          ctx.sound?.play('done');
        }
      }
    };

    const run = async () => {
      if (running) {
        running.abort();
        return;
      }
      reset();
      running = new AbortController();
      const btn = $('[data-run]');
      btn.lastChild.textContent = 'Toʻxtatish';
      t0 = performance.now();
      clearInterval(tick);
      tick = setInterval(() => (timer.textContent = fmtT(elapsed())), 100);
      const m = await setMode();
      const task = ta.value.trim();
      try {
        if (m === 'offline') {
          if (preset === 'custom') {
            add('info', 'Oʻz vazifangiz uchun jonli rejim kerak (claude.ai havolasi yoki API kaliti). Namoyish koʻrsatiladi.');
          }
          await replay(preset === 'custom' ? 'events' : preset, running.signal);
        } else {
          add('info', 'Claude’ga yuborildi — model rejani oʻzi tuzadi');
          A()?.think(0.9);
          const text = await ctx.live.agent({
            task,
            rules: AGENT_RULES,
            tools: createDemoTools(ui),
            signal: running.signal,
            onText: (t) => (final.textContent = t),
            onToolStart: ({ name, input }) => {
              add('call', name, short(input, 64));
              const i = A()?.toolIndex(name);
              if (i >= 0) A()?.callTool(i, { dur: 0.8 });
              ctx.sound?.play('pulse');
            },
            onToolEnd: ({ name, result, error }) => {
              add(error ? 'error' : 'result', name, summarize(name, { result, error }));
              const i = A()?.toolIndex(name);
              if (i >= 0) A()?.returnTool(i, { dur: 0.8 });
            },
          });
          if (text) final.textContent = text;
          add('final', 'yakuniy javob');
          ctx.sound?.play('done');
        }
      } catch (err) {
        if (err?.code !== 'cancelled') {
          add('error', errText(err));
          if (['tools_unavailable', 'not_granted', 'network', 'offline', 'sampling_disabled'].includes(err?.code) && preset !== 'custom') {
            add('info', 'Yozib olingan namoyishga oʻtildi');
            try {
              await replay(preset, running.signal);
            } catch (e) {
              /* stopped */
            }
          }
        }
      }
      clearInterval(tick);
      btn.lastChild.textContent = 'Ishga tushirish';
      running = null;
    };

    el.querySelector('[data-run]').addEventListener('click', run);
    el.querySelectorAll('[data-preset]').forEach((b) =>
      b.addEventListener('click', () => {
        preset = b.dataset.preset;
        el.querySelectorAll('[data-preset]').forEach((x) => x.classList.toggle('on', x === b));
        const p = PRESETS.find((x) => x.id === preset);
        ta.value = p ? p.task : '';
        if (!p) ta.focus();
      }),
    );
    this.reset = reset;
    gsap.set([report, msg], { autoAlpha: 0 });
  },
  enter(el, ctx) {
    this.setMode?.();
    const A = ctx.gl?.agent || ctx.gl?.ensureAgent(ctx.index - 1);
    if (!A) return;
    A.setBuilt(true);
    A.show(true);
    A.attachLabels(el.querySelector('.lv-labels'));
    ctx.gl.moveAgentTo(ctx.index);
  },
  leave(el, ctx) {
    const next = ctx.deck.defs[ctx.deck.index];
    const A = ctx.gl?.agent;
    if (!A) return;
    if (next?.id === 'assembly') {
      ctx.gl.moveAgentTo(ctx.deck.index);
    } else {
      A.show(false);
    }
  },
  notes: NOTES.live,
};

export default [assembly, live];
