---
target: portfolio homepage
total_score: 28
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/royanrosyad/Nayor/web-personal/src/pages/Home.tsx"
target_fingerprint: "sha256:a062be76ac9484fc567f679a85cade6f8edca8ddfb552c06f38018a33ec158e3"
target_path: /Users/royanrosyad/Nayor/web-personal/src/pages/Home.tsx
timestamp: 2026-09-02T06-41-40Z
slug: src-pages-home-tsx
---
# Portfolio homepage critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3/4 | Active dock and form feedback work; page position is weak. |
| 2 | Match System / Real World | 4/4 | Career and project language is clear and credible. |
| 3 | User Control and Freedom | 3/4 | Hash links and project close controls work; proof links require modal entry. |
| 4 | Consistency and Standards | 4/4 | System is cohesive, but over-applied. |
| 5 | Error Prevention | 3/4 | Contact validation and honeypot cover common failures. |
| 6 | Recognition Rather Than Recall | 3/4 | Deep links help; the visual-only dock requires icon recognition. |
| 7 | Flexibility and Efficiency | n/a | Not required for an Experience-mode portfolio. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Repeated rounded panels and nesting add weight without meaning. |
| 9 | Error Recovery | 3/4 | Contact failure feedback is actionable. |
| 10 | Help and Documentation | n/a | Not required for this portfolio surface. |
| **Total** | | **28/32** | **Good foundation; focused visual redesign needed.** |

## Design Specificity Verdict

The hero is authored for Royan: portrait, current role, AI/data positioning, and real project evidence establish an actual practice. The page then becomes category-interchangeable: Skills, Experience, Education, and Contact reuse the same white, rounded, thin-bordered, softly shadowed container. The result feels like a polished component gallery rather than a portfolio where the presentation is itself evidence.

The static detector passed on all nine homepage files, but its runtime overlay found 51 flags: 39 thin-border/wide-shadow instances, 10 sub-11px labels, 7 nested-card instances, and five repeated kickers. The manual review independently identifies the first and third as the real design problem. Kicker/number-label flags are a deliberate idiom, not defects. The hero glow, image hover, and status pulse are also intentional; retain them if reduced-motion behavior is confirmed. The runtime detector overlay was temporary and has been removed.

## Overall Impression

A credible, calm opening and substantive project detail create trust. The scroll loses force after Projects because every remaining section receives the same visual treatment. Replace the card monoculture with section-specific editorial structures; keep the copy, assets, and typography.

## What’s Working

1. **Hero credibility:** portrait, current role, and concise proposition make the work immediately personal and professional (`src/features/portfolio/components/Hero.tsx:19`).
2. **Real project evidence:** project modals include stack, highlights, impact, and proof links—not decorative gallery content (`src/features/portfolio/components/Projects.tsx:134`).
3. **Usable foundation:** skip link, accessible navigation labels, hash scrolling, and reduced-motion consideration are present (`src/pages/Home.tsx:15`, `src/components/common/IconNavigation.tsx:67`).

## Priority Issues

### [P1] Replace the repeated card-container language
**Why it matters:** Equal visual weight prevents hiring managers from scanning the strongest evidence and turns the lower page into a monotonous credentials inventory.

**Fix:** Keep image-led project cases enclosed. Convert Skills into a ruled/tinted typographic index; Experience into a career rail with the current role carrying the largest proof weight; Education into a split ledger/timeline; Contact into one quiet fieldset plus inline direct links. Remove borders and shadows from everything that is not evidence requiring containment.

**Sources:** `src/styles/globals.css:276`, `src/features/portfolio/components/{About,Experience,Education,Contact}.tsx`.

### [P1] Align navigation with scroll order
**Why it matters:** The page renders Projects before Skills, while the dock advertises Skills first. A rapid evidence-first scan lands out of narrative order.

**Fix:** Make `IconNavigation` match `Home`’s order—or reorder the page once. Do not keep two narratives.

**Sources:** `src/pages/Home.tsx:49`, `src/components/common/IconNavigation.tsx:12`.

### [P2] Remove nested card framing
**Why it matters:** Border-within-border makes metadata, imagery, and decoration visually equivalent.

**Fix:** Preserve image framing for project evidence only. Use grid alignment, whitespace, thin rules, and background bands for logos, chips, achievements, and skills.

**Sources:** `src/features/portfolio/components/{Projects,About,Experience,Education}.tsx`.

### [P2] Reduce mobile dock pressure
**Why it matters:** On 390px the permanent seven-control dock consumes the thumb zone across a very long page and competes with project/contact actions.

**Fix:** Show a current-section control plus menu on mobile, or reveal the dock after the hero while retaining accessible labels and deep links.

**Source:** `src/components/common/IconNavigation.tsx:72`.

### [P2] Put project evidence in view before the modal
**Why it matters:** Outcomes and live/code proof are present but hidden behind the modal, so cards initially read as a stack gallery.

**Fix:** Retain the modal; make each card’s case-study/evidence intent explicit and reveal verified proof links inline where available—without adding new card chrome.

**Source:** `src/features/portfolio/components/Projects.tsx:74`.

## Persona Red Flags

- **Hiring manager:** the dock order conflicts with the document order; the current role is visually equivalent to earlier roles.
- **Prospective client:** operational outcomes exist but are not visible until modal interaction; the repeated credential containers feel internally focused rather than outcome-led.
- **Distracted mobile visitor:** the fixed seven-icon dock crowds the bottom action zone, while stacked panels provide too few visual landmarks.

## Minor Observations

- Runtime detector identified ten functional labels below 11px (including Experience/Education dates and “Current”); increase only those UI labels—do not alter the page’s typography system.
- The black/off-white/blue palette is not the problem. Create distinction through composition and surfaces, not more decorative color.
- `availability-chip` and `skills-surface` appear unused in `src/styles/globals.css`; do not introduce them as another surface variation.

## Questions to Consider

What if only project evidence is allowed to be card-shaped? What would a hiring manager remember an hour after seeing the Experience section? Could the mobile dock become useful only when navigation is needed rather than permanently occupying the action zone?
