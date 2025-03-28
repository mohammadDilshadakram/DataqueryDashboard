import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Card className="border-destructive">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium">Error</h3>
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
      </CardContent>
    </Card>
  )
}

