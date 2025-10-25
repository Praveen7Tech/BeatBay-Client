import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "border-2 border-white/40 hover:bg-white/10 hover:border-orange-400/60 mt-6"
      : "border-2 border-white/40 rounded-full hover:bg-white/10 hover:border-orange-400/60";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
