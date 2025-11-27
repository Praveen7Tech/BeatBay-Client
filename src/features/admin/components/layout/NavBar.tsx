"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/core/store/store"

export default function Navbar({ title }: { title: string }) {
  const admin = useSelector((state: RootState) => state.auth.user)

  return (
    <header className="border-b border-gray-800 pb-4 mb-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-gray-400 text-sm mt-1">Welcome back, {admin?.name}</p>
    </header>
  )
}
