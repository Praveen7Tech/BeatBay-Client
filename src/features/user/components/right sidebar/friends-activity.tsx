import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Check, User, X } from "lucide-react";
import { useSelector } from "react-redux";

import { userApi } from "../../services/userApi";
import { SpinnerCustom } from "@/components/ui/spinner";
import { socket } from "@/core/config/socket";
import { RootState } from "@/core/store/store";
import { showSuccess } from "@/core/utils/toast.config";
import { useDispatch } from "react-redux";
import { setPrivateRoom } from "../../slice/privateRoomSlice";

interface Friend {
  id: string;
  name: string;
  profilePicture?: string;
  status?: boolean;
}

const FriendsActivity = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch()

  const [incomingInvites, setIncomingInvites] = useState<Record<string, string>>(
    {}
  );
  const [sentInvites, setSentInvites] = useState<Set<string>>(new Set());
  const [jammingWith, setJammingWith] = useState<string | null>(null);

  const { data: friends, isLoading, isError,error,} = useQuery({
    queryKey: ["friendsActivity"],
    queryFn: userApi.getFriends,
  });

  /* ---------------- SOCKET LISTENERS ---------------- */
  useEffect(() => {
    socket.on("recieve_invite", (data) => {
      setIncomingInvites((prev) => ({
        ...prev,
        [data.fromUser.id]: data.roomId,
      }));
    });

    socket.on("invite_accepted", (data) => {
      setJammingWith(data.guestId);
      setSentInvites((prev) => {
        const next = new Set(prev);
        next.delete(data.guestId);
        return next;
      });
      showSuccess("Friend joined your room!");
    });

    socket.on("invite_declined", (data) => {
      setSentInvites((prev) => {
        const next = new Set(prev);
        next.delete(data.guestId);
        return next;
      });
    });

    return () => {
      socket.off("recieve_invite");
      socket.off("invite_accepted");
      socket.off("invite_declined");
    };
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleSendInvite = (friendId: string) => {
    socket.emit("send_invite", {
      toUserId: friendId,
      fromUser: {
        id: user?.id,
        name: user?.name,
        profilePicture: user?.profilePicture,
      },
    });

    setSentInvites((prev) => new Set(prev).add(friendId));
    showSuccess("Invite sent");
  };

  const handleAccept = (friendId: string) => {
    const roomId = incomingInvites[friendId];
    const friend = friends?.friends.find(f => f.id === friendId)
    
    socket.emit("accept_invite", { roomId, hostId: friendId, guestId: user?.id });

    dispatch(setPrivateRoom({
      roomId,
      partnerName: friend?.name || "friend",
      partnerId: friendId,
      isHost: true
    }))

    setJammingWith(friendId);
    setIncomingInvites((prev) => {
      const next = { ...prev };
      delete next[friendId];
      return next;
    });
  };

  const handleDecline = (friendId: string) => {
    socket.emit("decline_invite", { hostId: friendId });

    setIncomingInvites((prev) => {
      const next = { ...prev };
      delete next[friendId];
      return next;
    });
  };

  /* -------------------------------- */
  if (isLoading) return <SpinnerCustom />;

  if (isError)
    return (
      <p className="text-red-500">
        Error loading friends: {(error as Error).message}
      </p>
    );

  return (
    <div className="flex-1">
      <h2 className="text-lg font-bold mb-4">FRIENDS ACTIVITY</h2>

      <div className="space-y-5">
        {friends?.friends.map((friend: Friend) => (
          <div key={friend.id} className="flex items-center gap-3">
            {/* Profile + Name */}
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
              {incomingInvites[friend.id] ? (
                <>
                  <button
                    onClick={() => handleAccept(friend.id)}
                    className="text-green-500 hover:scale-110 transition"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleDecline(friend.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : jammingWith === friend.id ? (
                <span className="text-green-500 text-xs font-bold animate-pulse">
                  JAMMING
                </span>
              ) : sentInvites.has(friend.id) ? (
                <span className="text-gray-400 text-xs italic">Pending…</span>
              ) : (
                <button
                  onClick={() => handleSendInvite(friend.id)}
                  className="px-3 py-1 text-xs font-semibold text-white border border-[#727272] rounded-full hover:border-white hover:scale-105 transition-all"
                >
                  Invite
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsActivity;
