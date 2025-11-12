"use client"

import type { ReactNode } from "react"
import { AuthFooter } from "../ui/AuthFooter"
import { GoogleAuthButton } from "@/core/components/button/GoogleAuthButton"
import { Devider } from "@/features/auth/ui/Devider.ui"
import { AppLogo } from "@/features/auth/ui/Logo"

interface SpotifyAuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: SpotifyAuthLayoutProps) {
  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      
      {/* Form Wrapper - Plain black, no shadow, no background blur */}
      <div className="sc-3b284ce5-0 bWLMep">
        <AppLogo/>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">{title}</h1>
          {subtitle && <p className="text-white/70 text-base font-light leading-relaxed">{subtitle}</p>}
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {children}
        </div>
        {/* Devider */}
        <Devider/>
        {/* Google Button */}
          <button type="button"
              className="w-full py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors">
              Sign up with Google
          </button>
        <div className="px-8 pt-6">
            <GoogleAuthButton role={"artist"}/>
        </div>
      
        {/* Footer */}
        <div className="mt-10">
          <AuthFooter/>
        </div>
      </div>
    </main>
  )
}
