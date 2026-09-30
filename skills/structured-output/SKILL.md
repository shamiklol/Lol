---
name: structured-output
description: Designs a JSON Schema and the matching prompt so an LLM returns machine-readable output that code can parse reliably — extraction, classification, form filling, API responses, scoring. Use this whenever the output of a model will be read by code, stored in a database, sent to another step or tool, or when someone complains that "the JSON breaks", asks for a schema, structured outputs, function/tool arguments, or says "javob JSON bo'lsin", "maydonlarga ajrat", "нужен строгий JSON", "извлечь поля из текста".
---

# Structured output

When code consumes the answer, prose instructions like "return valid JSON" are not enough. The reliable path is a schema enforced by the API, plus a prompt that tells the model how to fill each field well.

## Workflow

1. **Model the data first.** From the task, list the fields the consumer really needs. For each: name (snake_case, English or consistent Uzbek), type, required or optional, allowed values (enum), units, and what to do when the value is absent in the input.
2. **Write the JSON Schema.**
   - Use `enum` for closed sets (status, category, sentiment) — free text there creates parsing branches.
   - Make fields `required` and allow `null` explicitly for "not found", rather than omitting keys; consumers then handle one shape.
   - Set `"additionalProperties": false` at every object level.
   - Add a `description` to each field — the model reads it as instruction.
   - Keep nesting shallow; split very large schemas into steps.
   - Add an `evidence` or `source_quote` field when faithfulness matters; it sharply reduces invented values.
3. **Pick the enforcement mechanism** and say it explicitly:
   - **Claude API structured outputs**: `output_config: { format: { type: "json_schema", schema: … } }` — the response is guaranteed to match the schema.
   - **Strict tool use**: define a tool whose `input_schema` is the schema and set `strict: true` on the tool.
   - Other providers: their JSON-schema / structured output mode.
   - No enforcement available: include the schema in the prompt, validate in code, and retry once with the validation error message.
4. **Write the prompt**: the task, the field-filling rules (especially for missing, ambiguous and multi-valued cases), and one short example of a correct object. Do not repeat the whole schema in prose if the API enforces it.
5. **Add a validator snippet** (JSON Schema validation in Python or JS) and one example of a correct and an incorrect object.

## Output format

Reply in the user's language. Deliver: (1) the field table (name, type, required, rule for missing); (2) the JSON Schema; (3) the prompt; (4) the API parameter snippet for the chosen mechanism; (5) the validator snippet; (6) 3 tricky test inputs (missing field, two candidate values, irrelevant text).

## Example field rule

`"delivery_date": {"type": ["string", "null"], "description": "Sana YYYY-MM-DD formatida. Matnda aniq sana boʻlmasa — null, taxmin qilma."}`
