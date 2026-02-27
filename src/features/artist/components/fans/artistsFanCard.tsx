import { Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Fans } from "../../utils/api.type";


interface ArtistFanCardProps {
  fan: Fans;
}

export const ArtistFanCard = ({ fan }: ArtistFanCardProps) => {
  return (
    <div className="bg-linear-to-b from-gray-900 to-black rounded-lg p-4 hover:bg-[#282828] transition-colors group">
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="w-14 h-14 rounded-full overflow-hidden bg-[#282828] shrink-0">
          {fan.profilePicture ? (
            <img src={fan.profilePicture} alt={fan.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#535353] to-[#282828] flex items-center justify-center">
              <span className="text-xl text-spotify-secondary font-bold">{fan.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Fan Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{fan.name}</h3>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-[#282828] grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#1DB954]" />
          <div>
            <p className="text-[#a7a7a7] text-xs">Following since</p>
            <p className="text-white text-sm">{format(parseISO(fan.followerdSince),"MMM dd, yyyy") }</p>
          </div>
        </div>
      </div>
    </div>
  );
};
