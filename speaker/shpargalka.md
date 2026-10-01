# Шпаргалка спикера · Prompt Logic & AI Agent Tool Chaining

Одна страница, чтобы быстро выучить доклад. Полный текст — в `nutq-matni.md`, по-русски — в `obyasnenie-ru.md`.

## 5 фраз, на которых держится весь доклад

| # | Скажи (узб.) | Смысл (рус.) |
|---|---|---|
| 1 | **Model bir xil edi. Logika boshqa edi.** | Модель та же, отличается логика запроса. |
| 2 | **Prompt — bu oddiy tilda yozilgan dastur.** | Промпт — это программа на обычном языке. |
| 3 | **Har bir «agar»ning oʻz «aks holda»si boʻlsin.** | У каждого «если» должно быть «иначе». |
| 4 | **Tool — modelning qoʻli. Model faqat soʻraydi, bajaradigan — sizning kodingiz.** | Инструмент — это руки модели. Модель только просит, а выполняет ваш код. |
| 5 | **Oddiydan boshlang: prompt → chain → workflow → agent.** | Начинайте с простого. |

## MAKTAB (выучить наизусть)

**M**aqsad · **A**gar · **K**ontekst · **T**artib · **A**niq misol · **B**aholash

Цель · Если/иначе · Кто и для кого · Формат · Пример · Самопроверка

## Слайды: одна строка на каждый

| № | Слайд | Главное, что сказать | Клики |
|---|---|---|---|
| 1 | Titul | Ikki qism: prompt logikasi va tool chaining. | 1 |
| 2 | Tajriba | A — umumiy, B — aniq. **Logika boshqa edi.** | 3 |
| 3 | Yoʻl | 5 bekat: Prompt → Logika → Chain → Tool’lar → Agent. | 1 |
| 4 | I qism | Avval model qanday oʻqiydi, keyin qanday yozamiz. | 1 |
| 5 | Tokenlar | Oʻzbekcha 2–2,7 baravar koʻp token: qimmatroq, kontekst tez toʻladi. | 2 |
| 6 | Dastur | Oʻzgaruvchi, shart, sikl, funksiya, natija. Model — interpretator, siz — dasturchi. | 6 |
| 7 | MAKTAB | 6 qatlam, har biri bitta savolga javob. Zalga savol: «qaysi harf tushib qolgan?» | 2 |
| 8 | Agar | Maʼlumot yetmasa — soʻra. Har «agar»ga «aks holda». | 5 |
| 9 | Tartib | Kirish — teglar, chiqish — JSON sxema. Javobni dastur oʻqiy oladi. | 3 |
| 10 | Aniq misol | Misolsiz — tarqoq, 3 ta misol — nishonda. Model hammasini koʻchiradi. | 1 |
| 11 | Reasoning | Qadamni emas, maqsadni bering. Effort: low — arzon, high/max — chuqur. | 1 |
| 12 | Baholash | 30 ta test → 63% → 80% → 93%. Testsiz prompt — taxmin. | 3 |
| 13 | Laboratoriya | Har klik — bitta qatlam. Ball 12 → 96. Jonli: zaldan mahsulot. | 6 |
| 14 | Chain | Bitta ulkan prompt — yomon. Qadamlar + tekshiruv — yaxshi. | 3 |
| 15 | II qism | Endi modelga qoʻl beramiz. | 1 |
| 16 | Qoʻl yoʻq | 3 zaif joy. Tool: nom, tavsif (bu ham prompt!), sxema. | 4 |
| 17 | Tool calling | 7 qadam. **Model faqat soʻraydi — bajaradigan sizning kodingiz.** | 8 |
| 18 | Agent | Agent = model + tool’lar + sikl. Oʻyla → Harakat qil → Kuzat. Toʻxtash sharti shart. | 4 |
| 19 | 6 pattern | Chain, routing, parallel, bosh model, yozuvchi+tekshiruvchi, agent. 5 tasi — workflow. | 7 |
| 20 | Yigʻamiz | LLM → tizim prompti → tool’lar → xotira → sikl → vazifa. Natija — keyingisiga kirish. | 6 |
| 21 | Jonli agent | Tartibni model oʻzi tanlaydi. Zaldan vazifa. | 0 |
| 22 | Tool tavsifi | 5 qoida: nom, tavsif, xato matni, kam tool, qisqa natija. | 5 |
| 23 | MCP | 15 → 8. USB-C. Tools, resources, prompts. | 3 |
| 24 | Kontekst | Ish stoli. Siqish, kerakda yuklash, subagent, skills. | 3 |
| 25 | Xavflar | Sikl, oʻylab topilgan parametr, injection, notoʻgʻri tool, qaytarib boʻlmaydigan, qora quti. | 3 |
| 26 | Asboblar | Console → n8n/SDK → MCP → Langfuse. | 1 |
| 27 | Bonus | 8 ta skill, QR orqali. | 0 |
| 28 | Kim yigʻdi? | AI agent. Men — vazifa, yoʻnaltirish, tekshirish. | 3 |
| 29 | Yakun | 3 fikr va savollar. | 0 |

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
