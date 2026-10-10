"""Synthesizes the full soundtrack (music + SFX) for the demo, synced to src/main.js timings.
120 BPM, A minor. Output: assets/music/mix_raw.wav (48 kHz stereo). Pure numpy, seeded."""
import numpy as np, wave, os

SR = 48000
DUR = 25.0
N = int(SR * DUR)
rng = np.random.default_rng(42)
music = np.zeros((2, N)); sfx = np.zeros((2, N)); send = np.zeros((2, N))
duck = np.ones(N)

def tt(n): return np.arange(n) / SR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)

def filt(x, lo=None, hi=None, order=2):
    n = len(x); f = np.fft.rfftfreq(n, 1 / SR); X = np.fft.rfft(x); m = np.ones_like(f)
    if hi: m *= 1 / (1 + (f / hi) ** (2 * order))
    if lo: m *= 1 - 1 / (1 + (f / max(lo, 1e-3)) ** (2 * order))
    return np.fft.irfft(X * m, n)

def add(bus, sig, t0, gain=1.0, pan=0.0, rev=0.0):
    i = int(t0 * SR)
    if i >= N: return
    if i < 0: sig = sig[-i:]; i = 0
    sig = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    bus[0, i:i + len(sig)] += sig * l * 1.414; bus[1, i:i + len(sig)] += sig * r * 1.414
    if rev: send[0, i:i + len(sig)] += sig * l * rev; send[1, i:i + len(sig)] += sig * r * rev

def noise(d): return rng.standard_normal(int(d * SR))

# ---------------- instruments ----------------
def kick(gain=1.0, dur=0.45, top=120):
    t = tt(int(dur * SR)); f = 44 + top * np.exp(-t / 0.032)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.22)
    s += 0.25 * filt(noise(dur), 1500, 8000) * np.exp(-t / 0.004)
    return np.tanh(1.6 * s) * gain

def boom(dur=2.8):
    t = tt(int(dur * SR)); f = 30 + 32 * np.exp(-t / 0.35)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.9)
    s += 0.6 * filt(noise(dur), None, 180) * np.exp(-t / 0.25)
    return np.tanh(1.3 * s)

def crash(dur=2.5, decay=0.9):
    t = tt(int(dur * SR)); return filt(noise(dur), 3500, 16000) * np.exp(-t / decay) * 0.5

def impact(t0, g=1.0, rev=0.5):
    add(sfx, kick(1.0, 0.6, 160), t0, 0.9 * g)
    add(sfx, boom(), t0, 0.9 * g, rev=rev * 0.4)
    add(sfx, crash(), t0, 0.35 * g, rev=rev)
    add(sfx, filt(noise(0.4), 200, 3000) * np.exp(-tt(int(0.4 * SR)) / 0.06), t0, 0.5 * g, rev=rev)

def clap():
    d = 0.35; t = tt(int(d * SR)); e = np.zeros_like(t)
    for k, o in enumerate([0, 0.011, 0.022, 0.034]): e += (t >= o) * np.exp(-np.clip(t - o, 0, None) / (0.012 if k < 3 else 0.12))
    return filt(noise(d), 900, 5000) * e * 0.6

def snare(g=1.0):
    d = 0.25; t = tt(int(d * SR))
    return (filt(noise(d), 1200, 8000) * np.exp(-t / 0.07) * 0.6 + np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.04) * 0.5) * g

def hat(open_=False):
    d = 0.25 if open_ else 0.06; t = tt(int(d * SR))
    return filt(noise(d), 7500, 18000) * np.exp(-t / (0.08 if open_ else 0.018)) * 0.5

def tick(f=3200, d=0.03):
    t = tt(int(d * SR)); return np.sin(2 * np.pi * f * t) * np.exp(-t / 0.006)

def pop(f=900):
    d = 0.09; t = tt(int(d * SR)); fr = f * (1 + 1.5 * np.exp(-t / 0.01))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / 0.025)

def band_sweep(d, f0, f1, env, q=0.5):
    """noise through a moving band, built from overlapping static bands"""
    n = int(d * SR); x = noise(d); out = np.zeros(n); p = np.linspace(0, 1, n)
    fc = f0 * (f1 / f0) ** p
    centers = np.geomspace(min(f0, f1) * 0.7, max(f0, f1) * 1.4, 10)
    for c in centers:
        b = filt(x, c * (1 - q * 0.6), c * (1 + q))
        w = np.exp(-(np.log(fc / c) / 0.35) ** 2)
        out += b * w
    return out * env

def whoosh(t0, d=0.6, g=1.0, up=True, pan_sweep=True, rev=0.3):
    n = int(d * SR); p = np.linspace(0, 1, n); env = np.sin(np.pi * p) ** 2
    s = band_sweep(d, 300 if up else 4000, 4000 if up else 300, env)
    s /= np.max(np.abs(s)) + 1e-9
    if pan_sweep:
        L = s * np.cos((p) * np.pi / 2); R = s * np.sin((p) * np.pi / 2)
        i = int(t0 * SR); m = min(n, N - i)
        sfx[0, i:i + m] += L[:m] * g; sfx[1, i:i + m] += R[:m] * g
        send[0, i:i + m] += L[:m] * g * rev; send[1, i:i + m] += R[:m] * g * rev
    else: add(sfx, s, t0, g, rev=rev)

def riser(t0, t1, g=1.0):
    d = t1 - t0; n = int(d * SR); p = np.linspace(0, 1, n); env = p ** 2.2
    s = band_sweep(d, 400, 7000, env)
    s /= np.max(np.abs(s)) + 1e-9
    f = 180 * (12) ** p
    s += 0.35 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env + 0.25 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * env
    add(sfx, s, t0, 0.55 * g, rev=0.25)

def reverse_suck(t1, d=0.5, g=1.0):
    n = int(d * SR); p = np.linspace(0, 1, n)
    s = filt(noise(d), 200, 6000) * (np.exp(p * 5) - 1) / (np.e ** 5 - 1)
    add(sfx, s, t1 - d, 0.6 * g, rev=0.2)

def glitch(t0, d, g=1.0, seed=0):
    r = np.random.default_rng(seed); t = t0
    while t < t0 + d:
        L = r.uniform(0.012, 0.04); n = int(L * SR); x = tt(n)
        if r.random() < 0.5: s = np.sign(np.sin(2 * np.pi * r.uniform(80, 1800) * x))
        else: s = filt(r.standard_normal(n), r.uniform(500, 3000), 12000)
        add(sfx, s * 0.35, t, g, pan=r.uniform(-0.8, 0.8)); t += L * r.uniform(0.9, 1.6)

def shimmer(t0, d=1.2, g=1.0, base=880):
    n = int(d * SR); t = tt(n); s = np.zeros(n)
    for k, m in enumerate([0, 7, 12, 19, 24]):
        s += np.sin(2 * np.pi * base * 2 ** (m / 12) * t * (1 + 0.002 * k)) * np.exp(-t / (0.25 + 0.1 * k))
    add(sfx, s * np.minimum(1, t / 0.01) * 0.18, t0, g, rev=0.6)

def shards(t0, d=0.9, g=1.0):
    r = np.random.default_rng(9)
    for _ in range(70):
        o = d * r.random() ** 2; f = r.uniform(2500, 9000)
        add(sfx, tick(f, 0.02), t0 + o, 0.12 * g * (1 - o / d), pan=r.uniform(-1, 1), rev=0.4)

# ---------------- music ----------------
CHORDS = {'Am': [57, 60, 64], 'F': [53, 57, 60], 'C': [55, 60, 64], 'G': [55, 59, 62], 'Em': [55, 59, 64]}
def saw_note(f, d, harmonics=10, detune=0.0):
    t = tt(int(d * SR)); s = np.zeros_like(t)
    for h in range(1, harmonics + 1): s += np.sin(2 * np.pi * f * (1 + detune) * h * t) / h
    return s

def pad_chord(name, t0, d, g=1.0, cutoff=1400, oct_=0):
    n = int(d * SR); t = tt(n); s = np.zeros(n)
    for m in CHORDS[name] + [CHORDS[name][0] - 12]:
        for det in (-0.004, 0.0, 0.0045): s += saw_note(midi(m + oct_), d, 8, det)
    s = filt(s, 80, cutoff)
    env = np.minimum(1, t / 0.25) * np.minimum(1, (d - t) / 0.35)
    add(music, s * env * 0.035, t0, g, rev=0.5)

def bass_note(m, t0, d=0.22, g=1.0):
    t = tt(int(d * SR)); s = filt(saw_note(midi(m), d, 12) + 0.6 * np.sin(2 * np.pi * midi(m - 12) * t), None, 380)
    add(music, np.tanh(2 * s) * np.exp(-t / 0.16) * np.minimum(1, t / 0.004) * 0.32, t0, g)

def pluck(m, t0, g=1.0, pan=0.0):
    d = 0.35; t = tt(int(d * SR)); f = midi(m)
    s = (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(4 * np.pi * f * t) + 0.15 * np.sin(6 * np.pi * f * t)) * np.exp(-t / 0.12)
    add(music, s * 0.09, t0, g, pan=pan, rev=0.45)

def kick_at(t0, g=1.0):
    add(sfx, kick(1.0), t0, 0.85 * g)
    i = int(t0 * SR); n = int(0.35 * SR); m = min(n, N - i)
    duck[i:i + m] = np.minimum(duck[i:i + m], 1 - 0.75 * np.exp(-tt(m) / 0.11))

PROG = [(7, 'Am'), (9, 'F'), (11, 'C'), (13, 'G'), (15, 'Am'), (17, 'F'), (19, 'C')]
def chord_at(t):
    c = 'Am'
    for s, n in PROG:
        if t >= s: c = n
    return c

# ============ TIMELINE ============
# --- 1. GENESIS 0–3
impact(0.0, 1.0, 0.7)
t = tt(int(3.0 * SR)); drone = (np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 82.4 * t) + 0.2 * np.sin(2 * np.pi * 110.3 * t))
add(music, drone * np.minimum(1, t / 0.8) * np.minimum(1, (3 - t) / 0.2) * 0.12, 0.0)
for b in [0.5, 1.0, 1.5, 2.0]:
    add(sfx, kick(1.0, 0.4, 70), b, 0.55); add(sfx, kick(1.0, 0.3, 50), b + 0.14, 0.3)
for a, b, seed in [(0.55, 1.5, 1), (1.35, 2.1, 2)]:
    r = np.random.default_rng(seed); x = a
    while x < b: add(sfx, tick(r.uniform(2200, 4200), 0.02), x, 0.07, pan=r.uniform(-0.4, 0.4)); x += 1 / 24
riser(1.9, 2.98, 0.8)
whoosh(2.55, 0.55, 0.9)
glitch(2.82, 0.18, 0.9, 3)

# --- 2. KINETIC TYPE 3–7
for k in range(8):
    t0 = 3 + 0.5 * k
    if k < 7: kick_at(t0, 0.9)
    add(sfx, tick(1800, 0.03), t0, 0.15)
whoosh(3.42, 0.3, 0.8, up=False)                  # ОДНОЙ smear
add(sfx, boom(1.0), 4.0, 0.35)                     # КАМЕРЫ.
shimmer(4.5, 0.6, 0.8, 1320)                       # НИ glow
for j in range(5): add(sfx, tick(1200 + 300 * j, 0.03), 5.0 + j * 0.05, 0.12)   # outline rows
for j in range(6): add(sfx, kick(1.0, 0.15, 260), 5.5 + 0.035 * j + 0.18, 0.18, pan=-0.5 + j * 0.2)  # letters land
whoosh(5.95, 0.35, 0.5, up=False, pan_sweep=False)  # tracking collapse
impact(6.5, 0.55, 0.3)                              # КОД
for x in np.arange(5.0, 6.85, 0.125): add(sfx, hat(), x, 0.35 if (x * 8) % 2 else 0.2)
for k, x in enumerate(np.arange(5.0, 6.85, 0.25)): bass_note(45, x, 0.2, 0.8)
pad_chord('Am', 3.0, 3.85, 0.8, 900)
riser(5.4, 6.9, 1.0)
reverse_suck(6.98, 0.35, 0.8)

# --- 3. HYPERSPACE 7–12 & 4. PARTICLES 12–17 & 5. CARDS 17–21
impact(7.0, 1.3, 0.8)
whoosh(7.0, 1.4, 1.0, up=False)
for beat in np.arange(7.0, 20.96, 0.5):
    if 16.45 <= beat < 17.0: continue
    kick_at(beat, 1.0)
for x in np.arange(7.25, 20.9, 0.5):
    if 16.45 <= x < 17.0: continue
    add(sfx, hat(open_=(int(x * 2) % 4 == 3)), x, 0.4, pan=0.2)
for x in np.arange(7.0, 20.9, 0.125):
    if 16.45 <= x < 17.0 or (x * 8) % 4 == 0: continue
    add(sfx, hat(), x, 0.12, pan=-0.3)
for x in np.arange(7.5, 20.9, 1.0):
    if 16.45 <= x < 17.0 or 11.0 <= x < 12.0: continue
    add(sfx, clap(), x, 0.55, rev=0.3)
for x in np.arange(7.0, 20.9, 0.25):
    if 16.45 <= x < 17.0: continue
    root = CHORDS[chord_at(x)][0] - 24
    bass_note(root + (12 if int(x * 4) % 4 == 3 else 0), x, 0.22, 1.0)
for s, n in PROG:
    end = min(s + 2, 21.0 if s >= 17 else (16.45 if s == 15 else s + 2))
    pad_chord(n, s, end - s, 1.0, 1800 if s >= 12 else 1200)
# snare roll + riser into the shatter
for x in np.arange(11.0, 11.5, 0.125): add(sfx, snare(), x, 0.25 + 0.3 * (x - 11))
for x in np.arange(11.5, 11.98, 0.0625): add(sfx, snare(), x, 0.45 + 0.6 * (x - 11.5))
riser(10.9, 11.98, 1.1)
# shatter
impact(12.0, 1.1, 0.7); glitch(11.86, 0.3, 1.0, 5); shards(12.0, 1.0, 1.0)
# arp (particles + cards)
ARP = [0, 1, 2, 1, 0, 2, 1, 2]
for k, x in enumerate(np.arange(12.0, 20.9, 0.125)):
    if 16.45 <= x < 17.0: continue
    notes = CHORDS[chord_at(x)]; m = notes[ARP[k % 8]] + 12 + (12 if k % 16 >= 12 else 0)
    pluck(m, x, 0.8 if x < 17 else 1.0, pan=0.4 * np.sin(k * 0.7))
for t0 in [12.45, 13.95, 15.45]: whoosh(t0, 0.75, 0.75)
reverse_suck(17.0, 0.55, 1.2)
impact(17.0, 1.0, 0.6); shimmer(17.0, 1.6, 1.0, 880)
# cards
cards = [(i % 5, i // 5) for i in range(15)]
for c, r in cards:
    d = np.hypot((c - 2) * 3.12 / 8, (1 - r) * 2.07 / 4)
    add(sfx, pop(700 + 120 * (c + r)), 17.05 + d * 0.3 + 0.12, 0.22, pan=(c - 2) * 0.35)
    for f0 in (18.0, 19.0):
        add(sfx, tick(2600 - 150 * c, 0.03), f0 + c * 0.07 + r * 0.04 + 0.25, 0.14, pan=(c - 2) * 0.35)
whoosh(18.0, 0.6, 0.35); whoosh(19.0, 0.6, 0.35, up=False)
whoosh(20.0, 0.45, 0.6, up=False, pan_sweep=False)
for j in range(15): add(sfx, tick(1500 + 40 * j, 0.025), 20.05 + j * 0.022, 0.1)
riser(20.4, 20.98, 0.7); whoosh(20.55, 0.45, 1.0)
glitch(20.94, 0.1, 0.6, 7)

# --- 6. END 21–25
impact(21.0, 1.4, 1.2); shimmer(21.0, 3.5, 1.2, 440)
t = tt(int(4.0 * SR))
for m in [45, 57, 60, 64, 69]:
    s = sum(saw_note(midi(m), 4.0, 6, det) for det in (-0.003, 0, 0.003))
    add(music, filt(s, 60, 1100) * np.minimum(1, t / 0.05) * np.exp(-t / 1.6) * 0.035, 21.0, rev=0.8)
whoosh(21.9, 0.8, 0.25, pan_sweep=True)
r = np.random.default_rng(11); x = 22.3
while x < 23.3: add(sfx, tick(r.uniform(2500, 4000), 0.02), x, 0.05); x += 1 / 24

# ---------------- mix ----------------
music *= duck
ir_len = int(2.6 * SR); ti = tt(ir_len)
irL = rng.standard_normal(ir_len) * np.exp(-ti / 0.55); irR = rng.standard_normal(ir_len) * np.exp(-ti / 0.55)
irL = filt(irL, 150, 7000); irR = filt(irR, 150, 7000)
def conv(x, h):
    n = 1 << int(np.ceil(np.log2(len(x) + len(h))))
    return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(h, n), n)[:len(x)]
rev = np.stack([conv(send[0], irL), conv(send[1], irR)])
rev /= np.max(np.abs(rev)) + 1e-9
mix = music * 1.0 + sfx * 0.9 + rev * 0.22
# gentle bus glue + fades
mix = np.tanh(mix * 0.9) / 0.9
fade = np.ones(N); fo = int(0.8 * SR); fade[-fo:] = np.linspace(1, 0, fo) ** 2
mix *= fade
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 0.89
os.makedirs('assets/music', exist_ok=True)
pcm = (mix.T * 32767).astype(np.int16)
with wave.open('assets/music/mix_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote assets/music/mix_raw.wav', mix.shape)
