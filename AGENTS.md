# AGENTS.md

## Workflow

- Use npm: `npm run dev` serves Vite on port 8080; validate changes with `npm run lint` and `npm run build` (there are no test or typecheck scripts).
- Do not commit or push unless the user explicitly approves it or has allowed it for the current session.
- Preserve unrelated worktree changes; this repository may be mid-refactor.

## Application Structure

- `src/main.tsx` mounts `src/app/App.tsx`; `AppProviders` wraps routing and `SmoothScroll` wraps all routed content.
- Add routes in `src/app/AppRoutes.tsx` before the `*` catch-all route. Non-home routes are lazy-loaded there.
- Home is composed in `src/pages/Home.tsx`; portfolio sections live in `src/features/portfolio/` and reusable shared components in `src/components/common/` or `src/components/ui/`.
- Update portfolio content in `src/features/portfolio/data/portfolio.ts`, not the legacy `src/data/portfolio.ts`.
- The blog is browser-only: `src/features/blog/lib/blog-data.ts` persists posts, categories, and drafts in `localStorage`; do not treat blog edits as server-backed persistence.

## Assets And Build

- Public assets are referenced from `/img/...` and `/logo/...` paths under `public/`.
- Production Vite builds remove console output and debugger statements; do not rely on them for production diagnostics.
