# Nutq matni · Prompt Logic & AI Agent Tool Chaining

**Shamsiddin · Shams.labs** — 45 daqiqa, auditoriya: AI agentlar bilan ishlaydigan mutaxassislar.

Belgilar: **[KLIK]** — keyingi klik, **[PAUZA]** — 2–3 soniya jimlik, **[SAVOL]** — zalga savol, **[JONLI]** — jonli namoyish.

## Tayyorgarlik (bir kun oldin)

1. Taqdimotni oʻz noutbukingizda oching: `Prompt-Logic-Shams-labs.html` faylini ikki marta bosing (internet shart emas).
2. **F** — toʻliq ekran. Ikkinchi ekran boʻlsa, **P** — maʼruzachi oynasi: eslatmalar, taymer, keyingi slayd va rejadan qancha oldinda yoki orqada ekaningiz.
3. Proyektor xira koʻrsatsa — **T** (yorugʻ rejim). Noutbuk kuchsiz boʻlsa — **M** (yengil rejim, 3D soddalashadi).
4. Jonli laboratoriyalar (2, 13, 21-slaydlar) uchun ikki yoʻl bor:
   - claude.ai’dagi havoladan oching — taqdimot sizning Claude hisobingiz orqali ishlaydi, birinchi chaqiruvda ruxsat soʻraladi;
   - yoki oflayn faylda **vergul (,)** tugmasi → Anthropic API kalitini kiriting.
5. Jonli qismni bir marta oldindan sinab koʻring. Internet boʻlmasa ham tugmalar ishlaydi — yozib olingan namoyish koʻrsatiladi.
6. Klikker (pult) PgDn / PgUp bilan ishlaydi. **B** yoki nuqta — qora ekran (tanaffus yoki savol paytida).
7. QR havolasi tayyor boʻlsa: vergul (,) → «QR havola» maydoniga yozing yoki `src/config.js` dagi `qrUrl` ga qoʻying.

## Boshqaruv

| Tugma | Vazifa |
|---|---|
| → / Space / PgDn | keyingi qadam |
| ← / PgUp | oldingi qadam |
| G, raqam, Enter | kerakli slaydga oʻtish |
| Esc / O | barcha slaydlar |
| F | toʻliq ekran |
| P | maʼruzachi oynasi |
| N | eslatmalar shu ekranda |
| L | lazer koʻrsatkich |
| S | proyektor nuri (gʻildirak bilan oʻlcham) |
| Z | kattalashtirish (keyin bosing) |
| B / . | qora ekran |
| T | yorugʻ rejim |
| M | yengil rejim |
| A | ovoz effektlari |
| , | sozlamalar (API kaliti, QR) |
| ? | yordam |

## Slaydma-slayd matn

Jami reja: **43:30** (qolgan vaqt — savol-javob va pauzalar uchun).

### 1. Titul

⏱ 0:45 · boshlanishi 0:00 · kliklar: 0

Assalomu alaykum! Men — Shamsiddin, Shams.labs.

Bugun sunʼiy intellekt bilan ishlashning ikki qatlami haqida gaplashamiz. Birinchisi — **Prompt Logic**: modelga qanday fikrlashni yozib berish. Ikkinchisi — **Tool Chaining**: modelga qoʻl berib, uni agentga aylantirish.

Sarlavhaga eʼtibor bering: u zarrachalardan yigʻildi. Model ham matnni xuddi shunday — mayda boʻlaklardan, tokenlardan yigʻib koʻradi. Shu yerdan boshlaymiz. **[KLIK]**

### 2. Bir xil model, ikki xil prompt

⏱ 1:50 · boshlanishi 0:45 · kliklar: 3

Kichik tajriba. Chap tomonda koʻpchilik yozadigan prompt: «Kofexona uchun marketing strategiya yozib ber». **[KLIK]**

Natija toʻgʻri, lekin foydasi yoʻq. Bu matnni istalgan kofexonaga, istalgan shaharga qoʻyish mumkin. **[KLIK]**

Oʻng tomonda — xuddi shu model. Faqat promptda maqsad, kontekst, shart va format bor. Natija: toʻrt haftalik reja, har bir gʻoyaga KPI va byudjet hisobi.

**[SAVOL]** Nima oʻzgardi? **[PAUZA]** Model oʻzgarmadi. **[KLIK]**

**Model bir xil edi. Logika boshqa edi.** Bugungi maʼruzaning asosiy gʻoyasi shu.

**[JONLI]** Internet boʻlsa, «Jonli sinash» tugmasini bosing: ikkala prompt shu zahoti Claude’ga ketadi va javoblar ekranda yoziladi.

### 3. Bugungi yoʻl

⏱ 0:50 · boshlanishi 2:35 · kliklar: 0

Yoʻlimiz besh bekatdan iborat. Avval model matnni qanday oʻqishini koʻramiz. Keyin promptni dastur kabi yozishni oʻrganamiz — buning uchun **MAKTAB** degan freymvork bor.

Soʻng katta vazifani qadamlarga boʻlib, chain qilamiz, modelga tool’lar beramiz va oxirida jonli agent yigʻamiz.

Pastdagi chiziq butun maʼruza davomida qayerda ekanimizni koʻrsatib turadi. Oxirida sizni 8 ta bonus skill kutyapti. **[KLIK]**

### 4. I qism · Prompt Logic

⏱ 0:20 · boshlanishi 3:25 · kliklar: 0

Birinchi qism — **Prompt Logic**. Avval model qanday oʻqishini koʻramiz, keyin — qanday yozishimiz kerakligini. **[KLIK]**

### 5. Model tokenlarni oʻqiydi

⏱ 1:30 · boshlanishi 3:45 · kliklar: 2

Model matnni biz kabi soʻzma-soʻz oʻqimaydi. U matnni **tokenlarga** — mayda boʻlaklarga boʻladi. Ekranda haqiqiy tokenizator: har bir rangli boʻlak — bitta token, ostidagi raqam — uning ID raqami.

Oʻzbekcha va inglizcha gapni solishtiring: maʼnosi bir xil, lekin oʻzbekchasi ikki baravardan koʻproq token oladi. **[KLIK]**

Amaliy xulosa: oʻzbek tilida ishlaganda kontekst tezroq toʻladi va narx oshadi. Uzun hujjatlar bilan ishlaganda buni hisobga oling. **[KLIK]**

Ikkinchi xulosa: model har safar keyingi tokenni ehtimollik boʻyicha tanlaydi. Prompt — shu ehtimollarni boshqarish usuli. Teglar va sarlavhalar esa model uchun aniq chegaralar boʻladi.

**[JONLI]** Zaldan bitta gap soʻrang va shu yerning oʻzida yozib koʻrsating.

### 6. Prompt — tabiiy tildagi dastur

⏱ 1:45 · boshlanishi 5:15 · kliklar: 6

Endi asosiy gʻoya: **prompt — bu tabiiy tildagi dastur**. Chapda — oddiy kod, oʻngda — xuddi shu logika, faqat oʻzbek tilida. **[KLIK]**

Oʻzgaruvchi: kodda «const mijoz», promptda «Mijoz ismi». Shablon — bitta prompt, minglab mijoz. **[KLIK]**

Shart: «if» — promptda «Agar». **[KLIK]** Sikl: «for» — «Har bir sharh uchun». **[KLIK]** Funksiya — aniq qadamlar. **[KLIK]** Natija — «return», yaʼni javob formati. **[KLIK]**

Xulosa: **model — interpretator, siz — dasturchi**. Koddagi xato kabi, promptdagi noaniqlik ham xatoga olib keladi.

### 7. MAKTAB freymvorki

⏱ 2:30 · boshlanishi 7:00 · kliklar: 2

Endi kuchli promptni qanday yigʻishni koʻramiz. Ekranda oddiy prompt: onlayn doʻkon yordam xizmati mijoz shikoyatiga javob yozadi. Bir qarashda — oddiy matn. **[KLIK]**

Lekin uni qatlamlarga ajratsak, oltita qatlam chiqadi. Men buni **MAKTAB** deb nomladim. **[KLIK]**

**M — Maqsad**: nima kerak va nima uchun. «Mijoz bizda qolsin» — bu modelga qaror qabul qilish uchun yoʻnalish beradi.

**A — Agar**: shartlar va cheklovlar. «Chegirma 10% dan oshmasin» — busiz model saxiylik qilib yuboradi.

**K — Kontekst**: kim gapiryapti, kim bilan, qanday vaziyatda. **T — Tuzilma**: javob formati va hajmi.

**A — Andoza**: namuna. Bitta misol ohangni oʻnta qoidadan yaxshiroq tushuntiradi. **B — Baholash**: model javobni yuborishdan oldin oʻzini tekshiradi.

**[SAVOL]** Oxirgi yozgan promptingizni eslang — undan qaysi harflar tushib qolgan edi?

### 8. «Agar» — promptdagi logika

⏱ 1:35 · boshlanishi 9:30 · kliklar: 5

MAKTAB’dagi eng muhim harf — A, yaʼni **«Agar»**. Bu — Prompt Logic’ning yuragi. **[KLIK]**

Birinchi qoida: maʼlumot yetarli boʻlmasa — taxmin qilma, soʻra. Shu bitta qator gallyutsinatsiyalarning katta qismini yoʻqotadi. **[KLIK]**

Keyin soʻrov turini aniqlaymiz: qaytarish soʻrovi — muddatiga qarab ikki xil yoʻl. **[KLIK]** Texnik muammo — avval ikkita savol berib aniqlaymiz. **[KLIK]** Va eng muhimi — «aks holda». **[KLIK]**

Qoida oddiy: **har bir «agar»ning «aks holda»si boʻlsin**. Ochiq qolgan shox — gallyutsinatsiyaga eshik. Model qayerga borishni bilmasa, yoʻlni oʻzi oʻylab topadi.

### 9. Tuzilma: teglar va sxema

⏱ 1:30 · boshlanishi 11:05 · kliklar: 3

**T — Tuzilma**. Uning ikki tomoni bor: kirish va chiqish. Kirishda XML teglardan foydalanamiz: hujjat alohida, qoidalar alohida, savol alohida. Model qayerda maʼlumot, qayerda buyruq ekanini aniq koʻradi.

Uzun hujjatni tepaga, savolni oxiriga qoʻying — bu sifatni sezilarli oshiradi. **[KLIK]**

Chiqishda — JSON sxema. Modeldan erkin matn emas, aniq maydonlar soʻraymiz: javob, manba, ishonch darajasi. **[KLIK]**

Mana javob: sxemaga toʻliq mos. Bunday javobni kod oʻqiy oladi — bu esa keyingi qismga, tool’lar va agentlarga koʻprik. **[KLIK]**

Claude’da **structured outputs** rejimi bor: javob sxemaga qatʼiy mos keladi.

### 10. Andoza: misollar kuchi

⏱ 1:15 · boshlanishi 12:35 · kliklar: 1

**A — Andoza**, yaʼni misollar. Oʻngdagi nishonga qarang: har bir nuqta — modelning bitta javobi. Misolsiz javoblar tarqoq: har safar boshqa uzunlik, boshqa ohang. **[KLIK]**

Uchta xilma-xil misol qoʻshdik — javoblar nishonga yigʻildi.

Lekin ehtiyot boʻling: model misoldagi hamma narsani koʻchiradi. Misolingiz uch qator boʻlsa — javob ham uch qator. Misolda xato boʻlsa — xato ham koʻchadi. Shuning uchun misol tanlashga qoida yozishdan koʻra koʻproq vaqt ajrating.

### 11. Reasoning modellar

⏱ 1:30 · boshlanishi 13:50 · kliklar: 1

Soʻnggi ikki yilning katta oʻzgarishi — **reasoning modellar**, yaʼni javobdan oldin oʻylaydigan modellar. Ilgari «qadam-baqadam oʻyla» deb, har bir qadamni yozib berardik. **[PAUZA]**

Bugungi modellar javob berishdan oldin oʻzi fikrlaydi va qadamlarni koʻpincha bizdan yaxshiroq rejalashtiradi. Shuning uchun endi qadamni emas, maqsadni beramiz: nima kerak, natija qanday boʻlishi kerak, qanday cheklov bor. Bitta qator qoʻshsak kifoya: «javobdan oldin raqamlarni manba bilan solishtir». **[KLIK]**

Qancha fikrlashni **effort** parametri bilan boshqaramiz. Oddiy vazifaga — low: tez va arzon. Murakkab tahlilga — high yoki max. Hamma narsaga max qoʻyish — vaqt va pulni behuda sarflash.

### 12. Evalsiz prompt — taxmin

⏱ 1:30 · boshlanishi 15:20 · kliklar: 3

**B — Baholash**. Bu yerda koʻpchilik adashadi: promptni yozadi, ikki-uch marta sinaydi va «ishlayapti» deydi. Bu — taxmin, oʻlchov emas.

Toʻgʻri jarayon: 30 ta real holatdan test toʻplami va har bir javobni rubrika boʻyicha baholash. Buni boshqa model — LLM-hakam qila oladi. **[KLIK]**

Birinchi versiya: 30 tadan 19 tasi toʻgʻri, 63 foiz. Xatolarni koʻramiz: 5 tasi format, 4 tasi ohang, 2 tasi fakt. Demak, T va K qatlamlarini tuzatish kerak. **[KLIK]**

Ikkinchi versiya — 80 foiz. **[KLIK]** Uchinchisi — 93 foiz.

Xulosa: **evalsiz prompt — bu taxmin, eval bilan — aniq oʻlchov**.

### 13. Prompt laboratoriyasi

⏱ 1:35 · boshlanishi 16:50 · kliklar: 6

Endi hammasini jonli koʻramiz. Chapda — prompt, tepada — MAKTAB harflari, oʻngda — natija. **[KLIK]**

Har bir klikda bitta qatlam qoʻshiladi: maqsad… **[KLIK]** shartlar… **[KLIK]** kontekst… **[KLIK]** tuzilma… **[KLIK]** andoza… **[KLIK]** va baholash. Ball 12 dan 96 ga chiqdi.

**[JONLI]** «Claude’da ishga tushirish» tugmasi promptni shu zahoti modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, promptdagi mahsulotni almashtiring va natijani birga koʻring.

### 14. Bitta ulkan prompt oʻrniga — chain

⏱ 1:15 · boshlanishi 18:25 · kliklar: 3

Birinchi qismning oxirgi gʻoyasi. Hamma narsani bitta ulkan promptga tiqish — koʻp uchraydigan xato: model bir vaqtda yigʻadi, tahlil qiladi, yozadi, tekshiradi — va hammasini yarim-yorti qiladi. **[KLIK]**

Toʻgʻri yoʻl — **chain**: har bir qadam bitta vazifani bajaradi, qadamlar orasida aniq format — JSON. Ikkinchi qadamdan keyin — tekshiruv: sifat yetarli boʻlmasa, chain davom etmaydi. **[KLIK]**

Afzalligi: xato qayerda ekani darhol koʻrinadi va har bir qadamni alohida test qilasiz. **[KLIK]**

Endi eng qiziq joyi: bu chain’ga **qoʻl** qoʻshamiz.

### 15. II qism · AI Agent Tool Chaining

⏱ 0:20 · boshlanishi 19:40 · kliklar: 0

Ikkinchi qism — **Tool Chaining**. Birinchi qismda modelga qanday fikrlashni oʻrgatdik. Endi unga qoʻl beramiz. **[KLIK]**

### 16. Modelning qoʻli yoʻq

⏱ 1:25 · boshlanishi 20:00 · kliklar: 4

Eng kuchli model ham uchta narsani qila olmaydi. **[PAUZA]** Birinchisi — bilimi muzlatilgan: u oʻqitilgan sanadan keyingi voqealarni bilmaydi. Ikkinchisi — katta sonlar bilan hisobda adashadi. Uchinchisi va eng muhimi — dunyoda harakat qila olmaydi: xat yubora olmaydi, bazaga yoza olmaydi. **[KLIK]**

Yechim — **tool**. Tool — modelning qoʻli. U uch qismdan iborat. **[KLIK]**

Nomi — nima qilishini aytadi. **[KLIK]** Tavsifi — qachon va qanday ishlatishni tushuntiradi. Eʼtibor bering: **tavsif ham prompt**! Model aynan shu matnni oʻqib qaror qiladi. **[KLIK]**

Va parametrlar sxemasi — model tool’ni chaqirganda maʼlumotni aynan shu shaklda yuboradi.

### 17. Tool calling qanday ishlaydi

⏱ 1:55 · boshlanishi 21:25 · kliklar: 8

Endi tool calling qanday ishlashini qadam-baqadam koʻramiz. Toʻrtta ishtirokchi bor: foydalanuvchi, sizning ilovangiz, Claude va tashqi tool. **[KLIK]**

Foydalanuvchi soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» **[KLIK]** Ilova savolni tool’lar roʻyxati bilan birga Claude’ga yuboradi. **[KLIK]**

Claude darhol javob bermaydi — u tool chaqirishni soʻraydi: get_weather, shahar — Samarqand. stop_reason: tool_use. **[KLIK]**

Ilova haqiqiy API’ni chaqiradi. **[KLIK]** Maʼlumot qaytadi: yomgʻir ehtimoli 70 foiz. **[KLIK]** Ilova natijani tool_result sifatida Claude’ga qaytaradi. **[KLIK]** Va faqat shundan keyin Claude foydalanuvchiga javob beradi. **[KLIK]**

Eng muhim nuqta: **model tool’ni oʻzi ishga tushirmaydi**. U faqat soʻraydi — bajaradigan sizning kodingiz. Demak, nazorat ham sizda.

### 18. Agent = model + tool’lar + sikl

⏱ 1:20 · boshlanishi 23:20 · kliklar: 4

Agent nima? Formula oddiy: **model + tool’lar + sikl**. Chapdagi yetti qator — har qanday agentning yuragi. **[KLIK]**

Oʻyla: model vazifani va tarixni koʻrib, keyingi qadamni tanlaydi. **[KLIK]** Tool kerak boʻlmasa — tayyor, sikldan chiqamiz. **[KLIK]** Aks holda tool’ni bajaramiz va natijani tarixga qoʻshamiz — bu «kuzatish». Va yana boshidan. **[KLIK]**

Muhim: har bir agentda toʻxtash sharti boʻlishi shart — vazifa bajarildi, qadamlar limiti tugadi yoki inson tasdigʻi kerak.

### 19. Chaining: 6 ta pattern

⏱ 3:20 · boshlanishi 24:40 · kliklar: 7

Barcha agent tizimlari oltita asosiy patterndan yigʻiladi. Bu roʻyxat Anthropic’ning «Building Effective Agents» maqolasidan olingan. **[KLIK]**

**Ketma-ket chain**: bir qadamning natijasi keyingi qadamga uzatiladi. Oraliqda tekshiruv sifatni nazorat qiladi. Misol: reja, keyin matn, keyin tarjima. **[KLIK]**

**Routing**: avval soʻrov turi aniqlanadi, keyin mos yoʻlga yuboriladi. Misol: yordam xizmati — savol, shikoyat, qaytarish. **[KLIK]**

**Parallel ishlash**: vazifa boʻlaklarga boʻlinadi yoki bir nechta model ovoz beradi. **[KLIK]**

**Orkestrator va ishchilar**: bosh model vazifani oʻzi boʻladi va ishchilarga tarqatadi. **[KLIK]**

**Yozuvchi va tekshiruvchi**: biri yozadi, ikkinchisi tekshiradi — natija yaxshi boʻlguncha takrorlanadi. **[KLIK]**

**Avtonom agent**: reja, tool’lar va qachon toʻxtashni model oʻzi hal qiladi. **[KLIK]**

Birinchi beshtasi — workflow: yoʻlni biz chizamiz. Oltinchisi — agent: yoʻlni model tanlaydi. Maslahat: oddiydan boshlang. Agent — birinchi emas, oxirgi chora.

### 20. Agentni yigʻamiz

⏱ 2:10 · boshlanishi 28:00 · kliklar: 6

Endi agentni koʻz oldimizda yigʻamiz. Markazda — LLM, yaʼni miya. Hozircha u faqat matn oladi va matn qaytaradi. **[KLIK]**

**Tizim prompti** — agentning xarakteri: rol, maqsad, qoidalar. Birinchi qismdagi MAKTAB aynan shu yerda ishlaydi. **[KLIK]**

**Tool’lar** — oltita modul: tadbirlar, ob-havo, kalkulyator, valyuta, hisobot va xabar. Har biri — aniq kontrakt. **[KLIK]**

**Xotira**: qisqa muddatli — kontekst oynasi, uzoq muddatli — fayllar va baza. **[KLIK]**

Va **sikl**: Oʻyla, Harakat qil, Kuzat. Shu sikl aylana boshlaganda tizim jonlanadi. **[KLIK]**

Vazifa keldi: oktabrdagi AI tadbirlarini top, ob-havoni tekshir, eng mosini tanla va jamoaga xabar yubor. Qarang: agent rejani oʻzi tuzadi, ob-havoni uchta sana uchun parallel soʻraydi, hisobot tuzadi va yuboradi. **[KLIK]**

**Bu — agent.** Model + prompt + tool’lar + xotira + sikl.

**[JONLI]** «Toʻliq koʻrish» tugmasi butun sahnani 70 soniyada uzluksiz koʻrsatadi.

### 21. Jonli agent

⏱ 3:00 · boshlanishi 30:10 · kliklar: 0

Endi eng qiziq joyi: shu agent hozir jonli ishlaydi. Bu animatsiya emas — Claude tool’larni haqiqatan oʻzi tanlaydi va chaqiradi, har bir chaqiruv ekranda koʻrinadi. **[JONLI]**

Birinchi vazifani ishga tushiraman. **[PAUZA]** Oʻngda — trace: har bir tool_use va tool_result. Chapda — agent: paketlar tool’larga ketyapti va qaytyapti.

**[SAVOL]** Zaldan vazifa soʻrang: boshqa shahar yoki boshqa byudjet. «Oʻz vazifangiz» tugmasini bosing va yozing.

Internet boʻlmasa, xuddi shu tugma yozib olingan namoyishni koʻrsatadi — maʼruza toʻxtab qolmaydi.

Tool’lardagi maʼlumotlar demo, lekin qarorlar haqiqiy: qaysi tool’ni, qaysi tartibda chaqirishni model oʻzi hal qilyapti.

### 22. Tool tavsifi — bu ham prompt

⏱ 1:20 · boshlanishi 33:10 · kliklar: 5

Agentning sifati koʻp jihatdan tool’lar tavsifiga bogʻliq. Chapda — yomon misol: «search», «qidiradi». Model nimani, qanday va qachon qidirishni bilmaydi. Oʻngda — yaxshi misol. **[KLIK]**

Nom — aniq va prefiks bilan. **[KLIK]** Tavsif — yangi xodimga tushuntirgandek: qachon ishlatish va qachon ishlatmaslik. **[KLIK]** Xato matni ham nima qilishni aytishi kerak: model xatodan keyin nimani tuzatishni bilsin. **[KLIK]** Tool’lar soni: 40 ta mayda emas, 8 ta aniq. **[KLIK]** Va natija qisqa boʻlsin — har bir ortiqcha token kontekstni egallaydi.

### 23. MCP — AI uchun USB-C

⏱ 1:25 · boshlanishi 34:30 · kliklar: 3

Endi integratsiya muammosi. Deylik, sizda uchta AI ilova va beshta servis bor. **[KLIK]** Har birini alohida ulash — 15 ta integratsiya. Yangi servis qoʻshilsa — yana uchta. **[KLIK]**

**MCP — Model Context Protocol** buni hal qiladi: har bir servis bir marta MCP server sifatida yoziladi, har bir ilova MCP’ni bir marta qoʻllab-quvvatlaydi. 15 emas — 8. Xuddi USB-C kabi: bitta ulagich — istalgan qurilma. **[KLIK]**

MCP server uch narsa beradi: tools — amallar, resources — maʼlumotlar va prompts — tayyor shablonlar. MCP’ni 2024-yil noyabrda Anthropic taqdim etgan, bugun u Linux Foundation qoshidagi ochiq standart.

### 24. Context engineering

⏱ 1:35 · boshlanishi 35:55 · kliklar: 3

Birinchi qismda promptni qanday yozishni gapirdik. Agentlarda yangi savol paydo boʻladi: model aynan nimani koʻradi? **[KLIK]**

Kontekst oynasi — cheklangan ish stoli. Tizim prompti, tool’lar tavsifi, suhbat tarixi, hujjatlar, tool natijalari — hammasi shu stolga sigʻishi kerak. Uzun ishda stol toʻlib ketadi va sifat tushadi. **[KLIK]**

Toʻrt usul bor. **Siqish** — eski tarix qisqa xulosaga aylanadi. **Kerak boʻlganda yuklash** — butun hujjat emas, faqat kerakli qism. **Subagentlar** — har biri toza kontekstda ishlaydi va faqat xulosa qaytaradi. **Skills** — agent avval faqat skill nomi va tavsifini koʻradi, kerak boʻlgandagina toʻliq ochadi. **[KLIK]**

Qisqa qilib aytganda: prompt engineering — nima deyish. Context engineering — model nimani koʻrishi.

### 25. Agent qayerda sinadi

⏱ 1:20 · boshlanishi 37:30 · kliklar: 3

Oxirgi mavzu — ishonchlilik. Agent qayerda sinadi? **[KLIK]**

**Cheksiz sikl** — himoya: qadamlar limiti va byudjet. **Oʻylab topilgan parametrlar** — himoya: sxema tekshiruvi va tushunarli xato matni. **[KLIK]**

**Prompt injection** — eng xavflisi: tool qaytargan matn ichida yashirin buyruq boʻlishi mumkin. Qoida: tashqi matn — buyruq emas, maʼlumot; ruxsatlar esa minimal. **Notoʻgʻri tool tanlash** — aniq tavsif va kamroq tool. **[KLIK]**

**Qaytarib boʻlmaydigan harakatlar** — pul oʻtkazish, oʻchirish — faqat inson tasdigʻi bilan. **«Qora quti»** muammosi esa trace, log va evallar bilan hal qilinadi.

### 26. Asboblar xaritasi 2026

⏱ 1:00 · boshlanishi 38:50 · kliklar: 1

Qisqacha asboblar xaritasi. Promptni sinash uchun — Claude Console yoki boshqa «playground»lar. Agent yozish uchun — SDK va freymvorklar: Claude Agent SDK, LangGraph, CrewAI va boshqalar.

Kod yozmasdan — n8n, Make, Dify. Kodlash agentlari — Claude Code, Cursor. Protokollar — MCP, A2A va Agent Skills. Va albatta, kuzatuv va eval — Langfuse, LangSmith, Promptfoo. **[KLIK]**

Qayerdan boshlash kerak? Claude Console’da prompt, n8n yoki Agent SDK’da chain, MCP bilan tool’lar va Langfuse bilan kuzatuv.

### 27. Bonus: 8 ta skill

⏱ 1:10 · boshlanishi 39:50 · kliklar: 0

Va sovgʻa: **sakkizta skill** — prompt engineering uchun. Skill — Claude’ga yangi mahorat qoʻshadigan papka. Oʻrnatasiz — va Claude MAKTAB boʻyicha prompt yozadi, promptni tekshiradi, eval tuzadi, tool’lar tavsifini yozadi.

QR orqali yuklab olasiz. SKILL.md — ochiq standart, shuning uchun boshqa agentlar ham uni tushunadi.

**[PAUZA]** QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.

### 28. Bu taqdimotni kim yigʻdi?

⏱ 1:30 · boshlanishi 41:00 · kliklar: 3

Oxirgi misol. **[PAUZA]** Bir savol: bu taqdimotni kim yigʻdi? **[KLIK]**

Uni **AI agent** yigʻdi. Men vazifa qoʻydim, yoʻnaltirdim va natijani tekshirdim. **[KLIK]**

Mana u qanday ishladi: faktlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni skrinshot orqali oʻzi koʻrib chiqdi, videoni render qildi va nashr qildi. Bu — tool chaining amalda. **[KLIK]**

Bugun gaplashgan hamma narsa — prompt logikasi, tool chaining, sikl — shu taqdimot ichida ishladi.

### 29. Yakun va savollar

⏱ 1:00 · boshlanishi 42:30 · kliklar: 0

Uchta fikrni olib keting. Birinchi: **prompt — bu dastur**; uni MAKTAB bilan yozing va eval bilan oʻlchang.

Ikkinchi: **tool — modelning qoʻli**, uning tavsifi ham prompt.

Uchinchi: **oddiydan boshlang** — prompt, keyin chain, keyin workflow, va faqat kerak boʻlsa — agent.

Rahmat! Savollaringizni kutaman.
