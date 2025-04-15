"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

interface StatsCardProps {
  value: string | number
  label: string
  icon: React.ReactNode
  bgColor?: string
}

export function StatsCard({ value, label, icon, bgColor = "bg-primary/10" }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={cn("p-2 rounded-full", bgColor)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
