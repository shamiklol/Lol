// Speaker notes (Uzbek). Shown in the presenter window (P) and the in-page dock (N),
// and exported to speaker/nutq-matni.md. Cues: KLIK — next click, PAUZA — pause, SAVOL — ask the room.
const c = (w) => `<span class="cue">${w}</span>`;
export const KLIK = c('KLIK');
export const PAUZA = c('PAUZA');
export const SAVOL = c('SAVOL');
export const JONLI = c('JONLI');

export const NOTES = {
  title: `
<p>Assalomu alaykum! Men — Shamsiddin, ${'Shams.labs'}.</p>
<p>Bugun sunʼiy intellekt bilan ishlashning ikki qatlami haqida gaplashamiz. Birinchisi — <b>Prompt Logic</b>: modelga qanday fikrlashni yozib berish. Ikkinchisi — <b>Tool Chaining</b>: modelga qoʻl berib, uni agentga aylantirish.</p>
<p>Sarlavhaga eʼtibor bering: u zarrachalardan yigʻildi. Model ham matnni xuddi shunday — mayda boʻlaklardan, tokenlardan yigʻib koʻradi. Shu yerdan boshlaymiz. ${KLIK}</p>`,

  hook: `
<p>Kichik tajriba. Chap tomonda koʻpchilik yozadigan prompt: «Kofexona uchun marketing strategiya yozib ber». ${KLIK}</p>
<p>Natija toʻgʻri, lekin foydasi yoʻq. Bu matnni istalgan kofexonaga, istalgan shaharga qoʻyish mumkin. ${KLIK}</p>
<p>Oʻng tomonda — xuddi shu model. Faqat promptda maqsad, kontekst, shart va format bor. Natija: toʻrt haftalik reja, har bir gʻoyaga KPI va byudjet hisobi.</p>
<p>${SAVOL} Nima oʻzgardi? ${PAUZA} Model oʻzgarmadi. ${KLIK}</p>
<p><b>Model bir xil edi. Logika boshqa edi.</b> Bugungi maʼruzaning asosiy gʻoyasi shu.</p>
<p>${JONLI} Internet boʻlsa, «Jonli sinash» tugmasini bosing: ikkala prompt shu zahoti Claude’ga ketadi va javoblar ekranda yoziladi.</p>`,

  route: `
<p>Yoʻlimiz besh bekatdan iborat. Avval model matnni qanday oʻqishini koʻramiz. Keyin promptni dastur kabi yozishni oʻrganamiz — buning uchun <b>MAKTAB</b> degan freymvork bor.</p>
<p>Soʻng katta vazifani qadamlarga boʻlib, chain qilamiz, modelga tool’lar beramiz va oxirida jonli agent yigʻamiz.</p>
<p>Pastdagi chiziq butun maʼruza davomida qayerda ekanimizni koʻrsatib turadi. Oxirida sizni 8 ta bonus skill kutyapti. ${KLIK}</p>`,

  act1: `
<p>Birinchi qism — <b>Prompt Logic</b>. Avval model qanday oʻqishini koʻramiz, keyin — qanday yozishimiz kerakligini. ${KLIK}</p>`,

  tokens: `
<p>Model matnni biz kabi soʻzma-soʻz oʻqimaydi. U matnni <b>tokenlarga</b> — mayda boʻlaklarga boʻladi. Ekranda haqiqiy tokenizator: har bir rangli boʻlak — bitta token, ostidagi raqam — uning ID raqami.</p>
<p>Oʻzbekcha va inglizcha gapni solishtiring: maʼnosi bir xil, lekin oʻzbekchasi ikki baravardan koʻproq token oladi. ${KLIK}</p>
<p>Amaliy xulosa: oʻzbek tilida ishlaganda kontekst tezroq toʻladi va narx oshadi. Uzun hujjatlar bilan ishlaganda buni hisobga oling. ${KLIK}</p>
<p>Ikkinchi xulosa: model har safar keyingi tokenni ehtimollik boʻyicha tanlaydi. Prompt — shu ehtimollarni boshqarish usuli. Teglar va sarlavhalar esa model uchun aniq chegaralar boʻladi.</p>
<p>${JONLI} Zaldan bitta gap soʻrang va shu yerning oʻzida yozib koʻrsating.</p>`,

  program: `
<p>Endi asosiy gʻoya: <b>prompt — bu tabiiy tildagi dastur</b>. Chapda — oddiy kod, oʻngda — xuddi shu logika, faqat oʻzbek tilida. ${KLIK}</p>
<p>Oʻzgaruvchi: kodda «const mijoz», promptda «Mijoz ismi». Shablon — bitta prompt, minglab mijoz. ${KLIK}</p>
<p>Shart: «if» — promptda «Agar». ${KLIK} Sikl: «for» — «Har bir sharh uchun». ${KLIK} Funksiya — aniq qadamlar. ${KLIK} Natija — «return», yaʼni javob formati. ${KLIK}</p>
<p>Xulosa: <b>model — interpretator, siz — dasturchi</b>. Koddagi xato kabi, promptdagi noaniqlik ham xatoga olib keladi.</p>`,

  maktab: `
<p>Endi kuchli promptni qanday yigʻishni koʻramiz. Ekranda oddiy prompt: onlayn doʻkon yordam xizmati mijoz shikoyatiga javob yozadi. Bir qarashda — oddiy matn. ${KLIK}</p>
<p>Lekin uni qatlamlarga ajratsak, oltita qatlam chiqadi. Men buni <b>MAKTAB</b> deb nomladim. ${KLIK}</p>
<p><b>M — Maqsad</b>: nima kerak va nima uchun. «Mijoz bizda qolsin» — bu modelga qaror qabul qilish uchun yoʻnalish beradi.</p>
<p><b>A — Agar</b>: shartlar va cheklovlar. «Chegirma 10% dan oshmasin» — busiz model saxiylik qilib yuboradi.</p>
<p><b>K — Kontekst</b>: kim gapiryapti, kim bilan, qanday vaziyatda. <b>T — Tartib</b>: javob qanday koʻrinishda va qancha hajmda boʻladi.</p>
<p><b>A — Aniq misol</b>: qanday javob kerakligini misolda koʻrsatamiz. Bitta misol ohangni oʻnta qoidadan yaxshiroq tushuntiradi. <b>B — Baholash</b>: model javobni yuborishdan oldin oʻzini tekshiradi.</p>
<p>${SAVOL} Oxirgi yozgan promptingizni eslang — undan qaysi harflar tushib qolgan edi?</p>`,

  agar: `
<p>MAKTAB’dagi eng muhim harf — A, yaʼni <b>«Agar»</b>. Bu — Prompt Logic’ning yuragi. ${KLIK}</p>
<p>Birinchi qoida: maʼlumot yetarli boʻlmasa — taxmin qilma, soʻra. Shu bitta qator gallyutsinatsiyalarning katta qismini yoʻqotadi. ${KLIK}</p>
<p>Keyin soʻrov turini aniqlaymiz: qaytarish soʻrovi — muddatiga qarab ikki xil yoʻl. ${KLIK} Texnik muammo — avval ikkita savol berib aniqlaymiz. ${KLIK} Va eng muhimi — «aks holda». ${KLIK}</p>
<p>Qoida oddiy: <b>har bir «agar»ning «aks holda»si boʻlsin</b>. Ochiq qolgan shox — gallyutsinatsiyaga eshik. Model qayerga borishni bilmasa, yoʻlni oʻzi oʻylab topadi.</p>`,

  tuzilma: `
<p><b>T — Tartib</b>, yaʼni promptning va javobning koʻrinishi. Uning ikki tomoni bor: kirish va chiqish. Kirishda XML teglardan foydalanamiz: hujjat alohida, qoidalar alohida, savol alohida. Model qayerda maʼlumot, qayerda buyruq ekanini aniq koʻradi.</p>
<p>Uzun hujjatni tepaga, savolni oxiriga qoʻying — bu sifatni sezilarli oshiradi. ${KLIK}</p>
<p>Chiqishda — JSON sxema. Modeldan erkin matn emas, aniq maydonlar soʻraymiz: javob, manba, ishonch darajasi. ${KLIK}</p>
<p>Mana javob: sxemaga toʻliq mos. Bunday javobni kod oʻqiy oladi — bu esa keyingi qismga, tool’lar va agentlarga koʻprik. ${KLIK}</p>
<p>Claude’da <b>structured outputs</b> rejimi bor: javob sxemaga qatʼiy mos keladi.</p>`,

  andoza: `
<p><b>A — Aniq misol</b>. Oʻngdagi nishonga qarang: har bir nuqta — modelning bitta javobi. Misolsiz javoblar tarqoq: har safar boshqa uzunlik, boshqa ohang. ${KLIK}</p>
<p>Uchta xilma-xil misol qoʻshdik — javoblar nishonga yigʻildi.</p>
<p>Lekin ehtiyot boʻling: model misoldagi hamma narsani koʻchiradi. Misolingiz uch qator boʻlsa — javob ham uch qator. Misolda xato boʻlsa — xato ham koʻchadi. Shuning uchun misol tanlashga qoida yozishdan koʻra koʻproq vaqt ajrating.</p>`,

  fikrlash: `
<p>Soʻnggi ikki yilning katta oʻzgarishi — <b>reasoning modellar</b>, yaʼni javobdan oldin oʻylaydigan modellar. Ilgari «qadam-baqadam oʻyla» deb, har bir qadamni yozib berardik. ${PAUZA}</p>
<p>Bugungi modellar javob berishdan oldin oʻzi fikrlaydi va qadamlarni koʻpincha bizdan yaxshiroq rejalashtiradi. Shuning uchun endi qadamni emas, maqsadni beramiz: nima kerak, natija qanday boʻlishi kerak, qanday cheklov bor. Bitta qator qoʻshsak kifoya: «javobdan oldin raqamlarni manba bilan solishtir». ${KLIK}</p>
<p>Qancha fikrlashni <b>effort</b> parametri bilan boshqaramiz. Oddiy vazifaga — low: tez va arzon. Murakkab tahlilga — high yoki max. Hamma narsaga max qoʻyish — vaqt va pulni behuda sarflash.</p>`,

  baholash: `
<p><b>B — Baholash</b>. Bu yerda koʻpchilik adashadi: promptni yozadi, ikki-uch marta sinaydi va «ishlayapti» deydi. Bu — taxmin, oʻlchov emas. Promptni test qilish kerak — buni eval deyishadi.</p>
<p>Toʻgʻri jarayon: 30 ta real holatdan test toʻplami va har bir javobni baholash jadvali boʻyicha tekshirish. Buni boshqa model — LLM-hakam qila oladi. ${KLIK}</p>
<p>Birinchi versiya: 30 tadan 19 tasi toʻgʻri, 63 foiz. Xatolarni koʻramiz: 5 tasi format, 4 tasi ohang, 2 tasi fakt. Demak, T va K qatlamlarini tuzatish kerak. ${KLIK}</p>
<p>Ikkinchi versiya — 80 foiz. ${KLIK} Uchinchisi — 93 foiz.</p>
<p>Xulosa: <b>testsiz prompt — bu taxmin, test bilan — aniq oʻlchov</b>.</p>`,

  lab: `
<p>Endi hammasini jonli koʻramiz. Chapda — prompt, tepada — MAKTAB harflari, oʻngda — natija. ${KLIK}</p>
<p>Har bir klikda bitta qatlam qoʻshiladi: maqsad… ${KLIK} shartlar… ${KLIK} kontekst… ${KLIK} tartib… ${KLIK} aniq misol… ${KLIK} va baholash. Ball 12 dan 96 ga chiqdi.</p>
<p>${JONLI} «Claude’da ishga tushirish» tugmasi promptni shu zahoti modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, promptdagi mahsulotni almashtiring va natijani birga koʻring.</p>`,

  chain: `
<p>Birinchi qismning oxirgi gʻoyasi. Hamma narsani bitta ulkan promptga tiqish — koʻp uchraydigan xato: model bir vaqtda yigʻadi, tahlil qiladi, yozadi, tekshiradi — va hammasini yarim-yorti qiladi. ${KLIK}</p>
<p>Toʻgʻri yoʻl — <b>chain</b>: har bir qadam bitta vazifani bajaradi, qadamlar orasida aniq format — JSON. Ikkinchi qadamdan keyin — tekshiruv: sifat yetarli boʻlmasa, chain davom etmaydi. ${KLIK}</p>
<p>Afzalligi: xato qayerda ekani darhol koʻrinadi va har bir qadamni alohida test qilasiz. ${KLIK}</p>
<p>Endi eng qiziq joyi: bu chain’ga <b>qoʻl</b> qoʻshamiz.</p>`,

  act2: `
<p>Ikkinchi qism — <b>Tool Chaining</b>. Birinchi qismda modelga qanday fikrlashni oʻrgatdik. Endi unga qoʻl beramiz. ${KLIK}</p>`,

  hands: `
<p>Eng kuchli model ham uchta narsani qila olmaydi. ${PAUZA} Birinchisi — bilimi muzlatilgan: u oʻqitilgan sanadan keyingi voqealarni bilmaydi. Ikkinchisi — katta sonlar bilan hisobda adashadi. Uchinchisi va eng muhimi — dunyoda harakat qila olmaydi: xat yubora olmaydi, bazaga yoza olmaydi. ${KLIK}</p>
<p>Yechim — <b>tool</b>. Tool — modelning qoʻli. U uch qismdan iborat. ${KLIK}</p>
<p>Nomi — nima qilishini aytadi. ${KLIK} Tavsifi — qachon va qanday ishlatishni tushuntiradi. Eʼtibor bering: <b>tavsif ham prompt</b>! Model aynan shu matnni oʻqib qaror qiladi. ${KLIK}</p>
<p>Va parametrlar sxemasi — model tool’ni chaqirganda maʼlumotni aynan shu shaklda yuboradi.</p>`,

  flow: `
<p>Endi tool calling qanday ishlashini qadam-baqadam koʻramiz. Toʻrtta ishtirokchi bor: foydalanuvchi, sizning ilovangiz, Claude va tashqi tool. ${KLIK}</p>
<p>Foydalanuvchi soʻraydi: «Ertaga Samarqandda yomgʻir yogʻadimi?» ${KLIK} Ilova savolni tool’lar roʻyxati bilan birga Claude’ga yuboradi. ${KLIK}</p>
<p>Claude darhol javob bermaydi — u tool chaqirishni soʻraydi: get_weather, shahar — Samarqand. stop_reason: tool_use. ${KLIK}</p>
<p>Ilova haqiqiy API’ni chaqiradi. ${KLIK} Maʼlumot qaytadi: yomgʻir ehtimoli 70 foiz. ${KLIK} Ilova natijani tool_result sifatida Claude’ga qaytaradi. ${KLIK} Va faqat shundan keyin Claude foydalanuvchiga javob beradi. ${KLIK}</p>
<p>Eng muhim nuqta: <b>model tool’ni oʻzi ishga tushirmaydi</b>. U faqat soʻraydi — bajaradigan sizning kodingiz. Demak, nazorat ham sizda.</p>`,

  loop: `
<p>Agent nima? Formula oddiy: <b>model + tool’lar + sikl</b>. Chapdagi yetti qator — har qanday agentning yuragi. ${KLIK}</p>
<p>Oʻyla: model vazifani va tarixni koʻrib, keyingi qadamni tanlaydi. ${KLIK} Tool kerak boʻlmasa — tayyor, sikldan chiqamiz. ${KLIK} Aks holda tool’ni bajaramiz va natijani tarixga qoʻshamiz — bu «kuzatish». Va yana boshidan. ${KLIK}</p>
<p>Muhim: har bir agentda toʻxtash sharti boʻlishi shart — vazifa bajarildi, qadamlar limiti tugadi yoki inson tasdigʻi kerak.</p>`,

  patterns: `
<p>Barcha agent tizimlari oltita asosiy patterndan yigʻiladi. Bu roʻyxat Anthropic’ning «Building Effective Agents» maqolasidan olingan. ${KLIK}</p>
<p><b>Ketma-ket chain</b>: bir qadamning natijasi keyingi qadamga uzatiladi. Oraliqda tekshiruv sifatni nazorat qiladi. Misol: reja, keyin matn, keyin tarjima. ${KLIK}</p>
<p><b>Routing</b>: avval soʻrov turi aniqlanadi, keyin mos yoʻlga yuboriladi. Misol: yordam xizmati — savol, shikoyat, qaytarish. ${KLIK}</p>
<p><b>Parallel ishlash</b>: vazifa boʻlaklarga boʻlinadi yoki bir nechta model ovoz beradi. ${KLIK}</p>
<p><b>Bosh model va ishchilar</b>: bosh model vazifani oʻzi boʻladi va ishchilarga tarqatadi. ${KLIK}</p>
<p><b>Yozuvchi va tekshiruvchi</b>: biri yozadi, ikkinchisi tekshiradi — natija yaxshi boʻlguncha takrorlanadi. ${KLIK}</p>
<p><b>Avtonom agent</b>: reja, tool’lar va qachon toʻxtashni model oʻzi hal qiladi. ${KLIK}</p>
<p>Birinchi beshtasi — workflow: yoʻlni biz chizamiz. Oltinchisi — agent: yoʻlni model tanlaydi. Maslahat: oddiydan boshlang. Agent — birinchi emas, oxirgi chora.</p>`,

  assembly: `
<p>Endi agentni koʻz oldimizda yigʻamiz. Markazda — LLM, yaʼni miya. Hozircha u faqat matn oladi va matn qaytaradi. ${KLIK}</p>
<p><b>Tizim prompti</b> — agentning xarakteri: rol, maqsad, qoidalar. Birinchi qismdagi MAKTAB aynan shu yerda ishlaydi. ${KLIK}</p>
<p><b>Tool’lar</b> — oltita modul: tadbirlar, ob-havo, kalkulyator, valyuta, hisobot va xabar. Har birining nomi, tavsifi va sxemasi bor. ${KLIK}</p>
<p><b>Xotira</b>: qisqa muddatli — kontekst oynasi, uzoq muddatli — fayllar va baza. ${KLIK}</p>
<p>Va <b>sikl</b>: Oʻyla, Harakat qil, Kuzat. Shu sikl aylana boshlaganda tizim jonlanadi. ${KLIK}</p>
<p>Vazifa keldi: oktabrdagi AI tadbirlarini top, ob-havoni tekshir, eng mosini tanla va jamoaga xabar yubor. Qarang: agent rejani oʻzi tuzadi, ob-havoni uchta sana uchun parallel soʻraydi, hisobot tuzadi va yuboradi. ${KLIK}</p>
<p><b>Bu — agent.</b> Model + prompt + tool’lar + xotira + sikl.</p>
<p>${JONLI} «Toʻliq koʻrish» tugmasi butun sahnani 70 soniyada uzluksiz koʻrsatadi.</p>`,

  live: `
<p>Endi eng qiziq joyi: shu agent hozir jonli ishlaydi. Bu animatsiya emas — Claude tool’larni haqiqatan oʻzi tanlaydi va chaqiradi, har bir chaqiruv ekranda koʻrinadi. ${JONLI}</p>
<p>Birinchi vazifani ishga tushiraman. ${PAUZA} Oʻngda — trace: har bir tool_use va tool_result. Chapda — agent: paketlar tool’larga ketyapti va qaytyapti.</p>
<p>${SAVOL} Zaldan vazifa soʻrang: boshqa shahar yoki boshqa byudjet. «Oʻz vazifangiz» tugmasini bosing va yozing.</p>
<p>Internet boʻlmasa, xuddi shu tugma yozib olingan namoyishni koʻrsatadi — maʼruza toʻxtab qolmaydi.</p>
<p>Tool’lardagi maʼlumotlar demo, lekin qarorlar haqiqiy: qaysi tool’ni, qaysi tartibda chaqirishni model oʻzi hal qilyapti.</p>`,

  aci: `
<p>Agentning sifati koʻp jihatdan tool’lar tavsifiga bogʻliq. Chapda — yomon misol: «search», «qidiradi». Model nimani, qanday va qachon qidirishni bilmaydi. Oʻngda — yaxshi misol. ${KLIK}</p>
<p>Nom — aniq va prefiks bilan. ${KLIK} Tavsif — yangi xodimga tushuntirgandek: qachon ishlatish va qachon ishlatmaslik. ${KLIK} Xato matni ham nima qilishni aytishi kerak: model xatodan keyin nimani tuzatishni bilsin. ${KLIK} Tool’lar soni: 40 ta mayda emas, 8 ta aniq. ${KLIK} Va natija qisqa boʻlsin — har bir ortiqcha token kontekstni egallaydi.</p>`,

  mcp: `
<p>Endi integratsiya muammosi. Deylik, sizda uchta AI ilova va beshta servis bor. ${KLIK} Har birini alohida ulash — 15 ta integratsiya. Yangi servis qoʻshilsa — yana uchta. ${KLIK}</p>
<p><b>MCP — Model Context Protocol</b> buni hal qiladi: har bir servis bir marta MCP server sifatida yoziladi, har bir ilova MCP’ni bir marta qoʻllab-quvvatlaydi. 15 emas — 8. Xuddi USB-C kabi: bitta ulagich — istalgan qurilma. ${KLIK}</p>
<p>MCP server uch narsa beradi: tools — amallar, resources — maʼlumotlar va prompts — tayyor shablonlar. MCP’ni 2024-yil noyabrda Anthropic taqdim etgan, bugun u Linux Foundation tarkibidagi ochiq standart.</p>`,

  context: `
<p>Birinchi qismda promptni qanday yozishni gapirdik. Agentlarda yangi savol paydo boʻladi: model aynan nimani koʻradi? ${KLIK}</p>
<p>Kontekst oynasi — cheklangan ish stoli. Tizim prompti, tool’lar tavsifi, suhbat tarixi, hujjatlar, tool natijalari — hammasi shu stolga sigʻishi kerak. Uzun ishda stol toʻlib ketadi va sifat tushadi. ${KLIK}</p>
<p>Toʻrt usul bor. <b>Siqish</b> — eski tarix qisqa xulosaga aylanadi. <b>Kerak boʻlganda yuklash</b> — butun hujjat emas, faqat kerakli qism. <b>Subagentlar</b> — har biri toza kontekstda ishlaydi va faqat xulosa qaytaradi. <b>Skills</b> — agent avval faqat skill nomi va tavsifini koʻradi, kerak boʻlgandagina toʻliq ochadi. ${KLIK}</p>
<p>Qisqa qilib aytganda: prompt engineering — nima deyish. Context engineering — model nimani koʻrishi.</p>`,

  failures: `
<p>Oxirgi mavzu — ishonchlilik. Agent qayerda sinadi? ${KLIK}</p>
<p><b>Cheksiz sikl</b> — himoya: qadamlar limiti va byudjet. <b>Oʻylab topilgan parametrlar</b> — himoya: sxema tekshiruvi va tushunarli xato matni. ${KLIK}</p>
<p><b>Prompt injection</b> — eng xavflisi: tool qaytargan matn ichida yashirin buyruq boʻlishi mumkin. Qoida: tashqi matn — buyruq emas, maʼlumot; ruxsatlar esa minimal. <b>Notoʻgʻri tool tanlash</b> — aniq tavsif va kamroq tool. ${KLIK}</p>
<p><b>Qaytarib boʻlmaydigan harakatlar</b> — pul oʻtkazish, oʻchirish — faqat inson tasdigʻi bilan. <b>«Qora quti»</b> muammosi esa trace, log va testlar bilan hal qilinadi.</p>`,

  ecosystem: `
<p>Qisqacha asboblar xaritasi. Promptni sinash uchun — Claude Console yoki boshqa «playground»lar. Agent yozish uchun — SDK va freymvorklar: Claude Agent SDK, LangGraph, CrewAI va boshqalar.</p>
<p>Kod yozmasdan — n8n, Make, Dify. Kodlash agentlari — Claude Code, Cursor. Protokollar — MCP, A2A va Agent Skills. Va albatta, monitoring va test — Langfuse, LangSmith, Promptfoo. ${KLIK}</p>
<p>Qayerdan boshlash kerak? Claude Console’da prompt, n8n yoki Agent SDK’da chain, MCP bilan tool’lar va Langfuse bilan monitoring.</p>`,

  bonus: `
<p>Va sovgʻa: <b>sakkizta skill</b> — prompt engineering uchun. Skill — Claude’ga yangi mahorat qoʻshadigan papka. Oʻrnatasiz — va Claude MAKTAB boʻyicha prompt yozadi, promptni tekshiradi, test tuzadi, tool’lar tavsifini yozadi.</p>
<p>QR orqali yuklab olasiz. SKILL.md — ochiq standart, shuning uchun boshqa agentlar ham uni tushunadi.</p>
<p>${PAUZA} QR hali tayyor boʻlmasa: «havolani kanalda qoldiraman» deng.</p>`,

  meta: `
<p>Oxirgi misol. ${PAUZA} Bir savol: bu taqdimotni kim yigʻdi? ${KLIK}</p>
<p>Uni <b>AI agent</b> yigʻdi. Men vazifa qoʻydim, yoʻnaltirdim va natijani tekshirdim. ${KLIK}</p>
<p>Mana u qanday ishladi: faktlarni internetdan tekshirdi, reja tuzdi, kod yozdi, har bir slaydni skrinshot orqali oʻzi koʻrib chiqdi, videoni render qildi va nashr qildi. Bu — tool chaining amalda. ${KLIK}</p>
<p>Bugun gaplashgan hamma narsa — prompt logikasi, tool chaining, sikl — shu taqdimot ichida ishladi.</p>`,

  final: `
<p>Uchta fikrni olib keting. Birinchi: <b>prompt — bu dastur</b>; uni MAKTAB bilan yozing va test bilan oʻlchang.</p>
<p>Ikkinchi: <b>tool — modelning qoʻli</b>, uning tavsifi ham prompt.</p>
<p>Uchinchi: <b>oddiydan boshlang</b> — prompt, keyin chain, keyin workflow, va faqat kerak boʻlsa — agent.</p>
<p>Rahmat! Savollaringizni kutaman.</p>`,
};
