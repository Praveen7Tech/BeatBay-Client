import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  return (
    <Sonner
      position="bottom-center"
      theme="dark"
      className="toaster"
      toastOptions={{
        className:
          "px-4 py-3 rounded-md shadow-lg border flex gap-3 items-center justify-center max-w-[310px] w-full",
        style: {
          fontSize: "16px",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#000000",
          "--success-bg": "#ffffff",
          "--success-text": "#000000",
          "--error-bg": "#f60505",
          "--error-text": "#fee2e2",
          "--border-radius": "6px",
        } as React.CSSProperties
      }
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-500" />,
        info: <InfoIcon className="size-5 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-400" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
    />
  )
}

export { Toaster }
