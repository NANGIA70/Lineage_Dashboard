// Types for the Lineage Dashboard

export interface Run {
  id: string
  workflow: string
  startTime: string
  endTime: string | null
  status: "running" | "completed" | "failed" | "pending"
  owner: string
}

export interface Metric {
  id: string
  name: string
  context: string
  period: string
  entity: string
  value: number
  units: string
  lastUpdated: string
}

export interface Dataset {
  id: string
  name: string
  type: string
  source: string
  version: string
  lastUpdated: string
}

export interface Narrative {
  id: string
  name: string
  runId: string
  section: string
  createdAt: string
  content: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "analyst" | "viewer"
  lastActive: string
}

export interface Activity {
  id: string
  type: "run" | "metric" | "dataset" | "narrative"
  action: string
  user: string
  timestamp: string
  details: string
}
