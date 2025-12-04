"use client"

import { X, Database, ArrowRight, GitBranch, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sampleLineageData } from "@/lib/placeholder-data"
import type { LineageData } from "@/lib/types"

interface LineageDrawerProps {
  isOpen: boolean
  onClose: () => void
  cellValue: string | number | null
  lineageId: string | null
}

export function LineageDrawer({ isOpen, onClose, cellValue, lineageId }: LineageDrawerProps) {
  if (!isOpen) return null

  // TODO: Replace with actual API call using lineageId
  const lineage: LineageData = sampleLineageData

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-[420px] border-l border-border bg-card shadow-xl">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Cell Lineage</h3>
            <p className="text-sm text-muted-foreground">Trace data origin and transformations</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Current Value */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="text-sm text-muted-foreground mb-1">Current Value</div>
              <div className="text-2xl font-semibold text-foreground">{cellValue ?? lineage.value}</div>
              {lineageId && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {lineageId}
                  </Badge>
                </div>
              )}
            </div>

            {/* Source Information */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-card-foreground">Source</h4>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Table</span>
                  <span className="font-medium text-foreground">{lineage.sourceTable}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cell</span>
                  <span className="font-mono text-foreground">{lineage.sourceCell}</span>
                </div>
              </div>
            </div>

            {/* Transformations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-card-foreground">Transformations</h4>
              </div>
              <div className="space-y-2">
                {lineage.transformations.map((transform, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 p-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <span className="text-sm text-foreground">{transform}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Upstream Sources */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-card-foreground">Upstream Sources</h4>
              </div>
              <div className="space-y-2">
                {lineage.upstream.map((node) => (
                  <div key={node.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={node.type === "source" ? "default" : "secondary"} className="text-xs">
                        {node.type}
                      </Badge>
                      <span className="font-medium text-sm text-foreground">{node.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {Object.entries(node.metadata).map(([key, value]) => (
                        <div key={key}>
                          <span className="capitalize">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downstream Outputs */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-card-foreground">Downstream Outputs</h4>
              </div>
              <div className="space-y-2">
                {lineage.downstream.map((node) => (
                  <div key={node.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {node.type}
                      </Badge>
                      <span className="font-medium text-sm text-foreground">{node.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {Object.entries(node.metadata).map(([key, value]) => (
                        <div key={key}>
                          <span className="capitalize">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground text-center">
            Lineage data will be populated from the backend API
          </p>
        </div>
      </div>
    </div>
  )
}
