import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[174px] w-[168px] rounded-xl bg-sidebar-border" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[168px] bg-sidebar-border" />
        <Skeleton className="h-2 w-[168px] bg-sidebar-border" />
      </div>
    </div>
  )
}