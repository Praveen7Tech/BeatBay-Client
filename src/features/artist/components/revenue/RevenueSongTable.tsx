import { Play, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface SongRevenue {
  id: string;
  title: string;
  albumCover: string;
  streams: number;
  revenue: number;
  change: number;
}

interface RevenueSongTableProps {
  songs: SongRevenue[];
}

export const RevenueSongTable = ({ songs }: RevenueSongTableProps) => {
  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-1">Revenue by Song</h3>
      <p className="text-[#a7a7a7] text-sm mb-6">Earnings breakdown per track</p>

      <Table>
        <TableHeader>
          <TableRow className="border-[#282828] hover:bg-transparent">
            <TableHead className="text-[#a7a7a7]">#</TableHead>
            <TableHead className="text-[#a7a7a7]">Song</TableHead>
            <TableHead className="text-[#a7a7a7] text-right">Streams</TableHead>
            <TableHead className="text-[#a7a7a7] text-right">Revenue</TableHead>
            <TableHead className="text-[#a7a7a7] text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow
              key={song.id}
              className="border-[#282828] hover:bg-[#282828] transition-colors"
            >
              <TableCell className="text-[#a7a7a7] font-medium">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <img
                      src={song.albumCover}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                      <Play size={16} className="text-white" fill="white" />
                    </div>
                  </div>
                  <span className="text-white font-medium">{song.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-[#a7a7a7] text-right">
                {song.streams.toLocaleString()}
              </TableCell>
              <TableCell className="text-white text-right font-medium">
                ${song.revenue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {song.change >= 0 ? (
                    <>
                      <TrendingUp size={14} className="text-[#1DB954]" />
                      <span className="text-[#1DB954]">+{song.change}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-red-500" />
                      <span className="text-red-500">{song.change}%</span>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
