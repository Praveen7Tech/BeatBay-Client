import { Users, Plus } from "lucide-react";

interface Room {
  id: string;
  name: string;
  listeners: number;
  host: string;
}

interface PrivateRoomsProps {
  rooms?: Room[];
}

const defaultRooms: Room[] = [
  { id: "1", name: "Chill Vibes", listeners: 5, host: "John" },
  { id: "2", name: "Late Night Jams", listeners: 3, host: "Sarah" },
];

const PrivateRooms = ({ rooms = defaultRooms }: PrivateRoomsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold ">PRIVATE ROOM</h2>
        <button className="w-6 h-6 rounded-full bg-[#282828] hover:bg-[#3e3e3e] flex items-center justify-center transition-colors">
          <Plus size={14} className="text-white" />
        </button>
      </div>
      <div className="space-y-2">
        {rooms.map((room) => (
          <div key={room.id} className="bg-[#1a1a1a] rounded-lg p-3 hover:bg-[#282828] transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{room.name}</p>
                <p className="text-spotify-secondary text-xs">Hosted by {room.host}</p>
              </div>
              <div className="flex items-center gap-1 text-[#1DB954]">
                <Users size={12} />
                <span className="text-xs">{room.listeners}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateRooms;
