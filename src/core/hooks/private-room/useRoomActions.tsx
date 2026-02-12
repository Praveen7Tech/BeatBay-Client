import { RootState } from "@/core/store/store";
import { SearchSongResponse } from "@/features/user/services/response.type";
import { SongData } from "@/features/user/slice/privateRoomSlice";
import { useSelector } from "react-redux";
import { useToaster } from "../toast/useToast";
import { socket } from "@/core/config/socket";

export const useRoomActions = ()=>{

    const room = useSelector((state: RootState) => state.privateRoom);
    const {toast} = useToaster()

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

      return{
        addSongToRoom,
        reoveSongFromRoom,
        removeGuestFromRoom
      }
}