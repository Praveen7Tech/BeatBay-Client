interface ArtistCardProps {
  id: string;
  name: string;
  coverImageUrl: string;
}

const ArtistCard = ({ name, coverImageUrl }: ArtistCardProps) => {
  return (
    <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
      <img
        src={coverImageUrl}
        alt={name}
        className="w-full aspect-square rounded-full mb-4 shadow-lg"
      />
      <p className="text-white font-medium truncate">{name}</p>
      <p className="text-sm text-spotify-secondary">Artist</p>
    </div>
  );
};

export default ArtistCard;
