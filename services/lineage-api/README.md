# lineage-api

Independent lineage microservice for documents, runs, tables, values, and lineage edges.

## Getting started

1. Copy env: `cp .env.example .env` and set `DATABASE_URL`.
2. Install deps: `pnpm install` (or `npm install`).
3. Migrate DB: `pnpm db:migrate`.
4. Seed demo data: `pnpm db:seed`.
5. Run dev server: `pnpm dev` (Fastify on port 3001 by default).

## Scripts
- `pnpm dev` – start Fastify with tsx.
- `pnpm build` – compile to `dist/`.
- `pnpm start` – run compiled server.
- `pnpm lint` – eslint.
- `pnpm test` – vitest integration tests.
- `pnpm db:migrate` – prisma migrate dev.
- `pnpm db:seed` – seed demo data.

## Endpoints (initial)
- `GET /healthcheck`
- `POST /api/documents`, `GET /api/documents`, `GET /api/documents/:documentId`
- `POST /api/documents/:documentId/runs`, `GET /api/documents/:documentId/runs`, `GET /api/runs/:runId`
- `POST /api/runs/:runId/tables`
- `POST /api/runs/:runId/values`
- `POST /api/lineage/values/:valueId/edges`
- `GET /api/lineage/values/:valueId`
- `GET /api/lineage/values/:valueId/usages`
- `POST /api/runs/:runId/narrative/sections`
- `GET /api/runs/:runId/narrative`
