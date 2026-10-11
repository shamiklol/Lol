# LOG
- 2026-10-11: Brief from user: "demo on a light topic, bring it to perfection". Chose a Monday-morning coffee cartoon, 9:16 for Reels, light palette.
- Fonts: Unbounded + Caveat via @fontsource (OFL, Cyrillic), licences saved in assets/fonts.
- Built src/main.js (alarm → sleepy mug → pour → latte art → energy → end card) and render.mjs --mb (sub-frame motion blur).
- Pass 1 sheets 0–7.5 / 7.5–20: blank frame 0, pan overlap (scene background over the previous scene), bursts over caption, blank 10.00 downbeat, short latte caption, chips crowd mug, empty frame at 15.0, heart over caption → all fixed; stills re-checked.
- Emoji ⚡ invisible on yellow chip → chip colours changed.
- audio.py: first mix had an inaudible sad trombone (pitch array collapsed to a scalar for short notes) and an overly loud pan whoosh → fixed, levels rebalanced.
- Render v1 (mb 6) → QA on the encoded video: stream crossed the mug's face; z's overlapped the pot → fixed, re-rendered.
- Final: 1080×1920 30 fps, H.264 CRF 16 + AAC 256k, −14 LUFS.
