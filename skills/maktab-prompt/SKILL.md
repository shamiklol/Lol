---
name: maktab-prompt
description: Turns a rough request into a production-grade prompt using the MAKTAB framework (Maqsad/goal, Agar/conditions, Kontekst/context, Tartib/format, Aniq misol/examples, Baholash/self-check). Use this whenever someone asks to write, draft, improve or "make better" a prompt, system prompt or instructions for any LLM (Claude, ChatGPT, Gemini), or pastes a one-line request and wants reliable output from a model — even if they never say "prompt engineering". Also triggers on Uzbek and Russian requests such as "prompt yozib ber", "promptni kuchaytir", "MAKTAB bo'yicha", "напиши промпт", "улучши промпт".
---

# MAKTAB prompt architect

MAKTAB is a six-layer checklist for prompts that behave the same way every time. Each letter answers one question the model would otherwise have to guess:

| Letter | Layer | Question it answers |
|---|---|---|
| **M** | Maqsad — goal | What outcome is needed, and why does it matter? |
| **A** | Agar — conditions | What must happen *if* X? What are the limits, exceptions, fallbacks? |
| **K** | Kontekst — context | Who is speaking, to whom, in which situation, with what data? |
| **T** | Tartib — format | What exact shape, length and format should the answer have? |
| **A** | Aniq misol — examples | What does a great answer look like (and a tricky edge case)? |
| **B** | Baholash — self-check | How does the model verify its answer before returning it? |

A model fills every gap you leave with the most average guess. MAKTAB closes the gaps that cause most failures, so write each layer only as long as it needs to be.

## Workflow

1. **Read the request and find the job.** Identify the task, the audience of the output, where the output will be used (chat, API, pipeline) and the target model if named.
2. **Ask only what blocks you.** If the goal, the audience or a hard constraint is truly unknown and cannot be reasonably assumed, ask up to 3 short questions in one message. Otherwise make sensible assumptions and list them at the end so the user can correct them.
3. **Draft layer by layer** (see "Writing each layer" below).
4. **Assemble** the final prompt with XML tags (one tag per layer) — tags give the model unambiguous boundaries between instructions, data and examples. Put long reference data first and the task and question last; models answer long-context tasks noticeably better that way.
5. **Self-review** the draft against `references/checklist.md` and fix what fails.
6. **Deliver** in the output format below.

## Writing each layer

- **Maqsad.** One or two sentences: the outcome plus the reason. The reason matters because it lets the model make good judgment calls in cases you did not foresee ("…so the customer stays with us" changes tone and decisions).
- **Agar.** Write explicit branches: `Agar <condition> → <action>`. Every branch needs an "otherwise" (`Aks holda`) — an open branch is where models improvise. Always include the missing-information branch: *if data is insufficient, do not guess; ask or say so.* State numeric limits as numbers.
- **Kontekst.** Role (only if it adds real expertise or voice), audience, situation, and the data the model needs. Put documents inside their own tags (`<hujjat>`, `<document>`).
- **Tartib.** Exact format: sections, order, length in words or items, language, whether to use Markdown, JSON shape if machine-read. If code will parse the answer, recommend structured outputs / a JSON schema instead of prose instructions (see the `structured-output` skill).
- **Aniq misol.** 1–3 short examples inside `<misol>`/`<example>` tags, deliberately varied (typical, hard, edge case). Models copy everything in an example — length, tone and mistakes — so make them exactly what you want. Skip this layer when examples would over-constrain creative work, and say so.
- **Baholash.** 2–4 concrete checks the model runs before answering ("numbers match the context", "no promise we cannot keep", "under 80 words"). Criteria, not vague "double-check your work".

## Modern-model guidance

- Reasoning models plan well on their own. Give the goal, the criteria and the constraints instead of micromanaging steps ("first do X, then Y"). Add explicit steps only when the order is a business rule.
- Be direct and calm. Capitalised warnings and "CRITICAL!!!" tend to cause over-application; a plain sentence with the reason works better.
- Say what to do rather than only what not to do ("write in flowing paragraphs" beats "don't use bullet points").
- Prefilling assistant messages is not available on current Claude models — use format instructions or structured outputs.

## Output format

Reply in the user's language (Uzbek Latin with oʻ/gʻ and ʼ when they write Uzbek). Use this structure:

```
## Tayyor prompt            (or "Ready prompt" / "Готовый промпт")
<the full prompt in a single code block, ready to paste>

## MAKTAB xaritasi
M — … (one line: what this layer does in this prompt)
A — …
K — …
T — …
A — …
B — …

## Taxminlar                (assumptions you made — only if any)
- …

## Sinab koʻring            (2–3 test inputs, incl. one edge case, to try the prompt with)
```

Keep variable parts as `{{placeholders}}` when the prompt is a template used many times.

## Example

**Input:** "Mijozlarga javob beradigan bot uchun prompt kerak, onlayn kiyim doʻkoni."

**Output (abridged):**

```xml
<maqsad>
Mijozning savoliga 1 ta xabarda aniq javob ber — maqsad: mijoz buyurtma bersin yoki muammosi hal boʻlsin.
</maqsad>
<kontekst>
Sen «{{dokon_nomi}}» onlayn kiyim doʻkonining yordam xizmatisan. Mijozlar Telegram orqali yozadi.
<siyosat>{{qaytarish_va_yetkazish_qoidalari}}</siyosat>
</kontekst>
<shartlar>
Agar savol oʻlcham haqida boʻlsa → oʻlchamlar jadvalidan javob ber va boʻyini soʻra.
Agar qaytarish soʻralsa va xarid 14 kundan kam boʻlsa → qaytarish tartibini yubor.
Agar 14 kundan oshgan boʻlsa → xushmuomala rad et va almashtirishni taklif qil.
Agar kerakli maʼlumot <siyosat>da boʻlmasa → oʻylab topma: «Operatorga ulayman» deb yoz.
Aks holda → qisqa javob ber va bitta savol berib aniqlashtir.
</shartlar>
<tartib>Oʻzbek tilida, 60 soʻzgacha, 1 ta emoji ruxsat. Oxirida bitta keyingi qadam.</tartib>
<misollar>…</misollar>
<tekshiruv>Yuborishdan oldin: narx va muddatlar <siyosat> bilan mosmi? Vaʼda berilmaganmi?</tekshiruv>
```
