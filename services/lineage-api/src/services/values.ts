import { prisma } from "../db/prisma"
import type { Prisma } from "@prisma/client"

export const valuesService = {
  createMany: (runId: string, values: Omit<Prisma.ValueUncheckedCreateInput, "runId">[]) =>
    prisma.$transaction(
      values.map((v) =>
        prisma.value.create({
          data: { runId, ...v },
        }),
      ),
    ),
  get: (id: string) =>
    prisma.value.findUnique({
      where: { id },
      include: {
        edgesTo: { include: { sourceValue: true } },
        edgesFrom: { include: { targetValue: true } },
        chunks: { include: { chunk: true } },
      },
    }),
}
