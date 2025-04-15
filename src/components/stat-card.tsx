import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description?: string
  icon: React.ElementType
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-[#0089ff]",
  iconBgColor = "bg-[#e8f5ff]",
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className={cn("p-2 rounded-full", iconBgColor)}>
            {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center">
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend.positive ? "text-green-600" : "text-red-600",
              )}
            >
              {trend.positive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {trend.value}
            </div>
            <p className="ml-2 text-xs text-muted-foreground">from last month</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
