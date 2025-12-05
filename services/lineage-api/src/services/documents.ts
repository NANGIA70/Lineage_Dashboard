import { prisma } from "../db/prisma"
import type { Prisma } from "@prisma/client"

export const documentsService = {
  create: (data: Prisma.DocumentCreateInput) => prisma.document.create({ data }),
  list: () => prisma.document.findMany({ orderBy: { createdAt: "desc" } }),
  getWithRuns: (id: string) =>
    prisma.document.findUnique({
      where: { id },
      include: { runs: true },
    }),
}
