import { prisma } from "../db/prisma"
import type { Prisma } from "@prisma/client"

export const tablesService = {
  createMany: (runId: string, tables: Omit<Prisma.TableUncheckedCreateInput, "runId">[]) =>
    prisma.$transaction(
      tables.map((t) =>
        prisma.table.create({
          data: { runId, ...t },
        }),
      ),
    ),
}
