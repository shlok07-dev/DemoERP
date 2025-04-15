import type { TrainingParticipant } from "@/types/training"

interface ParticipantListProps {
  participants: TrainingParticipant[]
}

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Training participant</h3>
      <ol className="list-decimal pl-6 space-y-2">
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ol>
    </div>
  )
}
