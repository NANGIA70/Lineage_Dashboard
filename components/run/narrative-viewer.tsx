"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { NarrativeSection } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NarrativeViewerProps {
  sections: NarrativeSection[]
  onMetricClick: (value: string, lineageId: string | null) => void
}

// Parse content and replace {{METRIC:value}} with clickable chips
function parseNarrativeContent(content: string, onMetricClick: (value: string, lineageId: string | null) => void) {
  const parts: React.ReactNode[] = []
  const regex = /\{\{METRIC:([^}]+)\}\}/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }

    // Add the metric chip
    const metricValue = match[1]
    // Generate a fake lineage ID for demo purposes
    const lineageId = `LIN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    parts.push(
      <button
        key={match.index}
        onClick={() => onMetricClick(metricValue, lineageId)}
        className={cn(
          "inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md",
          "bg-primary/10 text-primary font-medium text-sm",
          "hover:bg-primary/20 transition-colors cursor-pointer",
          "border border-primary/20",
        )}
      >
        {metricValue}
      </button>,
    )

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts
}

export function NarrativeViewer({ sections, onMetricClick }: NarrativeViewerProps) {
  if (sections.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No narrative sections available for this run.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="text-lg">{section.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{parseNarrativeContent(section.content, onMetricClick)}</p>
          </CardContent>
        </Card>
      ))}
      <p className="text-xs text-muted-foreground text-center">
        Click on any highlighted metric to view its lineage and data source.
      </p>
    </div>
  )
}
