
interface DividerProps {
  text?: string
}

export function Devider({text= "Or"}: DividerProps) {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs my-6">
      <div className="flex-1 h-px bg-white/20"></div>
      <span className="text-white/60 text-sm">{text}</span>
      <div className="flex-1 h-px bg-white/20"></div>
    </div>
  )
}


