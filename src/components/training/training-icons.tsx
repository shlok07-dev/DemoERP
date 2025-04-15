import { Smile } from "lucide-react"

interface IconProps {
  color?: string
  size?: number
}

export function SmileIcon({ color = "currentColor", size = 24 }: IconProps) {
  return <Smile color={color} size={size} />
}
