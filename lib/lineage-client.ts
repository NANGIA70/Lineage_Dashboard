import { sampleLineageData } from "./placeholder-data"
import type { ValueRef } from "./domain"
import type { LineageData } from "./types"

export function fetchLineage(_valueRef: ValueRef | undefined): LineageData {
  // TODO: replace with real HTTP call to lineage service using valueRef
  return sampleLineageData
}
