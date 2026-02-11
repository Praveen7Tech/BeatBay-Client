import {createContext,useCallback,useContext,useEffect,useRef,useState,} from "react";
import { useAudioEngine } from "../hooks/song/useAudioEngine";
import { SongDetails } from "@/features/user/services/response.type";
import { userApi } from "@/features/user/services/userApi";
import { getPlaybackState, savePlayBackState } from "../service/playerStorageService";

interface MusicPlayerContextType {
  currentSong: SongDetails | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isRepeating: boolean;
  playPause: () => void;
  seekTime: (time: number) => void;
  setVolume: (volume: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  startPlayback: (songs: SongDetails[],contextId: string, startIndex?: number) => void;
  toggleRepeat: () => void;
  currentContextId: string | null;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined,
);

export const AudioPlayerProviderNew = ({ children,}: { children: React.ReactNode;}) => {
  const engine = useAudioEngine();
  
  const [playlist, setPlaylist] = useState<SongDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolumeState] = useState(50);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentContextId, setCurrentContextId] = useState<string | null>(null)

  const playTimerRef = useRef<{ songId: string; startTime: number }>({
    songId: "",
    startTime: 0,
  });
  const hasReportedRef = useRef(false);
  const currentSong = playlist[currentIndex] || null;

  // SONG HYDRATION TO GET LAST ACTIVE SONG STATE
  useEffect(() => {
    const session = getPlaybackState();
    if (!session) return;

    const hydratePlayer = async () => {
      try {
        const response = await userApi.SongDetailHydration(session.songId);
        const newQueue = [response.song, ...response.recommendations.filter((s)=> s.id !== response.song.id)];

        setPlaylist(newQueue);
        setCurrentIndex(0);

        await engine.loadAndPlay(
          newQueue[0].audioUrl,
          session.currentTime
        );
      } catch (error) {
        console.error("Hydration Failed", error);
      }
    };

    hydratePlayer();
  }, []);

  // UPDATE LOCAL STORAGE TO TRACK LASP PLAYED SONG AND TIME
  useEffect(()=>{
    if(currentSong){
      savePlayBackState({
        songId: currentSong.id,
        currentTime: engine.currentTime
      })
    }
  },[engine.currentTime])

  //  REVENUE TRACKING
  useEffect(() => {
    if (!currentSong || !engine.isPlaying) return;

    if (playTimerRef.current.songId !== currentSong.id) {
      playTimerRef.current = { songId: currentSong.id, startTime: Date.now() };
      hasReportedRef.current = false;
    }

    const tracker = setInterval(() => {
      const realTimeElapsed = (Date.now() - playTimerRef.current.startTime) / 1000;
      if (realTimeElapsed >= 10 && !hasReportedRef.current) {
        hasReportedRef.current = true;
        registerRevenuePlay(currentSong.id);
      }
     
    }, 1000);

    return () => clearInterval(tracker);
  }, [currentSong?.id, engine.isPlaying]);

  useEffect(() => {
    engine.setLoop(isRepeating);
  }, [isRepeating, engine]);

  //  AUTO-ADVANCE (Only if not repeating)
  useEffect(() => {
    const handleEnded = () => {
      if (!isRepeating) skipForward();
    };
    engine.audio.addEventListener("ended", handleEnded);
    return () => engine.audio.removeEventListener("ended", handleEnded);
  }, [currentIndex, playlist, isRepeating]);

  // SKIP TO NEXT SONG
  const skipForward = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % playlist.length;
      engine.loadAndPlay(playlist[nextIndex].audioUrl, 0);
      return nextIndex;
    });
  }, [playlist, engine]);

  // SKIP TO PREVIOUS SONG
  const skipBackward = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const prev =(prevIndex - 1 + playlist.length) % playlist.length;
      engine.loadAndPlay(playlist[prev].audioUrl, 0);
      return prev;
    });
  }, [playlist, engine]);

  // TOGGLE REPEAT SONG
  const toggleRepeat = useCallback(() => setIsRepeating((p) => !p), []);

  // HANDLE SET VOLUME
  const handleSetVolume = useCallback(
    (v: number) => {
      setVolumeState(v);
      engine.setVol(v);
    },
    [engine],
  );

  // REVENUE TRACKING API
  const registerRevenuePlay = async (songId: string) => {
    try {
      const res = await userApi.trackPlay(songId)
      console.log("tracking success",res)
    } catch (e) {
      console.error(e);
    }
  };

  // START PLAYBACK
  const startPlayBack = async(songs:SongDetails[], contextId: string, idx=0)=>{
    setPlaylist(songs)
    setCurrentIndex(idx)
    setCurrentContextId(contextId)
    await engine.loadAndPlay(songs[0].audioUrl,0)
  }

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying: engine.isPlaying,
        currentTime: engine.currentTime,
        duration: engine.duration,
        volume,
        playPause: engine.toggle,
        seekTime: engine.seek,
        setVolume: handleSetVolume,
        skipForward,
        skipBackward,
        startPlayback:startPlayBack,
        isRepeating,
        toggleRepeat,
        currentContextId
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within AudioPlayerProvider");
  return context;
};
