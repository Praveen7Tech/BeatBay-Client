import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Check, User, X } from "lucide-react";
import { Friends, userApi } from "../../services/userApi";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useEffect,  useCallback } from "react";
import { socket } from "@/core/config/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useDispatch } from "react-redux";
import { setBulkInvite, setInviteState } from "../../slice/inviteState.slice";
import { showError } from "@/core/utils/toast.config";
import { setPrivateRoom } from "../../slice/privateRoomSlice";


const FriendsActivity = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const inviteState = useSelector((state: RootState)=> state.inviteState.invites)
  const dispatch = useDispatch()

  const {data: friends, isLoading, isError,error,} = useQuery({
    queryKey: ["friendsActivity"],
    queryFn: userApi.getFriends,
    enabled: !!user?.id,
  });

/* ---------- SOCKET LISTENERS ---------- */

useEffect(() => {
  if (!user?.id) return;

  const SyncFriendsStatus = (friedsState:any)=>{
    dispatch(setBulkInvite(friedsState))
  }

  const handleRoomCreation = (roomData: any)=>{
      dispatch(setPrivateRoom(roomData))
  }

  const handleInviteReceived = (fromUserId: string ) => {
    dispatch(setInviteState({ friendId: fromUserId, state: "recieved" }));
    console.log("make", fromUserId, "pending status")
  };
  const handleInviteRejected = ({ guestId }: { guestId: string }) => {
    dispatch(setInviteState({ friendId: guestId, state: "none" }));
  };

  const handleInviteError = ({ message,  friendId }: { message: string, friendId: string }) => {
    showError(message)
    dispatch(setInviteState({ friendId, state: "none" }));
  };

  const handleInviteExpiredHost = ({ guestId }: { guestId: string }) => {
      dispatch(setInviteState({ friendId: guestId, state: "none" }));
  };

  const handleGlobalStatusChange = ({ friendId, status }: any) => {
    // Updates "connected" status globally
    dispatch(setInviteState({ friendId, state: status }));
  };

  socket.on("room_created", handleRoomCreation)
  socket.on("sync_friends_status", SyncFriendsStatus)
  socket.on("friend_status_changed", handleGlobalStatusChange);

  socket.on("invite_received", handleInviteReceived);
  socket.on("invite_rejected", handleInviteRejected);
  socket.on("invite_expired", handleInviteError);
  socket.on("invite_expired_host", handleInviteExpiredHost);

  return () => {
    socket.off("room_created", handleRoomCreation)
    socket.off("sync_friends_status", SyncFriendsStatus)
    socket.off("friend_status_changed", handleGlobalStatusChange);

    socket.off("invite_received", handleInviteReceived);
    socket.off("invite_rejected", handleInviteRejected);
    socket.off("invite_expired", handleInviteError);
    socket.off("invite_expired_host", handleInviteExpiredHost);
  };
}, [user?.id]);

/* ---------- ACTIONS ---------- */

const sendInvite = useCallback((friendId: string) => {
  if (!user?.id) return;

  socket.emit("invite_send", {
    fromUserId: user.id,
    fromUserName: user.name,
    fromUserImage: user.profilePicture,
    toUserId: friendId,
  });

  dispatch(setInviteState({ friendId, state: "pending" }));
}, [user?.id]);

const acceptInvite = useCallback((hostId: string) => {
  if (!user?.id) return;

  socket.emit("accept_invite", {
    roomId: hostId,
    guestData: {
      id: user.id,
      name: user.name,
      image: user.profilePicture,
    },
  });
  console.log("accept trigger ", hostId)
}, [user?.id]);

const rejectInvite = useCallback((hostId: string) => {
  if (!user?.id) return;
 
  socket.emit("reject_invite", {
    hostId,
    guestId: user.id,
  });

  dispatch(setInviteState({ friendId: hostId, state: "none" }));
}, [user?.id]);

  if (isLoading) return <SpinnerCustom />;

  if (isError) {
    return (
      <p className="text-red-500">
        Error loading friends: {error?.message}
      </p>
    );
  }


  return (
    <div className="flex-1">
      <h2 className="text-lg font-bold mb-4">FRIENDS ACTIVITY</h2>

      <div className="space-y-5">
        {friends?.friends.map((friend: Friends) => {
          if (friend.id === user?.id) return null;

          const state = inviteState[friend.id] ?? "none";

          return (
            <div key={friend.id} className="flex items-center gap-3">
              {/* PROFILE */}
              <Link
                to={`/profile/${friend.id}`}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="relative shrink-0">
                  {friend.profilePicture ? (
                    <>
                      <img
                        src={friend.profilePicture}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full bg-[#282828]"
                      />
                      {friend.status && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#1DB954] border-2 border-spotify-dark rounded-full" />
                      )}
                    </>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
                      <User className="h-5 w-5 text-white opacity-70" />
                    </div>
                  )}
                </div>

                <p className="text-white text-sm font-medium truncate">
                  {friend.name}
                </p>
              </Link>

              {/* ACTIONS */}
              <div className="ml-auto flex items-center gap-2">
                 {state === "connected" ? (
                  <span className="text-gray-400 text-xs">in a room</span>
                ) : state === "recieved" ? (
                  <div className="flex gap-2">
                    <button onClick={() => acceptInvite(friend.id)} className="text-green-500"><Check /></button>
                    <button onClick={() => rejectInvite(friend.id)} className="text-red-500"><X /></button>
                  </div>
                ) : state === "pending" ? (
                  <span className="text-gray-400 text-xs">Sent...</span>
                ) : (
                  <button 
                    onClick={() => sendInvite(friend.id)} 
                    className="px-3 py-1 text-xs border border-gray-500 rounded-full text-white hover:border-white"
                  >
                    Invite
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsActivity;
