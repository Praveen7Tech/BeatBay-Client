import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-43.5 w-42 rounded-xl bg-sidebar-border" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-42 bg-sidebar-border" />
        <Skeleton className="h-2 w-42 bg-sidebar-border" />
      </div>
    </div>
  )
}