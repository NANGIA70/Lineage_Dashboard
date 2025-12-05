import type {
  User,
  Document,
  Run,
  RunTable,
  NarrativeSection,
  Activity,
  DashboardStats,
  LineageData,
  TableCell,
} from "./types"

// Users
export const users: User[] = [
  { id: "USR-001", name: "John Doe", email: "john.doe@company.com", role: "admin", lastActive: "2024-12-04T10:30:00Z" },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "analyst",
    lastActive: "2024-12-04T10:25:00Z",
  },
  {
    id: "USR-003",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "analyst",
    lastActive: "2024-12-04T09:15:00Z",
  },
  {
    id: "USR-004",
    name: "Sarah Jones",
    email: "sarah.jones@company.com",
    role: "viewer",
    lastActive: "2024-12-03T16:00:00Z",
  },
]

// Current user (simulated login)
export const currentUser = users[0]

// Documents
export const documents: Document[] = [
  {
    id: "DOC-001",
    name: "AQRR – Acme Corp – Q4 2024",
    type: "AQRR",
    company: "Acme Corp",
    period: "Q4 2024",
    status: "in_review",
    createdBy: "USR-001",
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-12-04T08:45:00Z",
    currentRunId: "RUN-001",
  },
  {
    id: "DOC-002",
    name: "AQRR – GlobalTech Inc – FY 2024",
    type: "AQRR",
    company: "GlobalTech Inc",
    period: "FY 2024",
    status: "draft",
    createdBy: "USR-002",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-04T09:30:00Z",
    currentRunId: "RUN-003",
  },
  {
    id: "DOC-003",
    name: "Credit Memo – Sterling Partners – 2024",
    type: "Credit Memo",
    company: "Sterling Partners",
    period: "2024",
    status: "approved",
    createdBy: "USR-001",
    createdAt: "2024-10-20T14:00:00Z",
    updatedAt: "2024-11-30T16:00:00Z",
    currentRunId: "RUN-005",
  },
  {
    id: "DOC-004",
    name: "Risk Report – Quantum Holdings – Q3 2024",
    type: "Risk Report",
    company: "Quantum Holdings",
    period: "Q3 2024",
    status: "published",
    createdBy: "USR-003",
    createdAt: "2024-09-01T08:00:00Z",
    updatedAt: "2024-10-15T12:00:00Z",
    currentRunId: "RUN-007",
  },
  {
    id: "DOC-005",
    name: "AQRR – Nexus Financial – Q4 2024",
    type: "AQRR",
    company: "Nexus Financial",
    period: "Q4 2024",
    status: "draft",
    createdBy: "USR-002",
    createdAt: "2024-12-02T11:00:00Z",
    updatedAt: "2024-12-03T15:30:00Z",
    currentRunId: null,
  },
]

// Runs
export const runs: Run[] = [
  {
    id: "RUN-001",
    documentId: "DOC-001",
    workflowName: "AQRR Generation Pipeline",
    startTime: "2024-12-04T08:00:00Z",
    endTime: "2024-12-04T08:45:00Z",
    status: "completed",
    triggeredBy: "USR-001",
    version: 3,
  },
  {
    id: "RUN-002",
    documentId: "DOC-001",
    workflowName: "AQRR Generation Pipeline",
    startTime: "2024-12-03T14:00:00Z",
    endTime: "2024-12-03T14:30:00Z",
    status: "completed",
    triggeredBy: "USR-001",
    version: 2,
  },
  {
    id: "RUN-003",
    documentId: "DOC-002",
    workflowName: "AQRR Generation Pipeline",
    startTime: "2024-12-04T09:00:00Z",
    endTime: null,
    status: "running",
    triggeredBy: "USR-002",
    version: 1,
  },
  {
    id: "RUN-004",
    documentId: "DOC-001",
    workflowName: "AQRR Generation Pipeline",
    startTime: "2024-12-02T10:00:00Z",
    endTime: "2024-12-02T10:05:00Z",
    status: "failed",
    triggeredBy: "USR-001",
    version: 1,
  },
  {
    id: "RUN-005",
    documentId: "DOC-003",
    workflowName: "Credit Memo Pipeline",
    startTime: "2024-11-30T15:00:00Z",
    endTime: "2024-11-30T16:00:00Z",
    status: "completed",
    triggeredBy: "USR-001",
    version: 2,
  },
  {
    id: "RUN-006",
    documentId: "DOC-003",
    workflowName: "Credit Memo Pipeline",
    startTime: "2024-11-28T10:00:00Z",
    endTime: "2024-11-28T10:45:00Z",
    status: "completed",
    triggeredBy: "USR-001",
    version: 1,
  },
  {
    id: "RUN-007",
    documentId: "DOC-004",
    workflowName: "Risk Report Pipeline",
    startTime: "2024-10-15T10:00:00Z",
    endTime: "2024-10-15T12:00:00Z",
    status: "completed",
    triggeredBy: "USR-003",
    version: 1,
  },
]

// Tables within runs
export const runTables: RunTable[] = [
  { id: "TBL-001", runId: "RUN-001", name: "Historical Financial Analysis", type: "hfa", rowCount: 15, columnCount: 8 },
  { id: "TBL-002", runId: "RUN-001", name: "Financial Statement Analysis", type: "fsa", rowCount: 20, columnCount: 6 },
  { id: "TBL-003", runId: "RUN-001", name: "Leverage Analysis", type: "leverage", rowCount: 10, columnCount: 5 },
  { id: "TBL-004", runId: "RUN-001", name: "Credit Comparables", type: "credit", rowCount: 12, columnCount: 7 },
  { id: "TBL-005", runId: "RUN-005", name: "Credit Summary", type: "summary", rowCount: 8, columnCount: 4 },
  { id: "TBL-006", runId: "RUN-005", name: "Peer Comparison", type: "credit", rowCount: 15, columnCount: 6 },
]

// Narrative sections
export const narrativeSections: NarrativeSection[] = [
  {
    id: "NAR-001",
    runId: "RUN-001",
    name: "Executive Summary",
    order: 1,
    tokens: [
      { type: "text", text: "Acme Corp demonstrated solid financial performance in Q4 2024, with revenue growth of " },
      { type: "value", text: "12.5%", valueRef: { valueId: "VAL-REV-GROWTH" } },
      { type: "text", text: " year-over-year. The company's EBITDA margin improved to " },
      { type: "value", text: "24.3%", valueRef: { valueId: "VAL-EBITDA-MARGIN" } },
      { type: "text", text: ", reflecting operational efficiencies and cost management initiatives. Total debt stands at " },
      { type: "value", text: "$450M", valueRef: { valueId: "VAL-TOTAL-DEBT" } },
      { type: "text", text: ", resulting in a leverage ratio of " },
      { type: "value", text: "2.8x", valueRef: { valueId: "VAL-LEVERAGE" } },
      { type: "text", text: "." },
    ],
  },
  {
    id: "NAR-002",
    runId: "RUN-001",
    name: "Financial Statement Analysis",
    order: 2,
    tokens: [
      { type: "text", text: "Revenue for the quarter reached " },
      { type: "value", text: "$892M", valueRef: { valueId: "VAL-REV-Q4" } },
      { type: "text", text: ", up from " },
      { type: "value", text: "$793M", valueRef: { valueId: "VAL-REV-Q4-PRIOR" } },
      { type: "text", text: " in the prior year period. Gross profit margin expanded by " },
      { type: "value", text: "150bps", valueRef: { valueId: "VAL-GP-BPS" } },
      { type: "text", text: " to " },
      { type: "value", text: "42.1%", valueRef: { valueId: "VAL-GP-MARGIN" } },
      { type: "text", text: ". Operating expenses as a percentage of revenue decreased to " },
      { type: "value", text: "18.2%", valueRef: { valueId: "VAL-OPEX-RATIO" } },
      { type: "text", text: ", demonstrating improved operational leverage." },
    ],
  },
  {
    id: "NAR-003",
    runId: "RUN-001",
    name: "Credit Analysis",
    order: 3,
    tokens: [
      { type: "text", text: "The company maintains a strong credit profile with interest coverage of " },
      { type: "value", text: "5.2x", valueRef: { valueId: "VAL-INT-COV" } },
      { type: "text", text: " and fixed charge coverage of " },
      { type: "value", text: "3.1x", valueRef: { valueId: "VAL-FCC" } },
      { type: "text", text: ". Liquidity remains robust with " },
      { type: "value", text: "$125M", valueRef: { valueId: "VAL-CASH" } },
      { type: "text", text: " in cash and " },
      { type: "value", text: "$200M", valueRef: { valueId: "VAL-RCF" } },
      { type: "text", text: " available under the revolving credit facility. Net debt to EBITDA improved to " },
      { type: "value", text: "2.3x", valueRef: { valueId: "VAL-ND-EBITDA" } },
      { type: "text", text: " from " },
      { type: "value", text: "2.7x", valueRef: { valueId: "VAL-ND-EBITDA-PRIOR" } },
      { type: "text", text: " in the prior quarter." },
    ],
  },
  {
    id: "NAR-004",
    runId: "RUN-001",
    name: "Risk Factors",
    order: 4,
    tokens: [
      { type: "text", text: "Key risks include exposure to commodity price volatility, which impacted " },
      { type: "value", text: "8%", valueRef: { valueId: "VAL-COMMODITY-IMPACT" } },
      { type: "text", text: " of revenue in the quarter. Customer concentration remains elevated, with the top 5 customers representing " },
      { type: "value", text: "45%", valueRef: { valueId: "VAL-CUST-CONC" } },
      { type: "text", text: " of total revenue. Foreign exchange exposure affected margins by approximately " },
      { type: "value", text: "$12M", valueRef: { valueId: "VAL-FX-IMPACT" } },
      { type: "text", text: "." },
    ],
  },
  {
    id: "NAR-005",
    runId: "RUN-005",
    name: "Credit Recommendation",
    order: 1,
    tokens: [
      { type: "text", text: "Based on our analysis, Sterling Partners demonstrates strong creditworthiness with a recommended internal rating of " },
      { type: "value", text: "BBB+", valueRef: { valueId: "VAL-RATING" } },
      { type: "text", text: ". The company's debt service coverage ratio of " },
      { type: "value", text: "2.4x", valueRef: { valueId: "VAL-DSCR" } },
      { type: "text", text: " and current ratio of " },
      { type: "value", text: "1.8x", valueRef: { valueId: "VAL-CR" } },
      { type: "text", text: " indicate adequate liquidity. We recommend approval of the " },
      { type: "value", text: "$75M", valueRef: { valueId: "VAL-FACILITY" } },
      { type: "text", text: " credit facility request." },
    ],
  },
]

// Sample table data for a specific table
export const sampleTableData: { headers: string[]; rows: TableCell[][] } = {
  headers: ["Metric", "Q4 2024", "Q3 2024", "Q4 2023", "YoY Change", "QoQ Change"],
  rows: [
    [
      { rowIndex: 0, colIndex: 0, value: "Revenue", isMetric: false, valueRef: null },
      { rowIndex: 0, colIndex: 1, value: "$892M", isMetric: true, valueRef: { valueId: "VAL-REV-Q4" } },
      { rowIndex: 0, colIndex: 2, value: "$845M", isMetric: true, valueRef: { valueId: "VAL-REV-Q3" } },
      { rowIndex: 0, colIndex: 3, value: "$793M", isMetric: true, valueRef: { valueId: "VAL-REV-Q4-PRIOR" } },
      { rowIndex: 0, colIndex: 4, value: "12.5%", isMetric: true, valueRef: { valueId: "VAL-REV-GROWTH" } },
      { rowIndex: 0, colIndex: 5, value: "5.6%", isMetric: true, valueRef: { valueId: "VAL-REV-QOQ" } },
    ],
    [
      { rowIndex: 1, colIndex: 0, value: "Gross Profit", isMetric: false, valueRef: null },
      { rowIndex: 1, colIndex: 1, value: "$375M", isMetric: true, valueRef: { valueId: "VAL-GP-Q4" } },
      { rowIndex: 1, colIndex: 2, value: "$352M", isMetric: true, valueRef: { valueId: "VAL-GP-Q3" } },
      { rowIndex: 1, colIndex: 3, value: "$322M", isMetric: true, valueRef: { valueId: "VAL-GP-Q4-PRIOR" } },
      { rowIndex: 1, colIndex: 4, value: "16.5%", isMetric: true, valueRef: { valueId: "VAL-GP-YOY" } },
      { rowIndex: 1, colIndex: 5, value: "6.5%", isMetric: true, valueRef: { valueId: "VAL-GP-QOQ" } },
    ],
    [
      { rowIndex: 2, colIndex: 0, value: "Gross Margin", isMetric: false, valueRef: null },
      { rowIndex: 2, colIndex: 1, value: "42.1%", isMetric: true, valueRef: { valueId: "VAL-GM-Q4" } },
      { rowIndex: 2, colIndex: 2, value: "41.7%", isMetric: true, valueRef: { valueId: "VAL-GM-Q3" } },
      { rowIndex: 2, colIndex: 3, value: "40.6%", isMetric: true, valueRef: { valueId: "VAL-GM-Q4-PRIOR" } },
      { rowIndex: 2, colIndex: 4, value: "+150bps", isMetric: true, valueRef: { valueId: "VAL-GM-YOY" } },
      { rowIndex: 2, colIndex: 5, value: "+40bps", isMetric: true, valueRef: { valueId: "VAL-GM-QOQ" } },
    ],
    [
      { rowIndex: 3, colIndex: 0, value: "EBITDA", isMetric: false, valueRef: null },
      { rowIndex: 3, colIndex: 1, value: "$217M", isMetric: true, valueRef: { valueId: "VAL-EBITDA-Q4" } },
      { rowIndex: 3, colIndex: 2, value: "$198M", isMetric: true, valueRef: { valueId: "VAL-EBITDA-Q3" } },
      { rowIndex: 3, colIndex: 3, value: "$178M", isMetric: true, valueRef: { valueId: "VAL-EBITDA-Q4-PRIOR" } },
      { rowIndex: 3, colIndex: 4, value: "21.9%", isMetric: true, valueRef: { valueId: "VAL-EBITDA-YOY" } },
      { rowIndex: 3, colIndex: 5, value: "9.6%", isMetric: true, valueRef: { valueId: "VAL-EBITDA-QOQ" } },
    ],
    [
      { rowIndex: 4, colIndex: 0, value: "EBITDA Margin", isMetric: false, valueRef: null },
      { rowIndex: 4, colIndex: 1, value: "24.3%", isMetric: true, valueRef: { valueId: "VAL-EBITDA-MARGIN" } },
      { rowIndex: 4, colIndex: 2, value: "23.4%", isMetric: true, valueRef: { valueId: "VAL-EBITDA-MARGIN-Q3" } },
      { rowIndex: 4, colIndex: 3, value: "22.4%", isMetric: true, valueRef: { valueId: "VAL-EBITDA-MARGIN-PRIOR" } },
      { rowIndex: 4, colIndex: 4, value: "+190bps", isMetric: true, valueRef: { valueId: "VAL-EBITDA-MARGIN-YOY" } },
      { rowIndex: 4, colIndex: 5, value: "+90bps", isMetric: true, valueRef: { valueId: "VAL-EBITDA-MARGIN-QOQ" } },
    ],
    [
      { rowIndex: 5, colIndex: 0, value: "Net Income", isMetric: false, valueRef: null },
      { rowIndex: 5, colIndex: 1, value: "$98M", isMetric: true, valueRef: { valueId: "VAL-NI-Q4" } },
      { rowIndex: 5, colIndex: 2, value: "$89M", isMetric: true, valueRef: { valueId: "VAL-NI-Q3" } },
      { rowIndex: 5, colIndex: 3, value: "$76M", isMetric: true, valueRef: { valueId: "VAL-NI-Q4-PRIOR" } },
      { rowIndex: 5, colIndex: 4, value: "28.9%", isMetric: true, valueRef: { valueId: "VAL-NI-YOY" } },
      { rowIndex: 5, colIndex: 5, value: "10.1%", isMetric: true, valueRef: { valueId: "VAL-NI-QOQ" } },
    ],
    [
      { rowIndex: 6, colIndex: 0, value: "Total Debt", isMetric: false, valueRef: null },
      { rowIndex: 6, colIndex: 1, value: "$450M", isMetric: true, valueRef: { valueId: "VAL-DEBT-Q4" } },
      { rowIndex: 6, colIndex: 2, value: "$475M", isMetric: true, valueRef: { valueId: "VAL-DEBT-Q3" } },
      { rowIndex: 6, colIndex: 3, value: "$520M", isMetric: true, valueRef: { valueId: "VAL-DEBT-Q4-PRIOR" } },
      { rowIndex: 6, colIndex: 4, value: "-13.5%", isMetric: true, valueRef: { valueId: "VAL-DEBT-YOY" } },
      { rowIndex: 6, colIndex: 5, value: "-5.3%", isMetric: true, valueRef: { valueId: "VAL-DEBT-QOQ" } },
    ],
    [
      { rowIndex: 7, colIndex: 0, value: "Leverage (Debt/EBITDA)", isMetric: false, valueRef: null },
      { rowIndex: 7, colIndex: 1, value: "2.8x", isMetric: true, valueRef: { valueId: "VAL-LEVERAGE" } },
      { rowIndex: 7, colIndex: 2, value: "3.0x", isMetric: true, valueRef: { valueId: "VAL-LEVERAGE-Q3" } },
      { rowIndex: 7, colIndex: 3, value: "3.5x", isMetric: true, valueRef: { valueId: "VAL-LEVERAGE-Q4-PRIOR" } },
      { rowIndex: 7, colIndex: 4, value: "-0.7x", isMetric: true, valueRef: { valueId: "VAL-LEVERAGE-YOY" } },
      { rowIndex: 7, colIndex: 5, value: "-0.2x", isMetric: true, valueRef: { valueId: "VAL-LEVERAGE-QOQ" } },
    ],
  ],
}

// Sample lineage data
export const sampleLineageData: LineageData = {
  cellId: "VAL-REV-Q4",
  value: "$892M",
  sourceTable: "Revenue_Actuals_Q4_2024",
  sourceCell: "B15",
  transformations: ["Sum of regional revenues", "Currency conversion (EUR → USD)", "Rounding to nearest million"],
  upstream: [
    { id: "UP-001", type: "source", name: "SAP Revenue Extract", metadata: { system: "SAP ERP", table: "VBRK" } },
    {
      id: "UP-002",
      type: "source",
      name: "Regional Sales Data",
      metadata: { system: "Salesforce", object: "Opportunity" },
    },
    {
      id: "UP-003",
      type: "transform",
      name: "Currency Conversion",
      metadata: { rate: "1.08 EUR/USD", date: "2024-12-31" },
    },
  ],
  downstream: [
    { id: "DN-001", type: "output", name: "Revenue Growth %", metadata: { formula: "(Current - Prior) / Prior" } },
    { id: "DN-002", type: "output", name: "EBITDA Margin", metadata: { formula: "EBITDA / Revenue" } },
  ],
}

// Activities
export const activities: Activity[] = [
  {
    id: "ACT-001",
    type: "run",
    action: "completed",
    user: "john.doe@company.com",
    timestamp: "2024-12-04T08:45:00Z",
    details: "Run completed for AQRR – Acme Corp – Q4 2024",
    documentId: "DOC-001",
  },
  {
    id: "ACT-002",
    type: "document",
    action: "updated",
    user: "jane.smith@company.com",
    timestamp: "2024-12-04T09:30:00Z",
    details: "AQRR – GlobalTech Inc – FY 2024 updated",
    documentId: "DOC-002",
  },
  {
    id: "ACT-003",
    type: "run",
    action: "started",
    user: "jane.smith@company.com",
    timestamp: "2024-12-04T09:00:00Z",
    details: "Run started for AQRR – GlobalTech Inc – FY 2024",
    documentId: "DOC-002",
  },
  {
    id: "ACT-004",
    type: "approval",
    action: "approved",
    user: "mike.wilson@company.com",
    timestamp: "2024-11-30T16:00:00Z",
    details: "Credit Memo – Sterling Partners approved",
    documentId: "DOC-003",
  },
  {
    id: "ACT-005",
    type: "run",
    action: "failed",
    user: "john.doe@company.com",
    timestamp: "2024-12-02T10:05:00Z",
    details: "Run failed for AQRR – Acme Corp – Q4 2024: Data validation error",
    documentId: "DOC-001",
  },
]

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalDocuments: documents.length,
  totalRuns: runs.length,
  failedRuns: runs.filter((r) => r.status === "failed").length,
  pendingReviews: documents.filter((d) => d.status === "in_review").length,
}

// Helper functions
export function getDocumentById(id: string): Document | undefined {
  return documents.find((d) => d.id === id)
}

export function getRunsByDocumentId(documentId: string): Run[] {
  return runs.filter((r) => r.documentId === documentId).sort((a, b) => b.version - a.version)
}

export function getRunById(id: string): Run | undefined {
  return runs.find((r) => r.id === id)
}

export function getTablesByRunId(runId: string): RunTable[] {
  return runTables.filter((t) => t.runId === runId)
}

export function getNarrativesByRunId(runId: string): NarrativeSection[] {
  return narrativeSections.filter((n) => n.runId === runId).sort((a, b) => a.order - b.order)
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getMyDocuments(userId: string): Document[] {
  return documents.filter((d) => d.createdBy === userId)
}
