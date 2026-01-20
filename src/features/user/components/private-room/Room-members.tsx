import { Crown, User, X, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RoomMemberProps {
  removeUser: (guestId: string) => void;
}

const RoomMembers = ({ removeUser }: RoomMemberProps) => {
  const members = useSelector(
    (state: RootState) => state.privateRoom.members
  );

  const hostId = useSelector(
    (state: RootState) => state.privateRoom.hostId
  );

  const currentUserId = useSelector(
    (state: RootState) => state.auth.user?.id
  );

  const isAdmin = currentUserId === hostId;

  return (
    <div className="bg-linear-to-br from-[#080101] to-[#c22020] overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 text-sm font-semibold tracking-wide">
        <Users size={18} className="text-[#1DB954]" />
        Room Members
        <span className="ml-auto text-xs text-white/40">
          {members.length}
        </span>
      </div>

      {/* Members */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {members.length === 0 ? (
          /* Empty State */
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center text-white/50">
            <Users size={28} className="mb-3 opacity-60" />
            <p className="text-sm font-medium">No members yet</p>
            <p className="text-xs mt-1 opacity-70">
              Invite friends to join the room
            </p>
          </div>
        ) : (
          members.map(member => (
            <div
              key={member.id}
              className="group flex items-center gap-3 bg-[#202020] p-3 rounded-xl
                         hover:bg-[#2f2f2f] transition-colors border border-transparent
                         hover:border-white/10"
            >
              {/* Avatar */}
              {member.image ? (
                <img
                  src={member.image}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#3a3a3a] flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-white/70" />
                </div>
              )}

              {/* Name & Role */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {member.name}
                </p>

                <div className="flex items-center gap-1 mt-1">
                  {member.role === "host" ? (
                    <>
                      <Crown size={12} className="text-yellow-400" />
                      <span className="text-xs text-yellow-400">
                        Host
                      </span>
                    </>
                  ) : (
                    <>
                      <User size={12} className="text-[#1DB954]" />
                      <span className="text-xs text-white/50">
                        Guest
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Remove Button (Admin Only) */}
              {isAdmin && member.role !== "host" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => removeUser(member.id)}
                      className="opacity-0 group-hover:opacity-100
                                 p-1.5 rounded-full
                                 hover:bg-red-500/20 transition"
                    >
                      <X size={14} className="text-red-400" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Remove user
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomMembers;
