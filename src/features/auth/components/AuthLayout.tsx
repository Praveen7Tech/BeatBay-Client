import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
  logo?: React.ReactNode
}

export default function AuthLayout({ children, logo }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gradient-to-br from-green-600 to-gray-900 rounded-2xl p-8 text-white shadow-2xl">
        {logo && <div className="flex justify-center">{logo}</div>}
        {children}
      </div>
    </div>
  )
}
