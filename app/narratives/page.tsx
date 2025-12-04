"use client"

import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DataTable } from "@/components/data-table/data-table"
import { narratives } from "@/lib/placeholder-data"
import type { Narrative } from "@/lib/types"
import Link from "next/link"

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
  {
    key: "runId",
    header: "Run",
    sortable: true,
    render: (narrative: Narrative) => (
      <Link
        href={`/runs/${narrative.runId}`}
        className="text-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {narrative.runId}
      </Link>
    ),
  },
  { key: "section", header: "Section", sortable: true },
  {
    key: "createdAt",
    header: "Created At",
    sortable: true,
    render: (narrative: Narrative) => formatDateTime(narrative.createdAt),
  },
]

export default function NarrativesPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Narratives</h2>
          <p className="text-muted-foreground">Browse generated narrative documents</p>
        </div>

        <DataTable
          data={narratives}
          columns={columns}
          searchKeys={["name", "section", "runId"]}
          onRowClick={(narrative) => router.push(`/narratives/${narrative.id}`)}
        />
      </div>
    </DashboardLayout>
  )
}
