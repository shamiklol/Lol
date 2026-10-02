# Промпт для Gemini Omni Flash 1.1: «Как ИИ работает внутри»

Видео 40 секунд из 4 клипов по 10 секунд. Клип 1 — генерация с нуля (text-to-video). Клипы 2–4 — продолжение предыдущего (Extend): модель видит последние 10 секунд и продолжает без склейки.

Настройки: 16:9, 1080p (или 720p для черновика, потом апскейл).

---

## Клип 1 · 0–10 с · Вопрос → токены

```
A cinematic, technically accurate 3D visualization of how a large language model processes text, shown as abstract glowing data — no people, no robots, no brains.

[0-3s] Total darkness with faint floating dust particles. A single line of crisp white text fades in at screen center: "Ertaga Samarqandda yomgʻir yogʻadimi?" Slow push-in.
[3-7s] The sentence cracks apart with a soft glassy click into eleven small rounded glass tiles, each holding one word-piece: "Ert" "aga" "Samar" "qand" "da" "yom" "gʻir" "yogʻ" "adi" "mi" "?". The tiles spread into a neat horizontal row with even gaps.
[7-10s] One by one, left to right, each tile flips 180° and reveals a cyan glowing number on its back: 9132, 2210, 48715, 6603, 1588, 30142, 7720, 21904, 5517, 912, 30. The camera settles into a steady, centered medium-wide shot of the row and holds still.

Camera: one continuous shot, slow dolly-in, no cuts, no shake. Ends locked and centered.
Look: "neural noir" — deep navy-black background (#0b0d17), neon cyan (#3fe0ff), violet (#a07dff), amber (#ffb547) and mint (#6dffb8) light, volumetric haze, shallow depth of field, premium tech-keynote style, ultra clean.
On-screen text: only the exact text in quotes above, white clean sans-serif, perfectly spelled, nothing else.
Audio: deep low ambient drone; soft glass click when the sentence breaks; light digital tick on each tile flip; no voice, no music beat yet.
Constraints: no subtitles, no logos, no watermark, no extra words or letters, no human figures, no brain imagery, no glitch noise.
```

## Клип 2 · 10–20 с · Числа → смысл (embeddings)

```
Continue the previous shot seamlessly — no cut, same camera position at start, same style, same lighting, same row of numbered glass tiles.

[0-3s] Each numbered tile melts upward into a tall thin vertical column of tiny glowing cubes — a long vector of numbers. The cubes inside each column pulse at different brightness levels like data.
[3-7s] The eleven columns lift off and fly forward into a vast dark 3D space full of thousands of faint points of light. Camera pulls back and slightly up to reveal the space. Each column shrinks into a bright point and finds its place among the others.
[7-10s] Points with related meaning drift together into soft glowing clusters: a mint cluster labeled "yomgʻir · ob-havo · soyabon" and a separate violet cluster labeled "Samarqand · Toshkent · shahar". The camera slowly orbits a few degrees and comes to rest on a wide view of both clusters. A single small label fades in at top left: "Embedding".

Camera: one continuous move — pull-back, gentle orbit, then hold. No cuts.
Look: identical to the previous clip — navy-black, neon cyan/violet/amber/mint, volumetric haze.
On-screen text: only the exact quoted labels above, small white sans-serif, perfectly spelled.
Audio: continue the same low drone; soft whooshes as columns fly; a warm shimmering tone as clusters form.
Never change: color palette, background, camera smoothness.
Constraints: no subtitles, no logos, no watermark, no extra text, no people, no brain imagery.
```

## Клип 3 · 20–30 с · Слои трансформера и attention

```
Continue the previous shot seamlessly — no cut, same style, same lighting.

[0-3s] The glowing points rise out of the space and line up into a row of eleven bright columns, which glide into the base of a tall stack of horizontal translucent glass layers, like the floors of a skyscraper in cross-section.
[3-7s] On the first glass layer, thin threads of light connect the columns to each other — attention. The column for "yom·gʻir" sends thick bright violet threads to "Samar·qand" and "Ert·aga", and only faint thin threads to the rest; thread brightness shows importance. After the threads, the columns pass through a dense block of tiny amber neurons that flicker briefly.
[7-10s] The camera rises vertically through dozens of layers, the same threads-then-neurons pattern repeating faster on each floor; the columns glow richer and brighter as they climb. The camera slows and stops just below the top layer, looking at the glowing columns. A small label fades in at top left: "Attention".

Camera: one continuous vertical crane-up, accelerating then decelerating to a stop. No cuts.
Look: identical to previous clips — navy-black, neon cyan/violet/amber/mint, volumetric haze, glass reflections.
On-screen text: only "Attention", small white sans-serif, perfectly spelled.
Audio: same drone rising slowly in pitch; delicate electric hum on each layer; a soft rhythmic pulse building tension.
Never change: color palette, background, glass-layer design.
Constraints: no subtitles, no logos, no watermark, no extra text, no people, no brain imagery.
```

## Клип 4 · 30–40 с · Вероятности → ответ по одному токену

```
Continue the previous shot seamlessly — no cut, same style, same lighting.

[0-3s] At the top of the stack, the last column projects a wide horizontal bar chart of next-word candidates rising like a city skyline: a tall mint bar labeled "Ha" with "62%", a shorter bar "Yoʻq" with "21%", a small bar "Balki" with "12%", and many tiny unlabeled bars fading into the distance.
[3-7s] A small bright spark lands on the "Ha" bar; it detaches as a glass tile, flies down and attaches to the end of the input row. The whole row rushes up through the layer stack again in a quick streak of light, and a new tile appears: ",". This repeats faster and faster, appending tiles one at a time: "70%", "—", "soyabon", "oling".
[7-10s] The camera pulls back and settles on a calm, centered final frame: the complete answer glowing in one line, "Ha, 70% — soyabon oling.", with a small caption beneath it: "Bitta-bitta token". Everything holds still for the last two seconds.

Camera: one continuous move — tilt down with the tile, fast follow, then a slow pull-back to a locked final frame. No cuts.
Look: identical to previous clips — navy-black, neon cyan/violet/amber/mint, volumetric haze.
On-screen text: only the exact quoted text above, white clean sans-serif, perfectly spelled.
Audio: rising pulse peaks as tiles append, each new tile with a soft chime; the drone resolves into a warm, calm final chord; silence on the last second.
Never change: color palette, background, tile design.
Constraints: no subtitles, no logos, no watermark, no extra text, no people, no brain imagery.
```

---

## Как пользоваться

1. Клип 1: обычная генерация, вставить промпт целиком.
2. Клипы 2, 3, 4: кнопка **Extend** (продлить) на последнем клипе, вставить следующий промпт. Так модель видит предыдущие 10 секунд и не делает склейку.
3. Если узбекские буквы (ʻ) выходят криво — замените в кавычках на английские варианты: вопрос «Will it rain in Samarkand tomorrow?», ответ «Yes, 70% — take an umbrella.», подписи «One token at a time». Или уберите подписи и добавьте их потом в монтаже.
4. Если клип не понравился — правьте одну вещь за раз («сделай нити attention ярче»), а не переписывайте весь промпт: модель сохраняет то, что уже получилось.

## Что сказать под это видео (узб.)

- Клип 1: «Model matnni soʻz bilan emas, boʻlaklar bilan oʻqiydi. Har boʻlakning oʻz raqami bor.»
- Клип 2: «Raqamlar maʼnoga aylanadi: yomgʻir va soyabon — bir-biriga yaqin.»
- Клип 3: «Har qatlamda model qaysi soʻz qaysi soʻzga muhimligini qaraydi. Bu — attention.»
- Клип 4: «Oxirida model keyingi soʻzni ehtimollik boʻyicha tanlaydi. Javob bitta-bitta token bilan yoziladi.»
