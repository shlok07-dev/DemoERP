import type { TrainingItem } from "@/types/training"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

interface TrainingTableProps {
  trainings: TrainingItem[]
  loading: boolean
}

export function TrainingTable({ trainings, loading }: TrainingTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#0089ff]" />
      </div>
    )
  }

  if (trainings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No trainings found matching your criteria</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-xs font-medium text-muted-foreground border-b">
            <th className="text-left py-3 px-4">S/N</th>
            <th className="text-left py-3 px-4">Training Description</th>
            <th className="text-left py-3 px-4">Start Date</th>
            <th className="text-left py-3 px-4">Training Type</th>
            <th className="text-left py-3 px-4">Duration</th>
            <th className="text-left py-3 px-4">Training Mode</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training.id} className="border-b">
              <td className="py-4 px-4">{training.id}</td>
              <td className="py-4 px-4">{training.description}</td>
              <td className="py-4 px-4">{training.startDate}</td>
              <td className="py-4 px-4">{training.type}</td>
              <td className="py-4 px-4">{training.duration}</td>
              <td className="py-4 px-4">{training.mode}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    training.status === "Completed"
                      ? "bg-[#ecfff2] text-[#10a142]"
                      : training.status === "Inprogress"
                        ? "bg-[#fbf3da] text-[#fdcc1c]"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {training.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <Link href={`/capacity-building/${training.id}`}>
                  <Button variant="link" className="h-auto p-0 text-[#0089ff]">
                    View more
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
