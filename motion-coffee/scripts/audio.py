"""Soundtrack for «Сначала — кофе.»: light lo-fi (96 BPM, F major) + cartoon sound design.
Every event is placed on the same timings as src/main.js. Pure numpy, seeded. -> assets/music/mix_raw.wav"""
import numpy as np, wave, os

SR = 48000; DUR = 20.0; N = int(SR * DUR); BEAT = 0.625; BAR = 4 * BEAT
rng = np.random.default_rng(7)
music = np.zeros((2, N)); sfx = np.zeros((2, N)); send = np.zeros((2, N)); duck = np.ones(N)

def tt(n): return np.arange(n) / SR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def noise(d): return rng.standard_normal(int(d * SR))
def filt(x, lo=None, hi=None, order=2):
    n = len(x); f = np.fft.rfftfreq(n, 1 / SR); X = np.fft.rfft(x); m = np.ones_like(f)
    if hi: m *= 1 / (1 + (f / hi) ** (2 * order))
    if lo: m *= 1 - 1 / (1 + (f / max(lo, 1e-3)) ** (2 * order))
    return np.fft.irfft(X * m, n)
def add(bus, sig, t0, gain=1.0, pan=0.0, rev=0.0):
    i = int(round(t0 * SR))
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    sig = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4) * 1.414, np.sin((pan + 1) * np.pi / 4) * 1.414
    bus[0, i:i + len(sig)] += sig * l; bus[1, i:i + len(sig)] += sig * r
    if rev: send[0, i:i + len(sig)] += sig * l * rev; send[1, i:i + len(sig)] += sig * r * rev
def chirp(f0, f1, d, curve='exp'):
    n = int(d * SR); p = np.linspace(0, 1, n)
    f = f0 * (f1 / f0) ** p if curve == 'exp' else f0 + (f1 - f0) * p
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def reson(x, fc, q=8.0):
    """time-varying 2-pole band-pass (fc array per sample)"""
    y = np.zeros_like(x); y1 = y2 = x1 = x2 = 0.0
    for i in range(len(x)):
        if i % 32 == 0:
            w = 2 * np.pi * fc[i] / SR; al = np.sin(w) / (2 * q); a0 = 1 + al
            b0, b2, a1, a2 = al / a0, -al / a0, -2 * np.cos(w) / a0, (1 - al) / a0
        v = b0 * x[i] + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1, y2, y1 = x1, x[i], y1, v; y[i] = v
    return y

# ---------------- instruments ----------------
def rhodes(m, d=1.6, vel=1.0, bright=1.0):
    f = midi(m); t = tt(int(d * SR))
    idx = (1.5 * bright) * np.exp(-t / 0.22) + 0.2
    s = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    s += 0.18 * bright * np.sin(2 * np.pi * f * 14.1 * t) * np.exp(-t / 0.018)   # tine bark
    env = np.minimum(1, t / 0.004) * (0.65 * np.exp(-t / 0.5) + 0.35 * np.exp(-t / 2.2))
    rel = np.minimum(1, (d - t) / 0.08)
    return s * env * rel * vel
def glock(m, d=1.2, vel=1.0):
    f = midi(m); t = tt(int(d * SR))
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t / 0.15) + 0.12 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t / 0.05)
    return s * np.exp(-t / 0.45) * np.minimum(1, t / 0.002) * vel
def xylo(m, vel=1.0):
    f = midi(m); d = 0.4; t = tt(int(d * SR))
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 3.93 * t) * np.exp(-t / 0.03)
    return s * np.exp(-t / 0.12) * vel
def bass(m, d=0.5, vel=1.0):
    f = midi(m); t = tt(int(d * SR))
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) * np.exp(-t / 0.1) + 0.12 * np.sin(6 * np.pi * f * t) * np.exp(-t / 0.05)
    return np.tanh(1.4 * s) * np.exp(-t / 0.35) * np.minimum(1, t / 0.006) * np.minimum(1, (d - t) / 0.03) * vel
def kick(vel=1.0):
    d = 0.4; t = tt(int(d * SR)); f = 48 + 90 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.18) * vel
def brush_snare(vel=1.0):
    d = 0.35; t = tt(int(d * SR))
    return (filt(noise(d), 1500, 7000) * np.exp(-t / 0.09) * 0.55 + 0.35 * np.sin(2 * np.pi * 200 * t) * np.exp(-t / 0.035)) * vel
def rim(vel=1.0):
    d = 0.08; t = tt(int(d * SR)); return (np.sin(2 * np.pi * 1700 * t) * np.exp(-t / 0.012) + filt(noise(d), 2000, 9000) * np.exp(-t / 0.006) * 0.4) * vel
def shaker(vel=1.0):
    d = 0.09; t = tt(int(d * SR)); e = np.sin(np.pi * np.clip(t / 0.06, 0, 1)) ** 2
    return filt(noise(d), 5000, 14000) * e * 0.35 * vel
def hat(vel=1.0):
    d = 0.06; t = tt(int(d * SR)); return filt(noise(d), 7000, 16000) * np.exp(-t / 0.014) * 0.4 * vel
def pop(f=900, vel=1.0):
    d = 0.09; t = tt(int(d * SR)); fr = f * (1 + 1.6 * np.exp(-t / 0.008))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / 0.028) * vel
def drop(f0=500, f1=1700, vel=1.0):
    d = 0.06; t = tt(int(d * SR)); return chirp(f0, f1, d) * np.sin(np.pi * t / d) * vel
def ding(m=96, vel=1.0):
    return glock(m, 1.8, vel) + 0.6 * glock(m + 7, 1.8, vel * 0.6)
def whoosh(d=0.5, f0=400, f1=3000, vel=1.0):
    n = int(d * SR); p = np.linspace(0, 1, n); x = noise(d); out = np.zeros(n)
    fc = f0 * (f1 / f0) ** p
    for c in np.geomspace(min(f0, f1) * 0.7, max(f0, f1) * 1.4, 9):
        out += filt(x, c * 0.7, c * 1.5) * np.exp(-(np.log(fc / c) / 0.35) ** 2)
    out *= np.sin(np.pi * p) ** 2
    return out / (np.max(np.abs(out)) + 1e-9) * vel
def boing(f=260, d=0.55, vel=1.0):
    t = tt(int(d * SR)); fr = f * (1 + 0.25 * np.exp(-t / 0.15) * np.sin(2 * np.pi * 16 * t)) * (1 - 0.25 * t / d)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / 0.18) * vel
def slide_whistle(f0, f1, d, vel=1.0):
    t = tt(int(d * SR)); p = t / d; f = f0 * (f1 / f0) ** (p ** 0.8) * (1 + 0.012 * np.sin(2 * np.pi * 6 * t))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.08 * filt(noise(d), 1000, 6000)
    return s * np.minimum(1, t / 0.03) * np.minimum(1, (d - t) / 0.05) * vel
def scribble(d, vel=1.0, seed=0):
    r = np.random.default_rng(seed); n = int(d * SR); t = tt(n)
    strokes = np.zeros(n); x = 0.0
    while x < d:
        L = r.uniform(0.05, 0.13); i0, i1 = int(x * SR), int(min(d, x + L) * SR)
        strokes[i0:i1] = np.sin(np.pi * np.linspace(0, 1, i1 - i0)) * r.uniform(0.5, 1); x += L + r.uniform(0.0, 0.04)
    return filt(noise(d), 1800, 6500) * strokes * 0.5 * vel
def bell_alarm(d):
    n = int(d * SR); s = np.zeros(n); k = 0; rate = 1 / 19
    while k * rate < d - 0.02:
        f = 2150 if k % 2 == 0 else 2540; L = int(0.11 * SR); t = tt(L)
        b = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.71 * t) + 0.25 * np.sin(2 * np.pi * f * 5.2 * t)) * np.exp(-t / 0.05)
        i = int(k * rate * SR); m = min(L, n - i); s[i:i + m] += b[:m]; k += 1
    s += 0.25 * filt(noise(d), 3000, 9000) * (np.sin(2 * np.pi * 19 * tt(n)) > 0.6)
    t = tt(n); return s * np.minimum(1, t / 0.01) * np.minimum(1, (d - t) / 0.04)
def flap():
    d = 0.06; t = tt(int(d * SR))
    return filt(noise(d), 2500, 9000) * np.exp(-t / 0.004) * 0.6 + chirp(950, 520, d) * np.exp(-t / 0.012) * 0.6 + np.sin(2 * np.pi * 170 * t) * np.exp(-t / 0.02) * 0.4
def sad_trombone(t0):
    for k, (m, d) in enumerate([(62, 0.16), (61, 0.16), (60, 0.16), (59, 0.5)]):
        tt_ = tt(int(d * SR)); f = midi(m - 12) * (1 + (0.02 * np.sin(2 * np.pi * 5.5 * tt_) * (tt_ > 0.12) if d > 0.3 else 0 * tt_))
        ph = 2 * np.pi * np.cumsum(f) / SR; s = sum(np.sin(h * ph) / h for h in range(1, 12))
        wah = filt(s, None, 900) * np.minimum(1, tt_ / 0.03) * np.minimum(1, (d - tt_) / 0.06)
        add(sfx, wah * 0.3, t0 + [0, 0.17, 0.34, 0.51][k], rev=0.25)

# ---------------- harmony ----------------
CH = {'Fmaj9': (41, [57, 60, 64, 67]), 'Dm9': (38, [53, 57, 60, 64]), 'Bbmaj9': (34, [57, 60, 62, 65]),
      'C9sus': (36, [58, 62, 65, 67]), 'Gm9': (43, [53, 57, 58, 62])}
PROG = [(2.5, 'Fmaj9'), (5.0, 'Dm9'), (7.5, 'Bbmaj9'), (8.75, 'C9sus'), (10.0, 'Fmaj9'), (12.5, 'Dm9'), (13.75, 'Gm9'),
        (15.0, 'Bbmaj9'), (16.25, 'C9sus'), (17.5, 'Fmaj9')]
def chord_at(t):
    c = None
    for s, n in PROG:
        if t >= s - 1e-9: c = n
    return c
def comp(t0, name, d, vel, bright=1.0, muffle=None, rev=0.35):
    _, notes = CH[name]
    for j, m in enumerate(notes):
        s = rhodes(m, d, vel * (0.9 + 0.05 * j), bright)
        if muffle: s = filt(s, None, muffle)
        add(music, s * 0.11, t0 + j * 0.008, pan=-0.3 + 0.2 * j, rev=rev)

# ================= TIMELINE =================
# --- 0–2.7 alarm
add(sfx, flap(), 0.24, 0.8, pan=0.1); add(sfx, flap(), 0.40, 0.6, pan=0.1)
add(sfx, flap(), 0.42, 0.8, pan=-0.1); add(sfx, flap(), 0.58, 0.6, pan=-0.1)
add(sfx, bell_alarm(0.43), 0.62, 0.32, rev=0.2); add(sfx, bell_alarm(0.45), 1.15, 0.3, rev=0.2)
for t0, pn in [(0.62, -0.5), (0.9, 0.5), (1.18, -0.5)]: add(sfx, pop(700, 1), t0, 0.35, pan=pn); add(sfx, boing(420, 0.3), t0 + 0.02, 0.12, pan=pn)
sad_trombone(1.66)
add(sfx, whoosh(0.5, 2500, 300), 2.28, 0.13, rev=0.2)
# --- 2.7–5.4 sleepy mug
comp(2.6, 'Fmaj9', 2.4, 1.1, 0.6, muffle=1400, rev=0.5)
comp(3.85, 'Fmaj9', 1.2, 0.75, 0.5, muffle=1200, rev=0.5)
for k in range(6):  # lazy glock note for each floating z
    add(music, glock([72, 69, 67, 65, 64, 60][k], 1.0, 0.6), 2.55 + 0.5 * k, 0.09, pan=0.5, rev=0.5)
def snore(t0, d):
    n = int(d * SR); t = tt(n); e = np.sin(np.pi * t / d) ** 1.5
    rattle = 0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 34 * t))
    return filt(noise(d), 90, 420) * e * rattle
def whistle_out(d):
    t = tt(int(d * SR)); f = 1250 - 250 * t / d; e = np.sin(np.pi * t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5 + filt(noise(d), 600, 3000) * 0.4) * e
add(sfx, snore(2.72, 0.5), 2.72, 0.6); add(sfx, whistle_out(0.7), 3.15, 0.12)
add(sfx, snore(4.15, 0.75), 4.15, 0.6); add(sfx, whistle_out(0.45), 4.95, 0.08)
# --- 5.0–7.5 the pour
add(sfx, whoosh(0.45, 300, 2000), 4.95, 0.16, pan=-0.6)
add(sfx, rim(0.6), 5.38, 0.3, pan=-0.4)
pd = 7.38 - 5.5; n = int(pd * SR); tp = tt(n) + 5.5
lv = np.clip((tp - 5.62) / (7.3 - 5.62), 0, 1)
fc = 380 + 900 * lv ** 1.2
gl = 0.75 + 0.25 * np.sin(2 * np.pi * 9 * tp) * np.sin(2 * np.pi * 2.3 * tp)
pour = reson(filt(noise(pd), 150, 6000), fc, 5.0) * gl
pour += 0.25 * filt(noise(pd), 2500, 9000) * gl
env = np.clip((tp - 5.5) / 0.08, 0, 1) * np.clip((7.36 - tp) / 0.12, 0, 1)
add(sfx, pour * env / (np.max(np.abs(pour)) + 1e-9), 5.5, 0.55, pan=0.05, rev=0.15)
r = np.random.default_rng(3)
for k in range(46):
    t0 = 5.62 + r.random() * 1.6; L = (t0 - 5.62) / 1.68
    add(sfx, drop(400 + 500 * L, 1100 + 900 * L, 1), t0, 0.1 + 0.05 * r.random(), pan=r.uniform(-0.3, 0.4))
# loading blips every 10 %: p = lerp(.03, 1, eInOutCubic(prog(t, 5.62, 7.3)))
def eio(x): return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2
ts = np.linspace(5.62, 7.3, 4000); ps = [0.03 + 0.97 * eio((x - 5.62) / 1.68) for x in ts]
scale = [65, 67, 69, 72, 74, 76, 77, 79, 81, 84]
for k, th in enumerate(np.arange(0.1, 1.0, 0.1)):
    tk = ts[np.argmax(np.array(ps) >= th)]
    add(sfx, xylo(scale[k] + 12, 1), tk, 0.13, pan=-0.2 + 0.05 * k)
add(sfx, ding(96, 1), 7.27, 0.3, rev=0.5)
add(sfx, boing(330, 0.35), 7.25, 0.15)
for k in range(6): add(sfx, glock(96 + [0, 4, 7, 12, 16, 19][k], 0.8, 0.5), 7.3 + k * 0.03, 0.1, pan=-0.6 + 0.24 * k, rev=0.5)
comp(5.0, 'Dm9', 2.45, 0.7, 0.8, muffle=2600, rev=0.4)
for x in np.arange(6.25, 7.4, BEAT / 2): add(music, shaker(0.8), x + (0.03 if int(round(x / (BEAT / 2))) % 2 else 0), 0.5, pan=0.3)
add(music, bass(38, 1.2, 0.8), 5.0, 0.4); add(music, bass(45, 0.6, 0.8), 6.25, 0.35); add(music, bass(41, 0.6, 0.8), 6.875, 0.35)
# --- 7.36–10 latte (top view)
add(sfx, whoosh(0.3, 3000, 400), 7.3, 0.2)
add(sfx, drop(300, 900, 1), 7.5, 0.2)
pd = 1.2; tm = tt(int(pd * SR))
milk = filt(noise(pd), 1500, 7000) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * tm)) * np.minimum(1, tm / 0.1) * np.minimum(1, (pd - tm) / 0.2)
add(sfx, milk * 0.12, 7.65, pan=0.0, rev=0.2)
for k in range(7): add(sfx, drop(700 + 60 * k, 1500 + 80 * k, 1), 7.78 + k * 0.16, 0.06, pan=0.1)
add(sfx, whoosh(0.35, 600, 2200), 8.85, 0.18)
add(sfx, drop(350, 1300, 1), 9.15, 0.25); add(sfx, ding(91, 0.8), 9.2, 0.18, rev=0.6)
for k in range(5): add(sfx, glock(84 + [0, 2, 4, 7, 9][k], 0.7, 0.5), 9.2 + k * 0.035, 0.08, rev=0.5)
add(sfx, scribble(0.42, 1, 1), 9.2, 0.35, pan=-0.1)
comp(7.5, 'Bbmaj9', 1.25, 0.75, 1.0); comp(8.75, 'C9sus', 1.25, 0.75, 1.0)
add(music, bass(34, 0.6), 7.5, 0.45); add(music, bass(41, 0.6), 8.125, 0.35); add(music, bass(36, 0.6), 8.75, 0.45); add(music, bass(43, 0.5), 9.375, 0.35)
for x in np.arange(7.5, 9.9, BEAT / 2): add(music, shaker(0.9), x + (0.03 if int(round(x / (BEAT / 2))) % 2 else 0), 0.5, pan=0.3)
for x in [8.125, 9.375]: add(music, rim(0.8), x, 0.3)
rp = np.linspace(0, 1, int(0.62 * SR)); rs = filt(noise(0.62), 2000, 9000) * rp ** 2 + 0.3 * chirp(400, 1600, 0.62) * rp ** 2
add(sfx, rs, 9.33, 0.22)
add(sfx, whoosh(0.22, 600, 4000), 9.76, 0.22)
# --- 10–14.55 energy groove
add(sfx, whoosh(0.4, 200, 900), 9.9, 0.18)
crash = filt(noise(1.6), 4000, 15000) * np.exp(-tt(int(1.6 * SR)) / 0.45)
add(sfx, crash, 10.0, 0.18, rev=0.4)
r = np.random.default_rng(5)
for k in range(18): add(sfx, pop(600 + r.random() * 900, 1), 10.0 + r.random() * 0.25, 0.12, pan=r.uniform(-0.8, 0.8))
for k, f in enumerate([1047, 1319, 1568, 2093]): add(sfx, pop(f, 1), [10.625, 11.25, 11.875, 12.5][k], 0.32, pan=[-0.4, 0.4, -0.4, 0.4][k]); add(sfx, glock(84 + [0, 4, 7, 12][k], 0.6, 0.6), [10.625, 11.25, 11.875, 12.5][k] + 0.01, 0.1)
GROOVE = (10.0, 17.5)
def is_groove(x): return GROOVE[0] - 1e-9 <= x < GROOVE[1] and not (14.55 <= x < 15.0)
for b in np.arange(10.0, 17.5, BAR):
    for off in [0, 1.5 * BEAT, 2 * BEAT]:
        x = b + off
        if is_groove(x):
            v = 0.55 if x >= 15 else 1.0
            add(sfx, kick(1), x, 0.75 * v); i = int(x * SR); m = min(int(0.3 * SR), N - i); duck[i:i + m] = np.minimum(duck[i:i + m], 1 - 0.45 * np.exp(-tt(m) / 0.1))
    for off in [BEAT, 3 * BEAT]:
        x = b + off
        if is_groove(x): add(sfx, brush_snare(1), x, 0.5 if x < 15 else 0.3, rev=0.15)
for x in np.arange(10.0, 17.5, BEAT / 2):
    if is_groove(x): add(sfx, hat(1), x + (0.035 if int(round(x / (BEAT / 2))) % 2 else 0), 0.35 if x < 15 else 0.2, pan=0.25)
for x in np.arange(10.0, 17.5, BEAT / 4):
    if is_groove(x): add(music, shaker(0.6), x + (0.02 if int(round(x / (BEAT / 4))) % 2 else 0), 0.3, pan=-0.3)
# comping: hits on 1, "and of 2", 4
for s, name in PROG:
    if s < 10.0: continue
    end = next((s2 for s2, _ in PROG if s2 > s), 20.0)
    for off, d, v in [(0, 1.0, 0.9), (1.5 * BEAT, 0.5, 0.6), (3 * BEAT, 0.6, 0.7)]:
        x = s + off
        if x < end - 0.05 and x < 17.5 and not (14.55 <= x < 15.0): comp(x, name, min(d, end - x), v * (0.75 if x >= 15 else 1))
# bass line
for s, name in PROG:
    if s < 10.0 or s >= 17.5: continue
    root = CH[name][0]; end = next((s2 for s2, _ in PROG if s2 > s), 20.0)
    for off, iv, d in [(0, 0, 0.5), (1.5 * BEAT, 0, 0.3), (2 * BEAT, 7, 0.5), (3.5 * BEAT, 12, 0.25)]:
        x = s + off
        if x < end - 0.05 and not (14.55 <= x < 15.0): add(music, bass(root + 12 + iv, d), x, 0.42 if x < 15 else 0.32)
# glock melody (beats, midi)
MEL = [(10.0, [(0, 84), (1, 81), (1.5, 79), (2, 81), (3, 77), (3.5, 79)]),
       (12.5, [(0, 81), (1, 77), (1.5, 76), (2, 74), (2.5, 77), (3, 81)])]
for b, notes in MEL:
    for off, m in notes: add(music, glock(m, 1.0, 0.8), b + off * BEAT, 0.14, pan=0.35, rev=0.35)
# ПОЕХАЛИ! letters
for j in range(8): add(sfx, xylo([72, 74, 76, 79, 81, 84, 86, 88][j], 1), 13.75 + j * 0.045 + 0.12, 0.22, pan=-0.5 + j * 0.14)
add(sfx, ding(100, 0.7), 14.2, 0.15, rev=0.5)
# riser + wave
rp = np.linspace(0, 1, int(0.5 * SR)); add(sfx, slide_whistle(400, 1300, 0.5, 1) * rp, 14.05, 0.12)
wd = 0.75; tw = tt(int(wd * SR)); wave_s = filt(noise(wd), 120, 1800) * np.sin(np.pi * tw / wd) ** 1.5
add(sfx, wave_s, 14.5, 0.55, rev=0.3)
for k in range(24): add(sfx, drop(300 + 40 * k, 900 + 50 * k, 1), 14.6 + rng.random() * 0.6, 0.09, pan=rng.uniform(-0.7, 0.7))
# --- 15–20 end card
add(sfx, whoosh(0.35, 500, 2500), 14.95, 0.12)
for j in range(5): add(sfx, pop([523, 659, 784, 1047, 1319][j] * 1.0, 1), 15.25 + j * 0.065 + 0.1, 0.3, pan=-0.4 + 0.2 * j)
add(sfx, boing(240, 0.6), 15.7, 0.3)
add(sfx, slide_whistle(500, 1400, 0.55, 1), 15.82, 0.12)
add(sfx, scribble(0.9, 1, 2), 16.1, 0.3)
add(sfx, whoosh(0.4, 1200, 3500), 16.95, 0.12)
for k in range(7): add(sfx, glock(84 + [0, 4, 7, 11, 12, 16, 19][k], 0.9, 0.55), 17.3 + k * 0.09, 0.1, pan=-0.3 + 0.1 * k, rev=0.6)
add(sfx, ding(103, 1), 18.0, 0.22, rev=0.6); add(sfx, pop(1800, 1), 18.02, 0.15)
# final chord rings out
_, notes = CH['Fmaj9']
for j, m in enumerate(notes + [72, 76]): add(music, rhodes(m, 2.5, 0.85, 0.9) * 0.11, 17.5 + j * 0.03, pan=-0.3 + 0.12 * j, rev=0.6)
add(music, bass(41, 2.2, 0.9), 17.5, 0.4)
add(music, glock(84, 1.6, 0.8), 17.5, 0.12, rev=0.5)
# vinyl crackle bed (2.5 s onwards)
cr = np.zeros(N); r = np.random.default_rng(11)
for i in r.integers(int(2.5 * SR), N, 900): cr[i:i + 40] += r.uniform(-1, 1) * np.exp(-np.arange(min(40, N - i)) / 6)
hiss = filt(rng.standard_normal(N), 3000, 12000) * 0.02 * (np.arange(N) > 2.5 * SR)
music[0] += (cr * 0.07 + hiss); music[1] += (np.roll(cr, 300) * 0.07 + hiss)

# ---------------- mix ----------------
music *= duck
irn = int(1.8 * SR); ti = tt(irn)
irL = filt(rng.standard_normal(irn) * np.exp(-ti / 0.4), 200, 7000); irR = filt(rng.standard_normal(irn) * np.exp(-ti / 0.4), 200, 7000)
def conv(x, h):
    n = 1 << int(np.ceil(np.log2(len(x) + len(h)))); return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(h, n), n)[:len(x)]
rev = np.stack([conv(send[0], irL), conv(send[1], irR)]); rev /= np.max(np.abs(rev)) + 1e-9
mix = music + sfx * 0.9 + rev * 0.12 * (np.max(np.abs(music + sfx)) + 1e-9)
mix = filt(mix[0], 30, None, 1), filt(mix[1], 30, None, 1); mix = np.stack(mix)
mix = np.tanh(mix / (np.max(np.abs(mix)) + 1e-9) * 1.2) / np.tanh(1.2)
fo = int(0.25 * SR); mix[:, -fo:] *= np.linspace(1, 0, fo)
mix *= 0.89 / (np.max(np.abs(mix)) + 1e-9)
os.makedirs('assets/music', exist_ok=True)
with wave.open('assets/music/mix_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix.T * 32767).astype(np.int16).tobytes())
print('wrote assets/music/mix_raw.wav')
