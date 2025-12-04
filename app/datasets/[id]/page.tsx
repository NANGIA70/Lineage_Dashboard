"use client"

import { use, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { datasets } from "@/lib/placeholder-data"
import { ArrowLeft, Database, GitBranch, Quote, Download } from "lucide-react"

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Placeholder cell data
const placeholderColumns = ["ID", "Symbol", "Quantity", "Price", "Notional", "Currency"]
const placeholderRows = [
  ["T001", "AAPL", "1,000", "189.45", "189,450", "USD"],
  ["T002", "GOOGL", "500", "141.80", "70,900", "USD"],
  ["T003", "MSFT", "750", "378.91", "284,182", "USD"],
  ["T004", "AMZN", "300", "178.25", "53,475", "USD"],
  ["T005", "NVDA", "200", "875.30", "175,060", "USD"],
  ["T006", "META", "400", "505.12", "202,048", "USD"],
  ["T007", "TSLA", "150", "248.50", "37,275", "USD"],
  ["T008", "JPM", "600", "198.30", "118,980", "USD"],
]

interface CellInfo {
  row: number
  col: number
  value: string
  columnName: string
}

export default function DatasetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const dataset = datasets.find((d) => d.id === id)
  const [selectedCell, setSelectedCell] = useState<CellInfo | null>(null)

  if (!dataset) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Dataset not found</p>
          <Link href="/datasets">
            <Button variant="link" className="mt-4">
              Back to Datasets
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({
      row: rowIndex,
      col: colIndex,
      value: placeholderRows[rowIndex][colIndex],
      columnName: placeholderColumns[colIndex],
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link
              href="/datasets"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Datasets
            </Link>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">{dataset.name}</h2>
              <Badge variant="secondary">{dataset.type}</Badge>
            </div>
            <p className="text-muted-foreground">
              Source: {dataset.source} • Version: {dataset.version}
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Metadata Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium text-card-foreground">{dataset.type}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Source</p>
              <p className="font-medium text-card-foreground">{dataset.source}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="font-mono text-sm text-card-foreground">{dataset.version}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium text-card-foreground text-sm">{formatDateTime(dataset.lastUpdated)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Grid */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-primary" />
              Data Preview
              <span className="text-sm font-normal text-muted-foreground">(Click any cell to view details)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    {placeholderColumns.map((col) => (
                      <TableHead key={col} className="text-muted-foreground font-medium">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {placeholderRows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className="cursor-pointer hover:bg-secondary/50 transition-colors"
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Cell Detail Drawer */}
        <Sheet open={selectedCell !== null} onOpenChange={() => setSelectedCell(null)}>
          <SheetContent className="bg-card border-border">
            <SheetHeader>
              <SheetTitle className="text-card-foreground">Cell Details</SheetTitle>
              <SheetDescription>
                {selectedCell && `Row ${selectedCell.row + 1}, Column: ${selectedCell.columnName}`}
              </SheetDescription>
            </SheetHeader>
            {selectedCell && (
              <div className="mt-6 space-y-6">
                {/* Value */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Value</h4>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-2xl font-semibold text-card-foreground">{selectedCell.value}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Metadata</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between rounded-lg bg-secondary/50 p-3">
                      <span className="text-sm text-muted-foreground">Column</span>
                      <span className="text-sm font-medium text-card-foreground">{selectedCell.columnName}</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-secondary/50 p-3">
                      <span className="text-sm text-muted-foreground">Data Type</span>
                      <span className="text-sm font-medium text-card-foreground">
                        {isNaN(Number(selectedCell.value.replace(/,/g, ""))) ? "String" : "Number"}
                      </span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-secondary/50 p-3">
                      <span className="text-sm text-muted-foreground">Row Index</span>
                      <span className="text-sm font-medium text-card-foreground">{selectedCell.row}</span>
                    </div>
                  </div>
                </div>

                {/* Lineage Placeholder */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Lineage</h4>
                  <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                    <div className="text-center">
                      <GitBranch className="mx-auto h-8 w-8 text-muted-foreground/50" />
                      <p className="mt-1 text-xs text-muted-foreground">Cell lineage data</p>
                    </div>
                  </div>
                </div>

                {/* Citations Placeholder */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Citations</h4>
                  <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30">
                    <div className="text-center">
                      <Quote className="mx-auto h-6 w-6 text-muted-foreground/50" />
                      <p className="mt-1 text-xs text-muted-foreground">No citations linked</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  )
}
