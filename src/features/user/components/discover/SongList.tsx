interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string | number;
  coverImageUrl: string;
}

interface SongListProps {
  songs: Song[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
      <div className="space-y-2">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] cursor-pointer group"
          >
            <img
              src={song.coverImageUrl}
              alt={song.title}
              className="w-10 h-10 rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{song.title}</p>
              <p className="text-sm text-spotify-secondary truncate">{song.artist}</p>
            </div>
            <span className="text-sm text-spotify-secondary">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
    