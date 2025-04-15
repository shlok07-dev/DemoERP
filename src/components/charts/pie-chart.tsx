"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PieChartProps {
  title: string
  description?: string
  data: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
      borderColor?: string[]
      borderWidth?: number
    }[]
  }
  height?: number
  filter?: boolean
  filterOptions?: { value: string; label: string }[]
  onFilterChange?: (value: string) => void
}

export function PieChart({
  title,
  description,
  data,
  height = 300,
  filter = false,
  filterOptions = [],
  onFilterChange,
}: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // In a real implementation, you would use a charting library like Chart.js
    // This is a simplified placeholder implementation
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const canvasWidth = canvasRef.current.width
    const canvasHeight = canvasRef.current.height
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const radius = Math.min(centerX, centerY) - 40

    // Draw pie
    const dataset = data.datasets[0]
    const total = dataset.data.reduce((sum, value) => sum + value, 0)
    let startAngle = 0

    dataset.data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = dataset.backgroundColor[index]
      ctx.fill()

      if (dataset.borderColor && dataset.borderWidth) {
        ctx.strokeStyle = dataset.borderColor[index] || "#fff"
        ctx.lineWidth = dataset.borderWidth
        ctx.stroke()
      }

      // Draw label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      ctx.fillStyle = "#fff"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const percentage = Math.round((value / total) * 100)
      if (percentage > 5) {
        ctx.fillText(`${percentage}%`, labelX, labelY)
      }

      startAngle = endAngle
    })

    // Draw legend
    const legendY = canvasHeight - 30
    let legendX = centerX - (data.labels.length * 80) / 2
    data.labels.forEach((label, index) => {
      ctx.fillStyle = dataset.backgroundColor[index]
      ctx.fillRect(legendX, legendY, 10, 10)
      ctx.fillStyle = "#888"
      ctx.textAlign = "left"
      ctx.font = "10px Arial"
      ctx.fillText(label, legendX + 15, legendY + 8)
      legendX += 80
    })
  }, [data])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {filter && filterOptions.length > 0 && (
          <Select onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <canvas ref={canvasRef} height={height} width={500} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
