
import { Users, LogOut, Crown, User, X } from "lucide-react";

interface RoomUser {
  id: string;
  name: string;
  avatar: string;
  role: "host" | "guest";
}

interface PrivateRoomsProps {
  roomName?: string;
  users?: RoomUser[];
  currentUserId?: string;
  onLeave?: () => void;
  onRemoveUser?: (userId: string) => void;
}

const defaultUsers: RoomUser[] = [
  { id: "1", name: "John", avatar: "https://i.pravatar.cc/40?img=1", role: "host" },
  { id: "2", name: "Sarah", avatar: "https://i.pravatar.cc/40?img=2", role: "guest" },
  { id: "3", name: "Mike", avatar: "https://i.pravatar.cc/40?img=3", role: "guest" },
  { id: "4", name: "Emma", avatar: "https://i.pravatar.cc/40?img=4", role: "guest" },
];

const PrivateRooms = ({ 
  roomName = "Chill Vibes", 
  users = defaultUsers,
  currentUserId = "1",
  onLeave,
  onRemoveUser
}: PrivateRoomsProps) => {
  const isHost = users.find(u => u.id === currentUserId)?.role === "host";
  
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">{roomName}</h3>
          <div className="flex items-center gap-1 text-spotify-secondary text-xs mt-1">
            <Users size={12} />
            <span>{users.length} listening</span>
          </div>
        </div>
        <button 
          onClick={onLeave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#282828] hover:bg-[#3e3e3e] text-spotify-secondary hover:text-white text-xs transition-colors"
        >
          <LogOut size={12} />
          <span>Leave</span>
        </button>
      </div>
      
      <div className="space-y-2">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] transition-colors group"
          >
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <div className="flex items-center gap-1">
                {user.role === "host" ? (
                  <Crown size={10} className="text-[#1DB954]" />
                ) : (
                  <User size={10} className="text-spotify-secondary" />
                )}
                <span className={`text-xs capitalize ${user.role === "host" ? "text-[#1DB954]" : "text-spotify-secondary"}`}>
                  {user.role}
                </span>
              </div>
            </div>
            {isHost && user.role !== "host" && (
              <button
                onClick={() => onRemoveUser?.(user.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
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
