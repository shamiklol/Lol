// Speaker console in a second window: notes, timer, next slide, pace vs plan.
// The main window and the console talk through postMessage (works from file:// too).
import { CONFIG } from '../config.js';

const fmt = (s) => {
  const neg = s < 0;
  s = Math.abs(Math.round(s));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${neg ? '−' : ''}${m}:${String(r).padStart(2, '0')}`;
};

export function linkPresenter(deck, overlays) {
  let win = null;
  const send = () => {
    if (!win || win.closed) return;
    try {
      win.postMessage({ type: 'deck-state', index: deck.index, step: deck.step }, '*');
    } catch (e) {
      /* ignore */
    }
  };
  deck.addEventListener('change', send);
  addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'presenter-hello') {
      win = e.source;
      send();
    }
    if (d.type === 'deck-cmd') {
      if (d.cmd === 'next') deck.next();
      if (d.cmd === 'prev') deck.prev();
      if (d.cmd === 'goto') deck.go(d.index);
      if (d.cmd === 'black') overlays.toggleBlack();
    }
  });
  return {
    open() {
      const url = location.href.split('#')[0] + '#presenter';
      win = window.open(url, 'deck-presenter', 'width=1280,height=820');
      if (!win) {
        overlays.toast('Oyna ochilmadi. Eslatmalar uchun N tugmasini bosing.');
        return;
      }
      setTimeout(send, 800);
    },
  };
}

export function runPresenter(slides) {
  document.title = 'Maʼruzachi · ' + CONFIG.brand;
  document.body.innerHTML = `
  <style>
    body{overflow:auto;background:#07080f;color:#e8ebf5;font-family:var(--f-body);margin:0}
    .pv{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:18px;padding:18px;min-height:100vh}
    .pv-top{grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding:14px 18px;border:1px solid #232a44;border-radius:16px;background:#0d1120}
    .pv-timer{font-family:var(--f-mono);font-size:44px;font-weight:600;letter-spacing:.02em;font-variant-numeric:tabular-nums}
    .pv-clock{font-family:var(--f-mono);font-size:18px;color:#8b93ad}
    .pv-pace{font-family:var(--f-mono);font-size:18px;padding:6px 12px;border-radius:999px;border:1px solid #2a3355}
    .pv-pace.late{color:#ff7d95;border-color:#ff7d9566}.pv-pace.ok{color:#6dffb8;border-color:#6dffb866}
    .pv-top .sp{flex:1}
    .pv button{font:600 15px var(--f-body);padding:10px 16px;border-radius:10px;border:1px solid #2a3355;background:#141a2e;color:#e8ebf5;cursor:pointer}
    .pv button:hover{border-color:#3fe0ff}
    .pv-card{border:1px solid #232a44;border-radius:16px;background:#0b0f1c;padding:22px 26px;min-width:0}
    .pv-label{font-family:var(--f-mono);font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#69728f;margin:0 0 8px}
    .pv-title{font-family:var(--f-display);font-size:28px;line-height:1.2;margin:0 0 6px;letter-spacing:-.01em}
    .pv-meta{font-family:var(--f-mono);font-size:14px;color:#8b93ad;margin-bottom:16px}
    .pv-notes{font-size:22px;line-height:1.6;color:#d5daea}
    .pv-notes p{margin:0 0 14px}
    .pv-notes b{color:#fff}
    .pv-notes .cue{font-family:var(--f-mono);font-size:14px;letter-spacing:.08em;padding:2px 8px;border-radius:6px;background:#1b2340;color:#ffb547;margin-right:6px}
    .pv-next .pv-notes{font-size:17px;color:#9aa3bd}
    .pv-bar{height:6px;border-radius:6px;background:#1a2036;overflow:hidden;margin-top:18px}
    .pv-bar i{display:block;height:100%;background:linear-gradient(90deg,#3fe0ff,#a07dff,#ffb547);width:0}
    @media (max-width:900px){.pv{grid-template-columns:1fr}}
  </style>
  <div class="pv">
    <div class="pv-top">
      <div class="pv-timer" id="pv-timer">0:00</div>
      <div class="pv-clock" id="pv-clock"></div>
      <div class="pv-pace ok" id="pv-pace">reja boʻyicha</div>
      <div class="sp"></div>
      <button id="pv-reset">Taymerni qayta boshlash</button>
      <button id="pv-black">Qora ekran</button>
      <button id="pv-prev">◀ Oldingi</button>
      <button id="pv-next">Keyingi ▶</button>
    </div>
    <div class="pv-card">
      <p class="pv-label">Hozir</p>
      <h1 class="pv-title" id="pv-title"></h1>
      <div class="pv-meta" id="pv-meta"></div>
      <div class="pv-notes" id="pv-notes"></div>
    </div>
    <div class="pv-card pv-next">
      <p class="pv-label">Keyingi slayd</p>
      <h2 class="pv-title" id="pv-ntitle" style="font-size:22px"></h2>
      <div class="pv-notes" id="pv-nnotes"></div>
      <div class="pv-bar"><i id="pv-bar"></i></div>
      <p class="pv-meta" id="pv-plan" style="margin-top:10px"></p>
    </div>
  </div>`;

  const $ = (s) => document.querySelector(s);
  const opener = window.opener;
  let state = { index: 0, step: 0 };
  let t0 = performance.now();
  const total = slides.reduce((m, s) => m + (s.time || 60), 0);
  const cmd = (c, extra = {}) => opener?.postMessage({ type: 'deck-cmd', cmd: c, ...extra }, '*');

  $('#pv-next').onclick = () => cmd('next');
  $('#pv-prev').onclick = () => cmd('prev');
  $('#pv-black').onclick = () => cmd('black');
  $('#pv-reset').onclick = () => {
    t0 = performance.now();
  };
  addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
      e.preventDefault();
      cmd('next');
    }
    if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
      e.preventDefault();
      cmd('prev');
    }
    if (e.key === 'b' || e.key === '.') cmd('black');
  });

  const render = () => {
    const s = slides[state.index];
    const n = slides[state.index + 1];
    $('#pv-title').textContent = `${state.index + 1}. ${s.title}`;
    $('#pv-meta').textContent = `qadam ${state.step} / ${s.steps || 0} · rejada ${fmt(s.time || 60)}`;
    $('#pv-notes').innerHTML = s.notes || '';
    $('#pv-ntitle').textContent = n ? `${state.index + 2}. ${n.title}` : 'Yakun';
    $('#pv-nnotes').innerHTML = n ? (n.notes || '').split('</p>')[0] + '</p>' : '';
  };

  const tick = () => {
    const el = (performance.now() - t0) / 1000;
    $('#pv-timer').textContent = fmt(el);
    $('#pv-clock').textContent = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const planned = slides.slice(0, state.index).reduce((m, s) => m + (s.time || 60), 0);
    const diff = el - planned;
    const pace = $('#pv-pace');
    pace.className = 'pv-pace ' + (diff > 45 ? 'late' : 'ok');
    pace.textContent = diff > 45 ? `${fmt(diff)} kechikish` : diff < -45 ? `${fmt(-diff)} oldindamiz` : 'reja boʻyicha';
    $('#pv-bar').style.width = `${Math.min(100, (el / total) * 100)}%`;
    $('#pv-plan').textContent = `Jami reja: ${fmt(total)} · oʻtdi: ${fmt(el)}`;
    requestAnimationFrame(tick);
  };

  addEventListener('message', (e) => {
    if (e.data?.type === 'deck-state') {
      state = e.data;
      render();
    }
  });
  opener?.postMessage({ type: 'presenter-hello' }, '*');
  render();
  tick();
}
