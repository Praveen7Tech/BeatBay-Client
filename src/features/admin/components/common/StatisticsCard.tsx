import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ArtistData {
  songs?: any[];
  albums?: any[];
}

interface UserData {
  followingCount?: number;
  playLists?: any[];
}

interface StatisticsCardProps {
  type: "artist" | "user";
  data: ArtistData | UserData;
}

export default function StatisticsCard({ type, data }: StatisticsCardProps) {
  // Determine grid columns
  const gridCols = type === "artist" ? "grid-cols-2" : "grid-cols-4";
console.log("hhhhhh", data)
  // Auto-generate stats based on type
  const stats =
    type === "artist"
      ? [
          { label: "Followers", value: data.followersCount },
          { label: "Total Songs", value: (data as ArtistData)?.songs?.length || 0 },
          { label: "Albums", value: (data as ArtistData)?.albums?.length || 0 },
        ]
      : [
          { label: "Following", value: (data as UserData)?.followingCount || 0 },
          { label: "Playlists", value: (data as UserData)?.playLists?.length || 0 },
          { label: "Total Plays", value: 0 },
        ];

  return (
    <Card className="bg-spotify-dark border-spotify-tertiary">
      <CardHeader>
        <CardTitle className="text-spotify-text">
          {type === "artist" ? "Artist Statistics" : "User Statistics"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className={`grid ${gridCols} gap-4`}>
          {stats.map((item, idx) => (
            <StatItem key={idx} label={item.label} value={item.value} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 rounded-lg bg-spotify-black border border-spotify-tertiary text-center">
      <p className="text-sm text-spotify-secondary mb-1">{label}</p>
      <p className="text-2xl font-bold text-spotify-green">{value}</p>
    </div>
  )
}
