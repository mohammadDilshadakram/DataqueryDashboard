"use client"

import type * as React from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Cell,
} from "recharts"

interface ChartContainerProps {
  data: any[]
  children: React.ReactNode
  xAxisKey: string
  padding?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
}

export function ChartContainer({ data, children, xAxisKey, padding }: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={padding}>
        <XAxis dataKey={xAxisKey} />
        {children}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function ChartGrid({ horizontal, vertical }: { horizontal?: boolean; vertical?: boolean }) {
  return <CartesianGrid strokeDasharray="3 3" horizontal={horizontal} vertical={vertical} />
}

export function ChartTooltip({ children }: { children?: React.ReactNode }) {
  return <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
}

export function ChartTooltipContent() {
  return null
}

export function ChartLine({
  dataKey,
  strokeWidth,
  stroke,
  dot,
}: { dataKey: string; strokeWidth?: number; stroke?: string; dot?: any }) {
  return <Line type="monotone" dataKey={dataKey} strokeWidth={strokeWidth} stroke={stroke} dot={dot} />
}

export function ChartBar({ dataKey, fill, radius }: { dataKey: string; fill?: string; radius?: number }) {
  return <Bar dataKey={dataKey} fill={fill} radius={[radius, radius, 0, 0]} />
}

export function ChartXAxis() {
  return <XAxis dataKey="name" />
}

export function ChartYAxis() {
  return <YAxis />
}

interface ChartPieProps {
  dataKey: string
  nameKey: string
  innerRadius: number
  outerRadius: number
  paddingAngle: number
  cornerRadius: number
}

export function ChartPie({ dataKey, nameKey, innerRadius, outerRadius, paddingAngle, cornerRadius }: ChartPieProps) {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <RechartsPieChart width={400} height={400}>
      <Pie
        dataKey={dataKey}
        nameKey={nameKey}
        data={[]} // This will be replaced by the actual data at runtime
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={paddingAngle}
        cornerRadius={cornerRadius}
      >
        {({ data }) => data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
    </RechartsPieChart>
  )
}

export function ChartLegend({ vertical }: { vertical?: boolean }) {
  return (
    <Legend
      verticalAlign={vertical ? "middle" : "bottom"}
      align="right"
      layout={vertical ? "vertical" : "horizontal"}
    />
  )
}

