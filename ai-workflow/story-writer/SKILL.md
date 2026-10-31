---
name: story-writer
description: Generate Ready-for-Dev / Ready-for-Grooming user stories and feature specs from a short requirement brief. Use this skill whenever the user wants to write a Jira story, dev story, feature spec, PRD section, or turn a raw requirement or feature idea into a structured story — even if they just say "write a story for X", "spec this out", "turn this into a ticket", or paste a Story-Writer-style brief (Product / Requirement / Background / Notes). Especially relevant for product and trading-platform features (MT4/MT5, Copy Trading, PAMM, account/auth, multi-language/RTL) where Acceptance Criteria, edge cases, and technical considerations must be proactively filled in to reach engineering-handoff quality. Trigger this whenever the goal is a structured, dev-ready story rather than a casual answer.
---

# Story Writer

Turn a short requirement brief into a structured story that is good enough to hand to engineering — i.e. **Ready for Grooming** at minimum, ideally **Ready for Dev**. The point of this skill is not to transcribe what the user wrote; it is to think like a senior product manager, fill the gaps the brief left open, surface the risks, and write down the decisions engineering will need.

## Mindset (this is the important part)

A raw requirement is always under-specified. The author knows the happy path in their head but has not written down the states, the limits, the failures, or the questions. Your job is to make all of that explicit. Concretely:

- **Challenge the assumptions.** If the brief implies something that may not hold (e.g. "windows snap together" — on any side? what's the limit per group? what detaches them?), call it out rather than silently assuming.
- **Find the edge cases.** The 11th item when the max is 10. The empty state. The disconnect. The race condition. The two-of-the-same-thing. The group that drops to one member.
- **Think about scale and performance**, especially for real-time / trading features (concurrent data streams, latency, market-hours vs off-hours).
- **Cover every state.** Loading, success, empty, error, permission-denied — not just the happy path.
- **Resolve, don't just list.** In this format the thinking still happens, but the *output* bakes each resolved edge case into a concrete rule (see Acceptance Criteria below). Only genuinely undecided items stay as Open Questions.
- **Surface what you don't know** as Open Questions aimed at a specific stakeholder, instead of guessing.

Do not validate the brief uncritically. A story that just restates the input is a failure of this skill. The value you add is the rules the author didn't think to write: limits, conflicts, separation/persistence behaviour, and the exact copy for every message.

## Writing style — keep it tight

Write plainly. One idea per line, said once. Verbosity and repetition make a story harder to act on, not more thorough.

- **No restating across sections.** Background sets the scene once; every rule in AC must add something *new*. Don't repeat a limit in Background and again in three rule groups.
- **AC rules are compact and testable.** Each bullet is a single rule a tester could pass/fail — not padded "Given … When … Then …" prose. e.g. `A maximum of 10 Order Books can be opened simultaneously.`
- **Group rules by topic, not by ceremony.** Resolved edge cases live inside the relevant rule group as their own bullets, not in a separate speculative list.
- **Final pass: re-read and delete anything redundant** — repeated wording, restated points, filler qualifiers. Shorter is better as long as nothing actionable is lost.

## Input format

The user will usually give a brief like this (sections may be in Chinese or English; any field may be missing):

```
skill: Story Writer

產品 / Product:
<the product or platform>

需求 / Requirement:
<the feature being requested>

背景 / Background:
<why — the user / business reason>

補充 / Notes:
<constraints, rules, specific behaviours>
```

If a field is missing, infer sensibly from the rest and the product domain, and note any inference you made in Open Questions rather than inventing facts.

## Output structure

ALWAYS produce these three core sections in this order, using these English headers (Jira-friendly). Write the prose **in the same language the user wrote the brief in** (if the brief is in Chinese, write the content in Chinese; keep the structural headers in English).

```
# [Title]

## Background
Flowing prose, usually two short paragraphs:
  1. The current / already-built state — what exists today and what the user can already do.
  2. "This enhancement introduces <X>, allowing <…> for <the value / experience it enables>."
No labeled bullets. The problem is implied by the gap between paragraph 1 and 2.

## User Flow
A numbered list. One user action per step, in order. Start from the entry point,
end at close/exit. Plain sentences, no sub-bullets.

## Acceptance Criteria
Grouped under named rule sub-headers (e.g. "Order Book Opening Rules",
"Magnetic Snap Rules", "Group Separation Rules"). Each group is a bullet list of
concrete, testable rules. Bake resolved edge cases in as rules. Place a
Notification block inline, immediately under the rule group that triggers it
(see "Notification copy" below).
```

### Optional sections — only when they earn their place

The clean final story is the three sections above. Add these **only** when the requirement still has them open, and prefer to fold resolved items back into AC rules:

- **Open Questions** — genuinely undecided points, each addressed to a specific role (e.g. "@Design: which sides are eligible for snapping?", "@Engineering: performance budget for 10 concurrent depth streams?"). Keep this while grooming; delete once answers are baked into rules.
- **Impact Scope** — list affected systems/teams only when the reviewer needs the size of the change up front (frontend, market-data streaming, MT4/MT5 routing, permissions, persistence, localization/RTL, QA, Design, Ops).

Do not pad the story with these by default. If everything is decided, the three core sections are the whole story.

### Section guidance

- **Title** — concise, action-oriented, names the feature. e.g. `Magnetic Snap for Floating Order Book`.
- **Background** — two paragraphs: the existing state, then "This enhancement introduces … allowing … for …". State the user-facing value, not the implementation.
- **User Flow** — numbered, one action per line. Cover the primary path end to end; note the entry point (e.g. "clicks the Order Book icon from a Watchlist row").
- **Acceptance Criteria** — the heart of the story. Each rule group is a named sub-header; under it, bullet rules that are individually testable. Across the groups, make sure you have covered: the open/create rules and their limits; the core feature behaviour; movement/interaction rules; separation/teardown rules; persistence and "what happens when a member leaves" rules; and the close/exit rules. Every limit or conflict that can be hit (max reached, duplicate, group full) gets both a rule **and** an inline Notification with real copy.

## Notification copy

Whenever a rule can trigger a toast, notification, prompt, alert, or dialog, never write just "show a toast" — spell out the actual copy inline, right under the rule that triggers it, in this form:

```
Notification: <internal name of the message>
Title: <the title text the user sees>
Description: <the body text the user sees>
```

- Place it **inline inside the Acceptance Criteria**, directly beneath the rule group it belongs to — not collected in a separate section at the end.
- Give a **Title and a Description**. A one-line toast may carry only a Description — still name it.
- Write the **internal name, Title, and Description** so engineering and localization can use them verbatim.

Default language: **English**. If a specific deliverable must ship localized, add the localized line under each field (e.g. a `简体` line beneath Title and Description), and flag any further locales (Arabic / RTL) as needing localization rather than leaving them out.

## Quality bar

Before finishing, check the story against this bar:

- **Ready for Grooming**: Background reads as current-state → enhancement, there is a numbered User Flow, AC rule groups exist for the happy path, and any genuinely open points are listed as Open Questions. The team could productively discuss it.
- **Ready for Dev**: All of the above, plus the AC rule groups cover limits, conflicts, movement/interaction, separation, persistence, and close behaviour; every triggerable message has inline copy; and nothing material is left in Open Questions. A developer could pick it up with few blocking questions.

State which level the story currently reaches, and if it's only Ready for Grooming, say what's needed to get it to Ready for Dev (usually answers to specific Open Questions).

## Output format

Default to clean Markdown that pastes directly into Jira or Notion. Do not wrap the whole story in a code block. If the user asks for a Jira-native format (ADF) or wants it created directly in Jira via a connector, adapt accordingly — but Markdown is the default.

---

## Worked example

This is the canonical format. (One of a two-story split — the companion story carried the rest of the scope.)

**Input:**

```
skill: Story Writer

產品：Trading Platform
需求：Floating Order Book 加上 Magnetic Snap
背景：Floating Order Book 已上線,可從 Watchlist 開啟、自由移動、單獨關閉。
補充：
- 最多開 10 個 Order Book;同一 Symbol 不可重複開
- 多個 Order Book 可自動對齊、組成群組、一起移動
- 每個群組最多 5 個;可同時存在多個群組,總數不超過 10
- 拖離超過 detach 距離即脫離群組
```

**Output:**

# Magnetic Snap for Floating Order Book

## Background
Floating Order Book has already been implemented. Users can open a floating Order Book by clicking the Order Book icon in the Watchlist, move the window freely, and close it individually.

This enhancement introduces Magnetic Snap functionality, allowing multiple floating Order Books to automatically align, form groups, and move together for a more efficient multi-symbol monitoring experience.

## User Flow

1. User clicks the Order Book icon from a Watchlist row.
2. A floating Order Book window is opened.
3. User may open multiple Order Books.
4. Floating windows can be dragged freely.
5. When windows are moved within the snap threshold, they automatically align and form a group.
6. Grouped windows move together.
7. Windows can be detached from a group by dragging beyond the detach threshold.
8. User can close any Order Book window individually.

## Acceptance Criteria

### Order Book Opening Rules

* Users can open a floating Order Book by clicking the Order Book icon in the Watchlist.
* A maximum of 10 Order Books can be opened simultaneously.
* The same Symbol cannot have multiple Order Books opened simultaneously.
* Existing Floating Order Book opening and closing behavior remains unchanged.

Notification: Maximum Order Book Limit Reached
Title: Maximum Order Book Limit Reached
Description: You can open up to 10 Order Books at the same time. Please close an existing Order Book before opening a new one.

Notification: Order Book Already Open
Title: Order Book Already Open
Description: An Order Book for this Symbol is already open.

### Magnetic Snap Rules

* Floating Order Books automatically snap when entering the configured snap distance.
* Snapping can occur on any eligible side defined by Design specifications.
* A snapped Order Book joins the target magnetic group.
* Multiple Order Books can belong to the same magnetic group.
* Each magnetic group can contain up to 5 Order Books.
* Users may create multiple magnetic groups as long as the total number of open Order Books does not exceed 10.

Notification: Magnetic Group Full
Title: Magnetic Group Full
Description: This magnetic group already contains the maximum of 5 Order Books.

### Group Movement Rules

* Moving any Order Book within a magnetic group moves the entire group.
* All members maintain their relative positions during movement.
* Group movement must remain within the visible viewport.

### Group Separation Rules

* Dragging an Order Book beyond the configured detach distance removes it from the magnetic group.
* Detached Order Books become independent floating windows.
* Remaining members continue to function as a magnetic group.
* Detaching an Order Book does not reposition or affect other group members.

### Group Persistence Rules

* Magnetic groups are position-based collections rather than parent-child relationships.
* Each Order Book maintains its own position within the group.
* Removing or closing a group member does not trigger automatic regrouping, realignment, or repositioning of remaining members.

### Window Closing Rules

* Users can close an Order Book using existing close actions.
* Closing an Order Book removes it from the current workspace.
* If only one Order Book remains in a magnetic group, it automatically behaves as a standard floating Order Book.

---
**Level: Ready for Dev.** Snap-side eligibility and exact thresholds are owned by Design spec; no blocking Open Questions remain.
