"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LineChartProps {
  title: string
  description?: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor?: string
      tension?: number
    }[]
  }
  height?: number
  filter?: boolean
  filterOptions?: { value: string; label: string }[]
  onFilterChange?: (value: string) => void
}

export function LineChart({
  title,
  description,
  data,
  height = 300,
  filter = false,
  filterOptions = [],
  onFilterChange,
}: LineChartProps) {
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
    const pointCount = data.labels.length
    const maxValue = Math.max(...data.datasets.flatMap((dataset) => dataset.data))

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, canvasHeight - 40)
    ctx.lineTo(canvasWidth - 20, canvasHeight - 40)
    ctx.strokeStyle = "#ddd"
    ctx.stroke()

    // Draw lines
    data.datasets.forEach((dataset) => {
      ctx.beginPath()
      dataset.data.forEach((value, index) => {
        const x = 40 + index * ((canvasWidth - 60) / (pointCount - 1))
        const y = canvasHeight - 40 - ((canvasHeight - 60) * value) / maxValue

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.strokeStyle = dataset.borderColor
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points
      dataset.data.forEach((value, index) => {
        const x = 40 + index * ((canvasWidth - 60) / (pointCount - 1))
        const y = canvasHeight - 40 - ((canvasHeight - 60) * value) / maxValue

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = dataset.borderColor
        ctx.fill()
      })
    })

    // Draw labels
    ctx.fillStyle = "#888"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    data.labels.forEach((label, index) => {
      const x = 40 + index * ((canvasWidth - 60) / (pointCount - 1))
      ctx.fillText(label, x, canvasHeight - 25)
    })

    // Draw legend
    const legendY = 10
    let legendX = 40
    data.datasets.forEach((dataset) => {
      ctx.strokeStyle = dataset.borderColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(legendX, legendY + 5)
      ctx.lineTo(legendX + 15, legendY + 5)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(legendX + 7.5, legendY + 5, 3, 0, Math.PI * 2)
      ctx.fillStyle = dataset.borderColor
      ctx.fill()

      ctx.fillStyle = "#888"
      ctx.textAlign = "left"
      ctx.fillText(dataset.label, legendX + 20, legendY + 8)
      legendX += ctx.measureText(dataset.label).width + 40
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
