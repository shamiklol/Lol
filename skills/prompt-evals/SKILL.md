---
name: prompt-evals
description: Builds an evaluation kit for a prompt or LLM feature — a test set of realistic cases, a scoring rubric, an LLM-as-judge prompt and a simple run/compare plan — so prompt changes are measured instead of guessed. Use this whenever someone wants to test, benchmark, compare two prompt versions, measure quality, "make sure the prompt works", prepare a prompt for production, or asks how to know if a change helped. Also triggers on "eval yozib ber", "promptni qanday tekshiraman", "test to'plami", "LLM hakam", "как проверить промпт", "сравнить две версии промпта".
---

# Prompt evals

A prompt without evals is a guess. This skill produces a small, honest evaluation kit that a person can run today — in a spreadsheet, a notebook, or a tool like Promptfoo, Langfuse or Braintrust.

## Workflow

1. **Pin down the task and "good".** From the prompt and the user's goal, write 3–6 success criteria. Each must be observable in a single output (e.g. "uses only prices from the catalog", "≤ 80 words", "asks for the order number when missing"). If you cannot state them, ask the user one question about what failure costs them most.
2. **Design the test set.** Aim for 20–50 cases; start with 15 if time is short. Mix:
   - ~50% typical real inputs (ask the user for real ones; synthesize only to fill gaps and mark them as synthetic),
   - ~30% hard cases (ambiguous, long, multilingual, conflicting data),
   - ~20% edge and adversarial cases (missing info, off-topic, prompt injection inside user data, empty input).
   Each case gets an id, input, the criteria it tests, and — where one exists — a reference answer or must-include facts.
3. **Choose the grader per criterion.** Prefer code checks (regex, JSON schema validation, length, exact match) — they are free and deterministic. Use an LLM judge only for qualities code cannot check (tone, faithfulness, helpfulness). Use a human spot-check on 10% of cases to calibrate the judge.
4. **Write the LLM-judge prompt** from `references/judge-template.md`: one criterion per call, a short rubric with anchored levels, evidence quoted from the output, and a pass/fail verdict in JSON. Grading one criterion at a time is far more reliable than one holistic score.
5. **Define the run plan**: run each case with the current prompt (v1), record scores, group failures by type, fix the prompt layer responsible, re-run everything (v2). Keep a held-out slice (~20%) you never tune on, so improvements are real and not overfitting.
6. **Deliver** the kit in the output format.

## Output format

Reply in the user's language. Deliver:

1. **Kriteriylar** — numbered success criteria with the grader type (kod / LLM-hakam / inson).
2. **Test toʻplami** — a table or JSONL block: `id, input, tests_criteria, expected_or_must_include, type (typical/hard/edge), synthetic (yes/no)`.
3. **LLM-hakam prompti** — ready to paste, one per subjective criterion.
4. **Kod tekshiruvlari** — short snippets (Python or JS) for the deterministic criteria.
5. **Ishga tushirish rejasi** — how to run v1, read results (pass rate per criterion, failure categories), iterate, and when to stop (e.g. held-out pass rate ≥ target, or no gain in two iterations).

## Principles

- Measure per criterion; an average score hides which layer of the prompt is broken.
- Failure categories map to fixes: format failures → structure/schema; tone → context/examples; facts → grounding rules; edge cases → missing "if/otherwise" branches.
- Re-run the whole set after every change; fixing one case often breaks another.
- Report uncertainty honestly: with 20 cases, a 5-point difference can be noise.
