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
import { removeSongFromQueue, setRoomSongQueueData, SongData } from "../../slice/privateRoomSlice";
import { useToaster } from "@/core/hooks/toast/useToast";
import { SearchSongResponse } from "../../services/response.type";
import { TooltipProvider } from "@/components/ui/tooltip";

const PrivateRoomPage = () => {

  const room = useSelector((state: RootState) => state.privateRoom);
 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()
  const {toast} = useToaster()

  const { data: searchSongs, isFetching } = useSearchSongs(searchQuery);

  useEffect(() => {
    // add single song to queue
      socket.on("queue_updated", (updatedQueue: SongData) => {
        console.log("que update", updatedQueue)
          dispatch(setRoomSongQueueData(updatedQueue));
      });
    
      // remove song data from queue
      socket.on("song_removed", (songId:string)=>{
        dispatch(removeSongFromQueue(songId))
      })

      return () => { 
        socket.off("queue_updated"); 
        socket.off("song_removed")
      };
      
  }, [dispatch]);

 const addSongToRoom = (song: SearchSongResponse) => {
    if ( !room.roomId) return;

     const isDuplicate = room.queue.some((item:SongData) => item.id === song.id);
      if (isDuplicate) {
        toast.error("song already exists in the queue")
        return;
      }

    const payload = {
      id: song.id,
      title: song.title,
      image: song.coverImageUrl,
      audioUrl: song.audioUrl,
      artist: song.artistName,
      duration: song.duration,
    };

    // 1. Emit to socket (Server handles the broadcast)
    socket.emit("addTo_queue", { 
      roomId: room.roomId, 
      song: payload 
    });

    toast.success("song added to queue")
  };

  const reoveSongFromRoom = (songId: string)=>{
     if(songId == room.songData?.id){
       toast.error(" song currently playing!")
       return;
     }
    
     socket.emit("removeFromQueue", {roomId: room.roomId,songId:songId})

     toast.success("song removed from queue")
  }

  const removeGuestFromRoom = (guestId:string)=>{
     socket.emit("remove_user",{userId:guestId, roomId:room.roomId})

     toast.success("removed user from room")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <RoomHeader />
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
