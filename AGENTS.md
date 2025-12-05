# AGENTS.md – Lineage_Dashboard

## High-level purpose

- This repository implements a **document-centric lineage system** for financial analysts.
- Core entities: **User → Document → Run → Value → Lineage**.
- Primary user flow:
  - Login → Home (My Documents) → Document Detail → Run Detail →
    Tables/Narrative → click a value → see its lineage in a right-hand drawer.
- The UI must feel familiar to finance users (AQRR, Credit Memos, etc.), **not** like a generic “AI admin” toy.

## Architecture expectations

- Frontend:
  - Next.js (App Router), TypeScript, Tailwind, component library (e.g. shadcn/ui).
  - Lives at the repo root (existing `app/` and `components/`).
  - Owns the navigation and pages for:
    - Home (My Workspace),
    - Documents list,
    - Document Detail,
    - Run Detail (Overview, Tables, Narrative),
    - Admin.
  - Frontend must be a **thin client** for lineage: it calls backend APIs via HTTP/JSON.

- Backend:
  - Create a new service under `services/lineage-api/` for lineage APIs.
  - Prefer **TypeScript + Node** (Fastify or Express) + Postgres via Prisma.
  - Backend services **must not depend on this UI**; they should expose a generic API usable by other clients.
  - Lineage is addressed by IDs: `document_id`, `run_id`, `value_id`.

- Database:
  - Single Postgres instance for now.
  - Schema must support:
    - Documents, Runs, Tables, Values, LineageEdges, NarrativeChunks.
    - Any document type (AQRR, credit memo, risk report, etc.).

- Optional services:
  - A future `narrative-worker` (LLM-based) may generate NarrativeChunks,
    but that’s separate from the core lineage-api.

## Coding style and priorities

- Prioritize:
  - Clarity of domain model (Document, Run, Value, Lineage),
  - Ease of use for analysts (simple flows, clear labels),
  - Reusability of APIs by other tools.
- Avoid premature complexity:
  - No Kafka, no exotic infra. Just HTTP + Postgres + Docker is fine.
- Keep components small and composable.
- Prefer TypeScript with explicit types for domain entities.

## Commands and workflows

These are the expected commands. If they do not exist yet, create them and wire them up.

### Frontend (Next.js)

- `pnpm dev` – run the Next.js app in dev mode.
- `pnpm build` – build for production.
- `pnpm start` – start the production build.
- `pnpm lint` – run linters.
- `pnpm test` – run frontend tests (unit + component).
- `pnpm test:e2e` – run end-to-end tests (Playwright or Cypress).

### Backend (services/lineage-api)

From `services/lineage-api/`:

- `pnpm dev` – run the API server in dev mode.
- `pnpm build` – compile TypeScript.
- `pnpm start` – start the compiled server.
- `pnpm lint` – lint backend code.
- `pnpm test` – run backend tests.
- `pnpm db:migrate` – run database migrations.
- `pnpm db:seed` – seed demo data (documents, runs, values, lineage).

### Docker / docker-compose

From repo root:

- `docker-compose up` – start:
  - Postgres database,
  - lineage-api service,
  - Next.js frontend (or proxy).
- `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up` – dev-friendly stack if defined.

If these commands are missing, Codex should define minimal Dockerfiles and a docker-compose.yml to make them work.

## Testing expectations

Whenever you modify code significantly:

- **Backend**
  - Add/update tests to cover new API behavior.
  - Always run `pnpm test` in `services/lineage-api/` before considering the change complete.
- **Frontend**
  - For UI changes, add or update tests/stories if applicable.
  - Always run `pnpm test` and `pnpm lint` at repo root.
- **End-to-end**
  - Maintain at least one e2e test that exercises the core flow:
    - Home → Document → Run → Tables/Narrative → click value → Lineage Drawer appears.
  - Prefer Playwright for browser automation.

Codex should **run the relevant tests** after making changes and fix failures when possible.

## Lineage-specific guidance

- The **Lineage Drawer** is a first-class UX component:
  - There should be a single shared component (e.g. `components/LineageDrawer.tsx`).
  - It is opened from:
    - Clicks on table cells in Run Detail / Tables,
    - Clicks on numeric tokens in Run Detail / Narrative.
  - It receives a generic `ValueRef` and calls backend APIs to fetch lineage and usage.

- Do not hard-code AQRR-specific logic in the backend:
  - Model AQRR as one possible `document_type`.
  - All endpoints should be reusable for other templates.

- When adding fields to APIs or schema, consider:
  - How a second UI (not this Next.js app) would consume it.
  - Whether the field is specific to AQRR or generally useful.

## Safety and approvals

- Do **not** store secrets in the repo.
- If you need environment variables:
  - Document them in README and sample `.env.example`.
- Before invasive refactors or multi-file changes:
  - Print a short step-by-step plan.
  - Prefer incremental changes over giant rewrites.
