---
name: prompt-doctor
description: Diagnoses why a prompt produces bad, inconsistent or off-target results and prescribes the smallest fix. Use this whenever someone pastes a prompt together with a disappointing model answer, says the model "ignores instructions", "hallucinates", "is too long/too short", "answers differently every time", "breaks the JSON", or asks to review, audit, debug or critique a prompt or system prompt. Also triggers on Uzbek/Russian phrasing like "promptim ishlamayapti", "nega model bunday javob beryapti", "promptni tekshirib ber", "почему модель так отвечает", "разбери мой промпт".
---

# Prompt doctor

Treat a failing prompt like a bug report: reproduce, find the root cause, apply the minimal fix, and say how to verify it. Rewriting everything from scratch hides the cause and often breaks what already worked.

## Workflow

1. **Collect the evidence.** You need the prompt, at least one bad output, and what "good" would have looked like. If the bad output or the expected result is missing, ask for it in one short message — diagnosis without evidence is guessing. If the user cannot provide it, proceed but label findings as hypotheses.
2. **Name the symptom** precisely (e.g. "adds facts not in the document", "ignores the 80-word limit in 3 of 5 runs").
3. **Find the root cause** using `references/failure-modes.md`. Quote the exact lines of the prompt responsible. Common culprits: contradictory instructions, missing "otherwise" branch, an example that teaches the wrong length or tone, data and instructions mixed without tags, the question buried above a long document, format requested in prose while code parses it, vague success criteria, over-emphasis (ALL CAPS) causing over-application.
4. **Prescribe the minimal fix**: the smallest set of edits that removes the cause. Show them as a before/after diff.
5. **Give a verification plan**: 3–5 test inputs (include the failing one and an edge case) and what a passing answer must contain. If the prompt runs at scale, recommend turning these into an eval (see the `prompt-evals` skill).
6. **Offer the full corrected prompt** at the end in a single code block.

## Severity

Rate each finding: **kritik** (causes wrong or unsafe output), **muhim** (causes inconsistency), **kosmetik** (style, tokens). Fix kritik first; do not bury the real cause under ten cosmetic notes.

## Output format

Reply in the user's language (Uzbek Latin with oʻ/gʻ when they write Uzbek):

```
## Tashxis
Belgi: <symptom>
Sabab: <root cause> — "<quoted line from the prompt>"

## Topilmalar
1. [kritik] … → tuzatish: …
2. [muhim] …

## Tuzatish (diff)
- eski qator
+ yangi qator

## Tekshirish rejasi
| Kirish | Yaxshi javobda boʻlishi shart |
|---|---|

## Tuzatilgan prompt
<full prompt>
```

## Things to keep in mind

- A model that "ignores" an instruction usually received two instructions that conflict, or an example that contradicts the rule. Look for the conflict before adding more emphasis.
- Hallucinations shrink most when the prompt says what to do when information is missing and requires quoting sources from the provided data.
- Inconsistent length or tone is usually an example or format problem, not a model problem.
- On reasoning models, over-specified step lists can make answers worse; replacing steps with goals and criteria is a legitimate fix.
- If the prompt is fine and the task is simply beyond one call, say so and suggest a chain (see `prompt-chain-architect`).
