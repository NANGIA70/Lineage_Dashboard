"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table/data-table"
import { metrics } from "@/lib/placeholder-data"
import type { Metric } from "@/lib/types"

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "context", header: "Context", sortable: true },
  { key: "period", header: "Period", sortable: true },
  { key: "entity", header: "Entity", sortable: true },
  {
    key: "value",
    header: "Value",
    sortable: true,
    render: (metric: Metric) => <span className="font-semibold text-primary">{metric.value.toLocaleString()}</span>,
  },
  { key: "units", header: "Units" },
  {
    key: "lastUpdated",
    header: "Last Updated",
    sortable: true,
    render: (metric: Metric) => formatDateTime(metric.lastUpdated),
  },
]

export default function MetricsPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Metrics Explorer</h2>
          <p className="text-muted-foreground">Browse and analyze calculated metrics</p>
        </div>

        <DataTable
          data={metrics}
          columns={columns}
          searchKeys={["name", "context", "entity"]}
          onRowClick={(metric) => router.push(`/metrics/${metric.id}`)}
        />
      </div>
    </DashboardLayout>
  )
}
