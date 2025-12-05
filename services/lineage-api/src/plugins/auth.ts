import type { FastifyPluginAsync } from "fastify"

export const apiKeyAuth: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("onRequest", async (request, reply) => {
    const requiredKey = process.env.FASTIFY_API_KEY
    if (!requiredKey) return
    const headerKey =
      (request.headers["fastify_api_key"] as string | undefined) ||
      (request.headers["FASTIFY_API_KEY"] as string | undefined) ||
      (request.headers["fastify-api-key"] as string | undefined)
    if (headerKey !== requiredKey) {
      return reply.code(401).send({ error: "Unauthorized" })
    }
  })
}
