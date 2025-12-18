import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Check, User, X } from "lucide-react";
import { Friends, userApi } from "../../services/userApi";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useEffect, useState, useCallback } from "react";
import { socket } from "@/core/config/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

type InviteState = "none" | "pending" | "received" | "connected";

type InviteStateMap = Record<string, InviteState>;

interface RoomCreatedPayload {
  roomId: string;
  hostId: string;
  guestId: string;
}

/* ---------- COMPONENT ---------- */

const FriendsActivity = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [inviteState, setInviteState] = useState<InviteStateMap>({});

  const {data: friends, isLoading, isError,error,} = useQuery({
    queryKey: ["friendsActivity"],
    queryFn: userApi.getFriends,
    enabled: !!user?.id,
  });

  /* ---------- SOCKET LISTENERS ---------- */

  useEffect(() => {
    if (!user?.id) return;

    const handleInviteReceived = ({ fromUserId }: { fromUserId: string }) => {
      setInviteState((prev) => ({
        ...prev,
        [fromUserId]: "received",
      }));
    };

    const handleRoomCreated = (room: RoomCreatedPayload) => {
      setInviteState((prev) => ({
        ...prev,
        [room.hostId]: "connected",
        [room.guestId]: "connected",
      }));
    };

    const handleInviteRejected = ({ guestId }: { guestId: string }) => {
      setInviteState((prev) => ({
        ...prev,
        [guestId]: "none",
      }));
    };

    socket.on("invite_received", handleInviteReceived);
    socket.on("room_created", handleRoomCreated);
    socket.on("invite_rejected", handleInviteRejected);

    return () => {
      socket.off("invite_received", handleInviteReceived);
      socket.off("room_created", handleRoomCreated);
      socket.off("invite_rejected", handleInviteRejected);
    };
  }, [user?.id]);

  /* ---------- ACTIONS ---------- */

  // send invite request
  const sendInvite = useCallback(
    (friendId: string) => {
      if (!user?.id) return;

      socket.emit("invite_send", {
        fromUserId: user.id,
        toUserId: friendId,
      });

      setInviteState((prev) => ({
        ...prev,
        [friendId]: "pending",
      }));
    },
    [user?.id]
  );

  // accept invite request
  const acceptInvite = useCallback(
    (friendId: string) => {
      if (!user?.id) return;

      socket.emit("accept_invite", {
        hostId: friendId,
        guestId: user.id,
      });
    },
    [user?.id]
  );

  // reject invite request
  const rejectInvite = useCallback(
    (friendId: string) => {
      if (!user?.id) return;

      socket.emit("reject_invite", {
        hostId: friendId,
        guestId: user.id,
      });

      setInviteState((prev) => ({
        ...prev,
        [friendId]: "none",
      }));
    },
    [user?.id]
  );


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
                {state === "received" && (
                  <>
                    <button
                      onClick={() => acceptInvite(friend.id)}
                      className="text-green-500 hover:scale-110 transition"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => rejectInvite(friend.id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}

                {state === "pending" && (
                  <span className="text-gray-400 text-xs italic">Pending…</span>
                )}

                {state === "connected" && (
                  <span className="text-green-500 text-xs font-bold animate-pulse">
                    Connecting
                  </span>
                )}

                {state === "none" && (
                  <button
                    onClick={() => sendInvite(friend.id)}
                    className="px-3 py-1 text-xs font-semibold text-white border border-[#727272] rounded-full hover:border-white hover:scale-105 transition-all"
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
