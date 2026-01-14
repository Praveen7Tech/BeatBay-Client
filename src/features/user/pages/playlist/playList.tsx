import { useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistHeader } from "../../components/playlist/playList.header";
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { usePlaylistDetails, useSearchSongs } from "@/core/hooks/playList/usePlayList";
import { SongTable } from "@/core/components/song/SongTable";
import { useAudioContext } from "@/core/context/useAudioContext";
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

  const { setPlaylistAndPlay, isPlaying, playPause, currentSong } = useAudioContext();

  // Playlist query
  const { data: playlist, isLoading, isError,error } = usePlaylistDetails(playlistId);

  // Search query
  const { data: searchSongs, isFetching } = useSearchSongs(searchQuery);

  // Song actions (playlist context)
  const { handleAddToPlaylist, handleRemoveFromPlaylist } = useSongActions("playlist", {playlistId,});

  if (isLoading) return <SpinnerCustom/>

  if (isError || !playlist)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  const songs = playlist.songs;
  const isCurrentSongPlaying = currentSong?.id === songs[0]?.id;

  const handlePlayPause = () => {
    if (isCurrentSongPlaying) playPause();
    else setPlaylistAndPlay([...songs], 0);
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <PlaylistHeader
          playListData={playlist}
          onAddSongClick={() => setIsSearchOpen(true)}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
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
