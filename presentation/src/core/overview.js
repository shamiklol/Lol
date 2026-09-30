import { gsap } from './fx.js';

const ACT_COLOR = ['var(--prompt)', 'var(--prompt)', 'var(--tool)', 'var(--data)'];

/** Grid of every slide; thumbnails come from build-time screenshots when present. */
export function createOverview(root, deck, thumbs = {}) {
  const el = document.createElement('div');
  el.className = 'overview';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Barcha slaydlar');
  el.innerHTML = `
    <div class="overview-title">Barcha slaydlar · Enter — oʻtish · Esc — yopish</div>
    <div class="overview-track">
      ${deck.defs
        .map(
          (d, i) => `<button class="ov-card" data-i="${i}" style="--c:${ACT_COLOR[d.act] || 'var(--prompt)'};${thumbs[d.id] ? `background-image:url(${thumbs[d.id]})` : ''}">
            <b>${String(i + 1).padStart(2, '0')}</b><span>${d.title}</span></button>`,
        )
        .join('')}
    </div>`;
  root.appendChild(el);
  const cards = [...el.querySelectorAll('.ov-card')];
  let open = false;

  el.addEventListener('click', (e) => {
    const c = e.target.closest('.ov-card');
    if (!c) return;
    api.close();
    deck.go(+c.dataset.i);
  });

  const api = {
    get open() {
      return open;
    },
    toggle() {
      open ? api.close() : api.show();
    },
    show() {
      open = true;
      el.classList.add('on');
      cards.forEach((c, i) => c.classList.toggle('is-current', i === deck.index));
      gsap.fromTo(
        cards,
        { autoAlpha: 0, z: -300, rotationX: 30 },
        { autoAlpha: 1, z: 0, rotationX: 8, duration: 0.8, stagger: { each: 0.015, from: deck.index }, ease: 'expo.out' },
      );
      cards[deck.index]?.focus({ preventScroll: false });
    },
    close() {
      open = false;
      el.classList.remove('on');
    },
  };
  return api;
}
