import { socket } from "@/core/config/socket";
import { RootState } from "@/core/store/store";
import { setBulkInvite, setInviteState } from "@/features/user/slice/inviteState.slice";
import { clearPrivateRoom, removeSongFromQueue, setPrivateRoom, setRoomSongQueueData, SongData } from "@/features/user/slice/privateRoomSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const usePrivateRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const room = useSelector((state: RootState) => state.privateRoom);

  const isHost = room.hostId === user?.id;

  useEffect(() => {
    if (!user?.id) return;

    const restoreRoomState = (roomData: any) => {
      roomData && dispatch(setPrivateRoom(roomData));
    };

    const handleRoomDeleted = () => {
      dispatch(clearPrivateRoom());
      navigate("/home");
    };

    const handleRoomMembersUpdated = (type: string,updatedRoom: any,leftUserId?: string) => {
      
      if (type === "left" && leftUserId === user.id) {
        dispatch(clearPrivateRoom());
        dispatch(setBulkInvite({}));
        return;
      }

      dispatch(setPrivateRoom(updatedRoom));

      if (type === "join") {
        updatedRoom.members.forEach((m: any) => {
          if (m.id !== user.id) {
            dispatch(
              setInviteState({ friendId: m.id, state: "connected" })
            );
          }
        });
      }

      if ((type === "left" || type === "remove") && leftUserId) {
        if (leftUserId === user.id) {
          dispatch(clearPrivateRoom());
          navigate("/home");
        } else {
          dispatch(
            setInviteState({ friendId: leftUserId, state: "none" })
          );
        }
      }
    };

    const queueUpdation = (updatedQueue: SongData)=>{
       dispatch(setRoomSongQueueData(updatedQueue));
    }

    const songRemove = (songId:string)=>{
      dispatch(removeSongFromQueue(songId))
    }

    socket.on("restore_room_state", restoreRoomState);
    socket.on("room_deleted", handleRoomDeleted);
    socket.on("room_members_updated", handleRoomMembersUpdated);

    socket.on("queue_updated", queueUpdation)
    socket.on("song_removed", songRemove)

    return () => {
      socket.off("restore_room_state", restoreRoomState);
      socket.off("room_deleted", handleRoomDeleted);
      socket.off("room_members_updated", handleRoomMembersUpdated);

      socket.off("queue_updated"), queueUpdation;
      socket.off("song_removed", songRemove)
    };
  }, [user?.id,dispatch]);

  const leaveRoom = useCallback(() => {
    if (!user?.id || !room.roomId) return;
    socket.emit("left_room", { userId: user.id, roomId: room.roomId });
  }, [user?.id, room.roomId]);

  const removeUser = useCallback(
    (userId: string) => {
      socket.emit("remove_user", {
        userId,
        roomId: room.roomId
      });
    },
    [room.roomId]
  );

  return {
    room,
    isHost,
    leaveRoom,
    removeUser
  };
};
