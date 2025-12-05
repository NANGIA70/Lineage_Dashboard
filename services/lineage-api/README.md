# lineage-api

Independent lineage microservice for documents, runs, tables, values, and lineage edges.

## Getting started

1. Copy env: `cp .env.example .env` and set `DATABASE_URL` (and `FASTIFY_API_KEY` if you want auth).
2. Install deps: `npm install`.
3. Migrate DB: `npm run db:migrate`.
4. Seed demo data: `npm run db:seed` (or `tsx prisma/seed-uat.ts` for richer UAT).
5. Run dev server: `npm run dev` (Fastify on port 3001 by default).

## Scripts
- `npm run dev` – start Fastify with tsx.
- `npm run build` – compile to `dist/`.
- `npm run start` – run compiled server.
- `npm run lint` – eslint.
- `npm run test` – vitest integration tests.
- `npm run db:migrate` – prisma migrate dev.
- `npm run db:seed` – seed demo data (defaults to prisma/seed.ts).
- `tsx prisma/seed-uat.ts` – richer UAT/demo seed.

## Endpoints (initial)
- `GET /healthcheck`
- `GET /ready`
- `GET /metrics`
- `POST /api/documents`, `GET /api/documents`, `GET /api/documents/:documentId`
- `POST /api/documents/:documentId/runs`, `GET /api/documents/:documentId/runs`, `GET /api/runs/:runId`
- `POST /api/runs/:runId/tables`
- `POST /api/runs/:runId/values`
- `POST /api/lineage/values/:valueId/edges`
- `GET /api/lineage/values/:valueId`
- `GET /api/lineage/values/:valueId/usages`
- `POST /api/runs/:runId/narrative/sections`
- `GET /api/runs/:runId/narrative`
- OpenAPI docs: `/docs`

## Example curls
- `curl http://localhost:3001/healthcheck`
- `curl http://localhost:3001/api/lineage/values/VAL-REV-Q4`
- With API key (if set): `curl -H "FASTIFY_API_KEY=yourkey" http://localhost:3001/api/lineage/values/VAL-GM-Q4`
