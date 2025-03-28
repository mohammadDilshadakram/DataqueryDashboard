import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

export function LoadingState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <Sparkles className="h-4 w-4 text-primary absolute top-0 right-0" />
        </div>
        <h3 className="text-lg font-medium">Processing your query with Gemini...</h3>
        <p className="text-sm text-muted-foreground mt-2">Analyzing data and generating AI-powered insights</p>
      </CardContent>
    </Card>
  )
}

