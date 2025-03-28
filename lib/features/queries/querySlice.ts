import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import type { Query } from "@/lib/types"
import { processQueryWithGemini } from "@/lib/gemini-service"
import type { AppDispatch } from "@/lib/store"

interface QueryState {
  history: Query[]
  currentQuery: Query | null
}

const initialState: QueryState = {
  history: [],
  currentQuery: null,
}

const querySlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    addQuery: (state, action: PayloadAction<Query>) => {
      state.history = [action.payload, ...state.history]
      state.currentQuery = action.payload
    },
    selectQuery: (state, action: PayloadAction<string>) => {
      const queryId = action.payload
      const query = state.history.find((q) => q.id === queryId)

      if (query) {
        state.currentQuery = query
      }
    },
    clearHistory: (state) => {
      state.history = []
      state.currentQuery = null
    },
  },
})

// Thunk action to process query with Gemini API
export const processQuery = (queryText: string) => async (dispatch: AppDispatch) => {
  try {
    const results = await processQueryWithGemini(queryText)

    const newQuery: Query = {
      id: uuidv4(),
      text: queryText,
      timestamp: Date.now(),
      results,
    }

    dispatch(addQuery(newQuery))
    return newQuery
  } catch (error) {
    console.error("Error in processQuery thunk:", error)
    throw error
  }
}

export const { addQuery, selectQuery, clearHistory } = querySlice.actions
export default querySlice.reducer

