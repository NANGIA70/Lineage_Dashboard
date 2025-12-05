import { prisma } from "../db/prisma"
import type { Prisma } from "@prisma/client"

export const narrativeService = {
  createSections: (runId: string, sections: { title: string; order: number; chunks: {
    content?: string;
    contentTokens?: Prisma.JsonValue;
    primaryValueId?: string;
    order: number;
    relatedValueIds?: string[];
  }[] }[]) =>
    prisma.$transaction(
      sections.map((section) =>
        prisma.narrativeSection.create({
          data: {
            runId,
            title: section.title,
            order: section.order,
            chunks: {
              create: section.chunks.map((chunk) => ({
                runId,
                content: chunk.content,
                contentTokens: chunk.contentTokens,
                primaryValueId: chunk.primaryValueId,
                order: chunk.order,
                values: {
                  create: (chunk.relatedValueIds ?? []).map((valueId) => ({ valueId })),
                },
              })),
            },
          },
          include: { chunks: true },
        }),
      ),
    ),

  listSections: (runId: string) =>
    prisma.narrativeSection.findMany({
      where: { runId },
      include: { chunks: { include: { values: true } } },
      orderBy: { order: "asc" },
    }),
}
