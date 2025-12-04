"use client"

import Link from "next/link"
import { FileText, Calendar, Building2, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Document } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DocumentCardProps {
  document: Document
}

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

const typeStyles = {
  AQRR: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Credit Memo": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Risk Report": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Regulatory Filing": "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link href={`/documents/${document.id}`}>
      <Card className="group transition-all hover:border-primary/50 hover:bg-accent/30 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                  {document.name}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {document.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {document.period}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Badge variant="outline" className={cn("text-xs", typeStyles[document.type])}>
                {document.type}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", statusStyles[document.status])}>
                {statusLabels[document.status]}
              </Badge>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Updated {new Date(document.updatedAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
