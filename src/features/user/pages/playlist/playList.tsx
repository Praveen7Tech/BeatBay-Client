import { useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistHeader } from "../../components/playlist/playList.header";
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { usePlaylistDetails, useSearchSongs } from "@/core/hooks/playList/usePlayList";
import { SongTable } from "@/core/components/song/SongTable";

import { usePlayer } from "@/core/context/AudioProvider"; 
import { useSongActions } from "@/core/hooks/song/useSongActions";
import { SpinnerCustom } from "@/components/ui/spinner";

export default function PlaylistDetail() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!playlistId)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Invalid playlist</p>
      </div>
    );

  const { startPlayback, isPlaying, playPause, currentSong } = usePlayer();

  const { data: playlist, isLoading, isError, error } = usePlaylistDetails(playlistId);
  const { data: searchSongs, isFetching } = useSearchSongs(searchQuery);
  const { handleAddToPlaylist, handleRemoveFromPlaylist } = useSongActions("playlist", { playlistId });

  if (isLoading) return <SpinnerCustom />;

  if (isError || !playlist)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  const songs = playlist.songs;

  // Is the current player session playing THIS playlist?
  const isThisPlaylistActive = currentSong && songs.some(s => s.id === currentSong.id);
  const isPlayingActual = isThisPlaylistActive && isPlaying;

  const handlePlayPause = () => {
    if (isThisPlaylistActive) {
      playPause();
    } else if (songs.length > 0) {
      startPlayback([...songs], 0);
    }
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <PlaylistHeader
          playListData={playlist}
          onAddSongClick={() => setIsSearchOpen(true)}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlayingActual!}
          totalTracks={songs.length}
          totalDuration={playlist.totalDuration}
        />

        <SongTable
          songs={songs}
          title="Featured Songs"
          activeSongId={currentSong?.id}
          showAction
          showRemoveFromPlaylist
          onRemoveFromPlaylist={handleRemoveFromPlaylist}
          onAddToPlaylist={handleAddToPlaylist}
        />

        <PlaylistSearchSection
          songs={searchSongs || []}
          isOpen={isSearchOpen}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          onSearch={handleSearch}
          addSong={handleAddToPlaylist}
          isAddingSong={false}
          isSearching={isFetching}
        />
      </div>
    </div>
  );
}
