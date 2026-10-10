# PROGRESS: motion-demo «СДЕЛАНО КОДОМ»   (updated 2026-10-10)
Phase: final
Current version: v1 → renders/final/sdelano_kodom_v1.mp4
Done:
- Storyboard (plan/storyboard.md), 6 scenes, 25 s, 16:9, music+SFX (no VO, so no ElevenLabs MP3 needed)
- All visuals in src/main.js (Canvas 2D + Three.js), deterministic drawFrame(t)
- Soundtrack synthesized in scripts/audio.py (numpy), loudness-normalised in scripts/mux.sh
- Contact-sheet passes over 0–25 s; fixed chrome blow-out, bloom haze, particle framing
In progress: -
Next step: user feedback → v2 (e.g. 9:16 native re-layout, brand version, real VO)
Open issues: none known
Key decisions: user asked for a "wow" demo with no brief → skipped approval gates; intensity 5; one accent (orange) + pink
Key files: src/main.js, scripts/render.mjs, scripts/preview.mjs, scripts/audio.py, scripts/mux.sh
Commands:
- preview: `node scripts/preview.mjs 7 12` → renders/previews/sheet_7-12.jpg
- full render: `node scripts/render.mjs --fps 30 --scale 1 --video renders/final/video_silent_v1.mp4`
- audio: `python3 scripts/audio.py` · mux: `bash scripts/mux.sh`
