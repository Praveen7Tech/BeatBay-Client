import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/core/config/socket";
import { RootState } from "@/core/store/store";
import { setInviteState } from "@/features/user/slice/inviteState.slice";

export const useFriendActions = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

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
    
    }, [user?.id]);

    const rejectInvite = useCallback((hostId: string) => {
        if (!user?.id) return;
        
        socket.emit("reject_invite", {
            hostId,
            guestId: user.id,
        });

        dispatch(setInviteState({ friendId: hostId, state: "connected" }));
    }, [user?.id]);

  return { sendInvite, acceptInvite, rejectInvite };
};
