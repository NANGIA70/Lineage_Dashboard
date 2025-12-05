import { prisma } from "../db/prisma"

export const lineageService = {
  createEdges: (targetValueId: string, inputs: { sourceValueId: string; transformation?: string; order?: number }[]) =>
    prisma.$transaction(
      inputs.map((i) =>
        prisma.lineageEdge.create({
          data: {
            targetValueId,
            sourceValueId: i.sourceValueId,
            transformation: i.transformation,
            order: i.order,
          },
        }),
      ),
    ),

  getLineage: (valueId: string) =>
    prisma.value.findUnique({
      where: { id: valueId },
      include: {
        edgesTo: { include: { sourceValue: true } },
        edgesFrom: { include: { targetValue: true } },
        chunks: { include: { chunk: true } },
      },
    }),

  getUsages: (valueId: string) =>
    prisma.narrativeChunkValue.findMany({
      where: { valueId },
      include: { chunk: true },
    }),
}
