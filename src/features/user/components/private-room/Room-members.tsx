import { Crown, User, X, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";


const RoomMembers = () => {

  const members = useSelector((state:RootState)=> state.privateRoom.members)
  
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5">
      <div className="flex items-center gap-2 p-4 border-b border-white/5">
        <Users size={18} className="text-[#1DB954]" />
        Room Members
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {members.map(member => (
          <div key={member.id} className="flex items-center gap-3 bg-[#282828] p-3 rounded-xl">
            {member.image ? (
              <img src={member.image} className="w-11 h-11 rounded-full" />
            ):
              <div className="w-10 h-10 rounded-full bg-[#282828] flex items-center justify-center">
                  <User className="h-5 w-5 text-white opacity-70" />
              </div>
            }
            <div className="flex-1">
              <p className="text-sm">{member.name}</p>
              {member.role === "host" ? <Crown size={12} /> : <User size={12} />}
            </div>
            {member.role !== "host" && <X size={14} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomMembers;
