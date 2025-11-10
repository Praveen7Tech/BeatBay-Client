"use client";

import { ReactNode } from "react";
import { AuthFooter } from "./AuthFooter";
import { GoogleAuthButton } from "@/core/components/button/GoogleAuthButton";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="w-full max-w-md">
      <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div  />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          </div>

          {/* Form */}
          {children}
          {/* Google button */}
          <div className="px-8 pt-6">
            <GoogleAuthButton role={"artist"}/>
          </div>

          {/* Footer */}
          <div className="mt-6">
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
