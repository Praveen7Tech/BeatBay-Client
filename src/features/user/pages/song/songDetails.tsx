import { SongHeader } from "../../components/song/songHeader"; 
import { LyricsSection } from "../../components/song/lyricSection"; 
import { Link, useParams } from "react-router-dom";
import { useAudioContext } from "@/core/context/useAudioContext"; 
import { ArtistSection } from "../../components/song/artistSection";
import { MusicLoader } from "@/core/components/loading/LoadingScreen";
import { SongTable } from "@/core/components/song/SongTable";
import { useFetchsongById } from "@/core/hooks/api/useFetchHooks";
  
export default function SongDetail() {

  const { songId } = useParams();
  const {data: pageData, isLoading, isError, error} = useFetchsongById(songId!)

  const song = pageData?.songs
  const recomentedSongs = pageData?.recomentations

  const { setPlaylistAndPlay, currentSong, isPlaying , playPause, currentTime} = useAudioContext();

  const isCurrentSongPlaying = isPlaying && currentSong?._id === song?._id;

  if(isLoading){
    return <MusicLoader/>
  }

  if(isError){
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }
   if (!song || !recomentedSongs) {
    return <div className="min-h-screen bg-black text-white p-8">Song details not available.</div>;
  }

 
  const handlePlayPause = () => {
    if(isCurrentSongPlaying){
        playPause()
    }else{
        const playlist = [song, ...recomentedSongs.filter(s => s._id !== song._id)]
        setPlaylistAndPlay(playlist, 0)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <SongHeader 
            title={song?.title} 
            coverImageUrl={song?.coverImageUrl}

            isPlaying={isCurrentSongPlaying} 
            onPlayPause={handlePlayPause}
        />
         <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Link to={`/artist/${song.artistId?._id}`}>
              <ArtistSection artistId={song?.artistId} />
            </Link>
          </div> 
          <div>
            <LyricsSection 
              lyricsUrl={song?.lyricsUrl} 
              currentTime={currentTime} 
          />
          </div>
        </div>       
        <SongTable 
        songs={recomentedSongs}
        config={{
          title: "Recommented Songs",
          showDuration: true,
          showHeart: true,
        }}/>
      </div>
    </div>
  );
}