"use client"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import type { RootState, AppDispatch } from "@/lib/store"
import { Header } from "@/components/header"
import { QueryInput } from "@/components/query-input"
import { QueryHistory } from "@/components/query-history"
import { ResultsDisplay } from "@/components/results-display"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { setLoading, setError, clearError } from "@/lib/features/ui/uiSlice"
import { processQuery } from "@/lib/features/queries/querySlice"

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.ui)
  const { currentQuery } = useSelector((state: RootState) => state.queries)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (currentQuery && currentQuery.results) {
      setShowResults(true)
    }
  }, [currentQuery])

  const handleQuerySubmit = async (query: string) => {
    try {
      // Validate API key is available
      if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        dispatch(setError("Gemini API key is missing. Please check your environment variables."))
        return
      }

      dispatch(clearError())
      dispatch(setLoading(true))

      await dispatch(processQuery(query))
      dispatch(setLoading(false))
    } catch (err) {
      console.error("Error processing query:", err)
      dispatch(setError("Failed to process query with Gemini API. Please try again."))
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <QueryHistory />
          </div>
          <div className="lg:col-span-9 space-y-6">
            <QueryInput onSubmit={handleQuerySubmit} />

            {loading && <LoadingState />}

            {error && <ErrorState message={error} />}

            {!loading && !error && showResults && <ResultsDisplay />}
          </div>
        </div>
      </main>
    </div>
  )
}

