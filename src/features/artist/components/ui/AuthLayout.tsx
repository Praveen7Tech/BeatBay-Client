"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen Background Image */}
      <img
        src="/logos/bg1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Optional overlay gradients */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 via-orange-500/30 to-red-700/40" /> */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img
          src="/logos/logo.name-w.png"
          alt="Logo"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {children}
      </div>
    </main>
  );
}
