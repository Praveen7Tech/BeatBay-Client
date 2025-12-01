export function SidebarShimmer() {
  return (
    <aside className="w-75 bg-sidebar border-r border-sidebar-border p-4 space-y-4 animate-pulse">
      
      {/* Top nav shimmer */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-10 bg-white/10 rounded" />
          <div className="h-8 w-24 bg-white/10 rounded" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-10 bg-white/10 rounded" />
          <div className="h-8 w-24 bg-white/10 rounded" />
        </div>
      </div>

      {/* Liked Songs shimmer */}
      <div className="flex items-center gap-4 pt-2">
        <div className="h-10 w-10 bg-white/10 rounded" />
        <div className="h-4 w-28 bg-white/10 rounded" />
      </div>

      {/* Create Playlist shimmer */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 bg-white/10 rounded" />
        <div className="h-4 w-28 bg-white/10 rounded" />
      </div>

      {/* Playlists shimmer block */}
      <div className="space-y-3 max-h-[25vh] overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 bg-white/10 rounded" />
            <div className="h-4 w-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* Artists Title shimmer */}
      <div className="h-3 w-20 bg-white/10 rounded mt-3" />

      {/* Artists shimmer */}
      <div className="space-y-3 max-h-[25vh] overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-10 w-10 bg-white/10 rounded-full" />
            <div className="h-4 w-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </aside>
  );
}
