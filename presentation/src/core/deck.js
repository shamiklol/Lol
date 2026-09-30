import { gsap, fromVars, prepKinetic, kineticIn, kineticReset, kineticShow, decode, reduced } from './fx.js';
import { shatter } from './transitions.js';

/**
 * Slide definition:
 *   id, act, station, title, steps, notes, time (planned seconds), gl (3D mode),
 *   html (string), setup(el, ctx), enter(el, ctx, info), step(el, ctx, n, info), leave(el, ctx)
 * Markup conventions:
 *   .kinetic          headline split into rising words on enter
 *   [data-in="k"]     revealed on enter, ordered by k, animation from [data-anim]
 *   [data-step="n"]   revealed when the slide reaches step n
 *   [data-step-out="n"] hidden once the slide reaches step n
 *   [data-decode]     scramble-decoded label
 */
export class Deck extends EventTarget {
  constructor({ container, slides, services }) {
    super();
    this.container = container;
    this.defs = slides;
    this.services = services;
    this.els = [];
    this.index = -1;
    this.step = 0;
    this.tl = null;
    this.locked = false;
  }

  mount() {
    this.defs.forEach((def, i) => {
      const el = document.createElement('section');
      el.className = `slide slide--${def.id}`;
      el.dataset.id = def.id;
      el.dataset.act = def.act;
      el.setAttribute('aria-label', def.title);
      el.innerHTML = def.html || '';
      this.container.appendChild(el);
      this.els.push(el);
      def.steps = def.steps ?? this.countSteps(el);
      const ctx = this.ctx(i);
      el.querySelectorAll('.kinetic').forEach((k) => prepKinetic(k));
      def.setup?.(el, ctx);
    });
  }

  countSteps(el) {
    let max = 0;
    el.querySelectorAll('[data-step],[data-step-out]').forEach((n) => {
      max = Math.max(max, +(n.dataset.step || 0), +(n.dataset.stepOut || 0));
    });
    return max;
  }

  ctx(i) {
    const deck = this;
    const el = this.els[i];
    return {
      deck,
      index: i,
      el,
      q: (s) => el.querySelector(s),
      qa: (s) => [...el.querySelectorAll(s)],
      ...this.services,
      get active() {
        return deck.index === i;
      },
    };
  }

  get def() {
    return this.defs[this.index];
  }

  get total() {
    return this.defs.length;
  }

  // ---------- navigation ----------
  next() {
    if (this.locked) return;
    const def = this.def;
    if (def?.onNext?.(this.els[this.index], this.ctx(this.index)) === false) return;
    if (this.step < def.steps) this.setStep(this.step + 1, { dir: 1 });
    else if (this.index < this.total - 1) this.go(this.index + 1, { dir: 1 });
  }

  prev() {
    if (this.locked) return;
    if (this.step > 0) this.setStep(this.step - 1, { dir: -1 });
    else if (this.index > 0) this.go(this.index - 1, { dir: -1, step: 'last' });
  }

  first() {
    this.go(0, { dir: -1 });
  }

  last() {
    this.go(this.total - 1, { dir: 1 });
  }

  finishTransition() {
    if (this.tl && this.tl.isActive()) this.tl.progress(1);
  }

  go(to, { dir, step = 0, instant = false } = {}) {
    to = Math.max(0, Math.min(this.total - 1, to));
    if (to === this.index) {
      this.setStep(step === 'last' ? this.def.steps : step, { dir: 0, instant: true });
      return;
    }
    this.finishTransition();
    const from = this.index;
    dir = dir ?? (to > from ? 1 : -1);
    const def = this.defs[to];
    const targetStep = step === 'last' ? def.steps : Math.min(step, def.steps);
    const outEl = this.els[from];
    const inEl = this.els[to];
    const fromDef = this.defs[from];

    // leave
    if (outEl) {
      fromDef.leave?.(outEl, this.ctx(from));
      outEl.classList.remove('is-active');
    }

    this.index = to;
    this.step = targetStep;
    inEl.classList.add('is-active');

    const actChange = fromDef && fromDef.act !== def.act && Math.abs(to - from) === 1 && !instant && !reduced;
    const tl = gsap.timeline();
    this.tl = tl;

    if (outEl) {
      if (instant || reduced) {
        gsap.set(outEl, { autoAlpha: 0 });
      } else if (actChange && dir > 0 && !outEl.querySelector('canvas')) {
        gsap.set(outEl, { autoAlpha: 0 });
        tl.add(shatter(outEl, this.container), 0);
        this.services.sound?.play('shatter');
      } else {
        outEl.classList.add('is-leaving');
        tl.to(
          outEl,
          { autoAlpha: 0, x: -dir * 140, z: -120, filter: 'blur(8px)', duration: 0.5, ease: 'power3.in' },
          0,
        );
        tl.add(() => outEl.classList.remove('is-leaving'));
        this.services.sound?.play('whoosh');
      }
      tl.add(() => gsap.set(outEl, { clearProps: 'x,z,filter,transform' }));
      tl.add(() => gsap.set(outEl, { autoAlpha: 0 }));
    }

    const enterAt = outEl && !instant ? (actChange ? 0.55 : 0.28) : 0;
    this.prepareEnter(inEl, targetStep);
    if (instant || reduced) {
      gsap.set(inEl, { autoAlpha: 1, x: 0, z: 0, filter: 'none' });
      this.showAllIn(inEl);
    } else {
      tl.fromTo(
        inEl,
        { autoAlpha: 0, x: dir * 160, z: -80, filter: 'blur(10px)' },
        { autoAlpha: 1, x: 0, z: 0, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out', clearProps: 'filter' },
        enterAt,
      );
      tl.add(this.entrance(inEl), enterAt + 0.05);
    }

    this.services.gl?.goTo(to, { dir, instant, def, actChange });
    const info = { dir, from, instant, step: targetStep };
    const extra = def.enter?.(inEl, this.ctx(to), info);
    if (extra && !instant) tl.add(extra, enterAt + 0.1);
    def.step?.(inEl, this.ctx(to), targetStep, { dir, instant: true, entering: true, animated: !instant && !reduced });

    this.emit();
  }

  prepareEnter(el, step) {
    el.querySelectorAll('[data-in]').forEach((n) => gsap.set(n, fromVars(n.dataset.anim)));
    el.querySelectorAll('.kinetic').forEach((k) => kineticReset(k));
    this.applySteps(el, step, false);
  }

  showAllIn(el) {
    el.querySelectorAll('[data-in]').forEach((n) => gsap.set(n, { clearProps: 'all' }));
    el.querySelectorAll('.kinetic').forEach((k) => kineticShow(k));
  }

  entrance(el) {
    const tl = gsap.timeline();
    el.querySelectorAll('.kinetic').forEach((k, i) => tl.add(kineticIn(k), 0.05 + i * 0.12));
    el.querySelectorAll('[data-decode]').forEach((d) => tl.add(decode(d), 0));
    const items = [...el.querySelectorAll('[data-in]')].sort((a, b) => (+a.dataset.in || 0) - (+b.dataset.in || 0));
    items.forEach((n, i) => {
      const order = n.dataset.in === '' ? i : +n.dataset.in;
      tl.to(
        n,
        { x: 0, y: 0, z: 0, scale: 1, rotationX: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out', clearProps: 'filter,transform' },
        0.18 + order * 0.09,
      );
    });
    return tl;
  }

  applySteps(el, step, animate, dir = 1) {
    el.querySelectorAll('[data-step]').forEach((n) => {
      const s = +n.dataset.step;
      const visible = s <= step;
      const wasVisible = n.classList.contains('step-on');
      n.classList.toggle('step-on', visible);
      if (!animate) {
        if (visible) gsap.set(n, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationX: 0, z: 0, filter: 'none' });
        else gsap.set(n, fromVars(n.dataset.anim));
        return;
      }
      if (visible && !wasVisible) {
        gsap.fromTo(
          n,
          fromVars(n.dataset.anim),
          { autoAlpha: 1, x: 0, y: 0, z: 0, scale: 1, rotationX: 0, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out', delay: (+n.dataset.delay || 0) },
        );
      } else if (!visible && wasVisible) {
        gsap.to(n, { ...fromVars(n.dataset.anim), duration: 0.35, ease: 'power2.in' });
      }
    });
    el.querySelectorAll('[data-step-out]').forEach((n) => {
      const s = +n.dataset.stepOut;
      const hidden = step >= s;
      if (!animate) gsap.set(n, { autoAlpha: hidden ? 0 : 1 });
      else gsap.to(n, { autoAlpha: hidden ? 0 : 1, duration: 0.45, ease: 'power2.out' });
    });
  }

  setStep(n, { dir = 1, instant = false } = {}) {
    const def = this.def;
    n = Math.max(0, Math.min(def.steps, n));
    if (n === this.step && !instant) return;
    this.step = n;
    const el = this.els[this.index];
    this.applySteps(el, n, !instant && !reduced, dir);
    def.step?.(el, this.ctx(this.index), n, { dir, instant });
    this.services.gl?.onStep?.(this.index, n, def);
    if (!instant) this.services.sound?.play('tick');
    this.emit();
  }

  emit() {
    this.writeHash();
    this.dispatchEvent(new CustomEvent('change', { detail: { index: this.index, step: this.step, def: this.def } }));
  }

  writeHash() {
    const h = `#${this.index + 1}${this.step ? '.' + this.step : ''}`;
    try {
      if (location.hash !== h) history.replaceState(null, '', h);
    } catch (e) {
      /* sandboxed frames may refuse */
    }
  }

  static parseHash() {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash || '');
    if (!m) return null;
    return { index: +m[1] - 1, step: +(m[2] || 0) };
  }
}
