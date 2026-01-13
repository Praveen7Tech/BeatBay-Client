import { useState } from "react";
import { useParams } from "react-router-dom";
import { PlaylistHeader } from "../../components/playlist/playList.header";
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { usePlaylistDetails,useSearchSongs, useAddSongToPlaylist} from "@/core/hooks/playList/usePlayList";
import { SongTable } from "@/core/components/song/SongTable";
import { useAudioContext } from "@/core/context/useAudioContext";
import { useRemoveFromPlayList } from "@/core/hooks/playList/useRemoveFromPlayList";

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
  const { setPlaylistAndPlay, isPlaying,playPause, currentSong } = useAudioContext();

  // playlist query
  const {data: playlist,isLoading: isPlaylistLoading,isError: isPlaylistError,} = usePlaylistDetails(playlistId);

  // search songs query
  const { data: searchSongs, isFetching: isSearchFetching } = useSearchSongs(searchQuery);

  // add & remove song mutation
  const addSongMutation = useAddSongToPlaylist();
  const removeSongMutation = useRemoveFromPlayList(playlistId)

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // add to playlist
  const handleAddSong = (songId: string) => {
    console.log("hayoo ", playlistId,songId)
    addSongMutation.mutate({playlistId,songId});
  };
  // remove from playlist
  const handleRemoveSong = (songId:string)=>{
    removeSongMutation.mutate(songId)
  }

  if (isPlaylistLoading ) {
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

  const songs = playlist.songs
  const isCurrentSongPlaying = currentSong?.id === songs[0]?.id

  const handlePlayPause = () => {
    if (isCurrentSongPlaying) {
      playPause();
    } else {
      const playlist = [
        ...songs
      ];
      setPlaylistAndPlay(playlist, 0);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <PlaylistHeader
          playListData={playlist}
          onAddSongClick={() => setIsSearchOpen(true)}
          handlePlayPause = {handlePlayPause}
          isPlaying={isPlaying}
          totalTracks={playlist.songs.length}
          totalDuration={playlist.totalDuration}
        />
        <SongTable 
          songs={playlist.songs}
          title={ "Featured Songs"}
          activeSongId={currentSong?.id}
          showAction={true}
          showRemoveFromPlaylist= {true}
          onRemoveFromPlaylist={handleRemoveSong}
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
          isSearching={isSearchFetching}
        />

        
      </div>
    </div>
  );
}
