"use client"

import { use, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  getDocumentById,
  getRunById,
  getTablesByRunId,
  getNarrativesByRunId,
  sampleTableData,
} from "@/lib/placeholder-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, User, CheckCircle2, XCircle, Loader2, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"
import { LineageDrawer } from "@/components/lineage/lineage-drawer"
import { NarrativeViewer } from "@/components/run/narrative-viewer"
import { TableViewer } from "@/components/run/table-viewer"
import type { ValueRef } from "@/lib/domain"

const runStatusStyles = {
  running: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-success/10 text-success border-success/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-muted text-muted-foreground",
}

const runStatusIcons = {
  running: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
  pending: Clock,
}

interface RunDetailPageProps {
  params: Promise<{ id: string; runId: string }>
}

export default function RunDetailPage({ params }: RunDetailPageProps) {
  const { id, runId } = use(params)
  const document = getDocumentById(id)
  const run = getRunById(runId)

  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedValueRef, setSelectedValueRef] = useState<ValueRef | null>(null)

  if (!document || !run || run.documentId !== document.id) {
    notFound()
  }

  const tables = getTablesByRunId(runId)
  const narratives = getNarrativesByRunId(runId)
  const StatusIcon = runStatusIcons[run.status]

  const handleValueSelect = (valueRef: ValueRef) => {
    setSelectedValueRef(valueRef)
    setDrawerOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/documents" className="hover:text-foreground">
            Documents
          </Link>
          <span>/</span>
          <Link href={`/documents/${id}`} className="hover:text-foreground">
            {document.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">Run {run.id}</span>
        </div>

        {/* Back Navigation */}
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href={`/documents/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to {document.name}
          </Link>
        </Button>

        {/* Run Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-foreground">Run {run.id}</h2>
              <Badge variant="outline" className={cn("text-xs capitalize", runStatusStyles[run.status])}>
                <StatusIcon className={cn("h-3 w-3 mr-1", run.status === "running" && "animate-spin")} />
                {run.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {run.workflowName} · Version {run.version}
            </p>
          </div>
        </div>

        {/* Tabs: Overview, Tables and Narrative */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="narrative">Narrative</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p className="font-medium text-foreground">{new Date(run.startTime).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">End Time</p>
                      <p className="font-medium text-foreground">
                        {run.endTime ? new Date(run.endTime).toLocaleString() : "In progress..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Triggered By</p>
                      <p className="font-medium text-foreground">{run.triggeredBy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tables Generated</p>
                      <p className="font-medium text-foreground">{tables.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-4">
            {/* Table List */}
            {!selectedTable ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generated Tables</CardTitle>
                </CardHeader>
                <CardContent>
                  {tables.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {tables.map((table) => (
                        <button
                          key={table.id}
                          onClick={() => setSelectedTable(table.id)}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/50 transition-colors text-left"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Grid3X3 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{table.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {table.rowCount} rows · {table.columnCount} columns
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tables generated in this run.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedTable(null)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Tables List
                </Button>
                <TableViewer
                  table={tables.find((t) => t.id === selectedTable)!}
                  data={sampleTableData}
                  onValueClick={handleValueSelect}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="narrative" className="space-y-4">
            <NarrativeViewer sections={narratives} onValueClick={handleValueSelect} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Lineage Drawer */}
      <LineageDrawer open={drawerOpen} onOpenChange={setDrawerOpen} valueRef={selectedValueRef} />
    </DashboardLayout>
  )
}
