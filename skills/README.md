# Shams.labs · Prompt muhandisligi uchun 8 ta skill

«Prompt Logic & AI Agent Tool Chaining» maʼruzasining bonus paketi. Har bir skill — Claude’ga yangi mahorat qoʻshadigan papka: `SKILL.md` (koʻrsatmalar) va kerak boʻlsa `references/` (qoʻshimcha materiallar).

Skill ichidagi koʻrsatmalar ingliz tilida yozilgan — model ularni eng aniq bajaradi. Javoblar esa siz yozgan tilda boʻladi: oʻzbekcha soʻrasangiz, oʻzbekcha javob olasiz.

| Skill | Nima qiladi | Qachon ishlatasiz |
|---|---|---|
| `maktab-prompt` | Xom soʻrovni MAKTAB freymvorki boʻyicha kuchli promptga aylantiradi | «Prompt yozib ber», «promptni kuchaytir» |
| `prompt-doctor` | Promptdagi xatoning sababini topadi va eng kichik tuzatishni taklif qiladi | Model koʻrsatmani «eshitmayapti», javoblar har xil |
| `prompt-evals` | Test toʻplami, rubrika, LLM-hakam va ishga tushirish rejasini tuzadi | Promptni oʻlchash, ikki versiyani solishtirish |
| `few-shot-studio` | Xilma-xil va chegaraviy misollar toʻplamini loyihalaydi | Misollar qoʻshish, formatni barqaror qilish |
| `structured-output` | JSON sxema va unga mos prompt, validator | Javobni kod oʻqiydi, JSON buziladi |
| `prompt-chain-architect` | Vazifani zanjir yoki ish oqimiga boʻladi: kontrakt va darvozalar bilan | n8n, LangGraph, SDK’da pipeline |
| `tool-contract-writer` | Agent uchun vosita nomi, tavsifi, sxemasi va xato matnlari | Tool calling, MCP server |
| `agent-system-prompt` | Agent tizim prompti: qoidalar, xavfsizlik, toʻxtash shartlari | Agent aylanib qoladi yoki xavfli harakat qiladi |

## Oʻrnatish

**Claude.ai / Claude Desktop.** `dist/` papkasidagi kerakli `.zip` faylni oching: sozlamalardagi *Skills* boʻlimida yangi skill sifatida yuklang. Keyin oddiy suhbatda vazifani yozing — Claude kerakli skillni oʻzi tanlaydi.

**Claude Code.** Papkani shaxsiy skillar joyiga nusxalang:

```bash
cp -r maktab-prompt ~/.claude/skills/
```

yoki faqat bitta loyiha uchun — loyiha ichidagi `.claude/skills/` papkasiga.

**Claude Agent SDK va API.** Skill papkalarini SDK hujjatlaridagi skills sozlamasi orqali ulang.

`SKILL.md` — ochiq standart (agentskills.io). Uni qoʻllab-quvvatlaydigan boshqa agentlar ham bu skillarni tushunadi.

## Tez sinov

```
maktab-prompt skilli bilan: Telegram kanalim uchun har kuni AI yangiliklari postini yozadigan prompt tuzib ber.
```

## Litsenziya

Erkin foydalaning va oʻzgartiring. Muallif: Shamsiddin · Shams.labs.
