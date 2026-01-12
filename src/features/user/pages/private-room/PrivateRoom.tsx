import RoomHeader from "../../components/private-room/Room-header"; 
import NowPlaying from "../../components/private-room/Now-Playing"; 
import SongQueue from "../../components/private-room/Song-Queue"; 
import RoomMembers from "../../components/private-room/Room-members"; 
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useEffect, useState } from "react";
import { useSearchSongs } from "@/core/hooks/playList/usePlayList";
import { socket } from "@/core/config/socket";
import { useDispatch } from "react-redux";
import { setRoomQueue, SongData } from "../../slice/privateRoomSlice";
import { showError } from "@/core/utils/toast.config";

const PrivateRoomPage = () => {

  const room = useSelector((state: RootState) => state.privateRoom);
 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()

  const { data: searchSongs, isFetching } = useSearchSongs(searchQuery);

  useEffect(() => {
      socket.on("queue_updated", (updatedQueue: SongData[]) => {
          dispatch(setRoomQueue(updatedQueue));
      });

      return () => { socket.off("queue_updated"); };
  }, [dispatch]);

 const addSongToRoom = (song: any) => {
    if ( !room.roomId) return;

     const isDuplicate = room.queue.some((item) => item.id === song._id);
      if (isDuplicate) {
        showError("song already exists in the queue")
        return;
      }

    const payload = {
      id: song._id,
      title: song.title,
      image: song.coverImageUrl,
      audioUrl: song.audioUrl,
      artist: song.artistId?.name || "Unknown Artist",
      duration: song.duration,
    };
console.log("payload ", payload)
    // 1. Emit to socket (Server handles the broadcast)
    socket.emit("addTo_queue", { 
      roomId: room.roomId, 
      song: payload 
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1a1a] to-spotify-dark text-white">
      <RoomHeader />

      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <NowPlaying />
          <SongQueue queue={room.queue} onAddSong={() => setIsSearchOpen(true)}/>
        </div>
         {/* 🔍 REUSED SEARCH COMPONENT */}
        <PlaylistSearchSection
          songs={searchSongs || []}
          isOpen={isSearchOpen}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          onSearch={setSearchQuery}
          addSong={(songId) => {
          const selectedSong = searchSongs?.find(s => s._id === songId);
            if (selectedSong) addSongToRoom(selectedSong);
          }}
          isSearching={isFetching}
        />
        <RoomMembers />
      </div>
    </div>
  );
};

export default PrivateRoomPage;
