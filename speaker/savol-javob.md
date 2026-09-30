# Savol-javobga tayyorgarlik

Mutaxassislar auditoriyasi beradigan ehtimoliy savollar va qisqa, aniq javoblar. Har bir javob 30–40 soniyaga moʻljallangan.

---

**1. MAKTAB CO-STAR yoki RISEN kabi freymvorklardan nimasi bilan farq qiladi?**

Koʻpchilik freymvorklar rol va formatga eʼtibor beradi. MAKTAB’da ikkita qatlam alohida turadi: **Agar** — promptdagi mantiq, yaʼni shartlar va «aks holda» yoʻllari, hamda **Baholash** — model javobni yuborishdan oldin oʻzini tekshirishi. Bu shablon emas, nazorat roʻyxati: har bir harf model taxmin qilishi kerak boʻlgan bitta boʻshliqni yopadi.

**2. Fikrlovchi modellarda «qadam-baqadam oʻyla» endi umuman kerak emasmi?**

Kichik yoki tez modellarda, shuningdek fikrlash jarayonini koʻrish kerak boʻlganda hali ham foydali. Fikrlovchi modellarda esa maqsad, mezon va cheklovni bergan maʼqul: rejani model oʻzi yaxshiroq tuzadi. Qancha oʻylashini effort parametri bilan boshqaramiz.

**3. Promptni oʻzbekcha yozgan yaxshimi yoki inglizcha?**

Koʻrsatmalarni inglizcha yozish odatda biroz aniqroq va token jihatidan arzonroq, javobni esa oʻzbekcha soʻrash mumkin. Lekin oʻzbekcha uslub va ohang muhim boʻlsa, oʻzbekcha misollar bering. Eng toʻgʻri yoʻl — ikkala variantni bitta eval toʻplamida solishtirish.

**4. Agent va workflow farqi nimada? Qachon agent kerak?**

Workflow’da yoʻlni biz chizamiz: qadamlar oldindan maʼlum. Agentda yoʻlni model tanlaydi. Agent qadamlarni oldindan aytib boʻlmaganda va xatoni tuzatish mumkin boʻlganda kerak. Boshqa hollarda workflow arzonroq, tezroq va nosozlikni topish osonroq.

**5. Prompt injection’dan toʻliq himoya bormi?**

Yuz foizlik himoya yoʻq, shuning uchun himoya qatlamma-qatlam quriladi: maʼlumot va koʻrsatmani teglar bilan ajratish, «tashqi matn — buyruq emas» qoidasi, minimal ruxsatlar, qaytarib boʻlmaydigan harakatlar uchun inson tasdigʻi, natijani tekshirish va monitoring.

**6. MCP xavfsizmi?**

MCP server — ruxsatga ega kod. Shuning uchun faqat ishonchli serverlarni ulang, tokenlarga minimal huquq bering, vositalar tavsifini koʻrib chiqing va xavfli amallarni tasdiq bilan bajaring. Protokol xavfsiz boʻlishi mumkin, lekin har bir server — alohida ishonch qarori.

**7. Qaysi modeldan boshlash kerak?**

Avval eng kuchli model bilan sifat shiftini oʻlchang, eval toʻplamini yigʻing. Keyin xuddi shu toʻplamda arzonroq yoki tezroq modellarni sinab koʻring: sifat saqlansa — pul tejaysiz.

**8. Eval uchun nechta test yetarli?**

20–50 ta real holatdan boshlang, eng qiyinlarini ham qoʻshing. Vaqt boʻlmasa 15 tadan boshlab, har bir yangi xatoni toʻplamga qoʻshib boring. 20 ta testda 5 foizlik farq tasodif boʻlishi mumkin — buni hisobga oling.

**9. n8n yoki kod — nimani tanlash kerak?**

n8n tez integratsiya, prototip va dasturchi boʻlmagan jamoalar uchun zoʻr. Murakkab mantiq, test, versiyalash va katta hajm kerak boʻlsa — kod va SDK. Koʻp jamoalar ikkalasini birga ishlatadi.

**10. Kontekst oynasi 1 million token boʻlsa, hamma narsani joylash mumkinmi?**

Mumkin, lekin sifat va narx yomonlashadi. Koʻproq kontekst emas, toʻgʻri kontekst yutadi: kerakli qismni yuklash, eski tarixni siqish, katta vazifani subagentlarga boʻlish.

**11. Skill va MCP farqi nima?**

MCP — ulanish: modelga vositalar va maʼlumotlarga yoʻl beradi. Skill — bilim va tartib: qanday ishlashni oʻrgatadigan koʻrsatmalar va skriptlar. Qoʻl va koʻnikma. Odatda ikkalasi birga ishlaydi.

**12. Gallyutsinatsiyani qanday kamaytirish mumkin?**

Javobni berilgan maʼlumotga bogʻlash, «bilmayman» yoʻlini aniq yozish, manbadan iqtibos talab qilish, structured outputs’da `evidence` maydoni va eng muhimi — eval bilan oʻlchab borish.

**13. Narxni qanday nazorat qilaman?**

Prompt caching, oddiy qadamlar uchun kichik modellar, effort darajasi, agent uchun qadamlar limiti. Va bitta soʻrov narxini emas, bitta bajarilgan vazifa narxini oʻlchang.

**14. Taqdimotni agent yigʻgan boʻlsa, sizning rolingiz nima edi?**

Aynan bugun gapirgan narsalar: vazifani aniq qoʻyish, yoʻnaltirish, sifat mezonlarini belgilash va natijani tekshirish. Agent — ijrochi, maqsad va javobgarlik — insonda.
