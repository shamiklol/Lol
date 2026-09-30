---
name: prompt-chain-architect
description: Splits a complex LLM task into a chain or workflow of focused steps (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) with explicit data contracts and quality gates between steps, and says when a full agent is or is not justified. Use this whenever a single prompt is doing too much, results are mediocre on multi-part tasks, someone designs an n8n/Make/LangGraph/SDK pipeline, asks "how should I structure this workflow", or says "zanjir qur", "vazifani bosqichlarga bo'l", "workflow loyihala", "разбить задачу на шаги", "цепочка промптов".
---

# Prompt chain architect

Big prompts that collect, analyze, write and check at once do each part halfway. A chain gives every step one job, a clear input and output, and a checkpoint — so failures become visible and fixable.

## Workflow

1. **Understand the job end to end**: input, final output, who consumes it, volume, latency and cost limits, and what an unacceptable error looks like.
2. **Choose the simplest pattern that works** (from Anthropic's "Building Effective Agents"):
   - **Prompt chaining** — fixed sequence of steps with gates. Default choice.
   - **Routing** — classify first, then send to a specialized path.
   - **Parallelization** — independent sections at once, or several attempts that vote.
   - **Orchestrator–workers** — a lead model decides the subtasks dynamically.
   - **Evaluator–optimizer** — one step writes, another grades against criteria, loop until pass or max rounds.
   - **Autonomous agent** — the model chooses tools and steps in a loop. Recommend it only when the steps cannot be known in advance and errors are recoverable; otherwise a workflow is cheaper, faster and easier to debug. Say this explicitly.
3. **Define each step** with: name, single responsibility, model/effort suggestion (small fast model for classification and extraction, stronger model for reasoning and writing), input, output contract (JSON shape or tagged text), prompt skeleton, and failure behavior.
4. **Place gates** after steps whose errors would propagate: code checks (schema valid, required fields present, numbers in range) or an LLM check with explicit criteria. Each gate says what happens on fail: retry once with the error, route to a fallback, or stop and ask a human.
5. **Mark deterministic work** (math, lookups, formatting, dates) for code or tools, not the model.
6. **Estimate** calls per run and the slowest path, and note which steps can run in parallel.

## Output format

Reply in the user's language. Deliver:

1. **Pattern** — the chosen pattern and one sentence on why simpler/harder patterns were not chosen.
2. **Diagramma** — a Mermaid flowchart of the steps, gates and branches.
3. **Qadamlar jadvali** — step | vazifa | kirish | chiqish kontrakti | model/effort | xatoda nima qilinadi.
4. **Promptlar** — a compact prompt skeleton per step (goal, conditions, output format).
5. **Kontraktlar** — the JSON schema (or tag format) passed between steps.
6. **Tekshirish** — how to test each step alone, then the whole chain end to end.

## Principles

- One step, one job. If a step description needs "and", consider splitting it.
- Contracts between steps are the chain's API; keep them small and validated.
- Put a gate where a wrong intermediate result would be expensive downstream, not everywhere.
- Log every step's input and output — a chain you cannot trace, you cannot improve.
