import { configureStore } from "@reduxjs/toolkit"
import queriesReducer from "./features/queries/querySlice"
import uiReducer from "./features/ui/uiSlice"

export const store = configureStore({
  reducer: {
    queries: queriesReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

