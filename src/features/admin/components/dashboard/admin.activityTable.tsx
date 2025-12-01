import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music, User, Album, List } from "lucide-react";

interface Activity {
  id: string;
  type: "song" | "artist" | "album" | "playlist";
  name: string;
  artist?: string;
  timestamp: string;
}

const activities: Activity[] = [
  { id: "1", type: "song", name: "Midnight Dreams", artist: "Luna Eclipse", timestamp: "2 mins ago" },
  { id: "2", type: "artist", name: "The Cosmic Band", timestamp: "15 mins ago" },
  { id: "3", type: "album", name: "Summer Vibes", artist: "Beach Boys", timestamp: "1 hour ago" },
  { id: "4", type: "playlist", name: "Top Hits 2024", timestamp: "2 hours ago" },
  { id: "5", type: "song", name: "Electric Pulse", artist: "DJ Neon", timestamp: "3 hours ago" },
];

const typeIcons = {
  song: Music,
  artist: User,
  album: Album,
  playlist: List,
};

const typeColors = {
  song: "text-primary",
  artist: "text-blue-400",
  album: "text-purple-400",
  playlist: "text-orange-400",
};

export const AdminActivityTable = () => {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <p className="text-sm text-muted-foreground mt-1">Latest uploads and additions</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => {
            const Icon = typeIcons[activity.type];
            return (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${typeColors[activity.type]}`} />
                    <span className="capitalize text-sm">{activity.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{activity.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.artist || "—"}
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {activity.timestamp}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
