import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { createEdgesSchema } from "../models/schemas"
import { lineageService } from "../services/lineage"
import { valuesService } from "../services/values"

export async function lineageRoutes(app: FastifyInstance) {
  app.post("/lineage/values/:valueId/edges", async (req, res) => {
    const params = z.object({ valueId: z.string() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })
    const body = createEdgesSchema.safeParse(req.body)
    if (!body.success) return res.status(400).send({ error: body.error.format() })

    const edges = await lineageService.createEdges(params.data.valueId, body.data.inputs)
    return res.status(201).send({ edges })
  })

  app.get("/lineage/values/:valueId", async (req, res) => {
    const params = z.object({ valueId: z.string() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })

    const value = await valuesService.get(params.data.valueId)
    if (!value) return res.status(404).send({ error: "Value not found" })

    const inputs = value.edgesTo.map((edge) => ({ edge, value: edge.sourceValue }))
    const outputs = value.edgesFrom.map((edge) => ({ edge, value: edge.targetValue }))

    const relatedNarrative = value.chunks.map((c) => ({
      chunkId: c.chunkId,
      sectionId: c.chunk.sectionId,
      runId: c.chunk.runId,
      content: c.chunk.content,
    }))

    return res.send({
      value: {
        id: value.id,
        label: value.label,
        dataType: value.dataType,
        value: value.value,
        context: value.context,
        runId: value.runId,
        tableId: value.tableId,
        rowIndex: value.rowIndex,
        columnIndex: value.columnIndex,
      },
      inputs,
      outputs,
      relatedNarrative,
    })
  })

  app.get("/lineage/values/:valueId/usages", async (req, res) => {
    const params = z.object({ valueId: z.string().uuid() }).safeParse(req.params)
    if (!params.success) return res.status(400).send({ error: params.error.format() })

    const valueId = params.data.valueId
    const tableUsage = await prisma.value.findUnique({
      where: { id: valueId },
      select: { tableId: true, rowIndex: true, columnIndex: true, runId: true },
    })

    const narrativeUsages = await lineageService.getUsages(valueId)

    return res.send({
      tables: tableUsage
        ? [{ tableId: tableUsage.tableId, rowIndex: tableUsage.rowIndex, columnIndex: tableUsage.columnIndex }]
        : [],
      narratives: narrativeUsages.map((u) => ({
        chunkId: u.chunkId,
        sectionId: u.chunk.sectionId,
        runId: u.chunk.runId,
      })),
      runs: tableUsage ? [{ runId: tableUsage.runId }] : [],
    })
  })
}
