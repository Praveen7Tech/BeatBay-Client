"use client"

import { Search, Bell, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="bg-background border-b border-border h-20 flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-40">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-card rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="find your favourite song....."
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-card rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          PM
        </div>
      </div>
    </header>
  )
}
