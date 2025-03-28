"use client"

import { Card } from "@/components/ui/card"
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import type { DataPoint } from "@/lib/types"

interface PieChartProps {
  data: DataPoint[]
}

export function PieChart({ data }: PieChartProps) {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  // Add a check for empty data
  if (!data || data.length === 0) {
    return (
      <Card className="w-full h-full p-4 flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </Card>
    )
  }

  return (
    <Card className="w-full h-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}`, "Value"]} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  )
}

