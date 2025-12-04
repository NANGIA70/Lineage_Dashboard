"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table/data-table"
import { datasets } from "@/lib/placeholder-data"
import type { Dataset } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const typeColors: Record<string, string> = {
  Table: "bg-primary/20 text-primary",
  "Time Series": "bg-success/20 text-success",
  Reference: "bg-warning/20 text-warning",
  Configuration: "bg-muted text-muted-foreground",
}

const columns = [
  { key: "name", header: "Name", sortable: true },
  {
    key: "type",
    header: "Type",
    sortable: true,
    render: (dataset: Dataset) => (
      <Badge variant="secondary" className={typeColors[dataset.type] || "bg-secondary text-secondary-foreground"}>
        {dataset.type}
      </Badge>
    ),
  },
  { key: "source", header: "Source", sortable: true },
  {
    key: "version",
    header: "Version",
    render: (dataset: Dataset) => (
      <code className="rounded bg-secondary px-2 py-1 text-xs font-mono">{dataset.version}</code>
    ),
  },
  {
    key: "lastUpdated",
    header: "Last Updated",
    sortable: true,
    render: (dataset: Dataset) => formatDateTime(dataset.lastUpdated),
  },
]

export default function DatasetsPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Datasets Explorer</h2>
          <p className="text-muted-foreground">Browse and inspect data sources</p>
        </div>

        <DataTable
          data={datasets}
          columns={columns}
          searchKeys={["name", "type", "source"]}
          onRowClick={(dataset) => router.push(`/datasets/${dataset.id}`)}
        />
      </div>
    </DashboardLayout>
  )
}
