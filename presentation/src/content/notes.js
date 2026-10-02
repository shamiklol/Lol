// Speaker notes (Uzbek): the full talk script, slide by slide, in plain spoken Uzbek with everyday
// analogies so newcomers follow it. Shown in the presenter window (P) and the in-page dock (N),
// and exported to speaker/nutq-matni.md.
// Cues: KLIK — next click, PAUZA — pause, SAVOL — ask the room, JONLI — live demo.
// Each KLIK sits where the matching step appears on screen, so keep their count per slide in sync with the slide steps.
const c = (w) => `<span class="cue">${w}</span>`;
export const KLIK = c('KLIK');
export const PAUZA = c('PAUZA');
export const SAVOL = c('SAVOL');
export const JONLI = c('JONLI');

export const NOTES = {
  title: `
<p>Assalomu alaykum! Men — Shamsiddin, Shams.labs.</p>
<p>Bugun sunʼiy intellekt haqida gaplashamiz. Lekin murakkab qilib emas — oddiy qilib.</p>
<p>Sunʼiy intellektni ishga yangi kelgan <b>stajyor</b> deb tasavvur qiling. Juda aqlli, butun internetni oʻqib chiqqan. Lekin sizning ishingizni bilmaydi, aytganingizni soʻzma-soʻz tushunadi, qoʻli yoʻq — oʻzi hech narsa qila olmaydi. Va bilmagan narsasini oʻylab topadi.</p>
<p>Bugun ikkita narsani oʻrganamiz. Birinchisi — bu stajyorga vazifani qanday toʻgʻri berish. Bu — <b>Prompt Logic</b>. Ikkinchisi — unga qanday qilib qoʻl berish, toki ishni oʻzi qilsin. Bu — <b>Tool Chaining</b>. ${KLIK}</p>`,

  hook: `
<p>Keling, tajribadan boshlaymiz. Ekranda ikkita vazifa, ikkalasini ham bitta modelga — Claude’ga beramiz.</p>
<p>Chapda — koʻpchilik shunday yozadi: «Kofexona uchun marketing strategiya yozib ber». Javobga qarang: «Ijtimoiy tarmoqlarda faol boʻling, aksiya oʻtkazing». Toʻgʻri gap-ku, lekin foydasi yoʻq. Buni istalgan kofexonaga yopishtirsa boʻladi. ${KLIK}</p>
<p>Oʻngda — xuddi shu model, lekin vazifa boshqacha. Nima kerakligi aniq: toʻrt haftalik Instagram reja. Vaziyat aniq: byudjet besh million soʻm, mijozlar — talabalar, yonida uchta universitet. Shart bor: agar gʻoya qimmat boʻlsa, arzonrogʻini taklif qil. Va format: jadval qilib ber.</p>
<p>Natija — har hafta uchun aniq ish, xarajat byudjet ichida. Ertagayoq boshlasa boʻladi. ${KLIK}</p>
<p>${SAVOL} Xoʻsh, nima oʻzgardi? ${PAUZA} Model oʻzgarmadi. Biz bergan vazifa oʻzgardi. ${KLIK}</p>
<p><b>Model bir xil edi. Logika boshqa edi.</b> Bugungi maʼruzaning asosiy gapi shu.</p>
<p>${JONLI} Internet boʻlsa, «Jonli sinash» tugmasini bosing — ikkala vazifa hozir Claude’ga ketadi va javoblar ekranda yoziladi.</p>`,

  route: `
<p>Bugungi yoʻlimiz besh bekat — xuddi metro kabi.</p>
<p><b>Prompt</b> — model qanday oʻqiydi. <b>Logika</b> — vazifani qanday toʻgʻri yozish. <b>Chain</b> — katta ishni kichik qadamlarga boʻlish. <b>Tool’lar</b> — modelga qoʻl berish. <b>Agent</b> — ishni oʻzi bajaradigan yordamchi.</p>
<p>Pastdagi chiziq qayerda ekanimizni koʻrsatib turadi. Oxirida esa sovgʻa bor — 8 ta tayyor skill. ${KLIK}</p>`,

  act1: `
<p>Birinchi qism — <b>Prompt Logic</b>, yaʼni stajyorga vazifani qanday berish. Avval u qanday oʻqishini koʻramiz. ${KLIK}</p>`,

  tokens: `
<p>Telefoningizda yozayotganda keyingi soʻzni taklif qiladigan funksiya bor-ku. Model — xuddi shuning juda katta va juda aqlli versiyasi. U shu tarzda butun javobni yozadi.</p>
<p>Lekin model soʻzlarni emas, mayda boʻlaklarni oʻqiydi. Bu boʻlaklar <b>token</b> deyiladi — uy qurilgan gʻishtlar kabi. Ekranda haqiqiy hisoblagich: maʼnosi bir xil gap — inglizchasi 7 ta gʻisht, oʻzbekchasi 19 ta. ${KLIK}</p>
<p>Bu nimani anglatadi? Oʻzbekcha yozsangiz, gʻisht koʻp ketadi: soʻrov qimmatroq turadi va modelning xotirasi tezroq toʻladi. ${KLIK}</p>
<p>Yana bir muhim gap: model har safar keyingi boʻlakni taxmin qilib tanlaydi. Sizning vazifangiz shu taxminni boshqaradi. Shuning uchun vazifadagi har bir soʻz muhim.</p>
<p>${JONLI} Zaldan bitta gap soʻrang va shu yerda yozib koʻrsating — gʻishtlar darhol qayta sanaladi.</p>`,

  program: `
<p>Endi asosiy gap: <b>prompt — bu dastur</b>. Qoʻrqmang, dasturchi boʻlish shart emas. Dastur — kompyuter uchun retsept, xolos. Chapda — kod, oʻngda — xuddi shu narsa oddiy tilda. ${KLIK}</p>
<p>Birinchi qator — <b>boʻsh joy</b>. Xuddi blankadagi «Ism: ____» kabi. Bitta shablon yozasiz, unga ming xil ism qoʻyasiz. ${KLIK}</p>
<p>Ikkinchisi — <b>shart</b>: «Agar mijoz ruscha yozsa, ruscha javob ber». ${KLIK}</p>
<p>Uchinchisi — <b>takrorlash</b>: «Har bir sharh uchun shuni qil». ${KLIK}</p>
<p>Toʻrtinchisi — <b>qadamlar</b>: avval muammo, keyin sabab, keyin yechim. ${KLIK}</p>
<p>Beshinchisi — <b>natija</b>: javob qanday koʻrinishda boʻlsin. ${KLIK}</p>
<p>Xulosa: <b>model — bajaruvchi, siz esa — dasturchisiz</b>. Retseptda bitta qadam tushib qolsa, taom buziladi. Vazifada bitta gap noaniq boʻlsa, javob buziladi.</p>`,

  maktab: `
<p>Endi kuchli vazifani qanday yozamiz? Tikuvchiga koʻylak buyurtma qilganingizni eslang. Nimalarni aytasiz? Qayerga kiyishingizni, oʻlchamni, «mato yetmasa qoʻngʻiroq qiling» deysiz, rasm koʻrsatasiz, oxirida kiyib koʻrasiz. Yaxshi prompt ham xuddi shunday.</p>
<p>Ekranda oddiy vazifa: internet-doʻkonning yordam xizmati mijoz shikoyatiga javob yozadi. ${KLIK}</p>
<p>Uni boʻlaklarga ajratsak, olti qism chiqadi. Eslab qolish oson boʻlsin deb, men ularni bitta soʻzga yigʻdim: <b>MAKTAB</b>. ${KLIK}</p>
<p><b>M — Maqsad</b>: nima kerak va nima uchun. «Shikoyatga javob yoz, mijoz bizdan ketmasin».</p>
<p><b>A — Agar</b>: shartlar. «Buyurtma raqami boʻlmasa — avval soʻra. Chegirma 10 foizdan oshmasin». Bu boʻlmasa, model mijozni xursand qilaman deb 50 foiz chegirma vaʼda qilib yuboradi.</p>
<p><b>K — Kontekst</b>: kim, kim bilan, qanday vaziyatda. «Sen — yordam xizmati xodimisan, mijoz bizdan 2 yildan beri xarid qiladi».</p>
<p><b>T — Tartib</b>: javob qanday koʻrinishda. «Avval uzr, keyin yechim, keyin keyingi qadam. 80 soʻzdan oshmasin».</p>
<p><b>A — Aniq misol</b>: tayyor javob namunasi. Tikuvchiga rasm koʻrsatgandek.</p>
<p><b>B — Baholash</b>: yuborishdan oldin oʻzini tekshirish. Koʻylakni kiyib koʻrgandek.</p>
<p>${SAVOL} Oxirgi yozgan vazifangizni eslang. Undan qaysi harflar tushib qolgan edi? ${PAUZA} Koʻpincha — A va B.</p>`,

  agar: `
<p>MAKTAB’dagi eng muhim harf — <b>«Agar»</b>. Navigatorni eslang: yoʻl yopiq boʻlsa, boshqa yoʻl topadi. Nima qilishni oldindan biladi. Vazifada ham shunday boʻlishi kerak. Chapda — vazifa, oʻngda — xuddi shu vazifa yoʻllar xaritasi sifatida. ${KLIK}</p>
<p>Birinchi qoida: <b>maʼlumot yetmasa — taxmin qilma, soʻra</b>. Chunki stajyor bilmagan narsasiga «bilmayman» demaydi, oʻzi toʻqib chiqaradi. ${KLIK}</p>
<p>Keyin model soʻrov turini aniqlaydi. Qaytarish boʻlsa: 14 kungacha — qaytarish tartibini yuboradi, 14 kundan keyin — boshqa variant taklif qiladi. ${KLIK}</p>
<p>Texnik muammo boʻlsa — darhol javob bermaydi, avval ikkita savol beradi. ${KLIK}</p>
<p>Va eng muhimi — <b>«aks holda»</b>: hech biriga toʻgʻri kelmasa, operatorga ulaydi. ${KLIK}</p>
<p>Qoida oddiy: <b>har bir «agar»ning oʻz «aks holda»si boʻlsin</b>. Yoʻl koʻrsatilmagan joyda model yoʻlni oʻzi oʻylab topadi. Buni gallyutsinatsiya deyishadi — yaʼni ishonch bilan aytilgan yolgʻon.</p>`,

  tuzilma: `
<p><b>T — Tartib</b>. Ikki tomoni bor: biz beradigan matn va model qaytaradigan javob.</p>
<p>Biz beradigan matnda hujjat, qoidalar va savolni alohida-alohida ajratamiz — xuddi nomi yozilgan papkalarga solgandek. Shunda model nima maʼlumot, nima buyruq ekanini adashtirmaydi. Maslahat: uzun hujjat tepada, savol eng oxirida. ${KLIK}</p>
<p>Javobni esa <b>anketa shaklida</b> soʻraymiz. Erkin matn emas — aniq kataklar: javob — «ha», «yoʻq» yoki «shartli»; manba — hujjatdan aniq parcha; ishonch — 0 dan 1 gacha. ${KLIK}</p>
<p>Mana model javobi: hamma katak toʻldirilgan. Bunday javobni boshqa dastur ham oʻqiy oladi. Bu — ikkinchi qismga koʻprik: tool’lar ham aynan shunday anketalar bilan ishlaydi. ${KLIK}</p>
<p>Claude’da buning uchun maxsus rejim bor — <b>structured outputs</b>: javob har doim anketaga aniq mos keladi.</p>`,

  andoza: `
<p><b>A — Aniq misol</b>. Sartaroshga «chiroyli qilib oling» desangiz, nima chiqishini bilmaysiz. Telefondan rasm koʻrsatsangiz — darhol tushunadi. Model ham shunday: <b>bitta yaxshi misol oʻnta qoidadan kuchli</b>.</p>
<p>Oʻngdagi nishonga qarang: har bir nuqta — modelning bitta javobi. Misolsiz javoblar har tomonga sochilgan. ${KLIK}</p>
<p>Uchta har xil misol qoʻshdik — javoblar markazga yigʻildi.</p>
<p>Lekin ehtiyot boʻling: <b>model misoldagi hamma narsani koʻchiradi</b>. Misol uch qator boʻlsa, javob ham uch qator. Misolda xato boʻlsa, xato ham koʻchadi. Shuning uchun misolni ehtiyot boʻlib tanlang.</p>`,

  fikrlash: `
<p>Soʻnggi ikki yildagi eng katta oʻzgarish — <b>oʻylaydigan modellar</b>. Ular javob berishdan oldin oʻzi oʻylab oladi. ${PAUZA}</p>
<p>Taksiga oʻtirganingizni eslang. Haydovchiga har bir burilishni aytmaysiz — manzilni aytasiz, xolos. Ilgari modelga har qadamni yozib berardik: avval oʻqi, keyin yoz, keyin tartibla. Chapda — shunday eski vazifa.</p>
<p>Endi esa <b>manzilni aytamiz</b>: nima kerak, natija qanday boʻlishi kerak, nimani qilmaslik kerak. Oʻngda — shunday vazifa. Yoʻlni model oʻzi topadi. ${KLIK}</p>
<p>Qancha oʻylashini <b>effort</b> degan sozlama bilan boshqaramiz. Oddiy ishga — kam: tez va arzon. Murakkab tahlilga — koʻp: chuqurroq, lekin sekinroq va qimmatroq. Hamma narsaga maksimum qoʻyish — pulni bekorga sarflash.</p>`,

  baholash: `
<p><b>B — Baholash</b>. Oshpaz yangi taomni bitta mehmonga tatib koʻrib, menyuga qoʻymaydi-ku. Koʻp odamga beradi va nechtasiga yoqqanini sanaydi. Prompt bilan ham xuddi shunday.</p>
<p>Chapda — bizning prompt: yordam xizmati mijoz xatlariga javob yozadi. Oʻngda — haqiqiy mijozlardan kelgan 10 ta xat. Endi promptni hammasida sinab koʻramiz. ${KLIK}</p>
<p>Natija: 10 tadan 6 tasi yaxshi. 4 tasi yomon: uchtasida ohang qoʻpol, bittasida model narxni oʻzidan toʻqib chiqardi. Ikki marta sinab «ishlayapti» desak, buni hech qachon bilmas edik. ${KLIK}</p>
<p>Xatolarga qaraymiz va promptga ikki qator qoʻshamiz. «Ohang samimiy boʻlsin» — bu K harfi, kontekst. «Narxni faqat roʻyxatdan ol, oʻylab topma» — bu A harfi, agar. ${KLIK}</p>
<p>Qayta sinaymiz — endi 10 tadan 9 tasi yaxshi. Bittasi hali uzun, uni ham keyin tuzatamiz. Haqiqiy ishda 30–50 ta misol olinadi, lekin gʻoya shu.</p>
<p>Xulosa: <b>testsiz prompt — taxmin. Test qilsangiz — aniq bilasiz</b>: yaxshilandimi yoki yoʻqmi.</p>`,

  lab: `
<p>Endi hammasini jonli koʻramiz. Chapda — vazifa, tepada — MAKTAB harflari va ball, oʻngda — natija. Boshida vazifa bitta qator: «Termos haqida tavsif yoz». Ball — 12. Javob esa zerikarli, umumiy gap. ${KLIK}</p>
<p>Har klikda bitta harf qoʻshamiz. <b>Maqsad</b>: marketpleysda sotadigan tavsif. ${KLIK} <b>Agar</b>: berilmagan xususiyatni oʻylab topma. ${KLIK} <b>Kontekst</b>: yarim litr, 12 soat issiq saqlaydi, xaridorlar — talabalar va haydovchilar. ${KLIK} <b>Tartib</b>: sarlavha, 3 ta afzallik va bitta chaqiriq. ${KLIK} <b>Aniq misol</b>: «Ertalabki choy — kechgacha issiq». ${KLIK} Va <b>baholash</b>: yuborishdan oldin raqamlarni tekshir.</p>
<p>Ball 12 dan 96 ga chiqdi. Javob esa tayyor sotuv matniga aylandi.</p>
<p>${JONLI} «Claude’da ishga tushirish» tugmasi vazifani hozir modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, termos oʻrniga yozing va natijani birga koʻring.</p>`,

  chain: `
<p>Birinchi qismning oxirgi gapi. Osh damlashni eslang. Hamma narsani bir vaqtda qozonga tashlamaysiz-ku: avval goʻsht, keyin piyoz va sabzi, keyin guruch. Har bosqichning oʻz vaqti bor.</p>
<p>Model bilan ham shunday. Hamma ishni bitta katta vazifaga tiqsangiz — «yigʻ, tahlil qil, yoz, tarjima qil, tekshir» — model hammasini chala qiladi. Xato qayerdaligini ham topa olmaysiz. ${KLIK}</p>
<p>Toʻgʻri yoʻl — <b>chain</b>, yaʼni ishni ketma-ket qadamlarga boʻlish: yigʻish, tahlil, yozish, tekshirish. Har qadam bitta ishni qiladi va natijasini keyingisiga beradi. Oʻrtada tekshiruv bor: sifat yomon boʻlsa, ish davom etmaydi. ${KLIK}</p>
<p>Foydasi: xato qayerda ekani darhol koʻrinadi, har qadamni alohida yaxshilaysiz. Oddiy qadamga arzon model, murakkabiga kuchlisini qoʻyish ham mumkin. ${KLIK}</p>
<p>Endi eng qiziq joyi: bu chain’ga <b>qoʻl</b> qoʻshamiz.</p>`,

  act2: `
<p>Ikkinchi qism — <b>Tool Chaining</b>. Birinchi qismda stajyorga vazifa berishni oʻrgandik. Endi unga qoʻl beramiz. ${KLIK}</p>`,

  hands: `
<p>Eng aqlli model ham uchta narsani qila olmaydi. ${PAUZA}</p>
<p>Birinchisi — <b>yangiliklarni bilmaydi</b>. Uning bilimi oʻqitilgan kunda toʻxtab qolgan: bugungi kurs ham, bugungi ob-havo ham unga notanish.</p>
<p>Ikkinchisi — <b>hisobda adashadi</b>. Katta sonlarni xato hisoblashi mumkin.</p>
<p>Uchinchisi, eng muhimi — <b>hech narsa qila olmaydi</b>. Xat yubora olmaydi, bazaga yoza olmaydi, buyurtma bera olmaydi. Miyasi bor, qoʻli yoʻq. ${KLIK}</p>
<p>Yechim — <b>tool</b>. Tool — bu modelning qoʻli: u chaqira oladigan kichik dastur. Ob-havo, kalkulyator, qidiruv, xat yuborish — hammasi tool boʻla oladi. Har bir tool’ning uch qismi bor. ${KLIK}</p>
<p>Birinchisi — <b>nomi</b>: nima qilishi. Masalan, get_weather — ob-havoni olish. ${KLIK}</p>
<p>Ikkinchisi — <b>tavsifi</b>: qachon va qanday ishlatish kerakligi. Eʼtibor bering: <b>tavsif ham prompt</b>! Model aynan shu matnni oʻqib, qaysi tool’ni olishni hal qiladi. ${KLIK}</p>
<p>Uchinchisi — <b>parametrlar</b>, yaʼni nimalarni toʻldirish kerak: bu yerda shahar — majburiy, sana — ixtiyoriy.</p>`,

  flow: `
<p>Endi tool qanday chaqirilishini qadam-baqadam koʻramiz. Oddiy oʻxshatish: model — <b>boshliq</b>, sizning dasturingiz — <b>yordamchi</b>. Boshliq oʻzi hech narsa qilmaydi, faqat xatcha yozadi. ${KLIK}</p>
<p>Foydalanuvchi soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» ${KLIK}</p>
<p>Dastur savolni Claude’ga beradi va aytadi: «Sening ixtiyoringda ob-havo tool’i bor». ${KLIK}</p>
<p>Claude darhol javob bermaydi — u ertangi ob-havoni bilmaydi va buni tushunadi. Shuning uchun xatcha yozadi: «Samarqand uchun ob-havoni chaqir». ${KLIK}</p>
<p>Dastur haqiqiy ob-havo xizmatiga murojaat qiladi. ${KLIK}</p>
<p>Javob keladi: yomgʻir ehtimoli 70 foiz, 14 daraja. ${KLIK}</p>
<p>Dastur shu natijani Claude’ga qaytaradi. ${KLIK}</p>
<p>Va faqat shundan keyin Claude odamga javob beradi: «Ha, ehtimoli 70 foiz. Soyabon oling». ${KLIK}</p>
<p>Eng muhim gap: <b>model tool’ni oʻzi ishga tushirmaydi</b>. U faqat soʻraydi — bajaradigan sizning dasturingiz. Demak, boshqaruv sizning qoʻlingizda: nimaga ruxsat berish, nimani tekshirish — hammasini siz hal qilasiz.</p>`,

  loop: `
<p>Endi asosiy savol: agent nima? Formula oddiy: <b>agent = model + tool’lar + sikl</b>. Model — miya, tool’lar — qoʻl, sikl — ularni ishlatib turadigan motor. Chapdagi yetti qator kod — har qanday agentning yuragi.</p>
<p>Oshpazni eslang: tatib koʻradi, tuz qoʻshadi, yana tatib koʻradi — toki mazasi kelguncha. Agent ham xuddi shunday ishlaydi. ${KLIK}</p>
<p>Birinchi — <b>oʻyla</b>: model vazifaga va shu paytgacha boʻlgan hamma narsaga qarab, keyingi qadamni tanlaydi. ${KLIK}</p>
<p>Tool kerak boʻlmasa — demak, javob tayyor, aylanishdan chiqamiz. ${KLIK}</p>
<p>Kerak boʻlsa — <b>harakat qil</b>: tool’ni chaqiramiz. Keyin — <b>kuzat</b>: natijani koʻramiz. Va yana boshidan: oʻyla, qil, koʻr. ${KLIK}</p>
<p>Muhim: <b>agentda toʻxtash qoidasi boʻlishi shart</b>. Vazifa bajarildi; qadamlar soni tugadi, masalan 8 ta; yoki odamning ruxsati kerak, masalan pul oʻtkazishdan oldin. Toʻxtash qoidasi boʻlmasa, agent toʻxtamay aylanib, pulingizni sarflaydi.</p>`,

  patterns: `
<p>Agentlar qanchalik murakkab koʻrinmasin, ular oltita tayyor sxemadan yigʻiladi. Bu roʻyxat Anthropic’ning «Building Effective Agents» maqolasidan olingan. Har birini hayotiy misol bilan koʻramiz. ${KLIK}</p>
<p>Birinchisi — <b>ketma-ket chain</b>. Zavoddagi konveyer kabi: bir qadamning natijasi keyingisiga oʻtadi, oʻrtada tekshiruv. Misol: reja, keyin matn, keyin tarjima. ${KLIK}</p>
<p>Ikkinchisi — <b>routing</b>, yaʼni saralash. Kasalxonadagi registraturani eslang: bemorga qarab, uni kerakli shifokorga yuboradi. Bu yerda ham: savolmi, shikoyatmi, qaytarishmi — har biri oʻz yoʻliga. ${KLIK}</p>
<p>Uchinchisi — <b>parallel ishlash</b>. Bir nechta oshpaz bir vaqtda turli taom tayyorlagandek: bir nechta model birdaniga ishlaydi. Misol: kodni uch tomondan birdaniga tekshirish. ${KLIK}</p>
<p>Toʻrtinchisi — <b>bosh model va ishchilar</b>. Qurilishdagi prorab kabi: ishni boʻlib, ishchilarga tarqatadi, keyin natijani yigʻadi. ${KLIK}</p>
<p>Beshinchisi — <b>yozuvchi va tekshiruvchi</b>. Talaba yozadi, ustoz tekshiradi — yaxshi boʻlguncha qayta-qayta. Misol: badiiy tarjima. ${KLIK}</p>
<p>Oltinchisi — <b>avtonom agent</b>. Tajribali xodim kabi: rejani ham, tool’larni ham, qachon toʻxtashni ham oʻzi hal qiladi. Misol: kod yozadigan agentlar. ${KLIK}</p>
<p>Farqi: birinchi beshtasida yoʻlni biz chizamiz — bu <b>workflow</b>. Oltinchisida yoʻlni model tanlaydi — bu <b>agent</b>. Maslahat: doim oddiydan boshlang. Agent — birinchi emas, oxirgi chora: kuchli, lekin qimmatroq va nazorat qilish qiyinroq.</p>`,

  assembly: `
<p>Endi koʻrganlarimizni bitta joyga yigʻamiz va agentni koʻz oldimizda quramiz. Markazda — miya, yaʼni model. Hozircha u faqat matn oladi va matn qaytaradi. ${KLIK}</p>
<p>Birinchi qism — <b>tizim prompti</b>. Bu agentning xarakteri: roli, maqsadi va qoidalari. Yangi xodimga birinchi kuni beriladigan yoʻriqnoma kabi. MAKTAB aynan shu yerda ishlaydi. ${KLIK}</p>
<p>Ikkinchi qism — <b>tool’lar</b>, yaʼni qoʻllar. Oltita: tadbirlarni qidirish, ob-havo, kalkulyator, valyuta, hisobot va xabar yuborish. ${KLIK}</p>
<p>Uchinchi qism — <b>xotira</b>. Qisqa xotira — hozirgi suhbat. Uzoq xotira — fayllar va baza: ertaga ham kerak boʻladigan narsalar. ${KLIK}</p>
<p>Toʻrtinchi qism — <b>sikl</b>: oʻyla, qil, koʻr. Shu aylanish boshlanganda agent jonlanadi. ${KLIK}</p>
<p>Endi vazifa beramiz: «Oktabrda Toshkentdagi AI tadbirlarini top, ob-havoni tekshir, eng yaxshisini tanla va jamoaga yubor». Qarang: agent avval rejani oʻzi tuzadi. Tadbirlarni qidiradi — uchta sana topildi. Shu sanalar bilan ob-havoni uchalasi uchun birdaniga soʻraydi. Keyin hisobot tuzadi va jamoaga yuboradi. Oʻngda — har bir qadamning yozuvi. <b>Bitta tool’ning natijasi keyingisiga oʻtyapti — mana shu tool chaining.</b> ${KLIK}</p>
<p><b>Bu — agent.</b> Model, prompt, tool’lar, xotira va sikl.</p>
<p>${JONLI} «Toʻliq koʻrish» tugmasi butun sahnani 70 soniyada uzluksiz koʻrsatadi.</p>`,

  live: `
<p>Endi eng qiziq joyi: hozir yigʻgan agentimiz jonli ishlaydi. Bu animatsiya emas — Claude tool’larni haqiqatan oʻzi tanlaydi va chaqiradi. ${JONLI}</p>
<p>Tepada uchta tayyor vazifa bor. Birinchisini ishga tushiraman. ${PAUZA}</p>
<p>Oʻngda — agentning ish daftari: har bir chaqiruv va uning natijasi. Chapda — agentning oʻzi: nuqtalar tool’larga borib-kelyapti.</p>
<p>Eʼtibor bering: bu tartibni hech kim oldindan yozmagan. Biz faqat vazifa va tool’larni berdik. <b>Nimani, qaysi tartibda va nimani birdaniga chaqirishni model oʻzi hal qilyapti.</b> Oxirida — tayyor hisobot va yuborilgan xabar.</p>
<p>${SAVOL} Endi zaldan vazifa soʻrang: boshqa shahar, boshqa oy yoki boshqa byudjet. «Oʻz vazifangiz» tugmasini bosing va yozing.</p>
<p>Tool’lardagi maʼlumotlar demo uchun, lekin qarorlar haqiqiy — ularni model qabul qilyapti.</p>
<p>Internet boʻlmasa, xuddi shu tugma yozib olingan namoyishni koʻrsatadi — maʼruza toʻxtab qolmaydi.</p>`,

  aci: `
<p>Agentning sifati tool’lar tavsifiga bogʻliq. Model tool’ning ichini koʻrmaydi — faqat nomi va tavsifini oʻqiydi. Xuddi dori qutisidagi yoʻriqnoma kabi: yoʻriqnoma yomon boʻlsa, dori notoʻgʻri ichiladi.</p>
<p>Chapda — yomon misol: nomi «search», tavsifi «qidiradi». Nimani? Qayerdan? Qachon? Model bilmaydi va taxmin qiladi. Oʻngda — yaxshi misol. Uni beshta qoida bilan koʻramiz. ${KLIK}</p>
<p>Birinchi — <b>nom aniq boʻlsin</b>, oldida tizim nomi bilan: crm_search, crm_update. Darhol qayerga tegishli ekani koʻrinadi. ${KLIK}</p>
<p>Ikkinchi — <b>tavsifni yangi xodimga tushuntirgandek yozing</b>: nima qiladi, qachon ishlatiladi va qachon ishlatilmaydi. ${KLIK}</p>
<p>Uchinchi — <b>xato xabari ham nima qilishni aytsin</b>. Shunchaki «xato» emas, balki «sana yil-oy-kun koʻrinishida boʻlsin». Shunda model oʻzi tuzatadi. ${KLIK}</p>
<p>Toʻrtinchi — <b>kam, lekin aniq</b>. 40 ta mayda tool emas, 8 ta kuchli tool. Tool koʻp boʻlsa, model adashadi. ${KLIK}</p>
<p>Beshinchi — <b>natija qisqa boʻlsin</b>, faqat kerakli maʼlumot. Ortiqcha soʻz modelning stolida joy egallaydi.</p>`,

  mcp: `
<p>Endi ulash muammosi. Bir necha yil oldin har telefonning oʻz zaryadlovchisi bor edi-ku. Sunʼiy intellektda ham shunday edi. Deylik, uchta AI ilova va beshta servis bor: GitHub, Slack, baza, Drive va CRM. ${KLIK}</p>
<p>Har birini alohida ulasangiz — 3 karra 5, yaʼni 15 ta ulanish. Yangi servis qoʻshilsa — yana uchta. ${KLIK}</p>
<p><b>MCP</b> buni hal qiladi — u sunʼiy intellekt uchun <b>USB-C</b>. Har bir servis bir marta MCP’ga moslanadi, har bir ilova ham bir marta. 15 emas — 8. Bitta ulagich — istalgan qurilma. ${KLIK}</p>
<p>MCP uch narsa beradi: amallar, maʼlumotlar va tayyor shablonlar. Uni Anthropic 2024-yil noyabrda chiqargan, 2025-yil dekabridan esa u Linux Foundation’dagi ochiq standart. Bugun uni koʻplab katta AI ilovalar ishlatadi.</p>`,

  context: `
<p>Birinchi qismda vazifani qanday yozishni gapirdik. Agentlarda yangi savol chiqadi: model aynan nimani koʻryapti? ${KLIK}</p>
<p><b>Kontekst — bu modelning ish stoli.</b> Model faqat stol ustidagini koʻradi: vazifa, tool’lar tavsifi, suhbat tarixi, hujjatlar va natijalar. Ish uzaygan sari stol toʻladi. Stol qogʻozga koʻmilib ketsa, siz ham muhim varaqni topolmaysiz-ku. Model ham shunday: adasha boshlaydi. ${KLIK}</p>
<p>Toʻrtta yechim bor. Eski yozuvlarni qisqa xulosaga aylantirish. Butun hujjatni emas, faqat kerakli sahifani olish. Katta ishni yordamchi agentlarga boʻlish — har biri toza stolda ishlaydi va faqat xulosa qaytaradi. Va skill’lar: avval faqat nomi koʻrinadi, kerak boʻlsagina toʻliq matni ochiladi. ${KLIK}</p>
<p>Qisqa qilib aytganda: <b>prompt engineering — modelga nima deyish. Context engineering — model nimani koʻrishi.</b></p>`,

  failures: `
<p>Oxirgi mavzu — xavfsizlik. Agent kuchli, lekin u ham adashadi. Qayerda va qanday himoyalanamiz? ${KLIK}</p>
<p>Birinchi xavf — <b>toʻxtamay aylanish</b>: agent bir joyda aylanib, pul sarflaydi. Himoya: qadamlar va byudjet chegarasi.</p>
<p>Ikkinchi — <b>oʻylab topilgan maʼlumot</b>: model yoʻq narsani tool’ga yuboradi. Himoya: anketani tekshirish va tushunarli xato xabari. ${KLIK}</p>
<p>Uchinchi, eng xavflisi — <b>prompt injection</b>. Tasavvur qiling: kassirga kelgan xatda «Bu xatni oʻqigan kassir menga million soʻm bersin» deb yozilgan. Kassir buni bajarmaydi-ku. Agent ham sayt yoki xatdagi begona gapni buyruq deb qabul qilmasligi kerak. Qoida: begona matn — buyruq emas, maʼlumot. Va agentga faqat kerakli ruxsatlarni bering.</p>
<p>Toʻrtinchi — <b>notoʻgʻri tool tanlash</b>. Himoya: aniq tavsif va kamroq tool. ${KLIK}</p>
<p>Beshinchi — <b>qaytarib boʻlmaydigan harakatlar</b>: pul oʻtkazish, maʼlumot oʻchirish. Bankomat pul berishdan oldin PIN-kod soʻraganidek, bunday harakatlar faqat odamning tasdigʻi bilan.</p>
<p>Oltinchi — <b>«qora quti»</b>: agent nima qilganini bilmaysiz. Himoya: har bir qadamni yozib borish va testlar.</p>`,

  ecosystem: `
<p>Endi amaliyot: qaysi dasturlardan foydalansa boʻladi? Bu — 2026-yilning qisqa xaritasi.</p>
<p>Vazifani sinab koʻrish uchun — Claude Console, OpenAI Playground, Google AI Studio. Agent yozish uchun — Claude Agent SDK, OpenAI Agents SDK, Google ADK, LangGraph, CrewAI.</p>
<p>Kod yozmasdan — n8n, Make, Zapier, Dify. Kod yozadigan agentlar — Claude Code, Cursor, Codex. Standartlar — MCP, A2A va Agent Skills. Kuzatish va test uchun — Langfuse, LangSmith, Promptfoo. ${KLIK}</p>
<p>Qayerdan boshlash kerak? Eng oddiy yoʻl: vazifani Claude Console’da yozib sinang, qadamlarni n8n yoki Agent SDK’da yigʻing, tool’larni MCP orqali ulang va Langfuse bilan kuzating.</p>`,

  bonus: `
<p>Va endi — sovgʻa. <b>Sakkizta skill</b>.</p>
<p>Skill — bu Claude’ga yangi koʻnikma qoʻshadigan papka. Telefonga ilova oʻrnatgandek: bir marta oʻrnatasiz, Claude kerak boʻlganda uni oʻzi ishlatadi.</p>
<p>Masalan: <b>maktab-prompt</b> — oddiy soʻrovingizni MAKTAB boʻyicha kuchli vazifaga aylantiradi. <b>prompt-doctor</b> — ishlamayotgan vazifaning sababini topadi. <b>prompt-evals</b> — test tuzadi. <b>tool-contract-writer</b> — tool’lar uchun tavsif yozadi. <b>agent-system-prompt</b> — agent uchun yoʻriqnoma yozadi. Bugungi deyarli har bir mavzu uchun bittadan skill.</p>
<p>QR orqali yuklab olasiz. Bu skill’larni boshqa agentlar ham tushunadi — bu ochiq standart.</p>
<p>${PAUZA} QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.</p>`,

  meta: `
<p>Va oxirgi misol. ${PAUZA} Bir savol: bu taqdimotni kim yigʻdi? ${KLIK}</p>
<p>Javob: uni <b>AI agent</b> yigʻdi. Men vazifa berdim, yoʻnaltirdim va natijani tekshirdim. ${KLIK}</p>
<p>Mana qanday ishladi: avval maʼlumotlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni rasmga olib oʻzi koʻrib chiqdi va xatolarini tuzatdi, videoni kadrma-kadr tayyorladi va joyladi. Raqamlar ekranda. Bu — tool chaining amalda: qidiruv, kod, tekshiruv, video — hammasi bitta chain’da. ${KLIK}</p>
<p>Bugun gapirgan hamma narsa — vazifa logikasi, tool’lar, sikl — shu taqdimotning oʻzida ishladi. Mening vazifam esa aynan bugun aytganlarimizni qilish edi: aniq vazifa berish, yoʻnaltirish va tekshirish.</p>`,

  final: `
<p>Uchta gapni olib keting.</p>
<p>Birinchi: <b>prompt — bu dastur</b>. Uni MAKTAB bilan yozing va test bilan tekshiring. Tikuvchiga buyurtma berganingizni eslang.</p>
<p>Ikkinchi: <b>tool — modelning qoʻli</b>. Uning tavsifi ham prompt.</p>
<p>Uchinchi: <b>oddiydan boshlang</b>. Avval bitta vazifa, keyin chain, keyin workflow, va faqat haqiqatan kerak boʻlsa — agent.</p>
<p>Rahmat! Savollaringizni kutaman.</p>`,
};
