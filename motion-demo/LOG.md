# LOG

- 2026-10-10: Preflight. Node 22, Python 3.13 + numpy, ffmpeg 6.1, Playwright 1.56 + Chromium (swiftshader WebGL). Fonts Inter Display + DejaVu Mono copied to assets/fonts (OFL / free).
- Brief: "demo that shocks". Chose a self-referential piece about being made 100% in code; music-only, so there's no VO dependency.
- Built src/index.html + src/main.js (6 scenes), scripts/render.mjs (CLI: --from --to --fps --scale --video/--out/--sheet/--times), scripts/preview.mjs.
- Preview 0–7 s @4 fps: OK. Preview 7–25 s @2 fps: chrome text blown out by bloom/env strip, particle bloom haze, sphere too big. Fix: soft gradient env behind camera, roughness 0.2, bloom threshold 0.85, particle camera pulled back, labels moved off the shapes.
- Re-checked stills at 8.5/10.5/11.8/12.3/13.5/15.2/16.2/16.8 s: clean.
- scripts/audio.py: 120 BPM A-minor groove + SFX map synced to scene timings; integrated −11 LUFS raw → normalised to −14 LUFS / −1.5 dBTP at mux.
- Full render v1 1920×1080 30 fps → renders/final/video_silent_v1.mp4, muxed to renders/final/sdelano_kodom_v1.mp4.
