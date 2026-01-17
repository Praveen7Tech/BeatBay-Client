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
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5">
      
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-white/5 text-sm font-semibold">
        <Users size={18} className="text-[#1DB954]" />
        Room Members
      </div>

      {/* Members */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {members.map(member => (
          <div
            key={member.id}
            className="flex items-center gap-3 bg-[#282828] p-3 rounded-xl hover:bg-[#303030] transition"
          >
            {/* Avatar */}
            {member.image ? (
              <img
                src={member.image}
                className="w-11 h-11 rounded-full object-cover"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#3a3a3a] flex items-center justify-center">
                <User className="h-5 w-5 text-white/70" />
              </div>
            )}

            {/* Name & Role */}
            <div className="flex-1">
              <p className="text-sm font-medium truncate">
                {member.name}
              </p>

              <div className="flex items-center gap-1 mt-1">
                {member.role === "host" ? (
                  <>
                    <Crown size={12} className="text-yellow-400" />
                    <span className="text-xs text-yellow-400">Host</span>
                  </>
                ) : (
                  <>
                  <User size={12} className="text-[#1DB954]"/>
                  <span className="text-xs text-white/50">Guest</span>
                  </>
                )}
              </div>
            </div>

            {/* Remove Button (ADMIN ONLY) */}
            {isAdmin && member.role !== "host" && (
             <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => removeUser(member.id)}
                className="p-1 rounded-full hover:bg-red-500/20 transition"
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
        ))}
      </div>
    </div>
  );
};

export default RoomMembers;
