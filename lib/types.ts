import type { ValueRef } from "./domain"

// Core entities
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "analyst" | "viewer"
  lastActive: string
}

export interface Document {
  id: string
  name: string // e.g., "AQRR – Company XYZ – 2024"
  type: "AQRR" | "Credit Memo" | "Risk Report" | "Regulatory Filing"
  company: string
  period: string // e.g., "Q4 2024", "FY 2024"
  status: "draft" | "in_review" | "approved" | "published"
  createdBy: string
  createdAt: string
  updatedAt: string
  currentRunId: string | null
}

export interface Run {
  id: string
  documentId: string
  workflowName: string
  startTime: string
  endTime: string | null
  status: "running" | "completed" | "failed" | "pending"
  triggeredBy: string
  version: number // Run version for this document
}

// Content within a Run
export interface RunTable {
  id: string
  runId: string
  name: string // e.g., "HFA Table", "FSA Table", "Leverage Table"
  type: "hfa" | "fsa" | "leverage" | "credit" | "summary" | "custom"
  rowCount: number
  columnCount: number
}

export interface TableCell {
  rowIndex: number
  colIndex: number
  value: string | number
  isMetric: boolean
  valueRef?: ValueRef | null
}

export interface NarrativeSection {
  id: string
  runId: string
  name: string // e.g., "Financial Statement Analysis", "Credit Comparables"
  order: number
  tokens: NarrativeContentToken[]
}

export type NarrativeContentToken =
  | { type: "text"; text: string }
  | { type: "value"; text: string; valueRef: ValueRef }

export interface NarrativeMetric {
  id: string
  sectionId: string
  value: string
  displayText: string // e.g., "12%", "$1.2M"
  position: { start: number; end: number }
  lineageId: string | null
}

// Lineage (universal component data)
export interface LineageNode {
  id: string
  type: "source" | "transform" | "output"
  name: string
  metadata: Record<string, string>
}

export interface LineageData {
  cellId: string
  value: string | number
  sourceTable: string
  sourceCell: string
  transformations: string[]
  upstream: LineageNode[]
  downstream: LineageNode[]
}

// Activity/Audit
export interface Activity {
  id: string
  type: "document" | "run" | "approval"
  action: string
  user: string
  timestamp: string
  details: string
  documentId?: string
}

// Dashboard stats
export interface DashboardStats {
  totalDocuments: number
  totalRuns: number
  failedRuns: number
  pendingReviews: number
}
