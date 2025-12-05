import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createNarrativeSchema } from "../models/schemas"
import { narrativeService } from "../services/narrative"

export async function narrativeRoutes(app: FastifyInstance) {
  app.post("/runs/:runId/narrative/sections", async (req, res) => {
    const params = z.object({ runId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const body = createNarrativeSchema.safeParse(req.body)
    if (!body.success) return res.status(400).send({ error: body.error.format() })

    const sections = await narrativeService.createSections(params.data.runId, body.data.sections)

    return res.status(201).send({ sections })
  })

  app.get("/runs/:runId/narrative", async (req, res) => {
    const params = z.object({ runId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })

    const sections = await narrativeService.listSections(params.data.runId)
    return res.send({ sections })
  })
}
