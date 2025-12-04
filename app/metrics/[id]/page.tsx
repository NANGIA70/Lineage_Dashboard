"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { metrics } from "@/lib/placeholder-data"
import { ArrowLeft, TrendingUp, GitBranch, FileText, Quote, RefreshCw } from "lucide-react"

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function MetricDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const metric = metrics.find((m) => m.id === id)

  if (!metric) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Metric not found</p>
          <Link href="/metrics">
            <Button variant="link" className="mt-4">
              Back to Metrics
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link
              href="/metrics"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Metrics
            </Link>
            <h2 className="text-2xl font-semibold text-foreground">{metric.name}</h2>
            <p className="text-muted-foreground">
              {metric.context} • {metric.period} • {metric.entity}
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Metric Value Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-5xl font-bold text-primary mt-2">
                  {metric.value.toLocaleString()}
                  <span className="text-2xl font-normal text-muted-foreground ml-2">{metric.units}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">Last updated: {formatDateTime(metric.lastUpdated)}</p>
              </div>
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">+2.4% from yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Lineage Graph Placeholder */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GitBranch className="h-5 w-5 text-primary" />
                Data Lineage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                <div className="text-center">
                  <GitBranch className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Lineage graph visualization</p>
                  <p className="text-xs text-muted-foreground/70">Connect backend to display dependencies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Chart Placeholder */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Historical Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Trend chart visualization</p>
                  <p className="text-xs text-muted-foreground/70">Connect backend to display historical data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Narrative Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Narrative
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-muted-foreground">
                  The {metric.name} for {metric.entity} currently stands at{" "}
                  <strong className="text-foreground">
                    {metric.value.toLocaleString()} {metric.units}
                  </strong>
                  , reflecting the {metric.period.toLowerCase()} calculation performed as part of the {metric.context}{" "}
                  workflow.
                </p>
                <p className="text-muted-foreground mt-4">
                  This metric is derived from multiple upstream data sources including trade positions, market data
                  feeds, and risk parameters. The value represents a point-in-time snapshot and should be interpreted in
                  conjunction with the associated confidence intervals and data quality indicators.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Citations Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Quote className="h-5 w-5 text-primary" />
                Citations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                <div className="text-center">
                  <Quote className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">No citations available</p>
                  <p className="text-xs text-muted-foreground/70">
                    Citations will appear when linked to source documents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metadata */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Metric ID</p>
                <p className="font-mono text-sm text-card-foreground">{metric.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Context</p>
                <p className="text-card-foreground">{metric.context}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period</p>
                <p className="text-card-foreground">{metric.period}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entity</p>
                <p className="text-card-foreground">{metric.entity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Units</p>
                <p className="text-card-foreground">{metric.units}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-card-foreground">{formatDateTime(metric.lastUpdated)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
