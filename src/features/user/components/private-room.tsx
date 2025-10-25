"use client"

import { Mic } from "lucide-react"

export function PrivateRoom() {
  return (
    <div className="bg-card rounded-xl p-6 mb-6">
      <h3 className="font-bold text-foreground mb-4">PRIVATE ROOM</h3>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Mic className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
        <p className="text-sm text-muted-foreground">Oops... currently no session</p>
      </div>
    </div>
  )
}
