import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { socket } from "../config/socket";
import { setCurrentSong } from "@/features/user/slice/privateRoomSlice";

interface RoomPlayerContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlayPause: () => void;
  seek: (time: number) => void;
  skipNext: () => void;
  skipPrev: () => void;
}

const RoomPlayerContext = createContext<RoomPlayerContextType | null>(null);

export const RoomPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const dispatch = useDispatch();
  const room = useSelector((s: RootState) => s.privateRoom);
  const user = useSelector((s: RootState) => s.auth.user);

  const songData = room.songData;
  const isHost = room.hostId === user?.id;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ----------------------------------------
     LOAD SONG (HOST + GUEST)
  ---------------------------------------- */
  useEffect(() => {
    if (!songData?.audioUrl) return;

    const audio = audioRef.current;

    if (audio.src !== songData.audioUrl) {
      audio.src = songData.audioUrl;
      audio.load();
      audio.currentTime = songData.timestamp || 0;
    }

    if (songData.isPlaying) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [songData?.id]);

  /* ----------------------------------------
     AUDIO EVENTS
  ---------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    const onEnded = () => {
      if (isHost) skipNext();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [isHost, songData]);

  /* ----------------------------------------
     HOST → SYNC TO GUESTS
  ---------------------------------------- */
  useEffect(() => {
    if (!isHost || !room.roomId || !songData) return;

    const interval = setInterval(() => {
      socket.emit("player_sync", {
        roomId: room.roomId,
        songData: {
            ...songData,
            isPlaying,
            timestamp: audioRef.current.currentTime,
            updatedAt: Date.now()
        }
     });

    }, 300);

    return () => clearInterval(interval);
  }, [isHost, isPlaying, songData, room.roomId]);

  /* ----------------------------------------
     GUEST ← RECEIVE SYNC
  ---------------------------------------- */
  useEffect(() => {
    console.log("guest reach sync")
    if (isHost) return;

    socket.on("player_sync", (data) => {

      if (!songData || data.songId !== songData.id) return;

      const audio = audioRef.current;

      if (Math.abs(audio.currentTime - data.currentTime) > 1) {
        audio.currentTime = data.currentTime;
      }

      if (data.isPlaying) {
        audio.play().catch(() => {});
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      socket.off("player_sync");
    };
  }, [songData, isHost]);

  /* ----------------------------------------
     CONTROLS
  ---------------------------------------- */
  const handlePlayPause = () => {
    if (!songData) {
      if (room.queue.length === 0) return;

      const firstSong = room.queue[0];

      dispatch(
        setCurrentSong({
          ...firstSong,
          isPlaying: true,
          timestamp: 0,
          updatedAt: Date.now()
        })
      );
      return;
    }

    if (!isHost) return;

    const nextState = !isPlaying;

    if (nextState) audioRef.current.play();
    else audioRef.current.pause();

    setIsPlaying(nextState);

    dispatch(
      setCurrentSong({
        ...songData,
        isPlaying: nextState,
        timestamp: audioRef.current.currentTime,
        updatedAt: Date.now()
      })
    );
  };

  const seek = (time: number) => {
    if (!isHost) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);

    dispatch(
      setCurrentSong({
        ...songData!,
        timestamp: time,
        updatedAt: Date.now()
      })
    );
  };

  const skip = (dir: "next" | "prev") => {
    if (!songData || room.queue.length === 0) return;

    const index = room.queue.findIndex((s) => s.id === songData.id);
    if (index === -1) return;

    const nextIndex =
      dir === "next"
        ? (index + 1) % room.queue.length
        : (index - 1 + room.queue.length) % room.queue.length;

    const nextSong = room.queue[nextIndex];

    dispatch(
      setCurrentSong({
        ...nextSong,
        isPlaying: true,
        timestamp: 0,
        updatedAt: Date.now()
      })
    );
  };

  return (
    <RoomPlayerContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        handlePlayPause,
        seek,
        skipNext: () => skip("next"),
        skipPrev: () => skip("prev")
      }}
    >
      {children}
    </RoomPlayerContext.Provider>
  );
};

export const useRoomContext = () => {
  const ctx = useContext(RoomPlayerContext);
  if (!ctx) throw new Error("RoomPlayerContext missing");
  return ctx;
};
