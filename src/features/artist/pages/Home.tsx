"use client";

import SignupForm from "./Signup.artist";


export default function AuthLayout() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-red-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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
        <SignupForm/>
      </div>
    </main>
  );
}
