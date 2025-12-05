# Lineage Dashboard (Frontend + lineage-api)

This repo contains:
- Next.js frontend (app router) for the Lineage Dashboard.
- Independent lineage-api service (`services/lineage-api/`) built with Fastify + Prisma + Postgres.
- Frontend `ValueRef.valueId` maps 1:1 to `values.id` in the lineage-api database for lineage queries.

## Quick start (demo/UAT)
1) Start Postgres + lineage-api (docker-compose):
   - `docker compose up -d postgres`
   - `cd services/lineage-api`
   - `export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lineage_api?schema=public`
   - `npm run db:migrate`
   - `npm run db:seed` or `tsx prisma/seed-uat.ts` (richer UAT)
   - `npm run dev` (lineage-api on 3001)
2) Frontend:
   - In repo root `.env.local`: `LINEAGE_API_BASE_URL=http://localhost:3001`
   - `npm install`
   - `npm run dev` (Next.js on 3000)
3) Open http://localhost:3000 and follow `UAT.md` for the click-through steps.

## Frontend structure
- DashboardLayout shell with Home, Documents, Admin.
- Document Detail: metadata + runs table (click to run detail).
- Run Detail: Overview, Tables, Narrative tabs; clicking values opens the Lineage Drawer fetching `/api/lineage/values/:valueId`.

For detailed UAT steps, see `UAT.md`.
