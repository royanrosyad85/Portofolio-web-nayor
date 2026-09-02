# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Hiring managers reviewing current experience, technical range, and evidence of delivery.
- Prospective clients evaluating whether Royan can deliver AI, machine learning, data, and automation work.

## Product Purpose

Royan Rosyad's portfolio presents current professional experience and project work so visitors can assess fit and start an interview, collaboration, or client conversation.

## Positioning

The portfolio connects AI and data work to operational outcomes, pairing technical implementation details with the practical workflow each project improves.

## Operating Context

- Visitors browse the portfolio's homepage sections for projects, experience, education, and contact information.
- Project cards link to live demonstrations, repositories, and supporting assets where available.
- The browser-only blog supports reading and local authoring through its admin routes.

## Capabilities and Constraints

- React and Vite single-page application with client-side routes.
- Portfolio content is maintained in `src/features/portfolio/data/portfolio.ts` and public media is served from `public/`.
- Blog posts, categories, and drafts persist in browser `localStorage`; they are not server-backed.
- Production builds remove console output and debugger statements.

## Brand Commitments

- Product name: Royan Rosyad.
- Present AI, machine learning, data, and automation expertise through concrete experience and project evidence.

## Evidence on Hand

- Portfolio data, experience, education, certifications, project links, and project copy: `src/features/portfolio/data/portfolio.ts`.
- Project and resume assets: `public/img/` and `public/logo/`.
- No server-side analytics, testimonials, client endorsements, or hosted blog persistence are present in the repository; future work must not imply them without confirmation.

## Product Principles

- Show current experience and project work first, not abstract capability claims alone.
- Make technical work legible through the workflow and outcome it enables.
- Let hiring and client evaluation share the same factual evidence.
- Preserve links to demonstrations and repositories where project evidence exists.

## Accessibility & Inclusion

Preserve the existing accessibility basics, including semantic structure, keyboard access, visible focus behavior, and reduced-motion support.
