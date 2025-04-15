import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SettingsCardProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function SettingsCard({ title, description, children, footer, className }: SettingsCardProps) {
  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
