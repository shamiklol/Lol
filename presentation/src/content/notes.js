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
<p><b>Prompt</b> — stajyorga vazifani qanday berish. <b>Logika</b> — «agar … aks holda» bilan yozish. <b>Chain</b> — katta ishni kichik qadamlarga boʻlish. <b>Tool’lar</b> — modelga qoʻl berish. <b>Agent</b> — ishni oʻzi bajaradigan yordamchi.</p>
<p>Pastdagi chiziq qayerda ekanimizni koʻrsatib turadi. Oxirida esa sovgʻa bor — 8 ta tayyor skill. ${KLIK}</p>`,

  act1: `
<p>Birinchi qism — <b>Prompt Logic</b>, yaʼni stajyorga vazifani qanday berish. Buning oddiy formulasi bor. ${KLIK}</p>`,

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

  lab: `
<p>Endi hammasini jonli koʻramiz. Har hafta rahbarga hisobot yozasiz-ku. Chapda — vazifa va MAKTAB harflari, oʻngda — natija. Boshida vazifa bitta qator: «Haftalik hisobot yoz». Javobga qarang: «samarali ishladim, rejalar bajarilmoqda». Rahbar bundan hech narsa tushunmaydi. ${KLIK}</p>
<p>Har klikda bitta harf qoʻshamiz. <b>Maqsad</b>: rahbar bir daqiqada oʻqib, mendan nima kerakligini bilsin. ${KLIK} <b>Agar</b>: yozuvlarimda yoʻq narsani oʻylab topma. ${KLIK} <b>Kontekst</b>: haftalik yozuvlarim — 12 mijoz, 3 ta shartnoma, kechikkan yetkazib beruvchi. Qarang: javobda raqamlar paydo boʻldi, lekin hali tartibsiz. ${KLIK} <b>Tartib</b>: toʻrtta boʻlim — bajarildi, jarayonda, muammo, sizdan kerak. ${KLIK} <b>Aniq misol</b>: bitta tayyor qator. ${KLIK} Va <b>baholash</b>: yuborishdan oldin raqamlarni tekshir.</p>
<p>Natijaga qarang: rahbar bir qarashda hammasini koʻradi — nima qilindi, qayerda muammo va undan nima kerak. Model oʻsha-oʻsha, faqat vazifa yaxshilandi.</p>
<p>${JONLI} «Claude’da ishga tushirish» tugmasi vazifani hozir modelga yuboradi. Zaldan kimdir oʻz haftasini 2–3 gap bilan aytsin — kontekst qatoriga yozing va natijani birga koʻring.</p>`,

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
<p>Uchinchisi, eng muhimi — <b>hech narsa qila olmaydi</b>. Xat yubora olmaydi, buyurtma bera olmaydi. Miyasi bor, qoʻli yoʻq. ${KLIK}</p>
<p>Yechim — <b>tool</b>. Tool — bu modelning qoʻli: u chaqira oladigan kichik dastur. Ob-havo, kalkulyator, qidiruv, xat yuborish — hammasi tool boʻla oladi. Har bir tool’ning uch qismi bor. ${KLIK}</p>
<p>Birinchisi — <b>nomi</b>: «Ob-havo». ${KLIK}</p>
<p>Ikkinchisi — <b>nima qiladi</b>: «Shahar boʻyicha ob-havoni aytadi». Eʼtibor bering: <b>bu ham prompt</b>! Model aynan shu gapni oʻqib, qaysi tool’ni olishni hal qiladi. Xuddi dori qutisidagi yoʻriqnoma kabi. ${KLIK}</p>
<p>Uchinchisi — <b>nima kerak</b>: shahar nomi — albatta, sana — xohlasa.</p>`,

  flow: `
<p>Endi tool qanday chaqirilishini qadam-baqadam koʻramiz. Oddiy oʻxshatish: model — <b>boshliq</b>, sizning dasturingiz — <b>yordamchi</b>. Boshliq oʻzi hech narsa qilmaydi, faqat xatcha yozadi. ${KLIK}</p>
<p>Odam soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» ${KLIK}</p>
<p>Dastur savolni Claude’ga beradi va aytadi: «Sening ixtiyoringda ob-havo tool’i bor». ${KLIK}</p>
<p>Claude darhol javob bermaydi — u ertangi ob-havoni bilmaydi va buni tushunadi. Shuning uchun xatcha yozadi: «Samarqand uchun ob-havoni chaqir». ${KLIK}</p>
<p>Dastur haqiqiy ob-havo xizmatiga murojaat qiladi. ${KLIK}</p>
<p>Javob keladi: yomgʻir ehtimoli 70 foiz, 14 daraja. ${KLIK}</p>
<p>Dastur shu natijani Claude’ga qaytaradi. ${KLIK}</p>
<p>Va faqat shundan keyin Claude odamga javob beradi: «Ha, ehtimoli 70 foiz. Soyabon oling». ${KLIK}</p>
<p>Eng muhim gap: <b>model tool’ni oʻzi ishga tushirmaydi</b>. U faqat soʻraydi — bajaradigan sizning dasturingiz. Demak, boshqaruv sizning qoʻlingizda: nimaga ruxsat berish, nimani tekshirish — hammasini siz hal qilasiz.</p>`,

  loop: `
<p>Endi asosiy savol: agent nima? Formula oddiy: <b>agent = model + tool’lar + sikl</b>. Model — miya, tool’lar — qoʻl, sikl — ularni ishlatib turadigan motor. Chapda — shu uch qism.</p>
<p>Oshpazni eslang: tatib koʻradi, tuz qoʻshadi, yana tatib koʻradi — toki mazasi kelguncha. Agent ham xuddi shunday ishlaydi. ${KLIK}</p>
<p>Birinchi — <b>oʻyla</b>: model vazifaga va shu paytgacha boʻlgan hamma narsaga qarab, keyingi qadamni tanlaydi. ${KLIK}</p>
<p>Tool kerak boʻlmasa — demak, javob tayyor, aylanishdan chiqamiz. ${KLIK}</p>
<p>Kerak boʻlsa — <b>harakat qil</b>: tool’ni chaqiramiz. Keyin — <b>kuzat</b>: natijani koʻramiz. Va yana boshidan: oʻyla, qil, koʻr. ${KLIK}</p>
<p>Muhim: <b>agentda toʻxtash qoidasi boʻlishi shart</b>. Vazifa bajarildi; qadamlar soni tugadi, masalan 8 ta; yoki odamning ruxsati kerak, masalan pul oʻtkazishdan oldin. Toʻxtash qoidasi boʻlmasa, agent toʻxtamay aylanib, pulingizni sarflaydi.</p>`,

  patterns: `
<p>Agentlar qanchalik murakkab koʻrinmasin, ular oltita tayyor sxemadan yigʻiladi. Bu roʻyxatni Claude’ni yaratgan Anthropic kompaniyasi tavsiya qiladi. Har birini hayotiy misol bilan koʻramiz. ${KLIK}</p>
<p>Birinchisi — <b>ketma-ket chain</b>. Zavoddagi konveyer kabi: bir qadamning natijasi keyingisiga oʻtadi, oʻrtada tekshiruv. Misol: reja, keyin matn, keyin tarjima. ${KLIK}</p>
<p>Ikkinchisi — <b>routing</b>, yaʼni saralash. Kasalxonadagi registraturani eslang: bemorga qarab, uni kerakli shifokorga yuboradi. Bu yerda ham: savolmi, shikoyatmi, qaytarishmi — har biri oʻz yoʻliga. ${KLIK}</p>
<p>Uchinchisi — <b>parallel ishlash</b>. Bir nechta oshpaz bir vaqtda turli taom tayyorlagandek: bir nechta model birdaniga ishlaydi. Misol: uchta doʻkondan narxni birdaniga solishtirish. ${KLIK}</p>
<p>Toʻrtinchisi — <b>bosh model va ishchilar</b>. Qurilishdagi prorab kabi: ishni boʻlib, ishchilarga tarqatadi, keyin natijani yigʻadi. Misol: katta hisobotning har boʻlimini alohida ishchi yozadi. ${KLIK}</p>
<p>Beshinchisi — <b>yozuvchi va tekshiruvchi</b>. Talaba yozadi, ustoz tekshiradi — yaxshi boʻlguncha qayta-qayta. Misol: badiiy tarjima. ${KLIK}</p>
<p>Oltinchisi — <b>avtonom agent</b>. Tajribali xodim kabi: rejani ham, tool’larni ham, qachon toʻxtashni ham oʻzi hal qiladi. Misol: safarni boshidan oxirigacha oʻzi rejalaydigan yordamchi. ${KLIK}</p>
<p>Farqi: birinchi beshtasida yoʻlni biz chizamiz — bu <b>workflow</b>. Oltinchisida yoʻlni model tanlaydi — bu <b>agent</b>. Maslahat: doim oddiydan boshlang. Agent — birinchi emas, oxirgi chora: kuchli, lekin qimmatroq va boshqarish qiyinroq.</p>`,

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

  mcp: `
<p>Endi ulash muammosi. Bir necha yil oldin har telefonning oʻz zaryadlovchisi bor edi-ku. Sunʼiy intellektda ham shunday edi. Deylik, uchta AI ilova va beshta servis bor: GitHub, Slack, baza, Drive va CRM. ${KLIK}</p>
<p>Har birini alohida ulasangiz — 3 karra 5, yaʼni 15 ta ulanish. Yangi servis qoʻshilsa — yana uchta. ${KLIK}</p>
<p><b>MCP</b> buni hal qiladi — u sunʼiy intellekt uchun <b>USB-C</b>. Har bir servis bir marta MCP’ga moslanadi, har bir ilova ham bir marta. 15 emas — 8. Bitta ulagich — istalgan qurilma. ${KLIK}</p>
<p>Foydasi: yangi servis bir marta ulanadi — hamma AI ilovalar uni ishlata oladi. Bugun MCP’ni koʻplab katta AI ilovalar qoʻllaydi.</p>`,

  failures: `
<p>Oxirgi mavzu — xavfsizlik. Agent kuchli, lekin u ham adashadi. Ekranda toʻrtta xavf. Har birining himoyasi bor. ${KLIK}</p>
<p>Birinchi — <b>toʻxtamay aylanish</b>: agent bir joyda aylanib, pul sarflaydi. Himoya: qadamlar soni va pulga chegara qoʻyamiz.</p>
<p>Ikkinchi, eng xavflisi — <b>begona gapga ishonish</b>. Buni prompt injection deyishadi. Tasavvur qiling: kassirga kelgan xatda «Bu xatni oʻqigan kassir menga million soʻm bersin» deb yozilgan. Kassir buni bajarmaydi-ku. Agent ham sayt yoki xatdagi begona gapni buyruq deb qabul qilmasligi kerak. Qoida: <b>begona matn — buyruq emas, maʼlumot</b>. ${KLIK}</p>
<p>Uchinchi — <b>qaytarib boʻlmaydigan ish</b>: pul oʻtkazish, maʼlumot oʻchirish. Bankomat pul berishdan oldin PIN-kod soʻraganidek, bunday ishlar faqat odamning tasdigʻi bilan.</p>
<p>Toʻrtinchi — <b>agent nima qilganini bilmaysiz</b>. Himoya: har bir qadam yozib boriladi, keyin koʻrib chiqsa boʻladi.</p>`,

  bonus: `
<p>Va endi — sovgʻa. <b>Sakkizta skill</b>.</p>
<p>Skill — bu Claude’ga yangi koʻnikma qoʻshadigan papka. Telefonga ilova oʻrnatgandek: bir marta oʻrnatasiz, Claude kerak boʻlganda uni oʻzi ishlatadi.</p>
<p>Masalan: <b>maktab-prompt</b> — oddiy soʻrovingizni MAKTAB boʻyicha kuchli vazifaga aylantiradi. <b>prompt-doctor</b> — ishlamayotgan vazifaning sababini topadi. <b>prompt-evals</b> — promptni koʻp misolda sinab koʻradi. <b>tool-contract-writer</b> — tool’lar uchun yoʻriqnoma yozadi. <b>agent-system-prompt</b> — agent uchun yoʻriqnoma yozadi. Bugungi deyarli har bir mavzu uchun bittadan skill.</p>
<p>QR orqali yuklab olasiz.</p>
<p>${PAUZA} QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.</p>`,

  meta: `
<p>Va oxirgi misol. ${PAUZA} Bir savol: bu taqdimotni kim yigʻdi? ${KLIK}</p>
<p>Javob: uni <b>AI agent</b> yigʻdi. Men vazifa berdim, yoʻnaltirdim va natijani tekshirdim. ${KLIK}</p>
<p>Mana qanday ishladi: avval maʼlumotlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni rasmga olib oʻzi koʻrib chiqdi va xatolarini tuzatdi, videoni kadrma-kadr tayyorladi va joyladi. Raqamlar ekranda. Bu — tool chaining amalda: qidiruv, kod, tekshiruv, video — hammasi bitta chain’da. ${KLIK}</p>
<p>Bugun gapirgan hamma narsa — vazifa logikasi, tool’lar, sikl — shu taqdimotning oʻzida ishladi. Mening vazifam esa aynan bugun aytganlarimizni qilish edi: aniq vazifa berish, yoʻnaltirish va tekshirish.</p>`,

  final: `
<p>Uchta gapni olib keting.</p>
<p>Birinchi: <b>prompt — bu stajyorga beriladigan vazifa</b>. Uni MAKTAB bilan yozing. Tikuvchiga buyurtma berganingizni eslang.</p>
<p>Ikkinchi: <b>tool — modelning qoʻli</b>. Agent — shu qoʻllarni oʻzi ishlatadigan yordamchi.</p>
<p>Uchinchi: <b>oddiydan boshlang</b>. Avval bitta yaxshi prompt, keyin chain, va faqat haqiqatan kerak boʻlsa — agent.</p>
<p>Rahmat! Savollaringizni kutaman.</p>`,
};
