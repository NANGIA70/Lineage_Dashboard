import type { FastifyPluginAsync } from "fastify"
import fastifyMetrics from "fastify-metrics"

export const metricsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyMetrics, {
    endpoint: "/metrics",
  })
}
