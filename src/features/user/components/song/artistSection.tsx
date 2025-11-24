import { User } from "lucide-react";

interface ArtistSectionProps {
  artistId: {
    name: string;
    profilePicture: string;
  };
}

export const ArtistSection = ({ artistId }: ArtistSectionProps) => {
  const URL = import.meta.env.VITE_API_URL;
  const baseURL = `${URL}/uploads/${artistId.profilePicture}`;

  const hasImage = !!artistId.profilePicture;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-transparent rounded-lg hover:bg-[#282828] transition-colors cursor-pointer">

        {/* Artist Image + Fallback */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#3a3a3a] flex items-center justify-center">
          {hasImage ? (
            <img
              src={baseURL}
              alt={artistId.name}
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
          <p className="text-xs text-[#b3b3b3] mb-1">Artist</p>
          <p className="text-base font-bold text-white">{artistId.name}</p>
        </div>

      </div>
    </div>
  );
};
