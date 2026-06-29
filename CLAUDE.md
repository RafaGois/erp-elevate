# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (eslint-config-next, flat config in eslint.config.mjs)
```

There is **no test framework** configured in this project.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (`strict: false`) · Tailwind CSS v4 · TanStack Query · Axios · Radix UI / shadcn (new-york style) · GSAP + Framer Motion + Lenis for landing animations.

- Path alias: `@/*` → `src/*`.
- Tailwind v4 is CSS-first: tokens live in `src/styles/globals.css` via `@theme`, **not** a `tailwind.config.js`. shadcn config is in `components.json` (UI components go to `@/components/ui`, `cn()` helper in `@/lib/utils`).
- Add shared classes conditionally with `cn()` from `@/lib/utils`.

## Architecture

This is a frontend-only app. It talks to an **external backend** at `https://elevatepromedia.com/api` — there is no `src/app/api/` route layer, no database, and no Server Actions. Despite what `.cursor/rules/nextjs-project-structure.mdc` describes (loaders, `"use cache"`, `src/features/`, `src/stores/`), the dashboard is built almost entirely from **client components** that fetch via TanStack Query + the shared axios instance. Treat that cursor rule as aspirational guidance, not a description of the current code.

### Route groups (`src/app/`)
- `(public)/` — marketing landing (`page.tsx`), `servicos/[slug]` service pages, `orcamento/[slug]` public budget/proposal pages. Service/landing content is data-driven from `src/lib/data/`.
- `(auth)/auth` — login screen.
- `(dashboard)/dashboard/*` — the authenticated ERP. Feature folders: `finances`, `projects`, `tasks`, `equipaments`, `users`, `categories`. Route-private code lives in `_components/` and `_lib/` next to each route.

### Auth (two layers)
- **`proxy.ts`** (Next.js 16's replacement for `middleware.ts`) guards `/dashboard/(.*)`: reads the `elevate-token` cookie, POSTs to `/users/validate`, redirects to `/auth` on failure.
- **`AuthContext`** (`src/lib/contexts/AuthContext.tsx`) handles client-side login/logout, stores the user, manages the `elevate-token` / `elevate-auth` cookies (via `js-cookie`) and `uid` in `localStorage`. Access it through the `useAuth()` hook.

### API layer (`src/lib/api.ts`)
Single shared axios instance — import as `api`. Request interceptor injects the `token` header (raw value, no `Bearer` prefix) from the `elevate-token` cookie. Response interceptor redirects to `/auth` on 401, **except** on public routes (`/login`, `/users/register`, `/users/validate`, and any `/orcamento` page). Server-side budget fetching uses a separate cookie-reading helper in `src/lib/budget-lookup.ts`.

### State & data
- Global UI state: `AppContext` (`useAppData()`) for navbar visibility, loading flags, selected menu tab (persisted to `localStorage`).
- Server data: TanStack Query. Client + `queryClient` are configured in `src/services/query-client.ts` (1h `staleTime`, 3 retries); provider tree is `src/app/providers.tsx` (Theme → Auth → App → QueryClient). Invalidate with `queryClient.invalidateQueries` after mutations.

### Dashboard CRUD pattern
Each dashboard list page is a client component that:
1. Fetches rows with `useQuery` + `api`.
2. Renders them in the shared `DataTable` (`src/components/layout/components/datatable/`, built on `@tanstack/react-table`) with `FloatingMenu` row actions.
3. Edits/creates through a per-entity modal in `src/components/layout/modal/` (e.g. `MovimentationModal`, `ProjectModal`, `TaskModal`) built on the generic `ToolkitModal`/`Modal` and `react-hook-form` + Zod.
4. Confirms deletes via `ConfirmDialog`.

When adding a new entity, follow this trio: a model in `src/types/models/`, a `<Entity>Modal.tsx`, and a list page wired to `DataTable`. Enums for the domain live in `src/types/enums/`.

## Conventions
- Components: PascalCase files. Hooks: `use-*.ts(x)`. Route folders: kebab-case. Route-private folders: `_components/`, `_lib/`.
- Keep components as Server Components by default; add `"use client"` only at leaves that need hooks/events/browser APIs. (In the dashboard, most pages are already client components by necessity.)
- Comments and some identifiers are in Portuguese — match the surrounding language of the file.

## GSAP / animation gotchas (landing pages)
- Register plugins once; use `useGSAP` with `{ scope: container }` for cleanup.
- **Never** call `ScrollTrigger.getAll().forEach(t => t.kill())` — it kills global triggers and crashes the page.
- Avoid `SplitText` in sections that also use Lenis smooth scroll (heavy reflow).
- Integrate Lenis with GSAP via `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker.add(...)`; call `lenis.destroy()` on unmount.
