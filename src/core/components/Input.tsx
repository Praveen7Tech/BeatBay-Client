import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-full placeholder-gray-300 text-white focus:outline-none focus:border-white/40"
    />
  )
})

Input.displayName = "Input"
