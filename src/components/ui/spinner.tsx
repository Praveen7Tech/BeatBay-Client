import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 flex items-center gap-4">
        <Spinner />
      </div>
    </div>
  )
}
