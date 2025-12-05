"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { RunTable, TableCell as TableCellType } from "@/lib/types"
import type { ValueRef } from "@/lib/domain"

interface TableViewerProps {
  table: RunTable
  data: { headers: string[]; rows: TableCellType[][] }
  onValueClick: (valueRef: ValueRef) => void
}

export function TableViewer({ table, data, onValueClick }: TableViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{table.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {data.headers.map((header, index) => (
                  <TableHead key={index} className="whitespace-nowrap">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(
                        "whitespace-nowrap",
                        cell.isMetric &&
                          cell.valueRef &&
                          "cursor-pointer hover:bg-primary/10 transition-colors",
                      )}
                      onClick={() => {
                        if (cell.isMetric && cell.valueRef) {
                          onValueClick(cell.valueRef)
                        }
                      }}
                    >
                      <span
                        className={cn(
                          cell.isMetric &&
                            cell.valueRef &&
                            "underline decoration-dotted decoration-primary/50 underline-offset-2",
                        )}
                      >
                        {cell.value}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Click on any numeric cell to view its lineage and data source.
        </p>
      </CardContent>
    </Card>
  )
}
