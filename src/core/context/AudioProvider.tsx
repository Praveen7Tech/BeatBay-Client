import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAudioEngine } from "../hooks/song/useAudioEngine";
import { SongDetails } from "@/features/user/services/response.type";
import { userApi } from "@/features/user/services/userApi";

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
  startPlayback: (songs: SongDetails[], startIndex?: number) => void;
  toggleRepeat: () => void;
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

  const playTimerRef = useRef<{ songId: string; startTime: number }>({
    songId: "",
    startTime: 0,
  });
  const hasReportedRef = useRef(false);
  const currentSong = playlist[currentIndex] || null;

  // 1. REVENUE TRACKING
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

  // 2. HARDWARE SYNC & REPEAT
  useEffect(() => {
    if (currentSong?.audioUrl) engine.loadAndPlay(currentSong.audioUrl);
  }, [currentSong?.id]);

  useEffect(() => {
    engine.setLoop(isRepeating);
  }, [isRepeating, engine]);

  // 3. AUTO-ADVANCE (Only if not repeating)
  useEffect(() => {
    const handleEnded = () => {
      if (!isRepeating) skipForward();
    };
    engine.audio.addEventListener("ended", handleEnded);
    return () => engine.audio.removeEventListener("ended", handleEnded);
  }, [currentIndex, playlist, isRepeating]);

  const skipForward = useCallback(() => {
    if (playlist.length > 0)
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const skipBackward = useCallback(() => {
    if (playlist.length > 0)
      setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const toggleRepeat = useCallback(() => setIsRepeating((p) => !p), []);

  const handleSetVolume = useCallback(
    (v: number) => {
      setVolumeState(v);
      engine.setVol(v);
    },
    [engine],
  );

  const registerRevenuePlay = async (songId: string) => {
    try {
      const res = await userApi.trackPlay(songId)
      console.log("tracking success",res)
    } catch (e) {
      console.error(e);
    }
  };

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
        startPlayback: (songs, idx = 0) => {
          setPlaylist(songs);
          setCurrentIndex(idx);
        },
        isRepeating,
        toggleRepeat,
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
