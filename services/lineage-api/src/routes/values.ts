import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createValuesSchema } from "../models/schemas"
import { valuesService } from "../services/values"

export async function valuesRoutes(app: FastifyInstance) {
  app.post("/runs/:runId/values", async (req, res) => {
    const params = z.object({ runId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const body = createValuesSchema.safeParse(req.body)
    if (!body.success) return res.status(400).send({ error: body.error.format() })
    const created = await valuesService.createMany(params.data.runId, body.data.values)
    return res.status(201).send({ values: created })
  })
}
