import { Plus, ListPlus, Trash2, Radio, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserPlayLists } from "@/core/hooks/api/useFetchHooks";
import { SidebarShimmer } from "../shimmers/SidebarShimmer";
import { Link } from "react-router-dom";


interface SongActionsMenuProps {
  songId: string;
  artist?: string
  showRemoveFromPlaylist?: boolean;
  onRemoveFromPlaylist?: (songId: string) => void;
  onAddToPlaylist?: (songId: string, playlistId: string) => void;
  playLists?: string;
  isHeader?: boolean;
  showArtist?:boolean
}

export const SongActionsMenu = ({ songId,artist,showRemoveFromPlaylist = false,onRemoveFromPlaylist,
  onAddToPlaylist, isHeader = false,showArtist=false}: SongActionsMenuProps) => {

    const {data: playlists, isLoading, isError, error} = useUserPlayLists()

    if(isLoading ){
        return <SidebarShimmer/>
    }
    if(isError ){
        return <p>{error?.message }</p>
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <button 
          className={`p-1.5 rounded-full transition-all focus:outline-none
            ${isHeader ? "opacity-100" : "opacity-0 group-hover:opacity-100 hover:bg-white/10"}`}
        >
          <Plus className={`h-5 w-5 transition-colors text-spotify-secondary hover:text-white`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-[#282828] border-[#3e3e3e] text-white z-50"
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer">
            <ListPlus className="mr-2 h-4 w-4" />
            <span>Add to playlist</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-[#282828] border-[#3e3e3e] text-white z-50">
            {playlists?.map((playlist) => (
              <DropdownMenuItem
                key={playlist.id}
                className="cursor-pointer hover:bg-[#3e3e3e] hover:text-white data-highlighted:bg-[#3e3e3e]
                 data-highlighted:text-white"
                onClick={() => onAddToPlaylist?.(songId, playlist.id)}
              >
                {playlist.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {showRemoveFromPlaylist && (
          <DropdownMenuItem
            className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer text-red-400 focus:text-red-400"
            onClick={() => onRemoveFromPlaylist?.(songId)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove from this playlist</span>
          </DropdownMenuItem>
        )}
      
        <DropdownMenuSeparator className="bg-[#3e3e3e]" /> 
        {showArtist && (
          <Link to={`/artist/${artist}`}>
          <DropdownMenuItem
            className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer"
          >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Go to artist</span>
          </DropdownMenuItem>
          </Link>
         )} 
        <DropdownMenuItem
          className="hover:bg-[#3e3e3e] focus:bg-[#3e3e3e] cursor-pointer"
        >
          <Radio className="mr-2 h-4 w-4" />
          <span>Add to queue</span>
        </DropdownMenuItem>
         
        <DropdownMenuSeparator className="bg-[#3e3e3e]" />
     
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
