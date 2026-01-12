import { User } from "lucide-react";
import { ArtistDTO } from "../../services/response.type";
interface ArtistSectionProps {
  artist: ArtistDTO;
}

export const ArtistSection = ({ artist }: ArtistSectionProps) => {

  const hasImage = !!artist.profilePicture;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-transparent rounded-lg hover:bg-[#282828] transition-colors cursor-pointer">

        {/* Artist Image + Fallback */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#3a3a3a] flex items-center justify-center">
          {hasImage ? (
            <img
              src={artist.profilePicture}
              alt={artist.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <User className="text-white/60 w-8 h-8" />
          )}
        </div>

        {/* Artist Info */}
        <div>
          <p className="text-xs text-spotify-secondary mb-1">Artist</p>
          <p className="text-base font-bold text-white">{artist.name}</p>
        </div>

      </div>
    </div>
  );
};
