import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createRunSchema } from "../models/schemas"
import { runsService } from "../services/runs"

export async function runsRoutes(app: FastifyInstance) {
  app.post("/documents/:documentId/runs", async (req, res) => {
    const params = z.object({ documentId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const body = createRunSchema.safeParse(req.body)
    if (!body.success) return res.status(400).send({ error: body.error.format() })
    const run = await runsService.create(params.data.documentId, body.data)
    return res.status(201).send(run)
  })

  app.get("/documents/:documentId/runs", async (req, res) => {
    const params = z.object({ documentId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const runs = await runsService.listForDocument(params.data.documentId)
    return res.send({ items: runs, total: runs.length })
  })

  app.get("/runs/:runId", async (req, res) => {
    const params = z.object({ runId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const run = await runsService.get(params.data.runId)
    if (!run) return res.status(404).send({ error: "Run not found" })
    return res.send(run)
  })
}
