"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Send, X } from "lucide-react"

interface QueryInputProps {
  onSubmit: (query: string) => void
}

const AI_SUGGESTIONS = [
  "Show me revenue trends for the last 6 months",
  "Compare user engagement across different platforms",
  "Analyze conversion rates by marketing channel",
  "What were our top performing products last quarter?",
  "Show customer retention rates by segment",
  "Predict sales growth for next quarter",
  "Analyze customer demographics by region",
  "Compare website traffic sources",
]

export function QueryInput({ onSubmit }: QueryInputProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { loading } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    if (query.length > 0) {
      // Filter suggestions based on input
      const filtered = AI_SUGGESTIONS.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.length > 0 ? filtered : AI_SUGGESTIONS.slice(0, 3))
    } else {
      setSuggestions(AI_SUGGESTIONS.slice(0, 3))
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !loading) {
      onSubmit(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onSubmit(suggestion)
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Ask a question about your data..."
                  className="pr-10 h-12"
                  disabled={loading}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button type="submit" disabled={!query.trim() || loading} className="h-12">
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>

            {showSuggestions && (
              <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
                <div className="p-2 border-b flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Gemini-powered suggestions</span>
                </div>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-accent text-sm"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

