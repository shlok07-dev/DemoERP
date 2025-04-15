"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface TrainingFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterValue: string
  onFilterChange: (value: string) => void
}

export function TrainingFilter({ searchTerm, onSearchChange, filterValue, onFilterChange }: TrainingFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <div className="relative w-full md:w-[400px]">
        <p className="text-sm mb-2">Search trainings</p>
        <div className="relative">
          <Input
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="w-full md:w-[250px]">
        <p className="text-sm mb-2">Filter by status</p>
        <Select value={filterValue} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="All trainings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All trainings</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="inprogress">In progress</SelectItem>
            <SelectItem value="todo">To-do</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
