import RoomHeader from "../../components/private-room/Room-header"; 
import NowPlaying from "../../components/private-room/Now-Playing"; 
import SongQueue from "../../components/private-room/Song-Queue"; 
import RoomMembers from "../../components/private-room/Room-members"; 
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useState } from "react";
import { useSearchSongs } from "@/core/hooks/playList/usePlayList";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePrivateRoomListners } from "@/core/hooks/private-room/listners/usePrivateRoomListner";
import EmptyRoom from "../../components/private-room/emptyRoom";
import { useRoomActions } from "@/core/hooks/private-room/actions/useRoomActions";

const PrivateRoomPage = () => {

  const room = useSelector((state: RootState) => state.privateRoom);
 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchSongs, isFetching } = useSearchSongs(searchQuery);

  /* ---------- SOCKET LISTENERS AND ACTIONS---------- */
  usePrivateRoomListners()
  const {addSongToRoom, reoveSongFromRoom, removeGuestFromRoom, leaveRoom} = useRoomActions()

  if (!room.isActive) return <EmptyRoom/>

  return (
    <div className="min-h-screen bg-black text-white">
      <RoomHeader leaveRoom={leaveRoom}/>
      <TooltipProvider>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <NowPlaying />
          <SongQueue queue={room.queue} onAddSong={() => setIsSearchOpen(true)} onRemoveSong={reoveSongFromRoom}/>
        </div>
         {/* 🔍 REUSED SEARCH COMPONENT */}
        <PlaylistSearchSection
          songs={searchSongs! }
          isOpen={isSearchOpen}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          onSearch={setSearchQuery}
          addSong={(songId) => {
          const selectedSong = searchSongs?.find((s )=> s.id === songId);
            if (selectedSong) addSongToRoom(selectedSong);
          }}
          isSearching={isFetching}
        />
        <RoomMembers removeUser={removeGuestFromRoom}/>
      </div>
      </TooltipProvider>
    </div>
  );
};

export default PrivateRoomPage;
