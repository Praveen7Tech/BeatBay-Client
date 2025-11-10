import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

type ThemeType = "user" | "artist" | "admin";
type ErrorType = "red" | "while"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: ThemeType;
  placeholder: string;
  icon?: LucideIcon;
  error?:string
  errorTheme?: ErrorType
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ theme = "user", icon: Icon, className = "",error, errorTheme, ...props }, ref) => {
    // 🟢 User style
    const userStyle = `
      w-full px-4 py-3 bg-black/20 border border-white/20 rounded-full 
      placeholder-gray-300 text-white 
      focus:outline-none focus:border-white/40 transition-colors
    `;

    // 🟣 Artist style
    const artistStyle = `
      w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg 
      text-white placeholder-white/60 
      focus:outline-none focus:border-orange-400/50 focus:bg-white/15 transition-all
    `;

    // ⚪ Admin style
    const adminStyle = `
      w-full bg-black/40 border border-gray-700 rounded-md px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition
    `;

    const themeClasses =
      theme === "user"
        ? userStyle
        : theme === "artist"
        ? artistStyle
        : adminStyle;

    const userError = "text-red-400 text-sm mt-1"    
    const artistError = "text-white text-sm mt-1"
     const errorClasses =
      errorTheme === "red"
        ? userError
        : theme === "user"
        ? userError
        : artistError

    return (
      <div className={`space-y-1 ${className}`}> 
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
          )}
          <input
            ref={ref}
            {...props}
            className={`${themeClasses} ${Icon ? "pl-12" : ""}`}
          />
        </div>
        <p className={errorClasses}>{error || ""}</p>
      </div>
      
    );
  }
);

Input.displayName = "Input";
