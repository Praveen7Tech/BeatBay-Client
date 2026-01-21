import { Play, MoreHorizontal, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { formatTime } from "@/core/utils/formatTime";
import { AdminSong } from "../../services/adminApi";


const AdminSongRow = ({ song, index }: { song: AdminSong; index: number }) => {
  const isActive = song.status === true;

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors group">
      <td className="py-3 px-4 text-muted-foreground text-sm w-12">
        {index.toString().padStart(2, "0")}
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
            <img
              src={song.coverImageUrl}
              alt={song.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">
              {song.title}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {song.genre}
            </p>
          </div>
        </div>
      </td>

      <td className="py-3 px-4 text-muted-foreground text-sm hidden md:table-cell capitalize">
        {song.genre}
      </td>

      <td className="py-3 px-4 text-muted-foreground text-sm hidden sm:table-cell">
        {formatTime(song.duration)}
      </td>

      <td className="py-3 px-4 hidden lg:table-cell">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Heart className="w-3.5 h-3.5 fill-primary text-primary" />
          {song?.likesCount?.toLocaleString()}
        </div>
      </td>

      {/* ✅ STATUS BADGE */}
      <td className="py-3 px-4 hidden lg:table-cell">
        <Badge
          className={
            isActive
              ? "bg-green-500/10 text-green-600 border border-green-500/30"
              : "bg-red-500/10 text-red-600 border border-red-500/30"
          }
        >
          {isActive ? "Active" : "Blocked"}
        </Badge>
      </td>

      <td className="py-3 px-4 text-muted-foreground text-sm hidden xl:table-cell">
        {format(new Date(song.uploadDate), "MMM dd, yyyy")}
      </td>

      <td className="py-3 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link
                to={`/admin/songs/${song.id}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" /> View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default AdminSongRow;
