import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin, CustomEase, TextPlugin, Flip);

// One motion language for the whole talk.
CustomEase.create('snap', 'M0,0 C0.12,0.9 0.2,1 1,1');
CustomEase.create('glide', 'M0,0 C0.45,0 0.1,1 1,1');
gsap.defaults({ ease: 'expo.out', duration: 0.9 });

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const FROM = {
  up: { y: 42, autoAlpha: 0, filter: 'blur(10px)' },
  down: { y: -42, autoAlpha: 0, filter: 'blur(10px)' },
  left: { x: -70, autoAlpha: 0, filter: 'blur(10px)' },
  right: { x: 70, autoAlpha: 0, filter: 'blur(10px)' },
  scale: { scale: 0.86, autoAlpha: 0, filter: 'blur(12px)' },
  pop: { scale: 0.6, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  blur: { autoAlpha: 0, filter: 'blur(22px)' },
  flip: { rotationX: -80, autoAlpha: 0, transformOrigin: '50% 100%' },
  depth: { z: -400, autoAlpha: 0, filter: 'blur(14px)' },
};

export function fromVars(kind = 'up') {
  return FROM[kind] || FROM.up;
}

/** Prepare a kinetic headline: words rise out of line masks. */
export function prepKinetic(el) {
  if (el._split) return el._split;
  el._split = SplitText.create(el, { type: 'lines,words', mask: 'lines', linesClass: 'k-line', wordsClass: 'k-word' });
  gsap.set(el._split.words, { yPercent: 115 });
  return el._split;
}

export function kineticIn(el, { delay = 0, stagger = 0.045, duration = 1.1 } = {}) {
  const s = prepKinetic(el);
  return gsap.fromTo(
    s.words,
    { yPercent: 115, rotate: 4 },
    { yPercent: 0, rotate: 0, duration, stagger, ease: 'expo.out', delay },
  );
}

export function kineticReset(el) {
  const s = prepKinetic(el);
  gsap.set(s.words, { yPercent: 115, rotate: 4 });
}

export function kineticShow(el) {
  const s = prepKinetic(el);
  gsap.set(s.words, { yPercent: 0, rotate: 0 });
}

/** Scramble-decode a short label (eyebrows, chips). */
export function decode(el, { delay = 0, duration = 0.9 } = {}) {
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  return gsap.to(el, {
    duration,
    delay,
    scrambleText: { text, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]_', revealDelay: 0.25, speed: 0.6 },
    ease: 'none',
  });
}

export function countUp(el, to, { duration = 1.4, decimals = 0, suffix = '', prefix = '', delay = 0 } = {}) {
  const obj = { v: parseFloat(el.dataset.from || 0) };
  return gsap.to(obj, {
    v: to,
    duration,
    delay,
    ease: 'expo.out',
    onUpdate: () => {
      el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
    },
  });
}

/** Typewriter that writes into an element; returns a timeline. */
export function typeInto(el, text, { cps = 60, delay = 0 } = {}) {
  const tl = gsap.timeline({ delay });
  const obj = { n: 0 };
  el.textContent = '';
  tl.to(obj, {
    n: text.length,
    duration: Math.max(0.2, text.length / cps),
    ease: 'none',
    onUpdate: () => {
      el.textContent = text.slice(0, Math.round(obj.n));
    },
  });
  return tl;
}

/** Draw every stroke inside an SVG (or a set of paths). */
export function drawIn(targets, { duration = 1.2, stagger = 0.08, delay = 0 } = {}) {
  return gsap.fromTo(targets, { drawSVG: '0%' }, { drawSVG: '100%', duration, stagger, delay, ease: 'power2.inOut' });
}

export { gsap, SplitText, Flip };
