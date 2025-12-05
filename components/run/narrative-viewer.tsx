"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { NarrativeContentToken, NarrativeSection } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { ValueRef } from "@/lib/domain"

interface NarrativeViewerProps {
  sections: NarrativeSection[]
  onValueClick: (valueRef: ValueRef) => void
}

// Render text/value tokens with clickable value chips
function renderTokens(tokens: NarrativeContentToken[], onValueClick: (valueRef: ValueRef) => void) {
  return tokens.map((token, index) => {
    if (token.type === "text") {
      return <React.Fragment key={`text-${index}`}>{token.text}</React.Fragment>
    }

    return (
      <button
        key={`value-${token.valueRef.valueId}-${index}`}
        onClick={() => onValueClick(token.valueRef)}
        className={cn(
          "inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md",
          "bg-primary/10 text-primary font-medium text-sm",
          "hover:bg-primary/20 transition-colors cursor-pointer",
          "border border-primary/20",
        )}
      >
        {token.text}
      </button>
    )
  })
}

export function NarrativeViewer({ sections, onValueClick }: NarrativeViewerProps) {
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
            <p className="text-foreground leading-relaxed">{renderTokens(section.tokens, onValueClick)}</p>
          </CardContent>
        </Card>
      ))}
      <p className="text-xs text-muted-foreground text-center">
        Click on any highlighted metric to view its lineage and data source.
      </p>
    </div>
  )
}
