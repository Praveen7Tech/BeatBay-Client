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

export function SpinnerArtist(){
   return (
          <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-8">
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        );
}
