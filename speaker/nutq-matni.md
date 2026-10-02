# Maʼruza skripti · Prompt Logic & AI Agent Tool Chaining

**Shamsiddin · Shams.labs** — 45 daqiqa. Matn oddiy tilda va hayotiy misollar bilan yozilgan: mavzuni endi oʻrganayotganlar ham tushunadi.

Har bir slayd uchun toʻliq matn: nima deyish va qachon bosish. Xuddi shu matn maʼruzachi oynasida (**P**) va eslatmalarda (**N**) chiqadi.

Belgilar: **[KLIK]** — keyingi klik, **[PAUZA]** — 2–3 soniya jimlik, **[SAVOL]** — zalga savol, **[JONLI]** — jonli namoyish.

## Tayyorgarlik (bir kun oldin)

1. Taqdimotni oʻz noutbukingizda oching: `Prompt-Logic-Shams-labs.html` faylini ikki marta bosing (internet shart emas).
2. **F** — toʻliq ekran. Ikkinchi ekran boʻlsa, **P** — maʼruzachi oynasi: eslatmalar, taymer, keyingi slayd va rejadan qancha oldinda yoki orqada ekaningiz.
3. Proyektor xira koʻrsatsa — **T** (yorugʻ rejim). Noutbuk kuchsiz boʻlsa — **M** (yengil rejim, 3D soddalashadi).
4. Jonli laboratoriyalar (2, 7, 15-slaydlar) uchun ikki yoʻl bor:
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

## Slaydma-slayd skript

Jami reja: **34:30** (qolgan vaqt — savol-javob va pauzalar uchun).

### 1. Titul

⏱ 0:55 · boshlanishi 0:00 · kliklar: 0

Assalomu alaykum! Men — Shamsiddin, Shams.labs.

Bugun sunʼiy intellekt haqida gaplashamiz. Lekin murakkab qilib emas — oddiy qilib.

Sunʼiy intellektni ishga yangi kelgan **stajyor** deb tasavvur qiling. Juda aqlli, butun internetni oʻqib chiqqan. Lekin sizning ishingizni bilmaydi, aytganingizni soʻzma-soʻz tushunadi, qoʻli yoʻq — oʻzi hech narsa qila olmaydi. Va bilmagan narsasini oʻylab topadi.

Bugun ikkita narsani oʻrganamiz. Birinchisi — bu stajyorga vazifani qanday toʻgʻri berish. Bu — **Prompt Logic**. Ikkinchisi — unga qanday qilib qoʻl berish, toki ishni oʻzi qilsin. Bu — **Tool Chaining**. **[KLIK]**

### 2. Bir xil model, ikki xil prompt

⏱ 1:55 · boshlanishi 0:55 · kliklar: 3

Keling, tajribadan boshlaymiz. Ekranda ikkita vazifa, ikkalasini ham bitta modelga — Claude’ga beramiz.

Chapda — koʻpchilik shunday yozadi: «Kofexona uchun marketing strategiya yozib ber». Javobga qarang: «Ijtimoiy tarmoqlarda faol boʻling, aksiya oʻtkazing». Toʻgʻri gap-ku, lekin foydasi yoʻq. Buni istalgan kofexonaga yopishtirsa boʻladi. **[KLIK]**

Oʻngda — xuddi shu model, lekin vazifa boshqacha. Nima kerakligi aniq: toʻrt haftalik Instagram reja. Vaziyat aniq: byudjet besh million soʻm, mijozlar — talabalar, yonida uchta universitet. Shart bor: agar gʻoya qimmat boʻlsa, arzonrogʻini taklif qil. Va format: jadval qilib ber.

Natija — har hafta uchun aniq ish, xarajat byudjet ichida. Ertagayoq boshlasa boʻladi. **[KLIK]**

**[SAVOL]** Xoʻsh, nima oʻzgardi? **[PAUZA]** Model oʻzgarmadi. Biz bergan vazifa oʻzgardi. **[KLIK]**

**Model bir xil edi. Logika boshqa edi.** Bugungi maʼruzaning asosiy gapi shu.

**[JONLI]** Internet boʻlsa, «Jonli sinash» tugmasini bosing — ikkala vazifa hozir Claude’ga ketadi va javoblar ekranda yoziladi.

### 3. Bugungi yoʻl

⏱ 0:50 · boshlanishi 2:50 · kliklar: 0

Bugungi yoʻlimiz besh bekat — xuddi metro kabi.

**Prompt** — stajyorga vazifani qanday berish. **Logika** — «agar … aks holda» bilan yozish. **Chain** — katta ishni kichik qadamlarga boʻlish. **Tool’lar** — modelga qoʻl berish. **Agent** — ishni oʻzi bajaradigan yordamchi.

Pastdagi chiziq qayerda ekanimizni koʻrsatib turadi. Oxirida esa sovgʻa bor — 8 ta tayyor skill. **[KLIK]**

### 4. I qism · Prompt Logic

⏱ 0:20 · boshlanishi 3:40 · kliklar: 0

Birinchi qism — **Prompt Logic**, yaʼni stajyorga vazifani qanday berish. Buning oddiy formulasi bor. **[KLIK]**

### 5. MAKTAB formulasi

⏱ 3:00 · boshlanishi 4:00 · kliklar: 2

Endi kuchli vazifani qanday yozamiz? Tikuvchiga koʻylak buyurtma qilganingizni eslang. Nimalarni aytasiz? Qayerga kiyishingizni, oʻlchamni, «mato yetmasa qoʻngʻiroq qiling» deysiz, rasm koʻrsatasiz, oxirida kiyib koʻrasiz. Yaxshi prompt ham xuddi shunday.

Ekranda oddiy vazifa: internet-doʻkonning yordam xizmati mijoz shikoyatiga javob yozadi. **[KLIK]**

Uni boʻlaklarga ajratsak, olti qism chiqadi. Eslab qolish oson boʻlsin deb, men ularni bitta soʻzga yigʻdim: **MAKTAB**. **[KLIK]**

**M — Maqsad**: nima kerak va nima uchun. «Shikoyatga javob yoz, mijoz bizdan ketmasin».

**A — Agar**: shartlar. «Buyurtma raqami boʻlmasa — avval soʻra. Chegirma 10 foizdan oshmasin». Bu boʻlmasa, model mijozni xursand qilaman deb 50 foiz chegirma vaʼda qilib yuboradi.

**K — Kontekst**: kim, kim bilan, qanday vaziyatda. «Sen — yordam xizmati xodimisan, mijoz bizdan 2 yildan beri xarid qiladi».

**T — Tartib**: javob qanday koʻrinishda. «Avval uzr, keyin yechim, keyin keyingi qadam. 80 soʻzdan oshmasin».

**A — Aniq misol**: tayyor javob namunasi. Tikuvchiga rasm koʻrsatgandek.

**B — Baholash**: yuborishdan oldin oʻzini tekshirish. Koʻylakni kiyib koʻrgandek.

**[SAVOL]** Oxirgi yozgan vazifangizni eslang. Undan qaysi harflar tushib qolgan edi? **[PAUZA]** Koʻpincha — A va B.

### 6. «Agar» — promptdagi logika

⏱ 2:00 · boshlanishi 7:00 · kliklar: 5

MAKTAB’dagi eng muhim harf — **«Agar»**. Navigatorni eslang: yoʻl yopiq boʻlsa, boshqa yoʻl topadi. Nima qilishni oldindan biladi. Vazifada ham shunday boʻlishi kerak. Chapda — vazifa, oʻngda — xuddi shu vazifa yoʻllar xaritasi sifatida. **[KLIK]**

Birinchi qoida: **maʼlumot yetmasa — taxmin qilma, soʻra**. Chunki stajyor bilmagan narsasiga «bilmayman» demaydi, oʻzi toʻqib chiqaradi. **[KLIK]**

Keyin model soʻrov turini aniqlaydi. Qaytarish boʻlsa: 14 kungacha — qaytarish tartibini yuboradi, 14 kundan keyin — boshqa variant taklif qiladi. **[KLIK]**

Texnik muammo boʻlsa — darhol javob bermaydi, avval ikkita savol beradi. **[KLIK]**

Va eng muhimi — **«aks holda»**: hech biriga toʻgʻri kelmasa, operatorga ulaydi. **[KLIK]**

Qoida oddiy: **har bir «agar»ning oʻz «aks holda»si boʻlsin**. Yoʻl koʻrsatilmagan joyda model yoʻlni oʻzi oʻylab topadi. Buni gallyutsinatsiya deyishadi — yaʼni ishonch bilan aytilgan yolgʻon.

### 7. Prompt laboratoriyasi

⏱ 2:30 · boshlanishi 9:00 · kliklar: 6

Endi hammasini jonli koʻramiz. Chapda — vazifa va MAKTAB harflari, oʻngda — natija. Boshida vazifa bitta qator: «Termos haqida tavsif yoz». Javob esa zerikarli, umumiy gap. **[KLIK]**

Har klikda bitta harf qoʻshamiz. **Maqsad**: marketpleysda sotadigan tavsif. **[KLIK]** **Agar**: berilmagan xususiyatni oʻylab topma. **[KLIK]** **Kontekst**: yarim litr, 12 soat issiq saqlaydi, xaridorlar — talabalar va haydovchilar. **[KLIK]** **Tartib**: sarlavha, 3 ta afzallik va bitta chaqiriq. **[KLIK]** **Aniq misol**: «Ertalabki choy — kechgacha issiq». **[KLIK]** Va **baholash**: yuborishdan oldin raqamlarni tekshir.

Javobga qarang: zerikarli gapdan tayyor sotuv matniga aylandi. Model oʻsha-oʻsha — faqat vazifa yaxshilandi.

**[JONLI]** «Claude’da ishga tushirish» tugmasi vazifani hozir modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, termos oʻrniga yozing va natijani birga koʻring.

### 8. Bitta ulkan prompt oʻrniga — chain

⏱ 1:30 · boshlanishi 11:30 · kliklar: 3

Birinchi qismning oxirgi gapi. Osh damlashni eslang. Hamma narsani bir vaqtda qozonga tashlamaysiz-ku: avval goʻsht, keyin piyoz va sabzi, keyin guruch. Har bosqichning oʻz vaqti bor.

Model bilan ham shunday. Hamma ishni bitta katta vazifaga tiqsangiz — «yigʻ, tahlil qil, yoz, tarjima qil, tekshir» — model hammasini chala qiladi. Xato qayerdaligini ham topa olmaysiz. **[KLIK]**

Toʻgʻri yoʻl — **chain**, yaʼni ishni ketma-ket qadamlarga boʻlish: yigʻish, tahlil, yozish, tekshirish. Har qadam bitta ishni qiladi va natijasini keyingisiga beradi. Oʻrtada tekshiruv bor: sifat yomon boʻlsa, ish davom etmaydi. **[KLIK]**

Foydasi: xato qayerda ekani darhol koʻrinadi, har qadamni alohida yaxshilaysiz. Oddiy qadamga arzon model, murakkabiga kuchlisini qoʻyish ham mumkin. **[KLIK]**

Endi eng qiziq joyi: bu chain’ga **qoʻl** qoʻshamiz.

### 9. II qism · AI Agent Tool Chaining

⏱ 0:20 · boshlanishi 13:00 · kliklar: 0

Ikkinchi qism — **Tool Chaining**. Birinchi qismda stajyorga vazifa berishni oʻrgandik. Endi unga qoʻl beramiz. **[KLIK]**

### 10. Modelning qoʻli yoʻq

⏱ 1:50 · boshlanishi 13:20 · kliklar: 4

Eng aqlli model ham uchta narsani qila olmaydi. **[PAUZA]**

Birinchisi — **yangiliklarni bilmaydi**. Uning bilimi oʻqitilgan kunda toʻxtab qolgan: bugungi kurs ham, bugungi ob-havo ham unga notanish.

Ikkinchisi — **hisobda adashadi**. Katta sonlarni xato hisoblashi mumkin.

Uchinchisi, eng muhimi — **hech narsa qila olmaydi**. Xat yubora olmaydi, buyurtma bera olmaydi. Miyasi bor, qoʻli yoʻq. **[KLIK]**

Yechim — **tool**. Tool — bu modelning qoʻli: u chaqira oladigan kichik dastur. Ob-havo, kalkulyator, qidiruv, xat yuborish — hammasi tool boʻla oladi. Har bir tool’ning uch qismi bor. **[KLIK]**

Birinchisi — **nomi**: «Ob-havo». **[KLIK]**

Ikkinchisi — **nima qiladi**: «Shahar boʻyicha ob-havoni aytadi». Eʼtibor bering: **bu ham prompt**! Model aynan shu gapni oʻqib, qaysi tool’ni olishni hal qiladi. Xuddi dori qutisidagi yoʻriqnoma kabi. **[KLIK]**

Uchinchisi — **nima kerak**: shahar nomi — albatta, sana — xohlasa.

### 11. Tool calling qanday ishlaydi

⏱ 2:10 · boshlanishi 15:10 · kliklar: 8

Endi tool qanday chaqirilishini qadam-baqadam koʻramiz. Oddiy oʻxshatish: model — **boshliq**, sizning dasturingiz — **yordamchi**. Boshliq oʻzi hech narsa qilmaydi, faqat xatcha yozadi. **[KLIK]**

Odam soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» **[KLIK]**

Dastur savolni Claude’ga beradi va aytadi: «Sening ixtiyoringda ob-havo tool’i bor». **[KLIK]**

Claude darhol javob bermaydi — u ertangi ob-havoni bilmaydi va buni tushunadi. Shuning uchun xatcha yozadi: «Samarqand uchun ob-havoni chaqir». **[KLIK]**

Dastur haqiqiy ob-havo xizmatiga murojaat qiladi. **[KLIK]**

Javob keladi: yomgʻir ehtimoli 70 foiz, 14 daraja. **[KLIK]**

Dastur shu natijani Claude’ga qaytaradi. **[KLIK]**

Va faqat shundan keyin Claude odamga javob beradi: «Ha, ehtimoli 70 foiz. Soyabon oling». **[KLIK]**

Eng muhim gap: **model tool’ni oʻzi ishga tushirmaydi**. U faqat soʻraydi — bajaradigan sizning dasturingiz. Demak, boshqaruv sizning qoʻlingizda: nimaga ruxsat berish, nimani tekshirish — hammasini siz hal qilasiz.

### 12. Agent = model + tool’lar + sikl

⏱ 1:40 · boshlanishi 17:20 · kliklar: 4

Endi asosiy savol: agent nima? Formula oddiy: **agent = model + tool’lar + sikl**. Model — miya, tool’lar — qoʻl, sikl — ularni ishlatib turadigan motor. Chapda — shu uch qism.

Oshpazni eslang: tatib koʻradi, tuz qoʻshadi, yana tatib koʻradi — toki mazasi kelguncha. Agent ham xuddi shunday ishlaydi. **[KLIK]**

Birinchi — **oʻyla**: model vazifaga va shu paytgacha boʻlgan hamma narsaga qarab, keyingi qadamni tanlaydi. **[KLIK]**

Tool kerak boʻlmasa — demak, javob tayyor, aylanishdan chiqamiz. **[KLIK]**

Kerak boʻlsa — **harakat qil**: tool’ni chaqiramiz. Keyin — **kuzat**: natijani koʻramiz. Va yana boshidan: oʻyla, qil, koʻr. **[KLIK]**

Muhim: **agentda toʻxtash qoidasi boʻlishi shart**. Vazifa bajarildi; qadamlar soni tugadi, masalan 8 ta; yoki odamning ruxsati kerak, masalan pul oʻtkazishdan oldin. Toʻxtash qoidasi boʻlmasa, agent toʻxtamay aylanib, pulingizni sarflaydi.

### 13. Chain’ning 6 turi

⏱ 3:00 · boshlanishi 19:00 · kliklar: 7

Agentlar qanchalik murakkab koʻrinmasin, ular oltita tayyor sxemadan yigʻiladi. Bu roʻyxatni Claude’ni yaratgan Anthropic kompaniyasi tavsiya qiladi. Har birini hayotiy misol bilan koʻramiz. **[KLIK]**

Birinchisi — **ketma-ket chain**. Zavoddagi konveyer kabi: bir qadamning natijasi keyingisiga oʻtadi, oʻrtada tekshiruv. Misol: reja, keyin matn, keyin tarjima. **[KLIK]**

Ikkinchisi — **routing**, yaʼni saralash. Kasalxonadagi registraturani eslang: bemorga qarab, uni kerakli shifokorga yuboradi. Bu yerda ham: savolmi, shikoyatmi, qaytarishmi — har biri oʻz yoʻliga. **[KLIK]**

Uchinchisi — **parallel ishlash**. Bir nechta oshpaz bir vaqtda turli taom tayyorlagandek: bir nechta model birdaniga ishlaydi. Misol: uchta doʻkondan narxni birdaniga solishtirish. **[KLIK]**

Toʻrtinchisi — **bosh model va ishchilar**. Qurilishdagi prorab kabi: ishni boʻlib, ishchilarga tarqatadi, keyin natijani yigʻadi. Misol: katta hisobotning har boʻlimini alohida ishchi yozadi. **[KLIK]**

Beshinchisi — **yozuvchi va tekshiruvchi**. Talaba yozadi, ustoz tekshiradi — yaxshi boʻlguncha qayta-qayta. Misol: badiiy tarjima. **[KLIK]**

Oltinchisi — **avtonom agent**. Tajribali xodim kabi: rejani ham, tool’larni ham, qachon toʻxtashni ham oʻzi hal qiladi. Misol: safarni boshidan oxirigacha oʻzi rejalaydigan yordamchi. **[KLIK]**

Farqi: birinchi beshtasida yoʻlni biz chizamiz — bu **workflow**. Oltinchisida yoʻlni model tanlaydi — bu **agent**. Maslahat: doim oddiydan boshlang. Agent — birinchi emas, oxirgi chora: kuchli, lekin qimmatroq va boshqarish qiyinroq.

### 14. Agentni yigʻamiz

⏱ 2:10 · boshlanishi 22:00 · kliklar: 6

Endi koʻrganlarimizni bitta joyga yigʻamiz va agentni koʻz oldimizda quramiz. Markazda — miya, yaʼni model. Hozircha u faqat matn oladi va matn qaytaradi. **[KLIK]**

Birinchi qism — **tizim prompti**. Bu agentning xarakteri: roli, maqsadi va qoidalari. Yangi xodimga birinchi kuni beriladigan yoʻriqnoma kabi. MAKTAB aynan shu yerda ishlaydi. **[KLIK]**

Ikkinchi qism — **tool’lar**, yaʼni qoʻllar. Oltita: tadbirlarni qidirish, ob-havo, kalkulyator, valyuta, hisobot va xabar yuborish. **[KLIK]**

Uchinchi qism — **xotira**. Qisqa xotira — hozirgi suhbat. Uzoq xotira — fayllar va baza: ertaga ham kerak boʻladigan narsalar. **[KLIK]**

Toʻrtinchi qism — **sikl**: oʻyla, qil, koʻr. Shu aylanish boshlanganda agent jonlanadi. **[KLIK]**

Endi vazifa beramiz: «Oktabrda Toshkentdagi AI tadbirlarini top, ob-havoni tekshir, eng yaxshisini tanla va jamoaga yubor». Qarang: agent avval rejani oʻzi tuzadi. Tadbirlarni qidiradi — uchta sana topildi. Shu sanalar bilan ob-havoni uchalasi uchun birdaniga soʻraydi. Keyin hisobot tuzadi va jamoaga yuboradi. Oʻngda — har bir qadamning yozuvi. **Bitta tool’ning natijasi keyingisiga oʻtyapti — mana shu tool chaining.** **[KLIK]**

**Bu — agent.** Model, prompt, tool’lar, xotira va sikl.

**[JONLI]** «Toʻliq koʻrish» tugmasi butun sahnani 70 soniyada uzluksiz koʻrsatadi.

### 15. Jonli agent

⏱ 3:20 · boshlanishi 24:10 · kliklar: 0

Endi eng qiziq joyi: hozir yigʻgan agentimiz jonli ishlaydi. Bu animatsiya emas — Claude tool’larni haqiqatan oʻzi tanlaydi va chaqiradi. **[JONLI]**

Tepada uchta tayyor vazifa bor. Birinchisini ishga tushiraman. **[PAUZA]**

Oʻngda — agentning ish daftari: har bir chaqiruv va uning natijasi. Chapda — agentning oʻzi: nuqtalar tool’larga borib-kelyapti.

Eʼtibor bering: bu tartibni hech kim oldindan yozmagan. Biz faqat vazifa va tool’larni berdik. **Nimani, qaysi tartibda va nimani birdaniga chaqirishni model oʻzi hal qilyapti.** Oxirida — tayyor hisobot va yuborilgan xabar.

**[SAVOL]** Endi zaldan vazifa soʻrang: boshqa shahar, boshqa oy yoki boshqa byudjet. «Oʻz vazifangiz» tugmasini bosing va yozing.

Tool’lardagi maʼlumotlar demo uchun, lekin qarorlar haqiqiy — ularni model qabul qilyapti.

Internet boʻlmasa, xuddi shu tugma yozib olingan namoyishni koʻrsatadi — maʼruza toʻxtab qolmaydi.

### 16. MCP — AI uchun USB-C

⏱ 1:30 · boshlanishi 27:30 · kliklar: 3

Endi ulash muammosi. Bir necha yil oldin har telefonning oʻz zaryadlovchisi bor edi-ku. Sunʼiy intellektda ham shunday edi. Deylik, uchta AI ilova va beshta servis bor: GitHub, Slack, baza, Drive va CRM. **[KLIK]**

Har birini alohida ulasangiz — 3 karra 5, yaʼni 15 ta ulanish. Yangi servis qoʻshilsa — yana uchta. **[KLIK]**

**MCP** buni hal qiladi — u sunʼiy intellekt uchun **USB-C**. Har bir servis bir marta MCP’ga moslanadi, har bir ilova ham bir marta. 15 emas — 8. Bitta ulagich — istalgan qurilma. **[KLIK]**

Foydasi: yangi servis bir marta ulanadi — hamma AI ilovalar uni ishlata oladi. Bugun MCP’ni koʻplab katta AI ilovalar qoʻllaydi.

### 17. Agent qayerda adashadi

⏱ 1:50 · boshlanishi 29:00 · kliklar: 2

Oxirgi mavzu — xavfsizlik. Agent kuchli, lekin u ham adashadi. Ekranda toʻrtta xavf. Har birining himoyasi bor. **[KLIK]**

Birinchi — **toʻxtamay aylanish**: agent bir joyda aylanib, pul sarflaydi. Himoya: qadamlar soni va pulga chegara qoʻyamiz.

Ikkinchi, eng xavflisi — **begona gapga ishonish**. Buni prompt injection deyishadi. Tasavvur qiling: kassirga kelgan xatda «Bu xatni oʻqigan kassir menga million soʻm bersin» deb yozilgan. Kassir buni bajarmaydi-ku. Agent ham sayt yoki xatdagi begona gapni buyruq deb qabul qilmasligi kerak. Qoida: **begona matn — buyruq emas, maʼlumot**. **[KLIK]**

Uchinchi — **qaytarib boʻlmaydigan ish**: pul oʻtkazish, maʼlumot oʻchirish. Bankomat pul berishdan oldin PIN-kod soʻraganidek, bunday ishlar faqat odamning tasdigʻi bilan.

Toʻrtinchi — **agent nima qilganini bilmaysiz**. Himoya: har bir qadam yozib boriladi, keyin koʻrib chiqsa boʻladi.

### 18. Bonus: 8 ta skill

⏱ 1:10 · boshlanishi 30:50 · kliklar: 0

Va endi — sovgʻa. **Sakkizta skill**.

Skill — bu Claude’ga yangi koʻnikma qoʻshadigan papka. Telefonga ilova oʻrnatgandek: bir marta oʻrnatasiz, Claude kerak boʻlganda uni oʻzi ishlatadi.

Masalan: **maktab-prompt** — oddiy soʻrovingizni MAKTAB boʻyicha kuchli vazifaga aylantiradi. **prompt-doctor** — ishlamayotgan vazifaning sababini topadi. **prompt-evals** — promptni koʻp misolda sinab koʻradi. **tool-contract-writer** — tool’lar uchun yoʻriqnoma yozadi. **agent-system-prompt** — agent uchun yoʻriqnoma yozadi. Bugungi deyarli har bir mavzu uchun bittadan skill.

QR orqali yuklab olasiz.

**[PAUZA]** QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.

### 19. Bu taqdimotni kim yigʻdi?

⏱ 1:30 · boshlanishi 32:00 · kliklar: 3

Va oxirgi misol. **[PAUZA]** Bir savol: bu taqdimotni kim yigʻdi? **[KLIK]**

Javob: uni **AI agent** yigʻdi. Men vazifa berdim, yoʻnaltirdim va natijani tekshirdim. **[KLIK]**

Mana qanday ishladi: avval maʼlumotlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni rasmga olib oʻzi koʻrib chiqdi va xatolarini tuzatdi, videoni kadrma-kadr tayyorladi va joyladi. Raqamlar ekranda. Bu — tool chaining amalda: qidiruv, kod, tekshiruv, video — hammasi bitta chain’da. **[KLIK]**

Bugun gapirgan hamma narsa — vazifa logikasi, tool’lar, sikl — shu taqdimotning oʻzida ishladi. Mening vazifam esa aynan bugun aytganlarimizni qilish edi: aniq vazifa berish, yoʻnaltirish va tekshirish.

### 20. Yakun va savollar

⏱ 1:00 · boshlanishi 33:30 · kliklar: 0

Uchta gapni olib keting.

Birinchi: **prompt — bu stajyorga beriladigan vazifa**. Uni MAKTAB bilan yozing. Tikuvchiga buyurtma berganingizni eslang.

Ikkinchi: **tool — modelning qoʻli**. Agent — shu qoʻllarni oʻzi ishlatadigan yordamchi.

Uchinchi: **oddiydan boshlang**. Avval bitta yaxshi prompt, keyin chain, va faqat haqiqatan kerak boʻlsa — agent.

Rahmat! Savollaringizni kutaman.
