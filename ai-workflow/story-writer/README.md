# Story Writer: a Claude skill for traceable, Jira-ready user stories

Story Writer turns product requirements, Slack discussions, meeting notes, customer feedback or feature ideas into user stories that Design, Engineering, QA and business stakeholders can review and act on.

## The idea behind it

AI is very good at making a story *look* complete. That is exactly the risk: a confident, well-formatted story can quietly contain limits, error messages or business rules that nobody actually decided.

So this skill is built around one rule: **add structure, not decisions.**

- **Separate what is confirmed from what is assumed.** Every requirement traces back to the source material. Inferences are labeled, and unresolved behavior becomes an open question instead of a guessed rule.
- **Find the gaps, don't fill them.** The skill checks for missing states and edge cases (loading, empty, error, permissions, limits, localization). When the source doesn't define the behavior, it says so.
- **Never invent copy.** Toasts, dialogs and alerts use confirmed wording, or are marked `Copy: TBD`. Suggested wording is labeled as a proposal for approval.
- **Respect who owns the decision.** The person writing the story may be documenting someone else's plan. The skill records questions for the right stakeholders rather than pushing the writer to decide.
- **Be honest about readiness.** Each story states whether it is Ready for Grooming or Ready for Dev. Detail alone does not make a story ready.

## How I use it

1. I gather the source material and write a short brief: product, requirement, background, goal, scope and references.
2. The skill drafts the story: Background, Objective, Scope, User Flow, Acceptance Criteria and Open Questions.
3. I review every rule against the real system, take the open questions to the people who own them, and update the story as decisions are made.

AI handles structure and completeness checks. Product judgment and the final call on every requirement stay with people.

## Brief format

```
Product / Module:
Requirement:
Background:
Objective / Goal:
Scope / Notes:
References:
```

Briefs can be written in English or Chinese; the story follows the language of the request.

## Install

Upload the `story-writer` folder to Claude as a custom skill, or place it in your Claude Code skills directory. The full instructions and a worked example are in [`SKILL.md`](SKILL.md).

---

Part of [Bella Chen's product portfolio](https://bellaachen.github.io/Bella_Portfolio/). No company data is included; the worked example uses a generic trading-platform feature.
