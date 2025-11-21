import { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { Input } from "@/features/artist/components/song/Input"; 
import album1 from '/src/assets/bg.png'
import album2 from '/src/assets/bg.png'
import album3 from'/src/assets/bg.png';

interface AddSongDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSongDialog = ({ isOpen, onClose }: AddSongDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock songs for search
  const allSongs = [
    { id: 1, title: "Neon Lights", artist: "AR Rahman", coverImage: album1, duration: "03:45" },
    { id: 2, title: "Summer Nights", artist: "Anirudh", coverImage: album2, duration: "04:22" },
    { id: 3, title: "Electric Dreams", artist: "Yuvan", coverImage: album3, duration: "03:12" },
    { id: 4, title: "Midnight City", artist: "Harris Jayaraj", coverImage: album1, duration: "05:01" },
    { id: 5, title: "Ocean Waves", artist: "Ilaiyaraaja", coverImage: album2, duration: "04:15" },
  ];

  const filteredSongs = searchQuery
    ? allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSongs;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Add Songs to Playlist</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-surface flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredSongs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No songs found</p>
          ) : (
            <div className="space-y-2">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface transition-colors group"
                >
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium truncate">{song.title}</p>
                    <p className="text-muted-foreground text-sm truncate">{song.artist}</p>
                  </div>
                  <span className="text-muted-foreground text-sm">{song.duration}</span>
                  <button
                    className="w-10 h-10 rounded-full bg-surface hover:bg-primary transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <Plus className="h-5 w-5 text-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
