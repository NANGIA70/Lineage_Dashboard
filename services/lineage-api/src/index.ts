import Fastify from "fastify"
import cors from "@fastify/cors"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { documentsRoutes } from "./routes/documents"
import { runsRoutes } from "./routes/runs"
import { tablesRoutes } from "./routes/tables"
import { valuesRoutes } from "./routes/values"
import { lineageRoutes } from "./routes/lineage"
import { narrativeRoutes } from "./routes/narrative"
import { apiKeyAuth } from "./plugins/auth"
import { metricsPlugin } from "./plugins/metrics"
import { errorHandlerPlugin } from "./plugins/errors"

const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
})

server.register(cors, { origin: true })
server.register(swagger, { openapi: { info: { title: "Lineage API", version: "0.1.0" } } })
server.register(swaggerUi, { routePrefix: "/docs" })
server.register(metricsPlugin)
server.register(apiKeyAuth)
server.register(errorHandlerPlugin)

server.get("/healthcheck", async () => ({ status: "ok" }))
server.get("/ready", async () => ({ status: "ready" }))

server.register(documentsRoutes, { prefix: "/api" })
server.register(runsRoutes, { prefix: "/api" })
server.register(tablesRoutes, { prefix: "/api" })
server.register(valuesRoutes, { prefix: "/api" })
server.register(lineageRoutes, { prefix: "/api" })
server.register(narrativeRoutes, { prefix: "/api" })

const port = process.env.PORT ? Number(process.env.PORT) : 3001

server
  .listen({ port, host: "0.0.0.0" })
  .then(() => {
    server.log.info(`Lineage API listening on port ${port}`)
  })
  .catch((err) => {
    server.log.error(err)
    process.exit(1)
  })
