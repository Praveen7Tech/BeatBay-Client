import type React from "react"
import { AppLogo } from "../ui/Logo"

interface AuthLayoutProps {
  children: React.ReactNode
  title : string
  subTitle?:string
}

export default function AuthLayout({ children, title, subTitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-linear-to-br from-green-600 to-gray-900 rounded-2xl p-8 text-white shadow-2xl">
         <div className="flex justify-center mb-6">
            <AppLogo />
        </div>
         <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center">{title}</h2>
            {subTitle && <p className="text-center text-gray-400 text-sm mt-2">{subTitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
