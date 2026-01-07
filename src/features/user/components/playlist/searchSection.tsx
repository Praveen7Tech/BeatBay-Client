import { Search, X } from "lucide-react";
import { Input } from "@/features/artist/components/song/Input";
import { useRef, useState, KeyboardEvent } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SongData } from "../../services/response.type";

interface PlaylistSearchSectionProps {
  songs: SongData[];
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  addSong: (songId: string) => void;
  isAddingSong?: boolean;
  isSearching: boolean;
}

export const PlaylistSearchSection = ({
  songs,
  isOpen,
  onClose,
  onSearch,
  addSong,
  isAddingSong,
  isSearching,
}: PlaylistSearchSectionProps) => {
  const searchQueryRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState("");

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(localQuery);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setLocalQuery("");
    if (searchQueryRef.current) {
      searchQueryRef.current.value = "";
      searchQueryRef.current.focus();
    }
    onSearch("");
  };

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Let's find something for your playlist
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-[#282828] flex items-center justify-center transition-colors"
        >
          <X className="h-6 w-6 text-spotify-secondary" />
        </button>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-spotify-secondary" />
        <Input
          ref={searchQueryRef}
          type="text"
          placeholder="Search for songs or artists..."
          className="pl-12 h-12 bg-[#242424] border-none text-white placeholder:text-spotify-secondary"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-spotify-secondary hover:text-white" />
          </button>
        )}
      </div>

      {/* Search results section */}
      <div className="space-y-2 min-h-[100px] flex flex-col">
        {isSearching ? (
          <div className="flex items-center justify-center h-10">
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <>
            {songs.map((song) => (
              <div
                key={song._id}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#282828] transition-colors group"
              >
                <img
                  src={song.coverImageUrl}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-white font-normal truncate">{song.title}</p>
                  <p className="text-spotify-secondary text-sm truncate">
                    {song?.artistName }
                  </p>
                </div>


                <span className="text-spotify-secondary text-sm mr-4">{song.duration}</span>

                <button
                  onClick={() => addSong(song._id)}
                  disabled={isAddingSong}
                  className="px-6 py-1.5 rounded-full border border-[#535353] text-white text-sm font-medium hover:border-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-60"
                >
                  {isAddingSong ? "Adding..." : "Add"}
                </button>
              </div>
            ))}

            {songs.length === 0 && localQuery && (
              <p className="text-spotify-secondary text-sm">No songs found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
