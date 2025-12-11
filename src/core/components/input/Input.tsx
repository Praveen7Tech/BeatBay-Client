import React, { forwardRef } from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

type ThemeType = "user" | "artist" | "admin";
type ErrorType = "red" | "while"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: ThemeType;
  placeholder?: string;
  icon?: LucideIcon;
  error?:string
  errorTheme?: ErrorType

  showPasswordToggle?: boolean
  isPasswordVisible?: boolean
  togglePasswordVisibility?: ()=> void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ theme = "user", 
    icon: Icon, 
    className = "",
    error, 
    errorTheme, 
    showPasswordToggle = false, 
    isPasswordVisible, 
    togglePasswordVisibility,
    type="text",
     ...props }, 
     ref) => {
    // 🟢 User style
    const userStyle = `
      w-80 px-4 py-3 bg-black/20 border border-white/50 rounded-full 
      placeholder-gray-300 text-white 
      focus:outline-none focus:border-white/80 transition-colors
    `;

    // 🟣 Artist style
    const artistStyle = `
      w-full px-4 py-3 pl-12 border border-white/50 rounded-sm 
      text-white placeholder-white/60 focus:outline-none focus:border-white transition-all
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

    const userError = "text-red-500 text-sm mt-1"    
    const artistError = "text-white text-sm mt-1"
     const errorClasses =
      errorTheme === "red"
        ? userError
        : theme === "user"
        ? userError
        : artistError
    

    // Determine the input type based on visibility state
    const inputType = showPasswordToggle && isPasswordVisible ? "text" : type;    

    // Calculate final input classes including conditional padding for icons/buttons
    const inputClasses = `${themeClasses} ${Icon ? "pl-12" : ""}`;

    return (
       <div className={`space-y-1 ${className}`}> 
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
          )}
          <input
            ref={ref}
            {...props}
            type={inputType}
            className={inputClasses}
          />
          {showPasswordToggle && togglePasswordVisibility && (
            <button 
             type="button"
             onClick={togglePasswordVisibility}
             // 🔑 Add z-10 here to ensure clickability
             className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 hover:text-white transition-colors z-10 pr-8"
              aria-label={isPasswordVisible ? "Hide password" : "Show   password"}
            >
              {isPasswordVisible ? <Eye/> : <EyeOff/> }
            </button>
          )}
        </div>
        <p className={errorClasses}>{error || ""}</p>
      </div>
      
    );
  }
);

Input.displayName = "Input";
