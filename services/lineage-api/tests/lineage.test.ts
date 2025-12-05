import { describe, expect, it, beforeAll, afterAll } from "vitest"
import Fastify from "fastify"
import supertest from "supertest"
import { prisma } from "../src/db/prisma"
import { documentsRoutes } from "../src/routes/documents"
import { runsRoutes } from "../src/routes/runs"
import { valuesRoutes } from "../src/routes/values"
import { lineageRoutes } from "../src/routes/lineage"

const buildServer = () => {
  const app = Fastify()
  app.register(documentsRoutes, { prefix: "/api" })
  app.register(runsRoutes, { prefix: "/api" })
  app.register(valuesRoutes, { prefix: "/api" })
  app.register(lineageRoutes, { prefix: "/api" })
  return app
}

describe("Lineage API", () => {
  const app = buildServer()
  let docId = ""
  let runId = ""
  let v1 = ""
  let v2 = ""
  let vTarget = ""

  beforeAll(async () => {
    await prisma.lineageEdge.deleteMany()
    await prisma.value.deleteMany()
    await prisma.run.deleteMany()
    await prisma.document.deleteMany()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await prisma.$disconnect()
  })

  it("creates document and run, values and lineage, and fetches lineage", async () => {
    const createDoc = await supertest(app.server).post("/api/documents").send({
      type: "AQRR",
      entity: "TestCo",
      period: "Q4 2024",
      status: "draft",
    })
    expect(createDoc.status).toBe(201)
    docId = createDoc.body.id

    const createRun = await supertest(app.server).post(`/api/documents/${docId}/runs`).send({
      workflowName: "Test Flow",
      status: "completed",
    })
    expect(createRun.status).toBe(201)
    runId = createRun.body.id

    const createValues = await supertest(app.server).post(`/api/runs/${runId}/values`).send({
      values: [
        { label: "input1", value: "10" },
        { label: "input2", value: "20" },
        { label: "output", value: "30" },
      ],
    })
    expect(createValues.status).toBe(201)
    v1 = createValues.body.values[0].id
    v2 = createValues.body.values[1].id
    vTarget = createValues.body.values[2].id

    const createEdges = await supertest(app.server)
      .post(`/api/lineage/values/${vTarget}/edges`)
      .send({ inputs: [{ sourceValueId: v1 }, { sourceValueId: v2 }] })
    expect(createEdges.status).toBe(201)

    const lineage = await supertest(app.server).get(`/api/lineage/values/${vTarget}`)
    expect(lineage.status).toBe(200)
    expect(lineage.body.value.id).toBe(vTarget)
    const inputIds = lineage.body.inputs.map((i: any) => i.value.id)
    expect(inputIds).toContain(v1)
    expect(inputIds).toContain(v2)
  })
})
