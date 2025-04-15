"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface StatusUpdateProps {
  onUpdate: (status: string) => void
  loading: boolean
}

export function StatusUpdate({ onUpdate, loading }: StatusUpdateProps) {
  const [status, setStatus] = useState("")

  const handleUpdate = () => {
    if (status) {
      onUpdate(status)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Update status</p>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inprogress">Inprogress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button onClick={handleUpdate} className="bg-[#0089ff] hover:bg-[#248cd8]" disabled={loading || !status}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  )
}
