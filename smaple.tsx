// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { Check, User, X } from "lucide-react";
// import { Friends, userApi } from "../../services/userApi";
// import { SpinnerCustom } from "@/components/ui/spinner";
// import { useEffect, useCallback } from "react";
// import { socket } from "@/core/config/socket";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/core/store/store";
// import { setBulkInvite, setInviteState } from "../../slice/inviteState.slice";
// import { showError } from "@/core/utils/toast.config";
// import { setPrivateRoom } from "../../slice/privateRoomSlice";

// const FriendsActivity = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const inviteState = useSelector((state: RootState) => state.inviteState.invites);
//   const dispatch = useDispatch();

//   const { data: friends, isLoading, isError, error } = useQuery({
//     queryKey: ["friendsActivity"],
//     queryFn: userApi.getFriends,
//     enabled: !!user?.id,
//   });

//   /* ---------- SOCKET LISTENERS ---------- */

//   useEffect(() => {
//     if (!user?.id) return;

//     // Bulk Sync (Initial Login / Refresh)
//     const handleSyncStatus = (friendsMap: any) => {
//       console.log("here we gooo..")
//       dispatch(setBulkInvite(friendsMap));
//     };

//     const handleRoomCreation = (roomData: any)=>{
//       dispatch(setPrivateRoom(roomData))
//     }

//     // Incremental Status Change (Global sidebar update)
//     const handleGlobalStatusChange = ({ friendId, status }: { friendId: string, status: any }) => {
//       dispatch(setInviteState({ friendId, state: status }));
//     };

//     // Invite Events
//     const handleInviteReceived = ({ fromUserId, roomId }: { fromUserId: string, roomId: string }) => {
//       // Store the specific roomId sent by the backend
//       dispatch(setInviteState({ friendId: fromUserId, state: "recieved", roomId }));
//     };

//     const handleInviteRejected = ({ guestId }: { guestId: string }) => {
//       dispatch(setInviteState({ friendId: guestId, state: "none" }));
//     };

//     const handleInviteError = ({ message, friendId }: { message: string, friendId: string }) => {
//       showError(message);
//       dispatch(setInviteState({ friendId, state: "none" }));
//     };

//     socket.on("room_created", handleRoomCreation)
//     socket.on("sync_friends_status", handleSyncStatus);
//     socket.on("friend_status_changed", handleGlobalStatusChange);
//     socket.on("invite_received", handleInviteReceived);
//     socket.on("invite_rejected", handleInviteRejected);
//     socket.on("invite_expired", handleInviteError);

//     return () => {
//       socket.off("room_created", handleRoomCreation)
//       socket.off("sync_friends_status", handleSyncStatus);
//       socket.off("friend_status_changed", handleGlobalStatusChange);
//       socket.off("invite_received", handleInviteReceived);
//       socket.off("invite_rejected", handleInviteRejected);
//       socket.off("invite_expired", handleInviteError);
//     };
//   }, [user?.id, dispatch]);

//   /* ---------- ACTIONS ---------- */

//   const sendInvite = useCallback((friendId: string) => {
//     if (!user?.id) return;
//     socket.emit("invite_send", {
//       fromUserId: user.id,
//       fromUserName: user.name,
//       fromUserImage: user.profilePicture,
//       toUserId: friendId,
//     });
//     dispatch(setInviteState({ friendId, state: "pending" }));
//   }, [user?.id, dispatch]);

//   const acceptInvite = useCallback((roomId: string, friendId: string) => {
//     if (!user?.id || !roomId) return;
//     socket.emit("accept_invite", {
//       roomId: roomId, // This is the Host's Room ID
//       guestData: {
//         id: user.id,
//         name: user.name,
//         image: user.profilePicture,
//       },
//     });
//   }, [user?.id]);

//   const rejectInvite = useCallback((hostId: string) => {
//     if (!user?.id) return;
//     socket.emit("reject_invite", { hostId, guestId: user.id });
//     dispatch(setInviteState({ friendId: hostId, state: "none" }));
//   }, [user?.id, dispatch]);

//   if (isLoading) return <SpinnerCustom />;
//   if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

//   return (
//     <div className="flex-1">
//       <h2 className="text-lg font-bold mb-4">FRIENDS ACTIVITY</h2>
//       <div className="space-y-5">
//         {friends?.friends.map((friend: Friends) => {
//           if (friend.id === user?.id) return null;

//           // Access the object from Redux
//           const inviteInfo = inviteState[friend.id];
//           const state = inviteInfo?.state ?? "none";
//           const storedRoomId = inviteInfo?.roomId;

//           return (
//             <div key={friend.id} className="flex items-center gap-3">
//               <Link to={`/profile/${friend.id}`} className="flex items-center gap-3 min-w-0">
//                 <div className="relative shrink-0">
//                   {friend.profilePicture ? (
//                     <img src={friend.profilePicture} className="w-10 h-10 rounded-full bg-[#282828]" />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
//                       <User className="h-5 w-5 text-white opacity-70" />
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-white text-sm font-medium truncate">{friend.name}</p>
//               </Link>

//               <div className="ml-auto flex items-center gap-2">
//                 {state === "connected" ? (
//                   <span className="text-[#1DB954] text-xs">same room</span>
//                 ) : state === "recieved" ? (
//                   <div className="flex gap-2">
//                     {/* CRITICAL FIX: Use storedRoomId instead of friend.id */}
//                     <button onClick={() => acceptInvite(storedRoomId || friend.id, friend.id)} className="text-green-500">
//                       <Check />
//                     </button>
//                     <button onClick={() => rejectInvite(friend.id)} className="text-red-500">
//                       <X />
//                     </button>
//                   </div>
//                 ) : state === "pending" ? (
//                   <span className="text-gray-400 text-xs">Sent...</span>
//                 ) : (
//                   <button onClick={() => sendInvite(friend.id)} className="px-3 py-1 text-xs border border-gray-500 rounded-full text-white hover:border-white">
//                     Invite
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default FriendsActivity;
