import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createDocumentSchema } from "../models/schemas"
import { documentsService } from "../services/documents"

export async function documentsRoutes(app: FastifyInstance) {
  app.post("/documents", async (req, res) => {
    const parsed = createDocumentSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).send({ error: parsed.error.format() })
    }
    const doc = await documentsService.create(parsed.data)
    return res.status(201).send(doc)
  })

  app.get("/documents", async (req, res) => {
    const docs = await documentsService.list()
    return res.send({ items: docs, total: docs.length })
  })

  app.get("/documents/:documentId", async (req, res) => {
    const params = z.object({ documentId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const doc = await documentsService.getWithRuns(params.data.documentId)
    if (!doc) return res.status(404).send({ error: "Document not found" })
    return res.send(doc)
  })
}
