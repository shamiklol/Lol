---
name: few-shot-studio
description: Designs the example set (few-shot examples) for a prompt — varied, balanced, edge-case aware and wrapped in tags — so the model copies the right style and format without copying the wrong things. Use this whenever someone wants to add examples to a prompt, asks why the model copies an example too literally, needs consistent tone/format across outputs, builds a classifier or extractor prompt, or wants "misollar", "namunalar", "примеры для промпта", "few-shot", "one-shot" — even if they only say the answers are inconsistent.
---

# Few-shot studio

Examples are the strongest signal in a prompt: models reproduce their length, tone, structure and even their mistakes. One good example often beats ten rules. This skill builds a small, deliberate set.

## Workflow

1. **Clarify what examples must teach** — format, tone, reasoning pattern, labeling boundaries, or all of these. Examples are not for teaching facts.
2. **Map the input space.** List the dimensions along which real inputs vary (length, language, topic, sentiment, difficulty, missing fields). The set should cover these dimensions, not repeat the most common case.
3. **Pick 3–5 examples** (1–2 for creative tasks, up to ~8 for fine-grained classification):
   - one typical case,
   - one hard or ambiguous case, showing how to resolve ambiguity,
   - one edge case (missing info, off-topic, refusal-worthy) showing the fallback behavior,
   - for classifiers: at least one example per label, and near-boundary pairs that look alike but get different labels.
4. **Write the outputs as the ideal answer**, exactly the length and tone you want in production. Check each example against every rule in the prompt; an example that breaks a rule silently overrides it.
5. **Package** examples in tags, separated from instructions, with a one-line note on what they illustrate:

```xml
<misollar>
Quyidagi misollar uslub va formatni koʻrsatadi, mazmunni emas.
<misol>
<kirish>…</kirish>
<javob>…</javob>
</misol>
…
</misollar>
```

6. **Rotate and check.** Suggest testing with the examples in a different order and with one removed; if results swing a lot, the set is unbalanced.

## Output format

Reply in the user's language. Deliver: (1) a short coverage table — example → which dimension/label/edge it covers; (2) the ready `<misollar>` block; (3) a note on what each example is protecting against; (4) 2–3 test inputs that are *not* like any example, to check generalization.

## Pitfalls to avoid

- Near-duplicate examples → the model overfits their surface form.
- Always the same answer length → every answer becomes that length.
- Label imbalance in classification examples → the model leans to the majority label.
- Examples containing real personal data → replace with realistic fictional data.
- Examples placed inside the instructions without tags → the model may treat them as instructions or data to answer.
