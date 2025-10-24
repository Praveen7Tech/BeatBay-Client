import {  LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string
  icon: LucideIcon
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(({icon:Icon, ...props}, ref)=> {
    return(
        <div className="relative">
            <input
            ref={ref}
            {...props}
            className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-orange-400/50 focus:bg-white/15 transition-all"
            />
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />}
        </div>
    )
})