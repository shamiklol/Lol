# Maʼruza skripti · Prompt Logic & AI Agent Tool Chaining

**Shamsiddin · Shams.labs** — 45 daqiqa. Matn oddiy tilda va hayotiy misollar bilan yozilgan: mavzuni endi oʻrganayotganlar ham tushunadi.

Har bir slayd uchun toʻliq matn: nima deyish va qachon bosish. Xuddi shu matn maʼruzachi oynasida (**P**) va eslatmalarda (**N**) chiqadi.

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

## Slaydma-slayd skript

Jami reja: **43:35** (qolgan vaqt — savol-javob va pauzalar uchun).

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

**Prompt** — model qanday oʻqiydi. **Logika** — vazifani qanday toʻgʻri yozish. **Chain** — katta ishni kichik qadamlarga boʻlish. **Tool’lar** — modelga qoʻl berish. **Agent** — ishni oʻzi bajaradigan yordamchi.

Pastdagi chiziq qayerda ekanimizni koʻrsatib turadi. Oxirida esa sovgʻa bor — 8 ta tayyor skill. **[KLIK]**

### 4. I qism · Prompt Logic

⏱ 0:20 · boshlanishi 3:40 · kliklar: 0

Birinchi qism — **Prompt Logic**, yaʼni stajyorga vazifani qanday berish. Avval u qanday oʻqishini koʻramiz. **[KLIK]**

### 5. Model tokenlarni oʻqiydi

⏱ 1:35 · boshlanishi 4:00 · kliklar: 2

Telefoningizda yozayotganda keyingi soʻzni taklif qiladigan funksiya bor-ku. Model — xuddi shuning juda katta va juda aqlli versiyasi. U shu tarzda butun javobni yozadi.

Lekin model soʻzlarni emas, mayda boʻlaklarni oʻqiydi. Bu boʻlaklar **token** deyiladi — uy qurilgan gʻishtlar kabi. Ekranda haqiqiy hisoblagich: maʼnosi bir xil gap — inglizchasi 7 ta gʻisht, oʻzbekchasi 19 ta. **[KLIK]**

Bu nimani anglatadi? Oʻzbekcha yozsangiz, gʻisht koʻp ketadi: soʻrov qimmatroq turadi va modelning xotirasi tezroq toʻladi. **[KLIK]**

Yana bir muhim gap: model har safar keyingi boʻlakni taxmin qilib tanlaydi. Sizning vazifangiz shu taxminni boshqaradi. Shuning uchun vazifadagi har bir soʻz muhim.

**[JONLI]** Zaldan bitta gap soʻrang va shu yerda yozib koʻrsating — gʻishtlar darhol qayta sanaladi.

### 6. Prompt — tabiiy tildagi dastur

⏱ 1:45 · boshlanishi 5:35 · kliklar: 6

Endi asosiy gap: **prompt — bu dastur**. Qoʻrqmang, dasturchi boʻlish shart emas. Dastur — kompyuter uchun retsept, xolos. Chapda — kod, oʻngda — xuddi shu narsa oddiy tilda. **[KLIK]**

Birinchi qator — **boʻsh joy**. Xuddi blankadagi «Ism: ____» kabi. Bitta shablon yozasiz, unga ming xil ism qoʻyasiz. **[KLIK]**

Ikkinchisi — **shart**: «Agar mijoz ruscha yozsa, ruscha javob ber». **[KLIK]**

Uchinchisi — **takrorlash**: «Har bir sharh uchun shuni qil». **[KLIK]**

Toʻrtinchisi — **qadamlar**: avval muammo, keyin sabab, keyin yechim. **[KLIK]**

Beshinchisi — **natija**: javob qanday koʻrinishda boʻlsin. **[KLIK]**

Xulosa: **model — bajaruvchi, siz esa — dasturchisiz**. Retseptda bitta qadam tushib qolsa, taom buziladi. Vazifada bitta gap noaniq boʻlsa, javob buziladi.

### 7. MAKTAB freymvorki

⏱ 2:30 · boshlanishi 7:20 · kliklar: 2

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

### 8. «Agar» — promptdagi logika

⏱ 1:35 · boshlanishi 9:50 · kliklar: 5

MAKTAB’dagi eng muhim harf — **«Agar»**. Navigatorni eslang: yoʻl yopiq boʻlsa, boshqa yoʻl topadi. Nima qilishni oldindan biladi. Vazifada ham shunday boʻlishi kerak. Chapda — vazifa, oʻngda — xuddi shu vazifa yoʻllar xaritasi sifatida. **[KLIK]**

Birinchi qoida: **maʼlumot yetmasa — taxmin qilma, soʻra**. Chunki stajyor bilmagan narsasiga «bilmayman» demaydi, oʻzi toʻqib chiqaradi. **[KLIK]**

Keyin model soʻrov turini aniqlaydi. Qaytarish boʻlsa: 14 kungacha — qaytarish tartibini yuboradi, 14 kundan keyin — boshqa variant taklif qiladi. **[KLIK]**

Texnik muammo boʻlsa — darhol javob bermaydi, avval ikkita savol beradi. **[KLIK]**

Va eng muhimi — **«aks holda»**: hech biriga toʻgʻri kelmasa, operatorga ulaydi. **[KLIK]**

Qoida oddiy: **har bir «agar»ning oʻz «aks holda»si boʻlsin**. Yoʻl koʻrsatilmagan joyda model yoʻlni oʻzi oʻylab topadi. Buni gallyutsinatsiya deyishadi — yaʼni ishonch bilan aytilgan yolgʻon.

### 9. Tartib: teg va sxema

⏱ 1:30 · boshlanishi 11:25 · kliklar: 3

**T — Tartib**. Ikki tomoni bor: biz beradigan matn va model qaytaradigan javob.

Biz beradigan matnda hujjat, qoidalar va savolni alohida-alohida ajratamiz — xuddi nomi yozilgan papkalarga solgandek. Shunda model nima maʼlumot, nima buyruq ekanini adashtirmaydi. Maslahat: uzun hujjat tepada, savol eng oxirida. **[KLIK]**

Javobni esa **anketa shaklida** soʻraymiz. Erkin matn emas — aniq kataklar: javob — «ha», «yoʻq» yoki «shartli»; manba — hujjatdan aniq parcha; ishonch — 0 dan 1 gacha. **[KLIK]**

Mana model javobi: hamma katak toʻldirilgan. Bunday javobni boshqa dastur ham oʻqiy oladi. Bu — ikkinchi qismga koʻprik: tool’lar ham aynan shunday anketalar bilan ishlaydi. **[KLIK]**

Claude’da buning uchun maxsus rejim bor — **structured outputs**: javob har doim anketaga aniq mos keladi.

### 10. Aniq misol kuchi

⏱ 1:15 · boshlanishi 12:55 · kliklar: 1

**A — Aniq misol**. Sartaroshga «chiroyli qilib oling» desangiz, nima chiqishini bilmaysiz. Telefondan rasm koʻrsatsangiz — darhol tushunadi. Model ham shunday: **bitta yaxshi misol oʻnta qoidadan kuchli**.

Oʻngdagi nishonga qarang: har bir nuqta — modelning bitta javobi. Misolsiz javoblar har tomonga sochilgan. **[KLIK]**

Uchta har xil misol qoʻshdik — javoblar markazga yigʻildi.

Lekin ehtiyot boʻling: **model misoldagi hamma narsani koʻchiradi**. Misol uch qator boʻlsa, javob ham uch qator. Misolda xato boʻlsa, xato ham koʻchadi. Shuning uchun misolni ehtiyot boʻlib tanlang.

### 11. Reasoning modellar

⏱ 1:30 · boshlanishi 14:10 · kliklar: 1

Soʻnggi ikki yildagi eng katta oʻzgarish — **oʻylaydigan modellar**. Ular javob berishdan oldin oʻzi oʻylab oladi. **[PAUZA]**

Taksiga oʻtirganingizni eslang. Haydovchiga har bir burilishni aytmaysiz — manzilni aytasiz, xolos. Ilgari modelga har qadamni yozib berardik: avval oʻqi, keyin yoz, keyin tartibla. Chapda — shunday eski vazifa.

Endi esa **manzilni aytamiz**: nima kerak, natija qanday boʻlishi kerak, nimani qilmaslik kerak. Oʻngda — shunday vazifa. Yoʻlni model oʻzi topadi. **[KLIK]**

Qancha oʻylashini **effort** degan sozlama bilan boshqaramiz. Oddiy ishga — kam: tez va arzon. Murakkab tahlilga — koʻp: chuqurroq, lekin sekinroq va qimmatroq. Hamma narsaga maksimum qoʻyish — pulni bekorga sarflash.

### 12. Baholash: sinab koʻramiz

⏱ 1:30 · boshlanishi 15:40 · kliklar: 3

**B — Baholash**. Oshpaz yangi taomni bitta mehmonga tatib koʻrib, menyuga qoʻymaydi-ku. Koʻp odamga beradi va nechtasiga yoqqanini sanaydi. Prompt bilan ham xuddi shunday.

Chapda — bizning prompt: yordam xizmati mijoz xatlariga javob yozadi. Oʻngda — haqiqiy mijozlardan kelgan 10 ta xat. Endi promptni hammasida sinab koʻramiz. **[KLIK]**

Natija: 10 tadan 6 tasi yaxshi. 4 tasi yomon: uchtasida ohang qoʻpol, bittasida model narxni oʻzidan toʻqib chiqardi. Ikki marta sinab «ishlayapti» desak, buni hech qachon bilmas edik. **[KLIK]**

Xatolarga qaraymiz va promptga ikki qator qoʻshamiz. «Ohang samimiy boʻlsin» — bu K harfi, kontekst. «Narxni faqat roʻyxatdan ol, oʻylab topma» — bu A harfi, agar. **[KLIK]**

Qayta sinaymiz — endi 10 tadan 9 tasi yaxshi. Bittasi hali uzun, uni ham keyin tuzatamiz. Haqiqiy ishda 30–50 ta misol olinadi, lekin gʻoya shu.

Xulosa: **testsiz prompt — taxmin. Test qilsangiz — aniq bilasiz**: yaxshilandimi yoki yoʻqmi.

### 13. Prompt laboratoriyasi

⏱ 1:35 · boshlanishi 17:10 · kliklar: 6

Endi hammasini jonli koʻramiz. Chapda — vazifa, tepada — MAKTAB harflari va ball, oʻngda — natija. Boshida vazifa bitta qator: «Termos haqida tavsif yoz». Ball — 12. Javob esa zerikarli, umumiy gap. **[KLIK]**

Har klikda bitta harf qoʻshamiz. **Maqsad**: marketpleysda sotadigan tavsif. **[KLIK]** **Agar**: berilmagan xususiyatni oʻylab topma. **[KLIK]** **Kontekst**: yarim litr, 12 soat issiq saqlaydi, xaridorlar — talabalar va haydovchilar. **[KLIK]** **Tartib**: sarlavha, 3 ta afzallik va bitta chaqiriq. **[KLIK]** **Aniq misol**: «Ertalabki choy — kechgacha issiq». **[KLIK]** Va **baholash**: yuborishdan oldin raqamlarni tekshir.

Ball 12 dan 96 ga chiqdi. Javob esa tayyor sotuv matniga aylandi.

**[JONLI]** «Claude’da ishga tushirish» tugmasi vazifani hozir modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, termos oʻrniga yozing va natijani birga koʻring.

### 14. Bitta ulkan prompt oʻrniga — chain

⏱ 1:15 · boshlanishi 18:45 · kliklar: 3

Birinchi qismning oxirgi gapi. Osh damlashni eslang. Hamma narsani bir vaqtda qozonga tashlamaysiz-ku: avval goʻsht, keyin piyoz va sabzi, keyin guruch. Har bosqichning oʻz vaqti bor.

Model bilan ham shunday. Hamma ishni bitta katta vazifaga tiqsangiz — «yigʻ, tahlil qil, yoz, tarjima qil, tekshir» — model hammasini chala qiladi. Xato qayerdaligini ham topa olmaysiz. **[KLIK]**

Toʻgʻri yoʻl — **chain**, yaʼni ishni ketma-ket qadamlarga boʻlish: yigʻish, tahlil, yozish, tekshirish. Har qadam bitta ishni qiladi va natijasini keyingisiga beradi. Oʻrtada tekshiruv bor: sifat yomon boʻlsa, ish davom etmaydi. **[KLIK]**

Foydasi: xato qayerda ekani darhol koʻrinadi, har qadamni alohida yaxshilaysiz. Oddiy qadamga arzon model, murakkabiga kuchlisini qoʻyish ham mumkin. **[KLIK]**

Endi eng qiziq joyi: bu chain’ga **qoʻl** qoʻshamiz.

### 15. II qism · AI Agent Tool Chaining

⏱ 0:20 · boshlanishi 20:00 · kliklar: 0

Ikkinchi qism — **Tool Chaining**. Birinchi qismda stajyorga vazifa berishni oʻrgandik. Endi unga qoʻl beramiz. **[KLIK]**

### 16. Modelning qoʻli yoʻq

⏱ 1:30 · boshlanishi 20:20 · kliklar: 4

Eng aqlli model ham uchta narsani qila olmaydi. **[PAUZA]**

Birinchisi — **yangiliklarni bilmaydi**. Uning bilimi oʻqitilgan kunda toʻxtab qolgan: bugungi kurs ham, bugungi ob-havo ham unga notanish.

Ikkinchisi — **hisobda adashadi**. Katta sonlarni xato hisoblashi mumkin.

Uchinchisi, eng muhimi — **hech narsa qila olmaydi**. Xat yubora olmaydi, bazaga yoza olmaydi, buyurtma bera olmaydi. Miyasi bor, qoʻli yoʻq. **[KLIK]**

Yechim — **tool**. Tool — bu modelning qoʻli: u chaqira oladigan kichik dastur. Ob-havo, kalkulyator, qidiruv, xat yuborish — hammasi tool boʻla oladi. Har bir tool’ning uch qismi bor. **[KLIK]**

Birinchisi — **nomi**: nima qilishi. Masalan, get_weather — ob-havoni olish. **[KLIK]**

Ikkinchisi — **tavsifi**: qachon va qanday ishlatish kerakligi. Eʼtibor bering: **tavsif ham prompt**! Model aynan shu matnni oʻqib, qaysi tool’ni olishni hal qiladi. **[KLIK]**

Uchinchisi — **parametrlar**, yaʼni nimalarni toʻldirish kerak: bu yerda shahar — majburiy, sana — ixtiyoriy.

### 17. Tool calling qanday ishlaydi

⏱ 1:55 · boshlanishi 21:50 · kliklar: 8

Endi tool qanday chaqirilishini qadam-baqadam koʻramiz. Oddiy oʻxshatish: model — **boshliq**, sizning dasturingiz — **yordamchi**. Boshliq oʻzi hech narsa qilmaydi, faqat xatcha yozadi. **[KLIK]**

Foydalanuvchi soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» **[KLIK]**

Dastur savolni Claude’ga beradi va aytadi: «Sening ixtiyoringda ob-havo tool’i bor». **[KLIK]**

Claude darhol javob bermaydi — u ertangi ob-havoni bilmaydi va buni tushunadi. Shuning uchun xatcha yozadi: «Samarqand uchun ob-havoni chaqir». **[KLIK]**

Dastur haqiqiy ob-havo xizmatiga murojaat qiladi. **[KLIK]**

Javob keladi: yomgʻir ehtimoli 70 foiz, 14 daraja. **[KLIK]**

Dastur shu natijani Claude’ga qaytaradi. **[KLIK]**

Va faqat shundan keyin Claude odamga javob beradi: «Ha, ehtimoli 70 foiz. Soyabon oling». **[KLIK]**

Eng muhim gap: **model tool’ni oʻzi ishga tushirmaydi**. U faqat soʻraydi — bajaradigan sizning dasturingiz. Demak, boshqaruv sizning qoʻlingizda: nimaga ruxsat berish, nimani tekshirish — hammasini siz hal qilasiz.

### 18. Agent = model + tool’lar + sikl

⏱ 1:20 · boshlanishi 23:45 · kliklar: 4

Endi asosiy savol: agent nima? Formula oddiy: **agent = model + tool’lar + sikl**. Model — miya, tool’lar — qoʻl, sikl — ularni ishlatib turadigan motor. Chapdagi yetti qator kod — har qanday agentning yuragi.

Oshpazni eslang: tatib koʻradi, tuz qoʻshadi, yana tatib koʻradi — toki mazasi kelguncha. Agent ham xuddi shunday ishlaydi. **[KLIK]**

Birinchi — **oʻyla**: model vazifaga va shu paytgacha boʻlgan hamma narsaga qarab, keyingi qadamni tanlaydi. **[KLIK]**

Tool kerak boʻlmasa — demak, javob tayyor, aylanishdan chiqamiz. **[KLIK]**

Kerak boʻlsa — **harakat qil**: tool’ni chaqiramiz. Keyin — **kuzat**: natijani koʻramiz. Va yana boshidan: oʻyla, qil, koʻr. **[KLIK]**

Muhim: **agentda toʻxtash qoidasi boʻlishi shart**. Vazifa bajarildi; qadamlar soni tugadi, masalan 8 ta; yoki odamning ruxsati kerak, masalan pul oʻtkazishdan oldin. Toʻxtash qoidasi boʻlmasa, agent toʻxtamay aylanib, pulingizni sarflaydi.

### 19. Chaining: 6 ta pattern

⏱ 2:50 · boshlanishi 25:05 · kliklar: 7

Agentlar qanchalik murakkab koʻrinmasin, ular oltita tayyor sxemadan yigʻiladi. Bu roʻyxat Anthropic’ning «Building Effective Agents» maqolasidan olingan. Har birini hayotiy misol bilan koʻramiz. **[KLIK]**

Birinchisi — **ketma-ket chain**. Zavoddagi konveyer kabi: bir qadamning natijasi keyingisiga oʻtadi, oʻrtada tekshiruv. Misol: reja, keyin matn, keyin tarjima. **[KLIK]**

Ikkinchisi — **routing**, yaʼni saralash. Kasalxonadagi registraturani eslang: bemorga qarab, uni kerakli shifokorga yuboradi. Bu yerda ham: savolmi, shikoyatmi, qaytarishmi — har biri oʻz yoʻliga. **[KLIK]**

Uchinchisi — **parallel ishlash**. Bir nechta oshpaz bir vaqtda turli taom tayyorlagandek: bir nechta model birdaniga ishlaydi. Misol: kodni uch tomondan birdaniga tekshirish. **[KLIK]**

Toʻrtinchisi — **bosh model va ishchilar**. Qurilishdagi prorab kabi: ishni boʻlib, ishchilarga tarqatadi, keyin natijani yigʻadi. **[KLIK]**

Beshinchisi — **yozuvchi va tekshiruvchi**. Talaba yozadi, ustoz tekshiradi — yaxshi boʻlguncha qayta-qayta. Misol: badiiy tarjima. **[KLIK]**

Oltinchisi — **avtonom agent**. Tajribali xodim kabi: rejani ham, tool’larni ham, qachon toʻxtashni ham oʻzi hal qiladi. Misol: kod yozadigan agentlar. **[KLIK]**

Farqi: birinchi beshtasida yoʻlni biz chizamiz — bu **workflow**. Oltinchisida yoʻlni model tanlaydi — bu **agent**. Maslahat: doim oddiydan boshlang. Agent — birinchi emas, oxirgi chora: kuchli, lekin qimmatroq va nazorat qilish qiyinroq.

### 20. Agentni yigʻamiz

⏱ 2:10 · boshlanishi 27:55 · kliklar: 6

Endi koʻrganlarimizni bitta joyga yigʻamiz va agentni koʻz oldimizda quramiz. Markazda — miya, yaʼni model. Hozircha u faqat matn oladi va matn qaytaradi. **[KLIK]**

Birinchi qism — **tizim prompti**. Bu agentning xarakteri: roli, maqsadi va qoidalari. Yangi xodimga birinchi kuni beriladigan yoʻriqnoma kabi. MAKTAB aynan shu yerda ishlaydi. **[KLIK]**

Ikkinchi qism — **tool’lar**, yaʼni qoʻllar. Oltita: tadbirlarni qidirish, ob-havo, kalkulyator, valyuta, hisobot va xabar yuborish. **[KLIK]**

Uchinchi qism — **xotira**. Qisqa xotira — hozirgi suhbat. Uzoq xotira — fayllar va baza: ertaga ham kerak boʻladigan narsalar. **[KLIK]**

Toʻrtinchi qism — **sikl**: oʻyla, qil, koʻr. Shu aylanish boshlanganda agent jonlanadi. **[KLIK]**

Endi vazifa beramiz: «Oktabrda Toshkentdagi AI tadbirlarini top, ob-havoni tekshir, eng yaxshisini tanla va jamoaga yubor». Qarang: agent avval rejani oʻzi tuzadi. Tadbirlarni qidiradi — uchta sana topildi. Shu sanalar bilan ob-havoni uchalasi uchun birdaniga soʻraydi. Keyin hisobot tuzadi va jamoaga yuboradi. Oʻngda — har bir qadamning yozuvi. **Bitta tool’ning natijasi keyingisiga oʻtyapti — mana shu tool chaining.** **[KLIK]**

**Bu — agent.** Model, prompt, tool’lar, xotira va sikl.

**[JONLI]** «Toʻliq koʻrish» tugmasi butun sahnani 70 soniyada uzluksiz koʻrsatadi.

### 21. Jonli agent

⏱ 2:50 · boshlanishi 30:05 · kliklar: 0

Endi eng qiziq joyi: hozir yigʻgan agentimiz jonli ishlaydi. Bu animatsiya emas — Claude tool’larni haqiqatan oʻzi tanlaydi va chaqiradi. **[JONLI]**

Tepada uchta tayyor vazifa bor. Birinchisini ishga tushiraman. **[PAUZA]**

Oʻngda — agentning ish daftari: har bir chaqiruv va uning natijasi. Chapda — agentning oʻzi: nuqtalar tool’larga borib-kelyapti.

Eʼtibor bering: bu tartibni hech kim oldindan yozmagan. Biz faqat vazifa va tool’larni berdik. **Nimani, qaysi tartibda va nimani birdaniga chaqirishni model oʻzi hal qilyapti.** Oxirida — tayyor hisobot va yuborilgan xabar.

**[SAVOL]** Endi zaldan vazifa soʻrang: boshqa shahar, boshqa oy yoki boshqa byudjet. «Oʻz vazifangiz» tugmasini bosing va yozing.

Tool’lardagi maʼlumotlar demo uchun, lekin qarorlar haqiqiy — ularni model qabul qilyapti.

Internet boʻlmasa, xuddi shu tugma yozib olingan namoyishni koʻrsatadi — maʼruza toʻxtab qolmaydi.

### 22. Tool tavsifi — bu ham prompt

⏱ 1:30 · boshlanishi 32:55 · kliklar: 5

Agentning sifati tool’lar tavsifiga bogʻliq. Model tool’ning ichini koʻrmaydi — faqat nomi va tavsifini oʻqiydi. Xuddi dori qutisidagi yoʻriqnoma kabi: yoʻriqnoma yomon boʻlsa, dori notoʻgʻri ichiladi.

Chapda — yomon misol: nomi «search», tavsifi «qidiradi». Nimani? Qayerdan? Qachon? Model bilmaydi va taxmin qiladi. Oʻngda — yaxshi misol. Uni beshta qoida bilan koʻramiz. **[KLIK]**

Birinchi — **nom aniq boʻlsin**, oldida tizim nomi bilan: crm_search, crm_update. Darhol qayerga tegishli ekani koʻrinadi. **[KLIK]**

Ikkinchi — **tavsifni yangi xodimga tushuntirgandek yozing**: nima qiladi, qachon ishlatiladi va qachon ishlatilmaydi. **[KLIK]**

Uchinchi — **xato xabari ham nima qilishni aytsin**. Shunchaki «xato» emas, balki «sana yil-oy-kun koʻrinishida boʻlsin». Shunda model oʻzi tuzatadi. **[KLIK]**

Toʻrtinchi — **kam, lekin aniq**. 40 ta mayda tool emas, 8 ta kuchli tool. Tool koʻp boʻlsa, model adashadi. **[KLIK]**

Beshinchi — **natija qisqa boʻlsin**, faqat kerakli maʼlumot. Ortiqcha soʻz modelning stolida joy egallaydi.

### 23. MCP — AI uchun USB-C

⏱ 1:25 · boshlanishi 34:25 · kliklar: 3

Endi ulash muammosi. Bir necha yil oldin har telefonning oʻz zaryadlovchisi bor edi-ku. Sunʼiy intellektda ham shunday edi. Deylik, uchta AI ilova va beshta servis bor: GitHub, Slack, baza, Drive va CRM. **[KLIK]**

Har birini alohida ulasangiz — 3 karra 5, yaʼni 15 ta ulanish. Yangi servis qoʻshilsa — yana uchta. **[KLIK]**

**MCP** buni hal qiladi — u sunʼiy intellekt uchun **USB-C**. Har bir servis bir marta MCP’ga moslanadi, har bir ilova ham bir marta. 15 emas — 8. Bitta ulagich — istalgan qurilma. **[KLIK]**

MCP uch narsa beradi: amallar, maʼlumotlar va tayyor shablonlar. Uni Anthropic 2024-yil noyabrda chiqargan, 2025-yil dekabridan esa u Linux Foundation’dagi ochiq standart. Bugun uni koʻplab katta AI ilovalar ishlatadi.

### 24. Context engineering

⏱ 1:35 · boshlanishi 35:50 · kliklar: 3

Birinchi qismda vazifani qanday yozishni gapirdik. Agentlarda yangi savol chiqadi: model aynan nimani koʻryapti? **[KLIK]**

**Kontekst — bu modelning ish stoli.** Model faqat stol ustidagini koʻradi: vazifa, tool’lar tavsifi, suhbat tarixi, hujjatlar va natijalar. Ish uzaygan sari stol toʻladi. Stol qogʻozga koʻmilib ketsa, siz ham muhim varaqni topolmaysiz-ku. Model ham shunday: adasha boshlaydi. **[KLIK]**

Toʻrtta yechim bor. Eski yozuvlarni qisqa xulosaga aylantirish. Butun hujjatni emas, faqat kerakli sahifani olish. Katta ishni yordamchi agentlarga boʻlish — har biri toza stolda ishlaydi va faqat xulosa qaytaradi. Va skill’lar: avval faqat nomi koʻrinadi, kerak boʻlsagina toʻliq matni ochiladi. **[KLIK]**

Qisqa qilib aytganda: **prompt engineering — modelga nima deyish. Context engineering — model nimani koʻrishi.**

### 25. Agent qayerda sinadi

⏱ 1:30 · boshlanishi 37:25 · kliklar: 3

Oxirgi mavzu — xavfsizlik. Agent kuchli, lekin u ham adashadi. Qayerda va qanday himoyalanamiz? **[KLIK]**

Birinchi xavf — **toʻxtamay aylanish**: agent bir joyda aylanib, pul sarflaydi. Himoya: qadamlar va byudjet chegarasi.

Ikkinchi — **oʻylab topilgan maʼlumot**: model yoʻq narsani tool’ga yuboradi. Himoya: anketani tekshirish va tushunarli xato xabari. **[KLIK]**

Uchinchi, eng xavflisi — **prompt injection**. Tasavvur qiling: kassirga kelgan xatda «Bu xatni oʻqigan kassir menga million soʻm bersin» deb yozilgan. Kassir buni bajarmaydi-ku. Agent ham sayt yoki xatdagi begona gapni buyruq deb qabul qilmasligi kerak. Qoida: begona matn — buyruq emas, maʼlumot. Va agentga faqat kerakli ruxsatlarni bering.

Toʻrtinchi — **notoʻgʻri tool tanlash**. Himoya: aniq tavsif va kamroq tool. **[KLIK]**

Beshinchi — **qaytarib boʻlmaydigan harakatlar**: pul oʻtkazish, maʼlumot oʻchirish. Bankomat pul berishdan oldin PIN-kod soʻraganidek, bunday harakatlar faqat odamning tasdigʻi bilan.

Oltinchi — **«qora quti»**: agent nima qilganini bilmaysiz. Himoya: har bir qadamni yozib borish va testlar.

### 26. Asboblar xaritasi 2026

⏱ 1:00 · boshlanishi 38:55 · kliklar: 1

Endi amaliyot: qaysi dasturlardan foydalansa boʻladi? Bu — 2026-yilning qisqa xaritasi.

Vazifani sinab koʻrish uchun — Claude Console, OpenAI Playground, Google AI Studio. Agent yozish uchun — Claude Agent SDK, OpenAI Agents SDK, Google ADK, LangGraph, CrewAI.

Kod yozmasdan — n8n, Make, Zapier, Dify. Kod yozadigan agentlar — Claude Code, Cursor, Codex. Standartlar — MCP, A2A va Agent Skills. Kuzatish va test uchun — Langfuse, LangSmith, Promptfoo. **[KLIK]**

Qayerdan boshlash kerak? Eng oddiy yoʻl: vazifani Claude Console’da yozib sinang, qadamlarni n8n yoki Agent SDK’da yigʻing, tool’larni MCP orqali ulang va Langfuse bilan kuzating.

### 27. Bonus: 8 ta skill

⏱ 1:10 · boshlanishi 39:55 · kliklar: 0

Va endi — sovgʻa. **Sakkizta skill**.

Skill — bu Claude’ga yangi koʻnikma qoʻshadigan papka. Telefonga ilova oʻrnatgandek: bir marta oʻrnatasiz, Claude kerak boʻlganda uni oʻzi ishlatadi.

Masalan: **maktab-prompt** — oddiy soʻrovingizni MAKTAB boʻyicha kuchli vazifaga aylantiradi. **prompt-doctor** — ishlamayotgan vazifaning sababini topadi. **prompt-evals** — test tuzadi. **tool-contract-writer** — tool’lar uchun tavsif yozadi. **agent-system-prompt** — agent uchun yoʻriqnoma yozadi. Bugungi deyarli har bir mavzu uchun bittadan skill.

QR orqali yuklab olasiz. Bu skill’larni boshqa agentlar ham tushunadi — bu ochiq standart.

**[PAUZA]** QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.

### 28. Bu taqdimotni kim yigʻdi?

⏱ 1:30 · boshlanishi 41:05 · kliklar: 3

Va oxirgi misol. **[PAUZA]** Bir savol: bu taqdimotni kim yigʻdi? **[KLIK]**

Javob: uni **AI agent** yigʻdi. Men vazifa berdim, yoʻnaltirdim va natijani tekshirdim. **[KLIK]**

Mana qanday ishladi: avval maʼlumotlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni rasmga olib oʻzi koʻrib chiqdi va xatolarini tuzatdi, videoni kadrma-kadr tayyorladi va joyladi. Raqamlar ekranda. Bu — tool chaining amalda: qidiruv, kod, tekshiruv, video — hammasi bitta chain’da. **[KLIK]**

Bugun gapirgan hamma narsa — vazifa logikasi, tool’lar, sikl — shu taqdimotning oʻzida ishladi. Mening vazifam esa aynan bugun aytganlarimizni qilish edi: aniq vazifa berish, yoʻnaltirish va tekshirish.

### 29. Yakun va savollar

⏱ 1:00 · boshlanishi 42:35 · kliklar: 0

Uchta gapni olib keting.

Birinchi: **prompt — bu dastur**. Uni MAKTAB bilan yozing va test bilan tekshiring. Tikuvchiga buyurtma berganingizni eslang.

Ikkinchi: **tool — modelning qoʻli**. Uning tavsifi ham prompt.

Uchinchi: **oddiydan boshlang**. Avval bitta vazifa, keyin chain, keyin workflow, va faqat haqiqatan kerak boʻlsa — agent.

Rahmat! Savollaringizni kutaman.
