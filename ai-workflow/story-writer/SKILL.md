---
name: story-writer
description: Turn product requirements, Slack discussions, meeting notes, customer feedback, PRDs, Figma references, or feature ideas into clear Jira-ready user stories and specifications. Use whenever the user asks to write a story, define acceptance criteria, create a dev ticket, or structure a feature. Prioritize traceable requirements, usable flows, testable acceptance criteria, and explicit unresolved decisions. Never invent product behavior to make a story appear complete.
---

# Story Writer

Turn the user's source material into a clear, reviewable product story that Design, Engineering, QA, and business stakeholders can discuss or implement. Add structure and identify missing details, but do not make product decisions that are not supported by the supplied evidence.

## Core principles

- Preserve the user's intent and scope. Keep each story focused; suggest a split when it spans independent journeys or modules.
- Separate **confirmed facts**, **assumptions/inferences**, and **open decisions**. Label them when they affect requirements.
- Never present guessed behavior, limits, calculations, permissions, API behavior, errors, or business rules as confirmed.
- The user may be documenting a handed-off plan and may not own product decisions. Do not expect them to decide rules that belong to Product, Design, Engineering, Compliance, or another stakeholder. Record the question and its likely owner only when evident.
- Check for missing states and edge cases (loading, empty, error, permission, duplicate, limits, API failure, persistence, localization/RTL, impact on existing data). Add behavior as a requirement only when supported; otherwise identify the gap.
- Do not invent exact notification copy. Use confirmed copy; if absent, mark it TBD or label any suggested copy as a proposal for approval.
- Keep Business Rules, User Flow, UI behavior, and backend/API behavior distinct. Include technical details only when supplied or confirmed; flag missing details instead of guessing.
- Write plainly and concisely, one idea per line. Avoid duplication and use simple, natural PM English when writing in English.

## Language and format

- Write in the language of the user's request or as explicitly requested.
- Use concise, Jira-friendly Markdown by default. Do not wrap the whole story in a code block.
- English headings are fine with Chinese content when that fits the user's Jira convention.
- Use “As a [user], I want [capability], so that [benefit]” when it helps clarify the user need or the user asks for it. It is optional; do not force it when Objective and Scope work better.
- AC do not have to use Given/When/Then. Prefer grouped rule-based bullets or checklist criteria. Use Given/When/Then when scenario preconditions, actions, and outcomes need to be explicit.

## Input handling

The user may provide a brief, Slack discussions, customer issues, meeting notes, PRDs, screenshots, Figma links, prototypes, or existing tickets. Extract only what the source actually states. Do not imply that an unavailable source was reviewed. If key information is missing, draft the supported parts and list the gaps as Open Questions; ask only for information that blocks a useful draft.

A simple brief may contain:

    Product / Module:
    Requirement:
    Background:
    Objective / Goal:
    Scope / Notes:
    References:

## Default story structure

Use the sections that fit the request. A complete feature story usually follows this order:

    # [Action-oriented Title]
    ## Background
    ## Objective
    ## Scope
    ### In Scope
    ### Out of Scope
    ## User Flow
    ## Business Rules (when applicable)
    ## Acceptance Criteria
    ## Edge Cases (if not covered in AC)
    ## Dependencies / References / Test Environment (when applicable)
    ## Open Questions (when decisions are unresolved)
    ## Impact Scope (when useful)

### Section guidance

- **Title**: concise and action-oriented.
- **Background**: explain the relevant current state, problem or reason for change, and expected user/business value. Use supported facts only; label unknown current behavior.
- **Objective**: state the outcome, not the implementation.
- **Scope**: state what this story includes and excludes. Keep unrelated work out.
- **User Flow**: list the primary journey in order from entry point through completion or exit. Include only supported steps. Mark missing steps as questions rather than inventing screens or actions.
- **Business Rules**: state confirmed product rules separately from UI flow and technical implementation. Label proposals and unverified rules.
- **Acceptance Criteria**: group by functional topic (such as Display, Validation, Calculation, Permission, Localization, Submission, Error Handling). Each item must be independently testable and describe observable behavior. Include defaults, state changes, feedback, and impact on existing data when relevant and supported.
- **Edge Cases**: cover exceptional conditions not already in AC. Add expected behavior only when known.
- **Dependencies / References / Test Environment**: include relevant links, test accounts/data, API contracts, or systems; mark missing information.
- **Open Questions**: include genuinely unresolved decisions. Phrase each clearly and name an owner only when known.
- **Impact Scope**: optionally list affected frontend, backend, APIs, permissions, data, QA, localization/RTL, or operations.

## Acceptance Criteria details

- Prefer concise, observable, testable rule-based bullets; one rule per bullet.
- For a state whose behavior is unknown (Loading, Empty, Error, Permission Denied, API Failure, etc.), add a specific Open Question rather than guessing.
- For any required toast, dialog, alert, or other message, state its trigger and exact confirmed copy. If copy is missing, write “Copy: TBD” and add an Open Question. Suggested wording must be labeled “Proposed copy — approval required”.
- Keep supported languages and RTL behavior explicit when relevant; do not assume coverage.
- Do not add analytics, audit history, performance budgets, retries, persistence, backward compatibility, or migration unless requested, evidenced, or clearly marked as an open consideration.

## Readiness assessment

Add a brief readiness line when useful:

- **Ready for Grooming**: goal, scope, flow, and supported AC are clear enough for discussion; remaining decisions are listed.
- **Ready for Dev**: implementation-relevant rules, states, dependencies, and expected outcomes are confirmed, with no material blocking questions.
- Otherwise, state what is missing. Detail alone does not make a story Ready for Dev.

## Final quality check

Before returning the story, confirm that:

1. Background, Objective, Scope, User Flow, and AC agree.
2. Confirmed details are distinguishable from assumptions and unresolved behavior.
3. Every AC is observable and testable; none silently invents a decision.
4. Scope is focused and exclusions are clear where helpful.
5. Relevant validation, errors, permissions, empty/loading states, edge cases, dependencies, and localization have a confirmed behavior or a clear question.
6. The story has no duplicated or filler text and can be pasted into Jira.

## Example: preserve unknowns

**Input**

    Product / Module: Trading Platform — Floating Order Book
    Requirement: Add Magnetic Snap to floating Order Books.
    Confirmed: Multiple Order Books should align and move together. A user can drag one away to separate it.
    Unknown: Group limit, snap distance, eligible sides, and what happens when a member closes.

**Output excerpt**

# Add Magnetic Snap to Floating Order Books

## Background
Floating Order Books are available as separate windows. This request lets users align multiple windows into a group and move them together, while still allowing an individual window to be detached.

## Objective
Allow users to organize multiple floating Order Books into movable groups and detach a window when needed.

## Scope
### In Scope
- Aligning floating Order Books into a group.
- Moving grouped windows together.
- Detaching a window by dragging it away.

### Out of Scope
- Not specified in the supplied requirements.

## User Flow
1. User opens multiple floating Order Books.
2. User moves one window near another, and the windows align into a group. **Trigger and snap threshold need confirmation.**
3. User drags a grouped window, and the whole group moves together.
4. User drags a window away from the group to detach it. **Detach threshold needs confirmation.**

## Acceptance Criteria
### Grouping
- When a window is released within the snap threshold of another window, the two windows align and form a group.

### Group Movement
- Dragging any window in a group moves all windows in that group together.

### Detaching
- Dragging a window beyond the detach threshold removes it from its group.
- A detached window can be moved independently of its former group.

## Open Questions
- Which sides can snap, and what are the snap and detach thresholds?
- What is the maximum number of windows in a group?
- What happens to the remaining windows when a group member closes?

**Readiness: Ready for Grooming.** Confirm the snap, limit, and close-member rules before marking Ready for Dev.

## Output format

Return the complete story as clean Markdown. If the user asks for only specific sections, provide only those sections while preserving the same evidence and clarity rules. When useful, add a short note after the story naming the most important unresolved decisions.
