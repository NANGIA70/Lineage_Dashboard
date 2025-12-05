import { prisma } from "../db/prisma"
import type { Prisma } from "@prisma/client"

export const runsService = {
  create: (documentId: string, data: Prisma.RunUncheckedCreateInput) =>
    prisma.run.create({ data: { ...data, documentId } }),
  listForDocument: (documentId: string) =>
    prisma.run.findMany({ where: { documentId }, orderBy: { version: "desc" } }),
  get: (id: string) => prisma.run.findUnique({ where: { id } }),
}
