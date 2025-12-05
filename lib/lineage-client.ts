import { sampleLineageData } from "./placeholder-data"
import type { ValueRef } from "./domain"
import type { LineageData } from "./types"

const LINEAGE_API_BASE_URL = process.env.LINEAGE_API_BASE_URL || "http://localhost:3001"

export async function fetchLineage(valueRef: ValueRef | undefined): Promise<LineageData> {
  if (!valueRef?.valueId) return sampleLineageData
  try {
    const res = await fetch(`${LINEAGE_API_BASE_URL}/api/lineage/values/${valueRef.valueId}`)
    if (!res.ok) {
      console.warn(`Lineage API non-200 (${res.status}); falling back to mock`)
      return sampleLineageData
    }
    const data = await res.json()
    return {
      cellId: data.value.id,
      value: data.value.value ?? data.value.label ?? "",
      sourceTable: data.value.table?.name ?? data.value.tableId ?? "unknown",
      sourceCell: `${data.value.rowIndex ?? "-"},${data.value.columnIndex ?? "-"}`,
      transformations: data.inputs?.map((i: any) => i.edge?.transformation).filter(Boolean) ?? [],
      upstream:
        data.inputs?.map((i: any) => ({
          id: i.value.id,
          type: "source",
          name: i.value.label ?? i.value.id,
          metadata: { dataType: i.value.dataType ?? "" },
        })) ?? [],
      downstream:
        data.outputs?.map((o: any) => ({
          id: o.value.id,
          type: "output",
          name: o.value.label ?? o.value.id,
          metadata: { dataType: o.value.dataType ?? "" },
        })) ?? [],
    }
  } catch (err) {
    console.warn("Lineage API fetch failed, falling back to mock:", err)
    return sampleLineageData
  }
}
