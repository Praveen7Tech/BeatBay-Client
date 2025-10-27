"use client"

import { Users } from "lucide-react"

export default function PrivateRoomCard() {
  return (
    <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-8 border border-[#3a3a3a] flex flex-col items-center justify-center min-h-40">
      <Users className="w-12 h-12 text-gray-600 mb-3" />
      <p className="text-sm text-gray-400 text-center">Oops... currently no session</p>
    </div>
  )
}
