
import {Table,TableBody,TableCell,TableHead, TableHeader,TableRow,} from "@/components/ui/table";
import { SongRevenue } from "../../services/artist.api";
import { Link } from "react-router-dom";

interface RevenueSongTableProps {
  songs: SongRevenue[]
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs?.map((song, index) => (
            <TableRow
              key={index}
              className="border-[#282828] hover:bg-[#282828] transition-colors"
            >
              <TableCell className="text-[#a7a7a7] font-medium">
                {index + 1}
              </TableCell>
              <TableCell>
                <Link to={`/artist/song-details/${song.songId}`}>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <img
                      src={song.coverImageUrl}
                      alt={song.songTitle}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{song.songTitle}</span>
                </div>
                </Link>
              </TableCell>
              <TableCell className="text-[#a7a7a7] text-right">
                {song.playCount.toLocaleString()}
              </TableCell>
              <TableCell className="text-[#1DB954] text-right font-medium">
                {song.estimatedRevenue.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
