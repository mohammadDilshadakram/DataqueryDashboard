"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { BarChart3, Database, Settings, Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Gen AI Analytics Dashboard</h1>
          <div className="flex items-center ml-2 bg-primary/10 px-2 py-1 rounded-full">
            
            <span className="text-xs font-medium text-primary">Md Dilshad Akram </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-accent">
            <Database className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent">
            <Settings className="h-5 w-5" />
          </button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

