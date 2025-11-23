import { useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistHeader } from "../../components/playlist/playList.header";
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { PlaylistSongTable } from "../../components/playlist/songList";
import { usePlaylistDetails,useSearchSongs, useAddSongToPlaylist} from "@/core/hooks/usePlayList";

export default function PlaylistDetail() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!playlistId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Invalid playlist</p>
      </div>
    );
  }

  // playlist query
  const {data: playlist,isLoading: isPlaylistLoading,isError: isPlaylistError,} = usePlaylistDetails(playlistId);

  // search songs query
  const { data: searchSongs, isFetching: isSearchFetching } = useSearchSongs(searchQuery);

  // add song mutation
  const addSongMutation = useAddSongToPlaylist(playlistId);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddSong = (songId: string) => {
    addSongMutation.mutate(songId);
  };

  if (isPlaylistLoading || isSearchFetching) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading playlist...</p>
      </div>
    );
  }

  if (isPlaylistError || !playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Failed to load playlist</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <PlaylistHeader
          playListName={playlist.name}
          onAddSongClick={() => setIsSearchOpen(true)}
        />

        <PlaylistSearchSection
          songs={searchSongs || []}
          isOpen={isSearchOpen}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          onSearch={handleSearch}
          addSong={handleAddSong}
          isAddingSong={addSongMutation.isPending}
          // isSearching={isSearchFetching}
        />

        <PlaylistSongTable songs={playlist.songs} />
      </div>
    </div>
  );
}
