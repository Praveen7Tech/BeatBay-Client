
import { socket } from "@/core/config/socket";
import { RootState } from "@/core/store/store";
import { Users, LogOut, Crown, User, X, Sparkles, UserPlus } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearPrivateRoom, setPrivateRoom } from "../../slice/privateRoomSlice";
import { setBulkInvite, setInviteState } from "../../slice/inviteState.slice";


const PrivateRooms = () => {
  const user = useSelector((state: RootState)=> state.auth.user)
  const room = useSelector((state: RootState)=> state.privateRoom)
  const isHost = room.hostId == user?.id
  const members = room.members
  const dispatch = useDispatch()

  useEffect(()=>{

    const restoreRoomState = (roomData: any)=> {
      if(roomData){
         dispatch(setPrivateRoom(roomData))
      }
    }

    const handleRoomDeleted = () => {
        dispatch(clearPrivateRoom());
        dispatch(setBulkInvite({}));
    };
    const handleUserLeft = () => {
        dispatch(clearPrivateRoom());
        dispatch(setBulkInvite({}));
    };
    const handleRoomMembersUpdated = (type:string,updatedRoom: any, leftUserId?: string) => {

        // only manage the user left action
        if(type === "left" && leftUserId === user?.id) {
          console.log("only user left")
            dispatch(clearPrivateRoom());
            dispatch(setBulkInvite({}));
            return;
        }
        
        dispatch(setPrivateRoom(updatedRoom));
    
        if (type === "join") {
            // Mark new members as connected
            updatedRoom.members.forEach((m: any) => {
                if (m.id !== user?.id) {
                    dispatch(setInviteState({ friendId: m.id, state: "connected" }));
                }
            });
        } else if (type === "left" && leftUserId ) {
          console.log("only user remove")
            if (leftUserId !== user?.id) {
                dispatch(setInviteState({ friendId: leftUserId, state: "none" }));
            }
        } else if(type === "remove" && leftUserId){
            if(leftUserId !== user?.id){
              dispatch(setInviteState({friendId: leftUserId, state: "none"}))
            }else{
              dispatch(clearPrivateRoom())
            }
        }
    };

    socket.on("restore_room_state", restoreRoomState)

    socket.on("room_deleted", handleRoomDeleted);
    socket.on("room_members_updated", handleRoomMembersUpdated);
    socket.on("user_left", handleUserLeft)

    return ()=>{
      socket.off("room_deleted", handleRoomDeleted);
      socket.off("room_members_updated", handleRoomMembersUpdated);
      socket.off("user_left", handleUserLeft)
    }
    
  },[user?.id])

  const leftRoom = useCallback(() => {
    if (!user?.id || !room.roomId) return;
  
    socket.emit("left_room", {
      userId: user.id,
      roomId:room.roomId,
    });

    dispatch(clearPrivateRoom())
    dispatch(setBulkInvite({}))
  }, [user?.id, room.roomId]);

  const removeUser = useCallback((userId: string)=>{
    socket.emit("remove_user", {userId:userId, roomId: room.roomId})
  },[user?.id, room.roomId])


  if (!room.isActive) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1DB954]/20 to-[#1DB954]/5 flex items-center justify-center animate-pulse">
            <Users size={28} className="text-[#1DB954]" />
          </div>
          <div className="absolute -top-1 -right-1 animate-bounce">
            <Sparkles size={16} className="text-[#1DB954]" />
          </div>
        </div>
        
        <h3 className="text-white font-semibold text-sm mb-1">Start a Private Room</h3>
        <p className="text-spotify-secondary text-xs mb-4 max-w-[180px]">
          Listen together with friends in real-time
        </p>
        
        <button
          // onClick={onCreateRoom}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] hover:bg-spotify-green text-black font-medium text-sm transition-all hover:scale-105"
        >
          <UserPlus size={16} />
          <span>Create Room</span>
        </button>
      </div>
    );
  }
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">{"Chill Vibes"}</h3>
          <div className="flex items-center gap-1 text-spotify-secondary text-xs mt-1">
            <Users size={12} className="text-[#1DB954]"/>
            <span>{members.length} listening</span>
          </div>
        </div>
          <button onClick={leftRoom}  className="text-red-500 text-xs flex items-center gap-1 hover:underline py-1.5 px-3 rounded-full bg-[#282828] hover:bg-[#3e3e3e]">
            <LogOut size={14} /> Leave
          </button>
      </div>
      
      <div className="space-y-2">
        {members.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] transition-colors group"
          >
            {user.image ? (
              <img 
              src={user.image} 
              alt={user.name}
              className="w-10 h-10 rounded-full bg-[#282828]"
            />
            ): (
               <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
                      <User className="h-5 w-5 text-white opacity-70" />
                </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <div className="flex items-center gap-1">
                {user.role === "host" ? (
                  <Crown size={10} className="text-[#1DB954]" />
                ) : (
                  <User size={10} className="text-spotify-secondary" />
                )}
                <span className={`text-xs capitalize ${user.role === "host" ? "text-[#1DB954]" : "text-spotify-secondary"}`}>
                  {user.role}
                </span>
              </div>
            </div>
            {isHost && user.role !== "host" && (
              <button
                 onClick={() => removeUser(user.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateRooms;
