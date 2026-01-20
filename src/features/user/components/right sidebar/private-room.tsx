import { usePrivateRoom } from "@/core/hooks/private-room/usePrivateRoom";
import { Crown, User, X, Users, LogOut } from "lucide-react";
import PrivateRoomsEmpty from "./privateRoom-empty";

const PrivateRooms = () => {
  const { room, isHost, leaveRoom, removeUser } = usePrivateRoom();
  const members = room.members;

  if (!room.isActive) return <PrivateRoomsEmpty />;

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">
            Chill Vibes
          </h3>
          <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
            <Users size={12} className="text-[#1DB954]" />
            {members.length} listening
          </div>
        </div>

        <button
          onClick={leaveRoom}
          className="text-red-400 text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#282828] hover:bg-[#3e3e3e]"
        >
          <LogOut size={14} />
          Leave
        </button>
      </div>

      {/* Members */}
      <div className="space-y-2">
        {members.map(member => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] group"
          >
            {member.image ? (
              <img
                src={member.image}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
                <User size={18} className="text-white/70" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {member.name}
              </p>
              <div className="flex items-center gap-1 text-xs">
                {member.role === "host" ? (
                  <Crown size={10} className="text-[#1DB954]" />
                ) : (
                  <User size={10} className="text-zinc-400" />
                )}
                <span className="capitalize text-zinc-400">
                  {member.role}
                </span>
              </div>
            </div>

            {isHost && member.role !== "host" && (
              <button
                onClick={() => removeUser(member.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateRooms;
