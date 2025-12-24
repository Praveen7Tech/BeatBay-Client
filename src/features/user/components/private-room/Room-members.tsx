import { Crown, User, X, Users } from "lucide-react";
import { RoomMember } from "./types"; 



const RoomMembers = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5">
      <div className="flex items-center gap-2 p-4 border-b border-white/5">
        <Users size={18} className="text-[#1DB954]" />
        Room Members
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* {members.map(member => ( */}
          <div key={"member.id"} className="flex items-center gap-3 bg-[#282828] p-3 rounded-xl">
            <img src={"member.avatar"} className="w-11 h-11 rounded-full" />
            <div className="flex-1">
              <p className="text-sm">{"member.name"}</p>
              {/* {member.role === "host" ? <Crown size={12} /> : <User size={12} />} */}
            </div>
            {/* {isHost && member.role !== "host" && <X size={14} />} */}
          </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default RoomMembers;
