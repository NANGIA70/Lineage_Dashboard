"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { runs } from "@/lib/placeholder-data"
import type { Run } from "@/lib/types"

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const columns = [
  { key: "id", header: "Run ID", sortable: true },
  { key: "workflow", header: "Workflow", sortable: true },
  {
    key: "startTime",
    header: "Start Time",
    sortable: true,
    render: (run: Run) => formatDateTime(run.startTime),
  },
  {
    key: "endTime",
    header: "End Time",
    sortable: true,
    render: (run: Run) => formatDateTime(run.endTime),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (run: Run) => <StatusBadge status={run.status} />,
  },
  { key: "owner", header: "Owner", sortable: true },
]

export default function RunsPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Runs Explorer</h2>
          <p className="text-muted-foreground">View and manage workflow execution runs</p>
        </div>

        <DataTable
          data={runs}
          columns={columns}
          searchKeys={["id", "workflow", "owner"]}
          onRowClick={(run) => router.push(`/runs/${run.id}`)}
        />
      </div>
    </DashboardLayout>
  )
}
