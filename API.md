# lineage-api Microservice Guide

This service is a standalone HTTP/JSON API for documents, runs, tables, values, and lineage. It is UI-independent and can be consumed by any client (frontend, CLI, or another service).

## Base URL and Auth
- Base URL (default): `http://localhost:3001`
- API key: header `FASTIFY_API_KEY: <your_key>` required for all `/api/**` endpoints.
- Public endpoints (no key): `/healthcheck`, `/ready`, `/metrics`, `/docs`, `/openapi.json`.

## Health, Docs, Metrics
- `GET /healthcheck` → `{ "status": "ok" }`
- `GET /ready` → `{ "status": "ready" }`
- `GET /metrics` → Prometheus metrics
- `GET /openapi.json` → OpenAPI spec (JSON)
- `GET /docs` → Swagger UI

## Core Resources and Endpoints
### Documents
- `POST /api/documents`
  - Body: `{ type: string, entity: string, period: string, status: string, metadata?: any }`
  - 201: document object `{ id, type, entity, period, status, metadata, createdAt, updatedAt }`
- `GET /api/documents`
  - 200: `{ items: [document], total: number }`
- `GET /api/documents/:documentId`
  - 200: document with runs `{ ..., runs: [...] }`

### Runs
- `POST /api/documents/:documentId/runs`
  - Body: `{ version?: number, workflowName: string, status: string, startTime?: ISODate, endTime?: ISODate, triggeredBy?: string, metadata?: any }`
  - 201: run object `{ id, documentId, ... }`
- `GET /api/documents/:documentId/runs`
  - 200: `{ items: [run], total }`
- `GET /api/runs/:runId`
  - 200: run object

### Tables (bulk create for a run)
- `POST /api/runs/:runId/tables`
  - Body: `{ tables: [{ name: string, type: string, rowCount?: number, columnCount?: number, schema?: any }] }`
  - 201: `{ tables: [table] }`

### Values (bulk create for a run)
- `POST /api/runs/:runId/values`
  - Body: `{ values: [{ id?: string, tableId?: string, rowIndex?: number, columnIndex?: number, label?: string, dataType?: string, value?: string, context?: any }] }`
  - 201: `{ values: [value] }`
  - Note: `id` can be provided (e.g., `VAL-...`) to align with ValueRef; otherwise a UUID is generated.

### Lineage Edges
- `POST /api/lineage/values/:valueId/edges`
  - Body: `{ inputs: [{ sourceValueId: string, transformation?: string, order?: number }] }`
  - 201: `{ edges: [...] }`

### Lineage Query
- `GET /api/lineage/values/:valueId`
  - 200: `{ value: { id, label, value, dataType, runId, tableId, table?, rowIndex, columnIndex, context }, inputs: [{ value, edge }], outputs: [{ value, edge }], relatedNarrative: [{ chunkId, sectionId, runId, content }] }`
  - 404 if value not found.
- `GET /api/lineage/values/:valueId/usages`
  - 200: `{ tables: [{ tableId, rowIndex, columnIndex }], narratives: [{ chunkId, sectionId, runId }], runs: [{ runId }] }`

### Narrative
- `POST /api/runs/:runId/narrative/sections`
  - Body: `{ sections: [{ title: string, order: number, chunks: [{ content?: string, contentTokens?: any, primaryValueId?: string, order: number, relatedValueIds?: string[] }] }] }`
  - 201: `{ sections: [...] }`
- `GET /api/runs/:runId/narrative`
  - 200: `{ sections: [{ id, title, order, chunks: [...] }] }`

## Example cURL
```bash
# With API key
export API_KEY=yourkey
curl -H "FASTIFY_API_KEY: $API_KEY" http://localhost:3001/api/documents
curl -H "FASTIFY_API_KEY: $API_KEY" http://localhost:3001/api/lineage/values/VAL-REV-Q4
```

## Database Access
- Postgres connection string: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lineage_api?schema=public`
- Schema defined in `services/lineage-api/prisma/schema.prisma`:
  - Tables: documents, runs, tables, values, lineage_edges, narrative_sections, narrative_chunks, narrative_chunk_values, users (audit).
- Use Prisma Client in other services:
  ```ts
  import { PrismaClient } from "@prisma/client"
  const prisma = new PrismaClient()
  const doc = await prisma.document.findMany()
  ```

## Using as a Microservice in Another Project
1) Deploy lineage-api with Postgres; set `FASTIFY_API_KEY`.
2) Consume over HTTP using any client (fetch/axios); include `FASTIFY_API_KEY` header.
3) Use the generated TS client (`clients/lineage-client/`):
   ```ts
   import { createClient } from "lineage-client"
   const client = createClient({ baseUrl: "http://lineage-api:3001", apiKey: process.env.FASTIFY_API_KEY })
   const doc = await client.getDocument("DOC-ID")
   const runs = await client.listRuns(doc.id)
   const lineage = await client.getLineage("VAL-REV-Q4")
   ```

## Seed Data (UAT)
- Run `npm run db:seed-uat` in `services/lineage-api` to populate:
  - Documents: AQRR – Acme Q4 2024, Credit Memo – Sterling 2024, Risk Report – Quantum Q3 2024.
  - Runs: AQRR v3 (primary), v2; Credit Memo v1.
  - Values (examples): `VAL-REV-Q4`, `VAL-REV-GROWTH`, `VAL-GM-Q4`, `VAL-EBITDA-Q4`, `VAL-DEBT-Q4`, `VAL-LEVERAGE`, `VAL-DSCR`, `VAL-RATING`.
  - Edges: revenue growth, gross margin, EBITDA margin, leverage.
  - Narrative chunks referencing these IDs.
