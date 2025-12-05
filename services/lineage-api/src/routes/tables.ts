import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createTablesSchema } from "../models/schemas"
import { tablesService } from "../services/tables"

export async function tablesRoutes(app: FastifyInstance) {
  app.post("/runs/:runId/tables", async (req, res) => {
    const params = z.object({ runId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const body = createTablesSchema.safeParse(req.body)
    if (!body.success) return res.status(400).send({ error: body.error.format() })
    const created = await tablesService.createMany(params.data.runId, body.data.tables)
    return res.status(201).send({ tables: created })
  })
}
