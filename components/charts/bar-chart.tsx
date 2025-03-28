"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { DataPoint } from "@/lib/types"

interface BarChartProps {
  data: DataPoint[]
}

export function BarChart({ data }: BarChartProps) {
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
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  )
}

