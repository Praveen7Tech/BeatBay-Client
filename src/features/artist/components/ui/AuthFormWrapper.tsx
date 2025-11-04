"use client";

import { ReactNode } from "react";
import { AuthFooter } from "./AuthFooter";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="w-full max-w-md">
      <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-orange-400/30 to-red-500/30 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <div className="mt-6">
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
