import { Link } from "react-router-dom";
import { Play, MoreVertical, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AdminAlbumCardData {
  id: string;
  title: string;
  artistName: string;
  coverImageUrl: string;
  trackCount: number;
  totalStreams: string;
  isActive: boolean
  genre?: string;
}

interface AdminAlbumCardProps {
  album: AdminAlbumCardData;
  type: "album" | "song"
  showActions?: boolean;
}



const AdminAlbumCard = ({ album, type, showActions = true }: AdminAlbumCardProps) => {

  const isActive = album?.isActive 
  const redirectLink = type == "album" ? 'album' : 'songs'
    
  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <Link to={`/admin/${redirectLink}/${album.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={album.coverImageUrl}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
            </div>
          </div>
         <Badge
          variant="outline" 
          className={`absolute top-3 left-3 z-10 ${ 
            isActive
              ? "bg-green-500/10 text-green-600 border-green-500/30"
              : "bg-red-500/10 text-red-600 border-red-500/30"
          }`}
        >
          {isActive ? "Active" : "Blocked"}
        </Badge>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/admin/${redirectLink}/${album.id}`} className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {album.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate mt-0.5">{album.artistName}</p>
          </Link>
          
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 rounded hover:bg-muted/50 transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/admin/${redirectLink}/${album.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Album</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Music className="w-3 h-3" />
            {album.trackCount} tracks
          </span>
          {/* <span>•</span> */}
          {/* <span>{album.totalStreams} streams</span> */}
        </div>
      </div>
    </div>
  );
};

export default AdminAlbumCard;
