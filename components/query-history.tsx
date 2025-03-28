"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { selectQuery, clearHistory } from "@/lib/features/queries/querySlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function QueryHistory() {
  const dispatch = useDispatch()
  const { history, currentQuery } = useSelector((state: RootState) => state.queries)
  const { loading } = useSelector((state: RootState) => state.ui)

  const handleSelectQuery = (id: string) => {
    if (!loading) {
      dispatch(selectQuery(id))
    }
  }

  const handleClearHistory = () => {
    if (!loading) {
      dispatch(clearHistory())
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Query History
          </CardTitle>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearHistory} disabled={loading}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">No queries yet. Try asking a question!</div>
        ) : (
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-2">
              {history.map((query) => (
                <div
                  key={query.id}
                  className={`p-3 rounded-md cursor-pointer text-sm transition-colors ${
                    currentQuery?.id === query.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                  onClick={() => handleSelectQuery(query.id)}
                >
                  <p className="line-clamp-2">{query.text}</p>
                  <p className="text-xs mt-1 opacity-80">
                    {new Date(query.timestamp).toLocaleTimeString()} · {new Date(query.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

