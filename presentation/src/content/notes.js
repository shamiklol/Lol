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
<p><b>Model bir xil edi. Mantiq boshqa edi.</b> Bugungi maʼruzaning asosiy gʻoyasi shu.</p>
<p>${JONLI} Internet boʻlsa, «Jonli sinash» tugmasini bosing: ikkala prompt shu zahoti Claude’ga ketadi va javoblar ekranda yoziladi.</p>`,

  route: `
<p>Yoʻlimiz besh bekatdan iborat. Avval model matnni qanday oʻqishini koʻramiz. Keyin promptni dastur kabi yozishni oʻrganamiz — buning uchun <b>MAKTAB</b> degan freymvork bor.</p>
<p>Soʻng katta vazifani zanjirga boʻlamiz, modelga vositalar beramiz va oxirida jonli agent yigʻamiz.</p>
<p>Pastdagi chiziq butun maʼruza davomida qayerda ekanimizni koʻrsatib turadi. Oxirida sizni 8 ta bonus skill kutyapti. ${KLIK}</p>`,

  act1: `
<p>Birinchi qism — <b>Prompt Logic</b>. Avval model qanday oʻqishini koʻramiz, keyin — qanday yozishimiz kerakligini. ${KLIK}</p>`,

  tokens: `
<p>Model matnni biz kabi soʻzma-soʻz oʻqimaydi. U matnni <b>tokenlarga</b> — mayda boʻlaklarga boʻladi. Ekranda haqiqiy tokenizator: har bir rangli boʻlak — bitta token, ostidagi raqam — uning ID raqami.</p>
<p>Oʻzbekcha va inglizcha gapni solishtiring: maʼnosi bir xil, lekin oʻzbekchasi ikki baravardan koʻproq token oladi. ${KLIK}</p>
<p>Amaliy xulosa: oʻzbek tilida ishlaganda kontekst tezroq toʻladi va narx oshadi. Uzun hujjatlar bilan ishlaganda buni hisobga oling. ${KLIK}</p>
<p>Ikkinchi xulosa: model har safar keyingi tokenni ehtimollik boʻyicha tanlaydi. Prompt — shu ehtimollarni boshqarish vositasi. Teglar va sarlavhalar esa model uchun aniq chegaralar boʻladi.</p>
<p>${JONLI} Zaldan bitta gap soʻrang va shu yerning oʻzida yozib koʻrsating.</p>`,

  program: `
<p>Endi asosiy gʻoya: <b>prompt — bu tabiiy tildagi dastur</b>. Chapda — oddiy kod, oʻngda — xuddi shu mantiq, faqat oʻzbek tilida. ${KLIK}</p>
<p>Oʻzgaruvchi: kodda «const mijoz», promptda «Mijoz ismi». Shablon — bitta prompt, minglab mijoz. ${KLIK}</p>
<p>Shart: «if» — promptda «Agar». ${KLIK} Sikl: «for» — «Har bir sharh uchun». ${KLIK} Funksiya — aniq qadamlar. ${KLIK} Natija — «return», yaʼni javob formati. ${KLIK}</p>
<p>Xulosa: <b>model — interpretator, siz — dasturchi</b>. Koddagi xato kabi, promptdagi noaniqlik ham xatoga olib keladi.</p>`,

  maktab: `
<p>Endi kuchli promptni qanday yigʻishni koʻramiz. Ekranda oddiy prompt: onlayn doʻkon yordam xizmati mijoz shikoyatiga javob yozadi. Bir qarashda — oddiy matn. ${KLIK}</p>
<p>Lekin uni qatlamlarga ajratsak, oltita qatlam chiqadi. Men buni <b>MAKTAB</b> deb nomladim. ${KLIK}</p>
<p><b>M — Maqsad</b>: nima kerak va nima uchun. «Mijoz bizda qolsin» — bu modelga qaror qabul qilish uchun yoʻnalish beradi.</p>
<p><b>A — Agar</b>: shartlar va cheklovlar. «Chegirma 10% dan oshmasin» — busiz model saxiylik qilib yuboradi.</p>
<p><b>K — Kontekst</b>: kim gapiryapti, kim bilan, qanday vaziyatda. <b>T — Tuzilma</b>: javob formati va hajmi.</p>
<p><b>A — Andoza</b>: namuna. Bitta misol ohangni oʻnta qoidadan yaxshiroq tushuntiradi. <b>B — Baholash</b>: model javobni yuborishdan oldin oʻzini tekshiradi.</p>
<p>${SAVOL} Oxirgi yozgan promptingizni eslang — undan qaysi harflar tushib qolgan edi?</p>`,

  agar: `
<p>MAKTAB’dagi eng muhim harf — A, yaʼni <b>«Agar»</b>. Bu — Prompt Logic’ning yuragi. ${KLIK}</p>
<p>Birinchi qoida: maʼlumot yetarli boʻlmasa — taxmin qilma, soʻra. Shu bitta qator gallyutsinatsiyalarning katta qismini yoʻqotadi. ${KLIK}</p>
<p>Keyin tasniflash: qaytarish soʻrovi — muddatiga qarab ikki xil yoʻl. ${KLIK} Texnik muammo — aniqlovchi savollar. ${KLIK} Va eng muhimi — «aks holda». ${KLIK}</p>
<p>Qoida oddiy: <b>har bir «agar»ning «aks holda»si boʻlsin</b>. Ochiq qolgan shox — gallyutsinatsiyaga eshik. Model qayerga borishni bilmasa, yoʻlni oʻzi oʻylab topadi.</p>`,

  tuzilma: `
<p><b>T — Tuzilma</b>. Uning ikki tomoni bor: kirish va chiqish. Kirishda XML teglardan foydalanamiz: hujjat alohida, qoidalar alohida, savol alohida. Model qayerda maʼlumot, qayerda buyruq ekanini aniq koʻradi.</p>
<p>Uzun hujjatni tepaga, savolni oxiriga qoʻying — bu sifatni sezilarli oshiradi. ${KLIK}</p>
<p>Chiqishda — JSON sxema. Modeldan erkin matn emas, aniq maydonlar soʻraymiz: javob, iqtibos, ishonch darajasi. ${KLIK}</p>
<p>Mana javob: sxemaga toʻliq mos. Bunday javobni kod oʻqiy oladi — bu esa keyingi qismga, vositalar va agentlarga koʻprik. ${KLIK}</p>
<p>Claude’da <b>structured outputs</b> rejimi bor: javob sxemaga qatʼiy mos keladi.</p>`,

  andoza: `
<p><b>A — Andoza</b>, yaʼni misollar. Oʻngdagi nishonga qarang: har bir nuqta — modelning bitta javobi. Misolsiz javoblar tarqoq: har safar boshqa uzunlik, boshqa ohang. ${KLIK}</p>
<p>Uchta xilma-xil misol qoʻshdik — javoblar nishonga yigʻildi.</p>
<p>Lekin ehtiyot boʻling: model misoldagi hamma narsani koʻchiradi. Misolingiz uch qator boʻlsa — javob ham uch qator. Misolda xato boʻlsa — xato ham koʻchadi. Shuning uchun misol tanlashga qoida yozishdan koʻra koʻproq vaqt ajrating.</p>`,

  fikrlash: `
<p>2026-yildagi katta oʻzgarish — <b>fikrlovchi modellar</b>. Ilgari «qadam-baqadam oʻyla» deb, har bir qadamni yozib berardik. ${PAUZA}</p>
<p>Bugungi modellar ichida oʻzi fikrlaydi va buni bizdan yaxshiroq rejalashtiradi. Shuning uchun endi qadamni emas, maqsadni beramiz: nima kerak, qanday mezon bilan, qanday cheklov bilan. Bitta qator qoʻshsak kifoya: «javobdan oldin raqamlarni manba bilan solishtir». ${KLIK}</p>
<p>Qancha fikrlashni <b>effort</b> parametri bilan boshqaramiz. Oddiy vazifaga — low: tez va arzon. Murakkab tahlilga — high yoki max. Hamma narsaga max qoʻyish — vaqt va pulni behuda sarflash.</p>`,

  baholash: `
<p><b>B — Baholash</b>. Bu yerda koʻpchilik adashadi: promptni yozadi, ikki-uch marta sinaydi va «ishlayapti» deydi. Bu — taxmin, oʻlchov emas.</p>
<p>Toʻgʻri jarayon: 30 ta real holatdan test toʻplami va har bir javobni rubrika boʻyicha baholash. Buni boshqa model — LLM-hakam qila oladi. ${KLIK}</p>
<p>Birinchi versiya: 30 tadan 19 tasi toʻgʻri, 63 foiz. Xatolarni koʻramiz: 5 tasi format, 4 tasi ohang, 2 tasi fakt. Demak, T va K qatlamlarini tuzatish kerak. ${KLIK}</p>
<p>Ikkinchi versiya — 80 foiz. ${KLIK} Uchinchisi — 93 foiz.</p>
<p>Xulosa: <b>evalsiz prompt — bu taxmin, eval bilan — muhandislik</b>.</p>`,

  lab: `
<p>Endi hammasini jonli koʻramiz. Chapda — prompt, tepada — MAKTAB harflari, oʻngda — natija. ${KLIK}</p>
<p>Har bir klikda bitta qatlam qoʻshiladi: maqsad… ${KLIK} shartlar… ${KLIK} kontekst… ${KLIK} tuzilma… ${KLIK} andoza… ${KLIK} va baholash. Ball 12 dan 96 ga chiqdi.</p>
<p>${JONLI} «Claude’da ishga tushirish» tugmasi promptni shu zahoti modelga yuboradi. Zaldan biror mahsulot nomini soʻrang, promptdagi mahsulotni almashtiring va natijani birga koʻring.</p>`,

  chain: `
<p>Birinchi qismning oxirgi gʻoyasi. Hamma narsani bitta ulkan promptga tiqish — koʻp uchraydigan xato: model bir vaqtda yigʻadi, tahlil qiladi, yozadi, tekshiradi — va hammasini yarim-yorti qiladi. ${KLIK}</p>
<p>Toʻgʻri yoʻl — <b>zanjir</b>: har bir halqa bitta vazifani bajaradi, halqalar orasida aniq format — JSON. Ikkinchi halqadan keyin — darvoza: sifat yetarli boʻlmasa, zanjir davom etmaydi. ${KLIK}</p>
<p>Afzalligi: xato qayerda ekani darhol koʻrinadi va har bir halqani alohida test qilasiz. ${KLIK}</p>
<p>Endi eng qiziq joyi: bu zanjirga <b>qoʻl</b> qoʻshamiz.</p>`,
};
