# Шпаргалка спикера · Prompt Logic & AI Agent Tool Chaining

Одна страница, чтобы быстро выучить доклад. Полный текст — в `nutq-matni.md`, по-русски — в `obyasnenie-ru.md`.

## 5 фраз, на которых держится весь доклад

| # | Скажи (узб.) | Смысл (рус.) |
|---|---|---|
| 1 | **Model bir xil edi. Logika boshqa edi.** | Модель та же, отличается логика запроса. |
| 2 | **Prompt — stajyorga beriladigan vazifa. MAKTAB bilan yozing.** | Промпт — это задание стажёру. Пишем по MAKTAB. |
| 3 | **Har bir «agar»ning oʻz «aks holda»si boʻlsin.** | У каждого «если» должно быть «иначе». |
| 4 | **Tool — modelning qoʻli. Model faqat soʻraydi, bajaradigan — sizning dasturingiz.** | Инструмент — это руки модели. Модель только просит, а выполняет ваша программа. |
| 5 | **Oddiydan boshlang: prompt → chain → agent.** | Начинайте с простого. |

## MAKTAB (выучить наизусть)

**M**aqsad · **A**gar · **K**ontekst · **T**artib · **A**niq misol · **B**aholash

Цель · Если/иначе · Кто и для кого · Формат · Пример · Самопроверка

## Слайды: одна строка на каждый

| № | Слайд | Главное, что сказать | Клики |
|---|---|---|---|
| 1 | Titul | AI — aqlli stajyor. Ikki qism: unga vazifa berish va qoʻl berish. | 1 |
| 2 | Tajriba | A — umumiy, B — aniq. **Logika boshqa edi.** | 3 |
| 3 | Yoʻl | 5 bekat: Prompt → Logika → Chain → Tool’lar → Agent. | 1 |
| 4 | I qism | Stajyorga vazifani qanday berish. | 1 |
| 5 | MAKTAB | Tikuvchi. 6 qism, har biri bitta savolga javob. Zalga: «qaysi harf tushib qolgan?» | 2 |
| 6 | Agar | Navigator. Maʼlumot yetmasa — soʻra. Har «agar»ga «aks holda». | 5 |
| 7 | Laboratoriya | Har klik — bitta harf. Javob zerikarli gapdan sotuv matniga aylanadi. Jonli: zaldan mahsulot. | 6 |
| 8 | Chain | Osh damlash. Bitta ulkan prompt — yomon. Qadamlar + tekshiruv — yaxshi. | 3 |
| 9 | II qism | Endi modelga qoʻl beramiz. | 1 |
| 10 | Qoʻl yoʻq | 3 zaif joy. Tool kartasi: nomi, nima qiladi (bu ham prompt!), nima kerak. | 4 |
| 11 | Tool calling | Boshliq va yordamchi, 7 qadam. **Model faqat soʻraydi — bajaradigan sizning dasturingiz.** | 8 |
| 12 | Agent | Agent = model + tool’lar + sikl. Oshpaz tatib koʻradi. Toʻxtash sharti shart. | 4 |
| 13 | Chain turlari | Konveyer, registratura, oshpazlar, prorab, talaba+ustoz, tajribali xodim. | 7 |
| 14 | Yigʻamiz | Model → yoʻriqnoma → tool’lar → xotira → sikl → vazifa. Natija — keyingisiga kirish. | 6 |
| 15 | Jonli agent | Tartibni model oʻzi tanlaydi. Zaldan vazifa. | 0 |
| 16 | MCP | Zaryadlovchilar va USB-C. 15 ulanish → 8. | 3 |
| 17 | Xavflar | Toʻxtamay aylanish, begona gap (kassir), qaytarib boʻlmaydigan ish (PIN-kod), qora quti. | 2 |
| 18 | Bonus | 8 ta skill, QR orqali. | 0 |
| 19 | Kim yigʻdi? | AI agent. Men — vazifa, yoʻnaltirish, tekshirish. | 3 |
| 20 | Yakun | 3 fikr va savollar. | 0 |

## Если что-то пошло не так

| Ситуация | Что делать |
|---|---|
| Нет интернета | Кнопки «Jonli sinash», «Ishga tushirish» сами показывают записанный прогон. Говори как обычно. |
| Слайд «завис» | `G` → номер слайда → `Enter`. Или `Esc` → выбрать слайд мышкой. |
| Слабый ноутбук, всё тормозит | `M` — облегчённая графика. |
| Бледный проектор | `T` — светлая тема. |
| Нужно, чтобы смотрели на тебя | `B` — чёрный экран, ещё раз `B` — вернуть. |
| Забыл текст | `N` — подсказка внизу экрана (лучше заранее открыть окно спикера на `P`). |
| Не знаешь ответа на вопрос | «Yaxshi savol. Aniq javob berish uchun tekshirib, kanalda yozaman.» |
