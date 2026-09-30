# MAKTAB self-review checklist

Run through this before delivering a prompt. Fix every "no".

## Maqsad (goal)
- Does the prompt state the outcome, not just the activity? ("reply so the customer stays" vs "reply")
- Is the reason for the task given, so the model can handle unforeseen cases?

## Agar (conditions)
- Is every `if` paired with an `otherwise`?
- Is there an explicit rule for missing or contradictory information (ask / say so / hand off)?
- Are limits stated as numbers (words, items, %, currency)?
- Do any two rules contradict each other? (e.g. "be brief" + "explain every step")

## Kontekst (context)
- Would a smart new colleague understand the situation from the prompt alone?
- Is the audience of the output named?
- Is reference data wrapped in its own tags and placed before the question?
- Is a role given only where it adds expertise or voice?

## Tartib (format)
- Is the output shape unambiguous: sections, order, length, language, formatting?
- If software parses the output, is a JSON schema / structured output recommended?

## Aniq misol (examples)
- Are examples varied (typical, hard, edge case) rather than three near-copies?
- Would you be happy if the model copied the example's length and tone exactly?
- Are examples fenced in tags so they are not mistaken for instructions?

## Baholash (self-check)
- Are the checks concrete and verifiable, not "make sure it's good"?
- Do the checks target the failures this task actually has?

## Style
- No shouting (ALL CAPS, "CRITICAL", "!!!") — reasons instead.
- Instructions say what to do, not only what to avoid.
- No leftover template noise, duplicated rules or contradictory tone words.
- `{{placeholders}}` for anything that changes between runs.
