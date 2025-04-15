import type { TrainingItem } from "@/types/training"

interface TrainingDetailProps {
  training: TrainingItem
}

export function TrainingDetail({ training }: TrainingDetailProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div>
        <p className="text-sm font-medium mb-1">Training type</p>
        <p>{training.type} training</p>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Training duration</p>
        <p>{training.duration}</p>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Training mode</p>
        <p>{training.mode}</p>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Training status</p>
        <p
          className={
            training.status === "Completed"
              ? "text-[#10a142]"
              : training.status === "Inprogress"
                ? "text-[#fdcc1c]"
                : "text-gray-500"
          }
        >
          {training.status}
        </p>
      </div>
    </div>
  )
}
