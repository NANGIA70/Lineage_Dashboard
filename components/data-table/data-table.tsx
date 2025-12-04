"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchKeys?: (keyof T)[]
  onRowClick?: (item: T) => void
}

type SortDirection = "asc" | "desc" | null

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchKeys = [],
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredData = useMemo(() => {
    if (!search || searchKeys.length === 0) return data
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key]
        return String(value).toLowerCase().includes(search.toLowerCase())
      }),
    )
  }, [data, search, searchKeys])

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]
      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1
      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc")
      else if (sortDirection === "desc") {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ChevronsUpDown className="ml-1 h-4 w-4" />
    if (sortDirection === "asc") return <ChevronUp className="ml-1 h-4 w-4" />
    return <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary border-0"
          />
        </div>
      )}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              {columns.map((column) => (
                <TableHead key={String(column.key)} className="text-muted-foreground">
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(String(column.key))}
                      className="-ml-3 h-auto py-1 hover:bg-transparent"
                    >
                      {column.header}
                      {getSortIcon(String(column.key))}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item)
                        : String((item as Record<string, unknown>)[String(column.key)] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
