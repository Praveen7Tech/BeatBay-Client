import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/core/config/socket";
import { RootState } from "@/core/store/store";
import { setBulkInvite, setInviteState } from "@/features/user/slice/inviteState.slice";
import { setPrivateRoom } from "@/features/user/slice/privateRoomSlice";
import { useToaster } from "@/core/hooks/toast/useToast";
import { showError } from "@/core/utils/toast.config";

export const useSocketListeners = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const { toast } = useToaster();

    useEffect(() => {
        if (!user?.id) return;

        const SyncFriendsStatus = (friedsState:any)=>{
            console.log("bulk invite ", friedsState)
            dispatch(setBulkInvite(friedsState))
        }

        const handleRoomCreation = (roomData: any)=>{
            dispatch(setPrivateRoom(roomData))
        }

        const handleInviteReceived = (fromUserId: string ) => {
            dispatch(setInviteState({ friendId: fromUserId, state: "recieved" }));
            
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

        const handleNotification = (message: string)=>{
            toast.info(message)
        }

        socket.on("room_created", handleRoomCreation)
        socket.on("sync_friends_status", SyncFriendsStatus)
        socket.on("friend_status_changed", handleGlobalStatusChange);

        socket.on("invite_received", handleInviteReceived);
        socket.on("invite_rejected", handleInviteRejected);
        socket.on("invite_expired", handleInviteError);
        socket.on("invite_expired_host", handleInviteExpiredHost);

        socket.on("notification_recieved", handleNotification)

        return () => {
            socket.off("room_created", handleRoomCreation)
            socket.off("sync_friends_status", SyncFriendsStatus)
            socket.off("friend_status_changed", handleGlobalStatusChange);

            socket.off("invite_received", handleInviteReceived);
            socket.off("invite_rejected", handleInviteRejected);
            socket.off("invite_expired", handleInviteError);
            socket.off("invite_expired_host", handleInviteExpiredHost);

            socket.off("notification_recieved", handleNotification)
        };
        }, [user?.id]);
    };
