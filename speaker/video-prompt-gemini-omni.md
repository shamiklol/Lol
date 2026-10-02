# Промпт для Gemini Omni Flash 1.1: «Как ИИ работает внутри»

Видео 40 секунд из 4 клипов по 10 секунд. **Каждый промпт полностью самостоятельный**: модель не помнит прошлую генерацию, поэтому в каждом заново описаны стиль, палитра, предметы, первый кадр, действие и последний кадр. Последний кадр клипа N совпадает с первым кадром клипа N+1, поэтому клипы склеиваются в одно видео.

Настройки для всех 4 клипов одинаковые: 16:9, 10 секунд, 1080p (или 720p для черновика, потом апскейл).

---

## Клип 1 · Вопрос превращается в токены

```
SUBJECT AND CONTEXT
A cinematic, technically accurate 3D visualization of how a large language model reads a question. This is the first part of an explainer about the inside of an AI model. Everything is abstract glowing data floating in a dark void: glowing text, rounded glass tiles and light. There are no people, no hands, no robots, no brains, no computers and no screens in the scene.

STYLE (keep exactly)
"Neural noir" premium tech-keynote look. Deep navy-black background, hex #0b0d17, with faint floating dust particles and soft volumetric haze. Light comes only from the glowing objects themselves. Accent colors: neon cyan #3fe0ff, violet #a07dff, amber #ffb547, mint green #6dffb8. Objects are made of clear rounded glass with a thin glowing cyan edge. Shallow depth of field, soft bloom, ultra clean, photoreal 3D render, smooth and calm motion, no film grain, no glitch effects.

FIRST FRAME
Pure dark navy-black void with a few slowly drifting dust particles. Nothing else is visible.

ACTION AND TIMING
[0-3s] A single line of crisp white text fades in at the exact center of the screen: "Ertaga Samarqandda yomgʻir yogʻadimi?" The camera makes a slow, smooth push-in toward the text.
[3-7s] With a soft glassy click, the sentence cracks apart into eleven small rounded glass tiles of equal height, each holding one piece of the sentence in white letters, in this order from left to right: "Ert" "aga" "Samar" "qand" "da" "yom" "gʻir" "yogʻ" "adi" "mi" "?". The tiles drift apart and settle into one perfectly straight horizontal row with even gaps, centered on screen.
[7-10s] One by one, from left to right, each tile flips 180 degrees around its vertical axis and shows a glowing cyan number on its back instead of the word, in this order: 9132, 2210, 48715, 6603, 1588, 30142, 7720, 21904, 5517, 912, 30. The camera slows down and stops.

LAST FRAME (hold for the final 2 seconds)
A steady, centered, eye-level medium-wide shot: one straight horizontal row of eleven rounded glass tiles floating in the dark navy-black void, each showing a glowing cyan number, the row filling about 80 percent of the frame width. Nothing moves except slow dust particles.

CAMERA
One continuous shot. Slow dolly-in, then a smooth stop. Eye level, centered, no cuts, no shake, no rotation.

ON-SCREEN TEXT
Only the exact text written in quotes above: the question, the eleven word pieces and the eleven numbers. Clean white sans-serif letters, cyan for the numbers, perfectly spelled, sharp and readable. No other text anywhere.

AUDIO
A deep, low ambient drone throughout. One soft glass click when the sentence breaks apart. A light digital tick on each tile flip. No voice, no narration, no music beat.

CONSTRAINTS
No subtitles, no captions, no logos, no watermarks, no extra words or letters, no misspelled text, no people, no faces, no hands, no robots, no brain imagery, no computer screens, no glitch effects, no camera shake, no cuts.
```

---

## Клип 2 · Числа превращаются в смысл (embedding)

```
SUBJECT AND CONTEXT
A cinematic, technically accurate 3D visualization of how a large language model turns words into meaning. This is the second part of an explainer about the inside of an AI model. The token numbers of a question become vectors of numbers and find their place in a space of meanings, where related words sit close together. Everything is abstract glowing data floating in a dark void. There are no people, no hands, no robots, no brains, no computers and no screens in the scene.

STYLE (keep exactly)
"Neural noir" premium tech-keynote look. Deep navy-black background, hex #0b0d17, with faint floating dust particles and soft volumetric haze. Light comes only from the glowing objects themselves. Accent colors: neon cyan #3fe0ff, violet #a07dff, amber #ffb547, mint green #6dffb8. Objects are made of clear rounded glass with a thin glowing cyan edge. Shallow depth of field, soft bloom, ultra clean, photoreal 3D render, smooth and calm motion, no film grain, no glitch effects.

FIRST FRAME
A steady, centered, eye-level medium-wide shot: one straight horizontal row of eleven small rounded glass tiles floating in the dark navy-black void. Each tile shows a glowing cyan number, from left to right: 9132, 2210, 48715, 6603, 1588, 30142, 7720, 21904, 5517, 912, 30. The row fills about 80 percent of the frame width. Slow dust particles drift.

ACTION AND TIMING
[0-3s] Each glass tile melts upward and stretches into a tall, thin vertical column made of many tiny glowing cubes stacked on top of each other, like a long list of numbers. The cubes inside each column pulse at different brightness levels in cyan and violet. The numbers disappear.
[3-7s] The eleven columns lift off and fly forward, away from the camera, into a vast dark 3D space filled with thousands of faint, tiny points of light. The camera pulls back and rises slightly to reveal how big this space is. Each column shrinks into a single bright point and takes its place among the others.
[7-10s] Points with related meaning drift toward each other and form two soft glowing clusters. On the left, a mint green cluster with a small white label floating above it: "yomgʻir · ob-havo · soyabon". On the right, a violet cluster with a small white label floating above it: "Samarqand · Toshkent · shahar". The camera makes a slow orbit of a few degrees and stops. A small white label fades in at the top left corner of the frame: "Embedding".

LAST FRAME (hold for the final 2 seconds)
A steady wide shot of a dark navy-black 3D space filled with thousands of faint points of light. Two bright clusters stand out: a mint green cluster on the left and a violet cluster on the right, each with its small white label above it, and the small label "Embedding" at the top left corner. Nothing moves except slow dust particles and a gentle shimmer of the points.

CAMERA
One continuous move: slow pull-back and slight rise, a gentle orbit of a few degrees, then a smooth stop. No cuts, no shake.

ON-SCREEN TEXT
Only the exact text written in quotes above: the two cluster labels and the word "Embedding". Small clean white sans-serif letters, perfectly spelled, sharp and readable. No other text anywhere.

AUDIO
A deep, low ambient drone throughout. Soft airy whooshes as the columns fly away. A warm, shimmering tone when the clusters form. No voice, no narration, no music beat.

CONSTRAINTS
No subtitles, no captions, no logos, no watermarks, no extra words or letters, no misspelled text, no people, no faces, no hands, no robots, no brain imagery, no planets, no galaxies, no computer screens, no glitch effects, no camera shake, no cuts.
```

---

## Клип 3 · Слои модели и attention

```
SUBJECT AND CONTEXT
A cinematic, technically accurate 3D visualization of the transformer layers inside a large language model and the attention mechanism. This is the third part of an explainer about the inside of an AI model. Eleven glowing columns of data, one for each piece of the question "Ertaga Samarqandda yomgʻir yogʻadimi?", travel up through a tall stack of glass layers. On every layer, threads of light show which words matter to which. Everything is abstract glowing data in a dark void. There are no people, no hands, no robots, no brains, no computers and no screens in the scene.

STYLE (keep exactly)
"Neural noir" premium tech-keynote look. Deep navy-black background, hex #0b0d17, with faint floating dust particles and soft volumetric haze. Light comes only from the glowing objects themselves. Accent colors: neon cyan #3fe0ff, violet #a07dff, amber #ffb547, mint green #6dffb8. Objects are made of clear rounded glass with a thin glowing cyan edge. Shallow depth of field, soft bloom, ultra clean, photoreal 3D render, smooth and calm motion, no film grain, no glitch effects.

FIRST FRAME
A steady wide shot of a dark navy-black 3D space filled with thousands of faint points of light. Two bright clusters stand out: a mint green cluster on the left and a violet cluster on the right. There is no text in the frame.

ACTION AND TIMING
[0-3s] Eleven bright points rise out of the space and line up in one straight horizontal row. Each point grows into a tall, thin vertical column of tiny glowing cubes in cyan and violet. The row of columns glides forward into the base of a tall stack of horizontal, translucent glass layers stacked one above the other with even spacing, like the floors of a glass skyscraper seen in cross-section.
[3-7s] On the first glass layer, thin threads of light appear between the columns. The fifth and sixth columns send thick, bright violet threads to the third and fourth columns and to the first and second columns, and only faint, thin threads to the rest; brighter threads mean more important connections. Right after the threads, the columns pass through a dense block of tiny amber neurons that flicker briefly, then continue upward.
[7-10s] The camera rises vertically through dozens of glass layers. On every layer the same pattern repeats faster and faster: violet threads, then flickering amber neurons. With each layer the columns glow brighter and richer. The camera slows down and stops just below the top layer, looking straight at the row of eleven brightly glowing columns. A small white label fades in at the top left corner of the frame: "Attention".

LAST FRAME (hold for the final 2 seconds)
A steady shot near the top of a tall stack of horizontal translucent glass layers in a dark navy-black void. A row of eleven tall, brightly glowing columns of cyan and violet cubes stands on the top layer, connected by a few soft violet threads. The small label "Attention" is at the top left corner. Nothing moves except slow dust particles and a gentle pulse in the columns.

CAMERA
One continuous vertical crane-up: starts slowly, speeds up through the middle layers, then decelerates to a smooth stop near the top. No cuts, no shake, no rotation.

ON-SCREEN TEXT
Only the word "Attention", small clean white sans-serif letters, perfectly spelled, sharp and readable. No other text anywhere, no words on the columns.

AUDIO
A deep, low ambient drone that slowly rises in pitch. A delicate electric hum each time the columns pass a layer. A soft rhythmic pulse that builds tension toward the end. No voice, no narration.

CONSTRAINTS
No subtitles, no captions, no logos, no watermarks, no extra words or letters, no misspelled text, no people, no faces, no hands, no robots, no brain imagery, no real buildings or city, no computer screens, no glitch effects, no camera shake, no cuts.
```

---

## Клип 4 · Вероятности и ответ по одному токену

```
SUBJECT AND CONTEXT
A cinematic, technically accurate 3D visualization of how a large language model chooses the next word and writes its answer one token at a time. This is the fourth and final part of an explainer about the inside of an AI model. The model was asked "Ertaga Samarqandda yomgʻir yogʻadimi?" and now writes its answer: it shows the probabilities of possible next words, picks one, adds it to the text, and repeats. Everything is abstract glowing data in a dark void. There are no people, no hands, no robots, no brains, no computers and no screens in the scene.

STYLE (keep exactly)
"Neural noir" premium tech-keynote look. Deep navy-black background, hex #0b0d17, with faint floating dust particles and soft volumetric haze. Light comes only from the glowing objects themselves. Accent colors: neon cyan #3fe0ff, violet #a07dff, amber #ffb547, mint green #6dffb8. Objects are made of clear rounded glass with a thin glowing cyan edge. Shallow depth of field, soft bloom, ultra clean, photoreal 3D render, smooth and calm motion, no film grain, no glitch effects.

FIRST FRAME
A steady shot near the top of a tall stack of horizontal translucent glass layers in a dark navy-black void. A row of eleven tall, brightly glowing columns of cyan and violet cubes stands on the top layer, connected by a few soft violet threads. There is no text in the frame.

ACTION AND TIMING
[0-3s] The last column on the right shines a beam of light upward, which spreads into a wide horizontal bar chart floating above the stack, with bars rising like a city skyline. The tallest bar is mint green with the white label "Ha" and "62%" above it. Next to it, a shorter cyan bar with "Yoʻq" and "21%". Then a small violet bar with "Balki" and "12%". After them, many tiny unlabeled bars fade into the distance.
[3-7s] A small bright spark lands on the "Ha" bar. The word "Ha" detaches as a small rounded glass tile and flies to the bottom of the frame, where a new line of glass tiles begins. A quick streak of light runs up through the stack, and the next tile appears and joins the line: ",". This repeats faster and faster, adding one tile at a time: "70%", "—", "soyabon", "oling", ".".
[7-10s] The glass layers and the chart fade into darkness. The camera pulls back slowly and settles on a calm, centered final composition: the complete answer glowing in one line at the center of the frame, "Ha, 70% — soyabon oling.", and a smaller caption below it, "Bitta-bitta token".

LAST FRAME (hold for the final 2 seconds)
A calm, centered shot of a dark navy-black void with faint dust particles. In the center, one line of glowing white text: "Ha, 70% — soyabon oling." Below it, smaller and softer: "Bitta-bitta token". Nothing moves.

CAMERA
One continuous move: a slight tilt up to the bar chart, a fast follow of the flying tile down to the answer line, then a slow pull-back to a locked, centered final frame. No cuts, no shake.

ON-SCREEN TEXT
Only the exact text written in quotes above: the three bar labels with their percentages, the answer tiles, the final answer line and the caption. Clean white sans-serif letters, perfectly spelled, sharp and readable. No other text anywhere.

AUDIO
A deep, low ambient drone with a rising pulse while tiles are added; a soft chime for each new tile. At the end, the drone resolves into one warm, calm chord, then silence in the last second. No voice, no narration.

CONSTRAINTS
No subtitles, no captions, no logos, no watermarks, no extra words or letters, no misspelled text, no people, no faces, no hands, no robots, no brain imagery, no computer screens, no chat interface, no glitch effects, no camera shake, no cuts.
```

---

## Как пользоваться

1. Генерируйте каждый клип отдельно своим промптом. Настройки одинаковые: 16:9, 10 секунд.
2. Для идеальной склейки: сохраните последний кадр готового клипа и загрузите его как первый кадр (first frame / image-to-video) для следующего клипа. Промпт оставьте как есть: он описывает этот же кадр словами.
3. Если буква ʻ выходит криво, замените текст в кавычках во всех клипах сразу. Английские варианты:
   - вопрос: «Will it rain in Samarkand tomorrow?»
   - кусочки: "Will" "it" "rain" "in" "Sam" "ark" "and" "tomorrow" "?" (тогда 9 плиток и 9 чисел)
   - метки кластеров: «rain · weather · umbrella», «Samarkand · Tashkent · city»
   - варианты ответа: «Yes / No / Maybe»
   - ответ: «Yes, 70% — take an umbrella.»
   - подпись: «One token at a time»
4. Если клип почти хороший — правьте одну вещь за раз («make the violet threads brighter»), не переписывайте весь промпт.

## Что сказать под это видео (узб.)

- Клип 1: «Model matnni soʻz bilan emas, boʻlaklar bilan oʻqiydi. Har boʻlakning oʻz raqami bor.»
- Клип 2: «Raqamlar maʼnoga aylanadi: yomgʻir va soyabon — bir-biriga yaqin.»
- Клип 3: «Har qatlamda model qaysi soʻz qaysi soʻzga muhimligini qaraydi. Bu — attention.»
- Клип 4: «Oxirida model keyingi soʻzni ehtimollik boʻyicha tanlaydi. Javob bitta-bitta token bilan yoziladi.»
