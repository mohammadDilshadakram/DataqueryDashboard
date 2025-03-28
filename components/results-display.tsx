"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart3, LineChartIcon, PieChartIcon, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResultsDisplay() {
  const [activeTab, setActiveTab] = useState("line")
  const { currentQuery } = useSelector((state: RootState) => state.queries)

  if (!currentQuery || !currentQuery.results) {
    return null
  }

  const { results } = currentQuery

  // Add validation for results data
  const hasValidData = results.data && Array.isArray(results.data) && results.data.length > 0

  const handleExport = () => {
    try {
      // Create a blob with the data
      const dataStr = JSON.stringify(results, null, 2)
      const blob = new Blob([dataStr], { type: "application/json" })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `query-results-${new Date().toISOString().slice(0, 10)}.json`

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle className="text-lg">Results</CardTitle>
            <div className="ml-2 flex items-center bg-primary/10 px-2 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-primary mr-1" />
              <span className="text-xs font-medium text-primary">Gemini Analysis</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Query: <span className="font-medium text-foreground">{currentQuery.text}</span>
        </p>
      </CardHeader>
      <CardContent>
        {hasValidData ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="line" className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                Line
              </TabsTrigger>
              <TabsTrigger value="bar" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Pie
              </TabsTrigger>
            </TabsList>

            <TabsContent value="line" className="h-[400px]">
              <LineChart data={results.data} />
            </TabsContent>

            <TabsContent value="bar" className="h-[400px]">
              <BarChart data={results.data} />
            </TabsContent>

            <TabsContent value="pie" className="h-[400px]">
              <PieChart data={results.data} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">No valid data available to display</p>
          </div>
        )}

        <div className="mt-4 p-4 bg-accent/50 rounded-md">
          <h3 className="font-medium mb-2 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            AI Analysis
          </h3>
          <p className="text-sm">{results.analysis || "No analysis available"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

