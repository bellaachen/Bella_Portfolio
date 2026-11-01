# Bella Chen Portfolio — Design System

The visual language of [bellaachen.github.io/Bella_Portfolio](https://bellaachen.github.io/Bella_Portfolio/): calm, editorial and Japanese-minimal. An ivory page, one brand colour (Slate Indigo, 藍鼠), serif headlines and generous white space.

> **This folder is the source of truth.** Values live in [`tokens.css`](tokens.css); every page loads it before its own stylesheet. Change a value there and the whole site follows. A visual copy of this system with live component previews is kept in Claude and synced after larger changes.
>
> 中文摘要：本資料夾是網站設計規範的正本。所有顏色、字體、圓角數值都在 `tokens.css`，修改一處、全站同步。

- [Principles](#principles)
- [Tokens](#tokens)
- [Typography](#typography)
- [Layout](#layout)
- [Components](#components)
- [Content rules](#content-rules)
- [Decision log](#decision-log)

---

## Principles

1. **One accent.** `--brand` is the only colour that is not a neutral. If something needs attention, use `--brand`; never introduce a second hue for decoration.
2. **An outlined pill means "you can click this".** Buttons, filters and the language switch are outlined pills. Anything that only describes (capability chips, case tags) is a filled label with no border.
3. **Show AI, don't tell it.** AI appears as a badge on the work it built, not as a section about AI.
4. **Real numbers only.** No filler stats; placeholders use square brackets, e.g. `[Article title]`.
5. **Readable first.** Every text colour meets WCAG AA (4.5:1) on the surfaces it is used on; control outlines meet 3:1.

## Tokens

All tokens are CSS custom properties in [`tokens.css`](tokens.css).

### Colour

| Token | Value | Use |
|---|---|---|
| `--surface` | `#FAF9F5` | Page background (Ivory) — every page |
| `--surface-raised` | `#FFFFFF` | Cards |
| `--surface-muted` | `#F0EEE6` | Quiet blocks, Lab panel, fill of tags and capability chips |
| `--surface-sunken` | `#EEF0F1` | Image well behind covers |
| `--cover-muted` | `#E4E5E9` | Cover of a "Coming soon" article |
| `--ink` | `#141413` | Headings, primary text, selected filter fill |
| `--ink-secondary` | `#3D3D3A` | Body copy (10.3:1 on surface) |
| `--ink-muted` | `#5E5D59` | Meta lines, captions (6.3:1) |
| `--ink-subtle` | `#6B6A65` | Footer, small labels (5.1:1) — not body copy |
| `--border` | `#E8E6DC` | Hairlines and card outlines — decorative |
| `--border-strong` | `#8F8D84` | Outline of **clickable** controls only (3.2:1) |
| `--border-ink` | `#141413` | Outline buttons, the rule above the stats |
| `--brand` | `#3F4E7A` | Slate Indigo: links, eyebrows, AI badges, primary button (7.7:1) |
| `--brand-hover` | `#34416A` | Primary button hover |
| `--on-brand` | `#FAF9F5` | Text on brand fills |
| `--brand-tint` | `#ECEDF2` | Hero focus chips, callouts |
| `--brand-cover` | `#DDDCDA` | Placeholder cover for a case without an image |
| `--spark-start` → `--spark-mid` → `--spark-end` | `#3F4E7A` → `#7D97E0` → `#D6E4FF` | Logo spark gradient only |
| `--logo-ink` | `#16273A` | Logo frame and letterform |

No dark backgrounds, no gold, no gradients outside the logo, no shadows.

### Radius

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4px | Portrait, case tags |
| `--radius-sm` | 6px | Capability chips |
| `--radius-md` | 10px | Lab cards, callouts |
| `--radius-lg` | 12px | Covers, content cards |
| `--radius-xl` | 14px | Case cards, Lab panel |
| `--radius-pill` | 999px | Buttons, filters, focus chips, AI badge |

### Layout

| Token | Value | Use |
|---|---|---|
| `--container` | 1200px | Max content width |
| `--gutter` | 32px (16px on phones) | Side padding |
| `--control-min` | 44px | Minimum height of buttons and filters |
| `--section` | 120px home · 96px case pages | Space above each section (set per stylesheet) |

## Typography

| Family | Token | Use |
|---|---|---|
| Newsreader | `--serif` | Headlines, card titles, stat numbers, wordmark |
| Instrument Sans | `--sans` | Everything else: body, meta, nav, buttons |
| Shippori Mincho | `--jp-serif` | The **English** contact headline only |
| Zen Kaku Gothic New | `--jp-sans` | The English contact paragraph |
| System sans (PingFang TC / Noto Sans TC / Microsoft JhengHei) | `--zh` | **All Chinese text** |

| Style | Size / line height | Notes |
|---|---|---|
| Hero headline | clamp(44px, min(7vw, 11svh), 96px) / 1.02 | Once per page; italicise the last phrase in English |
| Section title | 36–52px / 1.05 | Under an uppercase eyebrow |
| Card title | 30px / 1.12 | Home case cards |
| Article / all-cases title | 26px / 1.2 | |
| Stat number | 44px / 1 | |
| Body | 15–16px / 1.6 | `--ink-secondary` |
| Meta | 13px | Company · category lines |
| Eyebrow | 12px, 0.2em tracking, uppercase | `--brand` |

**中文:** in 中文 mode `--serif`, `--jp-serif` and `--jp-sans` all fall through to `--zh`, so Latin keeps Newsreader / Instrument Sans and only Chinese characters use the system sans. Chinese headings use weight 600 and no negative letter-spacing. Never set Chinese in a mincho or serif face.

Fonts load from Google Fonts: Newsreader (400, 500, 600, italic 400), Instrument Sans (400, 500, 600), Shippori Mincho (500), Zen Kaku Gothic New (400, 500). `--zh` needs no download.

## Layout

- The header is **sticky** on every page: `--surface` at 92% with a blur and a `--border` rule.
- On the home page the **first screen** shows the header, the hero and the four stats together; the headline and portrait scale with viewport height.
- Card grids use `repeat(auto-fit, minmax(…, 1fr))`: case cards min 440px (2 × 2), all-cases cards min 320px (3 across), articles min 420px.
- Everything stacks to one column on a phone; nothing scrolls sideways.

## Components

| Component | Rule |
|---|---|
| **Header** | Logo (`assets/logo.svg`, 30px) + "Bella Chen" in `--serif`; nav links; EN / 中文 switch as an outlined pill group. Same on every page. |
| **Button** | Pill, min `--control-min`. Primary: `--brand` fill. Outline: 1px `--border-ink`. Social (LinkedIn, GitHub): outline, uppercase, 0.12em tracking. → for on-site links, ↗ for off-site. |
| **Filter chip** | A real `<button aria-pressed>`, pill. Selected: `--ink` fill. Unselected: 1px `--border-strong`. Count at 70% opacity. |
| **Focus chip** (hero) | `--brand` text on `--brand-tint`, pill, no border. Display only. |
| **Capability chip** | `--surface-muted` fill, **no border**, `--radius-sm`, 14px `--ink-secondary`. Display only. |
| **Case tag** | `--surface-muted` fill, **no border**, `--radius-xs`, 12px. Display only. |
| **AI badge** | `--brand` pill with a small four-point spark; label is always **"AI prototype · &lt;tool&gt;"** (中文 "AI 原型 · &lt;tool&gt;"). Only on work AI really built. |
| **Case card** | `--surface-raised`, 1px `--border`, `--radius-xl`, 16:9 cover, title in `--serif`. Home shows exactly 4 (three FinTech, one non-FinTech). No role / focus / outcome rows. |
| **Placeholder cover** | `--brand-cover` fill with the category in `--serif` `--brand`. |
| **Article card** | Typographic 16:9 cover: series label, two-line uppercase keyword, subtitle. Published = `--brand` fill; Coming soon = `--cover-muted`. |
| **Lab card** | 64px mark tile + name + one line + off-site link, inside the `--surface-muted` Lab panel. |
| **Callout** | `--brand-tint` fill, `--radius-md`, no left border. |

Implementation: home and all-cases pages in [`../site.css`](../site.css); case studies and articles in [`../case.css`](../case.css).

## Content rules

- **Voice:** first person, plain, confident. Short declarative sentences.
- **Language:** English by default with an EN / 中文 switch; never mix languages in one sentence.
- **Casing:** sentence case for headings and buttons; UPPERCASE only for eyebrows.
- **No emoji.** Text arrows (→ ↗) instead of icons.
- **Data safety:** public demos are rebuilt with fictional data; no real company or customer data in any cover or prototype.
- **Product thinking:** no "All articles" link until there are three or more published.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-11-01 | Slate Indigo `#3F4E7A` as the only brand colour | Calm and trustworthy for FinTech; fits the Japanese-minimal direction |
| 2026-11-01 | Ivory background, serif headlines | Editorial, readable, distinct from typical tech portfolios |
| 2026-11-01 | Home shows 4 case studies; the rest on an All case studies page | Faster scan for recruiters; keeps the home page light |
| 2026-11-01 | AI shown as badges + an article, not a section | AI is a way of working, not the product; avoids repeating cases |
| 2026-11-01 | Lab section for side projects | Career Bingo and the Story Writer skill are not case studies or articles |
| 2026-11-01 | `--border-strong` darkened to `#8F8D84` | Control outlines need 3:1 contrast |
| 2026-11-01 | 中文 uses the system sans | Mincho read as unusual for Chinese UI; system fonts match what readers expect |
| 2026-11-01 | Title "Product Manager" (not "Systems Product Manager") | Broader and clearer for international roles |
| 2026-11-01 | AI badge always "AI prototype · &lt;tool&gt;" | One term for every AI-built case; "demo" sounded like a sales asset |
| 2026-11-01 | Descriptive tags are filled, not outlined | Outlined pills are reserved for things you can click |
| 2026-11-01 | Tokens moved to `design-system/tokens.css` | One source of truth instead of values repeated in each stylesheet |
