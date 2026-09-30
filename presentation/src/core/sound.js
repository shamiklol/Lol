// Synthesized sound design: no audio files, everything is generated with WebAudio.
// Off by default; the speaker turns it on with the A key.
export function createSound() {
  let ctx = null;
  let master = null;
  let enabled = false;

  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.55;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const noiseBuffer = () => {
    const len = ctx.sampleRate * 1.5;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  };
  let noise = null;

  const voices = {
    whoosh(t) {
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.Q.value = 1.4;
      f.frequency.setValueAtTime(300, t);
      f.frequency.exponentialRampToValueAtTime(2600, t + 0.28);
      f.frequency.exponentialRampToValueAtTime(500, t + 0.6);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.18);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
      src.connect(f).connect(g).connect(master);
      src.start(t);
      src.stop(t + 0.7);
    },
    tick(t) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(1800, t);
      o.frequency.exponentialRampToValueAtTime(900, t + 0.06);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.1);
    },
    snap(t) {
      voices.tick(t);
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(140, t);
      o.frequency.exponentialRampToValueAtTime(48, t + 0.25);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.32);
    },
    shatter(t) {
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.value = 2400;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      src.connect(f).connect(g).connect(master);
      src.start(t);
      src.stop(t + 1);
      voices.snap(t + 0.02);
      voices.whoosh(t + 0.15);
    },
    pulse(t) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(220, t);
      o.frequency.exponentialRampToValueAtTime(660, t + 0.35);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.55);
    },
    done(t) {
      [523.25, 659.25, 783.99].forEach((fq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = fq;
        const g = ctx.createGain();
        const s = t + i * 0.09;
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.14, s + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 0.9);
        o.connect(g).connect(master);
        o.start(s);
        o.stop(s + 1);
      });
    },
  };

  return {
    get enabled() {
      return enabled;
    },
    toggle() {
      enabled = !enabled;
      if (enabled) ensure();
      return enabled;
    },
    play(name) {
      if (!enabled || !ensure()) return;
      if (!noise) noise = noiseBuffer();
      voices[name]?.(ctx.currentTime + 0.005);
    },
  };
}
