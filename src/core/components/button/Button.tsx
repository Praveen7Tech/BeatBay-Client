import React from "react";
import { Loader2 } from "lucide-react";

type ThemeType = "user" | "artist" | "admin";
type VariantType = "primary" | "secondary" | "dashboard";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ThemeType;
  variant?: VariantType;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  theme = "user",
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  // User base style
  const userBase = `
    w-full font-medium py-3 rounded-full transition-colors
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
  `;

  // User variants
  const userVariants: Record<VariantType, string> = {
    primary: "bg-green-700 hover:bg-green-800 text-white",
    secondary: "bg-green-600 hover:bg-green-700 text-white",
    dashboard: `
      border-2 border-white/40 text-white px-8 py-3 rounded-full font-bold 
      hover:border-white transition-colors flex items-center gap-2 justify-center
    `,
  };

  // Artist base style
  const artistBase = `
    w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const artistVariants: Record<VariantType, string> = {
    primary:
      "border-2 border-white/40 hover:bg-white/10 hover:border-orange-400/60 ",
    secondary:
      "border-2 border-white/40 rounded-full hover:bg-white/10 hover:border-orange-400/60",
    dashboard: "px-6 py-2 border border-zinc-700 rounded-lg text-white hover:bg-zinc-800 transition", 
  };

  const adminBase = `mt-4 bg-white text-black font-semibold px-6 py-3 rounded-full w-full flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all`

  // Combine based on theme
  let themeClasses = "";

  if (theme === "user") {
    themeClasses = `${userBase} ${userVariants[variant] ?? ""}`;
  } else if (theme === "artist") {
    themeClasses = `${artistBase} ${artistVariants[variant] ?? ""}`;
  } else if (theme === "admin") {
    themeClasses = adminBase;
  }
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${themeClasses} ${className}`}
    >
      {loading ? (
        <Loader2 className="animate-spin w-5 h-5 mx-auto" />
      ) : (
        children
      )}
    </button>
  );
};
