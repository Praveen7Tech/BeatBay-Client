interface ArtistCardProps {
  id: string;
  name: string;
  image: string;
}

const ArtistCard = ({ name, image }: ArtistCardProps) => {
  return (
    <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
      <img
        src={image}
        alt={name}
        className="w-full aspect-square rounded-full mb-4 shadow-lg"
      />
      <p className="text-white font-medium truncate">{name}</p>
      <p className="text-sm text-spotify-secondary">Artist</p>
    </div>
  );
};

export default ArtistCard;
