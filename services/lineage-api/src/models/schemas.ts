import { z } from "zod"

export const createDocumentSchema = z.object({
  type: z.string(),
  entity: z.string(),
  period: z.string(),
  status: z.string(),
  metadata: z.any().optional(),
})

export const createRunSchema = z.object({
  version: z.number().int().optional(),
  workflowName: z.string(),
  status: z.string(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  triggeredBy: z.string().optional(),
  metadata: z.any().optional(),
})

export const createTablesSchema = z.object({
  tables: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      rowCount: z.number().int().optional(),
      columnCount: z.number().int().optional(),
      schema: z.any().optional(),
    }),
  ),
})

export const createValuesSchema = z.object({
  values: z.array(
    z.object({
      id: z.string().optional(),
      tableId: z.string().uuid().optional(),
      rowIndex: z.number().int().optional(),
      columnIndex: z.number().int().optional(),
      label: z.string().optional(),
      dataType: z.string().optional(),
      value: z.string().optional(),
      context: z.any().optional(),
    }),
  ),
})

export const createEdgesSchema = z.object({
  inputs: z.array(
    z.object({
      sourceValueId: z.string(),
      transformation: z.string().optional(),
      order: z.number().int().optional(),
    }),
  ),
})

export const createNarrativeSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string(),
      order: z.number().int(),
      chunks: z.array(
        z.object({
          content: z.string().optional(),
          contentTokens: z.any().optional(),
          primaryValueId: z.string().uuid().optional(),
          order: z.number().int(),
          relatedValueIds: z.array(z.string().uuid()).optional(),
        }),
      ),
    }),
  ),
})
