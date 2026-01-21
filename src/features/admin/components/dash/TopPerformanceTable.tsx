import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";

interface Performer {
  rank: number;
  name: string;
  artist: string;
  streams: string;
  trend: number;
}

const topSongs: Performer[] = [
  { rank: 1, name: "Starlight Symphony", artist: "Luna Eclipse", streams: "2.4M", trend: 15 },
  { rank: 2, name: "Electric Dreams", artist: "Neon Pulse", streams: "1.8M", trend: 8 },
  { rank: 3, name: "Ocean Waves", artist: "Aqua Flow", streams: "1.5M", trend: -3 },
  { rank: 4, name: "Mountain High", artist: "Peak Performers", streams: "1.2M", trend: 12 },
  { rank: 5, name: "City Lights", artist: "Urban Vibe", streams: "980K", trend: 5 },
];

export const TopPerformersTable = () => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Top Performing Songs</h2>
        <p className="text-sm text-muted-foreground mt-1">Most streamed this month</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Song</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="text-right">Streams</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topSongs.map((song) => (
            <TableRow key={song.rank}>
              <TableCell className="font-bold text-foreground">{song.rank}</TableCell>
              <TableCell className="font-medium">{song.name}</TableCell>
              <TableCell className="text-muted-foreground">{song.artist}</TableCell>
              <TableCell className="text-right font-medium">{song.streams}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <TrendingUp 
                    className={`w-4 h-4 ${song.trend > 0 ? 'text-primary' : 'text-destructive'}`} 
                  />
                  <span className={song.trend > 0 ? 'text-primary' : 'text-destructive'}>
                    {song.trend > 0 ? '+' : ''}{song.trend}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
