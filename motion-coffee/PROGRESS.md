# PROGRESS: motion-coffee «Сначала — кофе.»   (updated 2026-10-11)
Phase: DONE
Current version: v1 → renders/final/snachala_kofe_v1.mp4 (+ _web.mp4)
Done:
- Storyboard (plan/storyboard.md): 6 scenes, 20 s, 9:16, 96 BPM, music + SFX (no VO)
- All visuals in src/main.js (Canvas 2D), deterministic, 6-subframe motion blur in the final
- Soundtrack in scripts/audio.py (numpy): lo-fi Rhodes/glock/brush groove + cartoon SFX on scene timings
- QA loops: contact sheets 0–20 s; fixed blank frame 0, pan overlap, burst/caption collision, blank downbeat at 10 s,
  latte caption too short, chips touching the mug, dead frame at 15 s, steam heart over caption, yellow-on-yellow emoji,
  stream crossing the face, z's overlapping the pot; audio: silent trombone notes (scalar pitch bug), loud pan whoosh
- Loudness −14 LUFS / peak < −1.5 dBTP
Next step: user feedback → v2 (brand/CTA version, 16:9 native re-layout, voiceover)
Key files: src/main.js, scripts/render.mjs (--mb), scripts/preview.mjs, scripts/audio.py, scripts/mux.sh
