export type EntityType =
  | "users"
  | "artists"
  | "songs"
  | "albums"
  | "playlists"

export const entityConfig: Record< EntityType, { label: string; color: string; icon: string }> = {
  users: { label: "Users", color: "#1DB954", icon: "👤" },
  artists: { label: "Artists", color: "#ec4899", icon: "🎤" },
  songs: { label: "Songs", color: "#8b5cf6", icon: "🎵" },
  albums: { label: "Albums", color: "#f59e0b", icon: "💿" },
  playlists: { label: "Playlists", color: "#10b981", icon: "📋" },
}


export type TimeRange = "7d" | "30d" | "90d" | "1y" | "all";
export type ChartType = "area" | "line" | "bar";

export const ENTITY_COLORS: Record<string, string> = {
  "Free Users": "#6366f1",
  "Premium": "#FFA500",
  "Active": "#22c55e",
  "Blocked": "#ef4444",
  "Public": "#10b981",
  "Private": "#6366f1",
};
