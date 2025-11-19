interface ArtistSectionProps {
  artistId: {
    name: string;
    profilePicture: string;
  };
 
}

export const ArtistSection = ({ artistId }: ArtistSectionProps) => {
  const URL = import.meta.env.VITE_API_URL
  const baseURL = `${URL}/uploads/${artistId.profilePicture}`
  return (
    <div className="space-y-4">
      {/* Main Artist */}
      <div className="flex items-center gap-4 p-4 bg-transparent rounded-lg hover:bg-[#282828] transition-colors cursor-pointer">
        <img
          src={baseURL}
          alt={artistId.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-xs text-[#b3b3b3] mb-1">Artist</p>
          <p className="text-base font-bold text-white">{artistId.name}</p>
        </div>
      </div>
    </div>
  );
};
