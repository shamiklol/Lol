import './styles/base.css';
import './styles/ui.css';
import './styles/slides.css';
import { gsap } from './core/fx.js';
import { Deck } from './core/deck.js';
import { createHud } from './core/hud.js';
import { createOverlays } from './core/overlays.js';
import { createOverview } from './core/overview.js';
import { linkPresenter, runPresenter } from './core/presenter.js';
import { createSound } from './core/sound.js';
import { store } from './core/store.js';
import { live } from './core/live.js';
import { slides } from './slides/index.js';
import { THUMBS } from './content/thumbs.js';

const $ = (s) => document.querySelector(s);

function grainTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const img = g.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

function fitStage(stage) {
  const k = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `translate(-50%, -50%) scale(${k})`;
  stage.style.transformOrigin = '50% 50%';
  stage.style.left = '50%';
  stage.style.top = '50%';
  stage.style.marginLeft = '0';
  stage.style.marginTop = '0';
  stage.style.translate = 'none';
  stage.style.setProperty('--k', k);
  return k;
}

async function boot() {
  if (location.hash === '#presenter') {
    runPresenter(slides);
    return;
  }

  try {
    await Promise.all([
      document.fonts.load('800 100px Unbounded'),
      document.fonts.load('400 30px Onest'),
      document.fonts.load('500 20px "IBM Plex Mono"'),
    ]);
  } catch (e) {
    /* fallback stacks take over */
  }

  const root = document.documentElement;
  if (new URLSearchParams(location.search).has('render')) document.body.classList.add('render-mode');
  const theme = store.get('theme', 'dark');
  if (theme === 'light') root.dataset.deckTheme = 'light';
  const params = new URLSearchParams(location.search);
  let lite = store.get('lite', false) || params.has('lite');

  $('#fx-grain').style.backgroundImage = `url(${grainTexture()})`;
  const stage = $('#stage');
  fitStage(stage);
  addEventListener('resize', () => fitStage(stage));

  const sound = createSound();
  const overlays = createOverlays($('#overlays'), { stage, viewport: $('#viewport') });

  let gl = null;
  const noGL = params.has('nogl');
  if (!noGL) {
    try {
      const { GL } = await import('./gl/stage.js');
      gl = new GL($('#gl'), { count: slides.length, lite });
      await gl.init();
    } catch (e) {
      console.warn('WebGL unavailable, continuing without 3D', e);
      gl = null;
    }
  }

  const deck = new Deck({
    container: $('#slides'),
    slides,
    services: { gl, sound, overlays, live, stage, toast: overlays.toast },
  });
  deck.mount();
  createHud($('#hud'), deck);
  const overview = createOverview($('#overlays'), deck, THUMBS);
  const presenter = linkPresenter(deck, overlays);

  deck.addEventListener('change', ({ detail }) => {
    overlays.setNotes(`${detail.index + 1}. ${detail.def.title}`, detail.def.notes || '');
  });

  const start = Deck.parseHash() || { index: 0, step: 0 };
  deck.go(start.index, { step: start.step, instant: start.index !== 0 });

  // ---------- keyboard ----------
  let gotoBuf = '';
  let gotoTimer = 0;
  const isTyping = (e) => {
    const t = e.target;
    return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  };

  addEventListener('keydown', (e) => {
    if (isTyping(e)) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    if (overview.open) {
      if (k === 'Escape' || k === 'o' || k === 'O') overview.close();
      return;
    }
    if (overlays.helpOpen) {
      if (k === 'Escape' || k === '?') overlays.closeSheets();
      return;
    }
    if (overlays.black && k !== 'b' && k !== 'B' && k !== '.') {
      overlays.toggleBlack();
      return;
    }

    if (/^\d$/.test(k) && gotoBuf !== null) {
      gotoBuf += k;
      overlays.gotoShow(`→ ${gotoBuf}`);
      clearTimeout(gotoTimer);
      gotoTimer = setTimeout(() => {
        gotoBuf = '';
        overlays.gotoShow('');
      }, 2500);
      return;
    }
    if (k === 'Enter' && gotoBuf) {
      deck.go(+gotoBuf - 1);
      gotoBuf = '';
      overlays.gotoShow('');
      return;
    }

    switch (k) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
      case 'Enter':
        e.preventDefault();
        deck.next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault();
        deck.prev();
        break;
      case 'Home':
        deck.first();
        break;
      case 'End':
        deck.last();
        break;
      case 'Escape':
        if (overlays.zoomed) overlays.unzoom();
        else overview.toggle();
        break;
      case 'o':
      case 'O':
        overview.toggle();
        break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => overlays.toast('Toʻliq ekran bu yerda ishlamaydi'));
        else document.exitFullscreen?.();
        break;
      case 'p':
      case 'P':
        presenter.open();
        break;
      case 'n':
      case 'N':
        overlays.toggleNotes();
        break;
      case 'l':
      case 'L':
        overlays.toggleLaser();
        break;
      case 's':
      case 'S':
        overlays.toggleSpot();
        break;
      case 'z':
      case 'Z':
        overlays.toggleZoom();
        break;
      case 'b':
      case 'B':
      case '.':
        overlays.toggleBlack();
        break;
      case 't':
      case 'T': {
        const light = root.dataset.deckTheme !== 'light';
        if (light) root.dataset.deckTheme = 'light';
        else delete root.dataset.deckTheme;
        store.set('theme', light ? 'light' : 'dark');
        overlays.toast(light ? 'Yorugʻ rejim (proyektor)' : 'Qorongʻi rejim');
        break;
      }
      case 'm':
      case 'M':
        lite = !lite;
        store.set('lite', lite);
        gl?.setLite(lite);
        overlays.toast(lite ? 'Yengil rejim yoqildi' : 'Toʻliq grafika');
        break;
      case 'a':
      case 'A':
        overlays.toast(sound.toggle() ? 'Ovoz yoqildi' : 'Ovoz oʻchirildi');
        break;
      case 'g':
      case 'G':
        gotoBuf = '';
        overlays.gotoShow('→ slayd raqami…');
        break;
      case ',':
        overlays.openSettings();
        break;
      case '?':
        overlays.toggleHelp();
        break;
      default:
    }
  });

  // click on empty stage area advances (like a clicker), but not on controls
  $('#viewport').addEventListener('click', (e) => {
    if (overlays.zoomed || e.target.closest('button,a,input,textarea,select,label,[data-interactive]')) return;
    if (e.detail > 1) return;
  });

  // swipe on touch screens
  let tx = null;
  $('#viewport').addEventListener('touchstart', (e) => (tx = e.touches[0].clientX), { passive: true });
  $('#viewport').addEventListener('touchend', (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? deck.next() : deck.prev();
    tx = null;
  });

  // hint for first-time viewers
  const gate = document.createElement('div');
  gate.className = 'gate';
  gate.innerHTML = `<button data-g="fs">⛶ Toʻliq ekran (F)</button><button data-g="help">? Boshqaruv</button>`;
  $('#overlays').appendChild(gate);
  requestAnimationFrame(() => gate.classList.add('on'));
  gate.addEventListener('click', (e) => {
    const g = e.target.closest('[data-g]')?.dataset.g;
    if (g === 'fs') document.documentElement.requestFullscreen?.().catch(() => overlays.toast('Toʻliq ekran bu yerda ishlamaydi'));
    if (g === 'help') overlays.toggleHelp(true);
    gate.classList.remove('on');
  });
  setTimeout(() => gate.classList.remove('on'), 9000);

  window.__deck = deck;
  window.__gl = gl;
  // screenshot/video runs are slow in software GL: keep animation time real there
  gsap.ticker.lagSmoothing(params.has('shots') ? 0 : 500, 33);
}

boot();
