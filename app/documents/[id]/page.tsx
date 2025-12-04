"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { getDocumentById, getRunsByDocumentId, getUserById } from "@/lib/placeholder-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Building2, Calendar, User, Clock, Play, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

const statusStyles = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  published: "bg-primary/10 text-primary border-primary/20",
}

const statusLabels = {
  draft: "Draft",
  in_review: "In Review",
  approved: "Approved",
  published: "Published",
}

const runStatusStyles = {
  running: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-success/10 text-success border-success/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  pending: "bg-muted text-muted-foreground",
}

interface DocumentDetailPageProps {
  params: Promise<{ id: string }>
}

export default function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = use(params)
  const document = getDocumentById(id)

  if (!document) {
    notFound()
  }

  const runs = getRunsByDocumentId(id)
  const creator = getUserById(document.createdBy)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Navigation */}
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/documents">
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
          </Link>
        </Button>

        {/* Document Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-foreground">{document.name}</h2>
              <Badge variant="outline" className={cn("text-xs", statusStyles[document.status])}>
                {statusLabels[document.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground">{document.type}</p>
          </div>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Trigger New Run
          </Button>
        </div>

        {/* Document Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium text-foreground">{document.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Period</p>
                  <p className="font-medium text-foreground">{document.period}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Created By</p>
                  <p className="font-medium text-foreground">{creator?.name ?? "Unknown"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">{new Date(document.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Runs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Runs</CardTitle>
          </CardHeader>
          <CardContent>
            {runs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run ID</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runs.map((run) => (
                    <TableRow key={run.id} className="group">
                      <TableCell className="font-mono text-sm">{run.id}</TableCell>
                      <TableCell>v{run.version}</TableCell>
                      <TableCell>{run.workflowName}</TableCell>
                      <TableCell>{new Date(run.startTime).toLocaleString()}</TableCell>
                      <TableCell>{run.endTime ? new Date(run.endTime).toLocaleString() : "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs capitalize", runStatusStyles[run.status])}>
                          {run.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/documents/${document.id}/runs/${run.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No runs yet for this document.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
