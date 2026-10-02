# Правила для этого проекта

## Узбекский язык — всегда понятный и живой

Любой текст на узбекском (слайды, скрипт спикера, объяснения, тексты для озвучки, ответы в чате):

- Пиши так, как говорят люди, а не дословным переводом с русского или английского. Сначала пойми мысль, потом скажи её по-узбекски своими словами.
- Короткие предложения, обычные слова, разговорные связки: «Tasavvur qiling», «Masalan», «Oddiy qilib aytsam», «-ku».
- Термины, которые все говорят по-английски, оставляй: prompt, agent, tool (tool’lar), chain, workflow, MCP. Не заменяй их книжными словами.
- Не используй книжные и редкие слова: mantiq, vosita, zanjir, halqa, darvoza, naqsh, andoza, tuzilma, muqobil, iqtibos, toifa, mezon, istisno, mohiyat, nazorat roʻyxati. Вместо них: logika, tool, chain, qadam, tekshiruv, pattern, misol, tartib, boshqa variant, parcha, turi, talab.
- Объясняй через бытовые аналогии: аудитория может не знать тему. Сквозные аналогии доклада: стажёр (модель), портной (MAKTAB), навигатор («agar / aks holda»), парикмахер и фото (пример), такси (думающие модели), плов (chain), начальник и помощник (tool calling), повар пробует блюдо (цикл агента), регистратура (routing), USB-C (MCP), рабочий стол (контекст), банкомат с PIN-кодом (подтверждение человека).
- Орфография: oʻ и gʻ пишутся с ʻ (U+02BB), tutuq belgisi — ʼ (U+02BC): maʼlumot, eʼtibor, sunʼiy. Перед финалом прогоняй `node presentation/scripts/lint-uz.mjs <файл>`.

## Скрипт спикера

- Единственный источник текста — `presentation/src/content/notes.js`. Количество `${KLIK}` на слайде должно совпадать с числом шагов слайда.
- После правок: `npx vite build`, `node scripts/speaker-doc.mjs` (обновляет `speaker/nutq-matni.md`), `node scripts/release.mjs`.
