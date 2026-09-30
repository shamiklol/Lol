import { gsap } from './fx.js';
import { store } from './store.js';

const KEYS = [
  ['→ Space PgDn', 'Keyingi qadam'],
  ['← PgUp', 'Oldingi qadam'],
  ['Home / End', 'Boshi / oxiri'],
  ['G', 'Slaydga oʻtish (raqam + Enter)'],
  ['Esc / O', 'Barcha slaydlar'],
  ['F', 'Toʻliq ekran'],
  ['P', 'Maʼruzachi oynasi'],
  ['N', 'Eslatmalar (shu ekranda)'],
  ['L', 'Lazer koʻrsatkich'],
  ['S', 'Proyektor nuri (sichqoncha gʻildiragi — oʻlcham)'],
  ['Z', 'Kattalashtirish (bosing)'],
  ['B  .', 'Qora ekran'],
  ['T', 'Yorugʻ rejim (proyektor uchun)'],
  ['M', 'Yengil rejim (kuchsiz noutbuk)'],
  ['A', 'Ovoz effektlari'],
  [',', 'Sozlamalar'],
  ['?', 'Yordam'],
];

export function createOverlays(root, { stage, viewport }) {
  root.innerHTML = `
    <canvas class="laser-trail"></canvas>
    <div class="laser"></div>
    <div class="spotlight"></div>
    <div class="blackout"></div>
    <div class="toast" role="status"></div>
    <div class="goto" aria-live="polite"></div>
    <div class="notes-dock" aria-live="polite"></div>
    <div class="sheet sheet-help" role="dialog" aria-modal="true" aria-label="Boshqaruv tugmalari">
      <div class="sheet-card">
        <h3>Boshqaruv</h3>
        <div class="keys">${KEYS.map(([k, v]) => `<div><span class="kbd">${k}</span><span>${v}</span></div>`).join('')}</div>
        <p class="hint" style="margin-top:22px">Taqdimot pulti (klikker) ham ishlaydi: PgUp / PgDn.</p>
      </div>
    </div>
    <div class="sheet sheet-settings" role="dialog" aria-modal="true" aria-label="Sozlamalar">
      <div class="sheet-card">
        <h3>Sozlamalar</h3>
        <label for="set-key">Anthropic API kaliti (faqat oflayn faylda jonli laboratoriya uchun)</label>
        <input id="set-key" type="password" autocomplete="off" placeholder="sk-ant-…">
        <p class="hint">Kalit faqat shu brauzerda saqlanadi va toʻgʻridan-toʻgʻri api.anthropic.com ga yuboriladi. Claude.ai havolasida kalit kerak emas: u yerda taqdimot sizning Claude hisobingiz orqali ishlaydi.</p>
        <label for="set-qr">QR havola (bonus va yakuniy slayd)</label>
        <input id="set-qr" type="text" autocomplete="off" placeholder="https://…">
        <div class="actions">
          <button class="btn" data-act="save">Saqlash</button>
          <button class="btn" data-act="clear">Kalitni oʻchirish</button>
          <button class="btn" data-act="close">Yopish</button>
        </div>
      </div>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const laser = $('.laser');
  const trail = $('.laser-trail');
  const tctx = trail.getContext('2d');
  const spot = $('.spotlight');
  const black = $('.blackout');
  const toastEl = $('.toast');
  const gotoEl = $('.goto');
  const notes = $('.notes-dock');
  const help = $('.sheet-help');
  const settings = $('.sheet-settings');

  const state = { laser: false, spot: false, zoom: false, zoomArmed: false, black: false, notes: false, spotR: 240 };
  let toastTimer = 0;
  const points = [];

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 1600);
  }

  function resizeTrail() {
    trail.width = innerWidth * devicePixelRatio;
    trail.height = innerHeight * devicePixelRatio;
    trail.style.width = innerWidth + 'px';
    trail.style.height = innerHeight + 'px';
  }
  resizeTrail();
  addEventListener('resize', resizeTrail);

  addEventListener('pointermove', (e) => {
    if (state.laser) {
      laser.style.left = e.clientX + 'px';
      laser.style.top = e.clientY + 'px';
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    }
    if (state.spot) {
      spot.style.setProperty('--x', e.clientX + 'px');
      spot.style.setProperty('--y', e.clientY + 'px');
    }
  });
  addEventListener(
    'wheel',
    (e) => {
      if (!state.spot) return;
      state.spotR = Math.max(80, Math.min(700, state.spotR - e.deltaY * 0.4));
      spot.style.setProperty('--r', state.spotR + 'px');
    },
    { passive: true },
  );

  (function drawTrail() {
    const now = performance.now();
    while (points.length && now - points[0].t > 420) points.shift();
    tctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    tctx.clearRect(0, 0, innerWidth, innerHeight);
    if (state.laser && points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const life = 1 - (now - b.t) / 420;
        tctx.strokeStyle = `rgba(255,61,110,${life * 0.8})`;
        tctx.lineWidth = 2 + life * 7;
        tctx.lineCap = 'round';
        tctx.beginPath();
        tctx.moveTo(a.x, a.y);
        tctx.lineTo(b.x, b.y);
        tctx.stroke();
      }
    }
    requestAnimationFrame(drawTrail);
  })();

  // zoom: arm with Z, click a point, Z/Esc to return
  viewport.addEventListener('click', (e) => {
    if (!state.zoomArmed) return;
    e.stopPropagation();
    state.zoomArmed = false;
    document.body.classList.remove('zoom-armed');
    state.zoom = true;
    gsap.to(viewport, {
      scale: 2,
      transformOrigin: `${e.clientX}px ${e.clientY}px`,
      duration: 0.9,
      ease: 'expo.inOut',
    });
  });

  function unzoom() {
    state.zoom = false;
    state.zoomArmed = false;
    document.body.classList.remove('zoom-armed');
    gsap.to(viewport, { scale: 1, duration: 0.8, ease: 'expo.inOut' });
  }

  const api = {
    state,
    toast,
    toggleLaser() {
      state.laser = !state.laser;
      laser.style.display = state.laser ? 'block' : 'none';
      document.body.classList.toggle('laser-on', state.laser);
      toast(state.laser ? 'Lazer: yoqildi' : 'Lazer: oʻchirildi');
    },
    toggleSpot() {
      state.spot = !state.spot;
      spot.classList.toggle('on', state.spot);
    },
    toggleZoom() {
      if (state.zoom || state.zoomArmed) return unzoom();
      state.zoomArmed = true;
      document.body.classList.add('zoom-armed');
      toast('Kattalashtirish uchun ekranga bosing');
    },
    get zoomed() {
      return state.zoom || state.zoomArmed;
    },
    unzoom,
    toggleBlack() {
      state.black = !state.black;
      black.classList.toggle('on', state.black);
    },
    get black() {
      return state.black;
    },
    toggleHelp(force) {
      help.classList.toggle('on', force ?? !help.classList.contains('on'));
    },
    get helpOpen() {
      return help.classList.contains('on') || settings.classList.contains('on');
    },
    closeSheets() {
      help.classList.remove('on');
      settings.classList.remove('on');
    },
    openSettings() {
      $('#set-key').value = store.get('apiKey', '') || '';
      $('#set-qr').value = store.get('qrUrl', '') || '';
      settings.classList.add('on');
      setTimeout(() => $('#set-key').focus(), 50);
    },
    toggleNotes(force) {
      state.notes = force ?? !state.notes;
      notes.classList.toggle('on', state.notes);
    },
    setNotes(title, html) {
      notes.innerHTML = `<h4>${title}</h4>${html}`;
    },
    gotoShow(text) {
      gotoEl.textContent = text;
      gotoEl.classList.toggle('on', !!text);
    },
  };

  settings.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (e.target === settings || act === 'close') settings.classList.remove('on');
    if (act === 'save') {
      const k = $('#set-key').value.trim();
      const q = $('#set-qr').value.trim();
      if (k) store.set('apiKey', k);
      store.set('qrUrl', q);
      settings.classList.remove('on');
      toast('Saqlandi');
      dispatchEvent(new CustomEvent('deck:settings'));
    }
    if (act === 'clear') {
      store.del('apiKey');
      $('#set-key').value = '';
      toast('Kalit oʻchirildi');
      dispatchEvent(new CustomEvent('deck:settings'));
    }
  });
  help.addEventListener('click', (e) => {
    if (e.target === help) help.classList.remove('on');
  });

  return api;
}
