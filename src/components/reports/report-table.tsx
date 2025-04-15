"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface ReportTableProps {
  title: string
  description?: string
  columns: { key: string; label: string }[]
  data: Record<string, any>[]
  pagination?: boolean
  itemsPerPage?: number
  filter?: boolean
  filterOptions?: { key: string; label: string; options: { value: string; label: string }[] }[]
  search?: boolean
  exportOptions?: boolean
}

export function ReportTable({
  title,
  description,
  columns,
  data,
  pagination = true,
  itemsPerPage = 10,
  filter = true,
  filterOptions = [],
  search = true,
  exportOptions = true,
}: ReportTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage)

  // Apply filters and search
  const filteredData = data.filter((item) => {
    // Apply filters
    const passesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      return item[key] === value
    })

    // Apply search
    const passesSearch = !searchQuery
      ? true
      : Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase())
          }
          return false
        })

    return passesFilters && passesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPageValue)
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * itemsPerPageValue, currentPage * itemsPerPageValue)
    : filteredData

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setCurrentPage(1)
  }

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    // In a real implementation, this would trigger an export function
    console.log(`Exporting as ${format}...`)
    alert(`Exporting report as ${format}...`)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {exportOptions && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                <Download className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        {(search || filter) && (
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {search && (
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
            )}
            {filter && filterOptions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filterOption) => (
                  <div key={filterOption.key} className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Select
                      onValueChange={(value) => handleFilterChange(filterOption.key, value)}
                      value={filters[filterOption.key] || ""}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={filterOption.label} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {filterOption.label}</SelectItem>
                        {filterOption.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>{row[column.key]}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {pagination && totalPages > 0 && (
        <CardFooter className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div>
              Showing {Math.min(filteredData.length, (currentPage - 1) * itemsPerPageValue + 1)} to{" "}
              {Math.min(filteredData.length, currentPage * itemsPerPageValue)} of {filteredData.length} entries
            </div>
            <Select
              value={itemsPerPageValue.toString()}
              onValueChange={(value) => {
                setItemsPerPageValue(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPageValue.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <div>per page</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
