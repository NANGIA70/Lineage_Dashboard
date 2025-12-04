"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { runs, metrics, datasets, narratives } from "@/lib/placeholder-data"
import { ArrowLeft, Clock, User, Play, CheckCircle, XCircle, FileText } from "lucide-react"

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function RunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const run = runs.find((r) => r.id === id)

  if (!run) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Run not found</p>
          <Link href="/runs">
            <Button variant="link" className="mt-4">
              Back to Runs
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  // Placeholder steps for the run
  const steps = [
    { name: "Data Ingestion", status: "completed", duration: "2m 15s" },
    { name: "Validation", status: "completed", duration: "45s" },
    {
      name: "Transformation",
      status: run.status === "running" ? "running" : "completed",
      duration: run.status === "running" ? "—" : "5m 30s",
    },
    {
      name: "Metric Calculation",
      status: run.status === "failed" ? "failed" : run.status === "running" ? "pending" : "completed",
      duration: run.status === "completed" ? "3m 10s" : "—",
    },
    {
      name: "Report Generation",
      status: run.status === "completed" ? "completed" : "pending",
      duration: run.status === "completed" ? "1m 45s" : "—",
    },
  ]

  // Filter related data
  const relatedMetrics = metrics.slice(0, 3)
  const relatedDatasets = datasets.slice(0, 3)
  const relatedNarratives = narratives.filter((n) => n.runId === run.id)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link href="/runs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Runs
            </Link>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-foreground">{run.id}</h2>
              <StatusBadge status={run.status} />
            </div>
            <p className="text-lg text-muted-foreground">{run.workflow}</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Play className="h-4 w-4" />
            Re-run
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Time</p>
                <p className="font-medium text-card-foreground">{formatDateTime(run.startTime)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Time</p>
                <p className="font-medium text-card-foreground">{formatDateTime(run.endTime)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary p-2">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium text-card-foreground">{run.owner.split("@")[0]}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-secondary p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Narratives</p>
                <p className="font-medium text-card-foreground">{relatedNarratives.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="narratives">Narratives</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Run Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This workflow processes daily trading data to calculate P&L metrics, risk exposures, and generate
                  regulatory reports. The run consumed 3 input datasets and produced 6 metrics with associated
                  narratives.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-semibold text-card-foreground">3</p>
                    <p className="text-sm text-muted-foreground">Input Datasets</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-semibold text-card-foreground">6</p>
                    <p className="text-sm text-muted-foreground">Metrics Generated</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-semibold text-card-foreground">2</p>
                    <p className="text-sm text-muted-foreground">Narratives Created</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="steps" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Execution Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.name} className="flex items-center gap-4 rounded-lg bg-secondary/50 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{step.name}</p>
                        <p className="text-sm text-muted-foreground">Duration: {step.duration}</p>
                      </div>
                      {step.status === "completed" && <CheckCircle className="h-5 w-5 text-success" />}
                      {step.status === "failed" && <XCircle className="h-5 w-5 text-destructive" />}
                      {step.status === "running" && (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      )}
                      {step.status === "pending" && (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Related Datasets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedDatasets.map((dataset) => (
                    <Link
                      key={dataset.id}
                      href={`/datasets/${dataset.id}`}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 p-4 hover:bg-secondary transition-colors"
                    >
                      <div>
                        <p className="font-medium text-card-foreground">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dataset.type} • {dataset.source}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{dataset.version}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Generated Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedMetrics.map((metric) => (
                    <Link
                      key={metric.id}
                      href={`/metrics/${metric.id}`}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 p-4 hover:bg-secondary transition-colors"
                    >
                      <div>
                        <p className="font-medium text-card-foreground">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {metric.context} • {metric.period}
                        </p>
                      </div>
                      <span className="text-lg font-semibold text-primary">
                        {metric.value} {metric.units}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narratives" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Generated Narratives</CardTitle>
              </CardHeader>
              <CardContent>
                {relatedNarratives.length > 0 ? (
                  <div className="space-y-3">
                    {relatedNarratives.map((narrative) => (
                      <Link
                        key={narrative.id}
                        href={`/narratives/${narrative.id}`}
                        className="block rounded-lg bg-secondary/50 p-4 hover:bg-secondary transition-colors"
                      >
                        <p className="font-medium text-card-foreground">{narrative.name}</p>
                        <p className="text-sm text-muted-foreground">Section: {narrative.section}</p>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{narrative.content}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No narratives generated for this run.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
