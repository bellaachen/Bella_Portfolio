# Story Writer — a Claude skill for dev-ready user stories

Story Writer turns a short requirement brief into a user story that engineering can pick up: **Ready for Grooming** at minimum, ideally **Ready for Dev**.

I built it to encode how I review my own requirements. A raw brief usually only describes the happy path. The skill is instructed to think like a senior PM and fill in what the brief leaves out:

- limits and conflicts (the 11th item when the maximum is 10, duplicates, a group that drops to one member)
- every state: loading, empty, error, permission denied
- the exact copy for every toast, prompt and dialog
- open questions addressed to a named role, instead of guesses

The output is plain Markdown with three core sections (Background, User Flow, Acceptance Criteria) that pastes straight into Jira or Notion.

## How I use it

1. I write the brief myself: product, requirement, background, and my own notes on the intended behaviour.
2. The skill drafts the story and states whether it reaches Ready for Grooming or Ready for Dev.
3. I review every rule and open question, correct what doesn't match the real system, and take the open questions to Design or Engineering.

The judgment stays with me; the skill makes sure nothing obvious is missed and the format is consistent.

## Brief format

```
skill: Story Writer

Product:
<the product or platform>

Requirement:
<the feature being requested>

Background:
<why: the user or business reason>

Notes:
<constraints, rules, specific behaviours>
```

Briefs can be written in English or Chinese; the story is written in the same language, with English section headers.

## Install

Upload the `story-writer` folder to Claude as a custom skill, or place it in your Claude Code skills directory. The full instructions and a worked example are in [`SKILL.md`](SKILL.md).

---

Part of [Bella Chen's product portfolio](https://bellaachen.github.io/Bella_Portfolio/). No company data is included; the worked example uses a generic trading-platform feature.
