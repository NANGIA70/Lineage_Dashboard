import type { FastifyPluginAsync } from "fastify"

export const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, "Request error")
    const status = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500
    reply.status(status).send({ error: error.message || "Internal Server Error" })
  })
}
