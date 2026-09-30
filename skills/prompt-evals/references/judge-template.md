# LLM-as-judge template (one criterion per call)

```xml
<task>
You are grading one output of an AI assistant against a single criterion.
Judge only this criterion; ignore everything else about the output.
</task>

<criterion>
{{criterion_name}}: {{criterion_definition}}
</criterion>

<rubric>
pass — {{what clearly satisfies the criterion}}
fail — {{what clearly violates it}}
If the output is borderline, decide by the stricter reading and explain why.
</rubric>

<context>
{{input given to the assistant, and reference data or expected facts if any}}
</context>

<output_to_grade>
{{assistant_output}}
</output_to_grade>

<instructions>
1. Quote the parts of the output that are relevant to the criterion.
2. Compare them with the rubric.
3. Return only this JSON:
{"criterion": "{{criterion_name}}", "evidence": ["…quote…"], "reasoning": "…", "verdict": "pass" | "fail"}
</instructions>
```

## Calibration

- Grade 10–20 outputs yourself first, then run the judge on the same outputs.
- If agreement is below ~85%, sharpen the rubric wording (add an example of pass and fail) and re-check.
- Use a strong model as judge and keep the judge prompt fixed while you iterate on the product prompt — otherwise you are moving the ruler and the object at the same time.
