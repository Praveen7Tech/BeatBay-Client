import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Check, User, X, Radio } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; 
import { RootState } from "@/core/store/store";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Friends } from "../../services/response.type";
import { useSocketListeners } from "@/core/hooks/private-room/useSocketListners";
import { useFriendActions } from "@/core/hooks/private-room/useFriendsActions";
import { useFriendsActivity } from "./useFriendsActivity";
import { cn } from "@/lib/utils";

const FriendsActivity = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const inviteState = useSelector((state: RootState) => state.inviteState.invites);

  const { friends, isLoading, isError, error } = useFriendsActivity();
  useSocketListeners();
  const { sendInvite, acceptInvite, rejectInvite } = useFriendActions();

  // Status Weighting Logic
  const statusWeight: Record<string, number> = {
    connected: 0, // Top: Listening together
    recieved: 1,  // Next: Action needed
    none: 2,      // Next: Online & Available
    pending: 3,   // Next: Waiting for them
    offline: 4,   // Bottom: Offline
  };

  // 2. MEMOIZED SORTING: Re-sorts automatically when inviteState changes via Sockets
  const sortedFriends = useMemo(() => {
    if (!friends?.friends) return [];

    return [...friends.friends].sort((a, b) => {
      const stateA = inviteState[a.id] ?? "offline";
      const stateB = inviteState[b.id] ?? "offline";

      if (statusWeight[stateA] !== statusWeight[stateB]) {
        return statusWeight[stateA] - statusWeight[stateB];
      }
      return a.name.localeCompare(b.name); // Alphabetical secondary sort
    });
  }, [friends, inviteState]);

  if (isLoading) return <div className="flex justify-center p-8"><SpinnerCustom /></div>;
  if (isError) return <p className="text-red-500 text-sm p-4">Error: {error?.message}</p>;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-sm font-bold text-spotify-secondary uppercase tracking-widest">
          Friends Activity
        </h2>
        <User size={16} className="text-spotify-secondary" />
      </div>

      <div className="space-y-4">
        {/* AnimatePresence handles items being added/removed */}
        <AnimatePresence mode="popLayout">
          {sortedFriends.map((friend: Friends) => {
            if (friend.id === user?.id) return null;

            const state = inviteState[friend.id] ?? "offline";
            const isOffline = state === "offline";
            const isInJam = state === "connected";

            return (
                <motion.div
                  key={friend.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 px-2 group"
                >
                  {/* PROFILE SECTION */}
                  <Link to={`/profile/${friend.id}`} className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-spotify-dark flex items-center justify-center overflow-hidden border border-[#282828]">
                      {friend.profilePicture ? (
                        <img src={friend.profilePicture} alt={friend.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-spotify-secondary" />
                      )}
                    </div>

                    {!isOffline && (
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black bg-[#1DB954]",
                          isInJam && "animate-pulse"
                        )}
                      />
                    )}
                  </Link>

                  {/* NAME & STATUS */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                    <p className="text-[11px] text-spotify-secondary truncate">
                      {isOffline ? "Offline" : isInJam ? "Listening in a Jam" : "Online"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="ml-auto flex items-center gap-2">
                    {isOffline ? (
                      <span className="text-[10px] text-[#535353] font-medium">--</span>
                    ) : state === "connected" ? (
                      <Radio size={16} className="text-[#1DB954]" />
                    ) : state === "recieved" ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => acceptInvite(friend.id)}
                          className="p-1.5 rounded-full bg-[#1DB954] text-black hover:scale-110 transition"
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>
                        <button
                          onClick={() => rejectInvite(friend.id)}
                          className="p-1.5 rounded-full bg-[#ff4d4d] text-white hover:scale-110 transition"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ) : state === "pending" ? (
                      <span className="text-[10px] text-[#1DB954] font-bold animate-pulse">Sent</span>
                    ) : (
                      <button
                        onClick={() => sendInvite(friend.id)}
                        className="hidden group-hover:block px-3 py-1 text-[11px] font-bold border border-spotify-secondary rounded-full text-white hover:border-white transition-all"
                      >
                        Invite
                      </button>
                    )}
                  </div>
                </motion.div>
              );

          })}
        </AnimatePresence>
      </div>

      {friends?.friends.length === 0 && (
        <p className="text-xs text-spotify-secondary text-center mt-10 italic">Follow friends to see activity</p>
      )}
    </div>
  );
};

export default FriendsActivity;
