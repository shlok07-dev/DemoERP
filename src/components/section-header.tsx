import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, children, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6", className)}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 mt-2 sm:mt-0">{children}</div>}
    </div>
  )
}
