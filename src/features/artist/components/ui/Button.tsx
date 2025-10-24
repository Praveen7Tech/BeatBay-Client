import React from "react";

interface ButtonProps {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset"
}

export function Button({children, type="button"}: ButtonProps) {
    return(
        <button 
            type={type}
            className={`w-full py-3 px-4 border-2 border-white/40 text-white font-semibold rounded-lg 
            hover:bg-white/10 hover:border-orange-400/60 transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed mt-6`}
        >
            {children}
        </button>
    )
}