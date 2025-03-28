"use client"
import { Provider } from "react-redux"
import { Dashboard } from "@/components/dashboard"
import { store } from "@/lib/store"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
        <Dashboard />
      </ThemeProvider>
    </Provider>
  )
}

