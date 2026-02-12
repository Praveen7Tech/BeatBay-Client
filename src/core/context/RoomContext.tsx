import React, {
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
  audioRef: React.RefObject<HTMLAudioElement>;
  userSync: boolean;
  setUserSync: React.Dispatch<React.SetStateAction<boolean>>
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
  const [userSync, setUserSync] = useState(false)

  /* =========================================
   RESTORE / JOIN / REFRESH PLAYBACK SYNC
    ========================================= */
    useEffect(() => {
      if (!songData?.audioUrl) return;

      const audio = audioRef.current;

      // set audio source
      if (audio.src !== songData.audioUrl) {
        audio.src = songData.audioUrl;
        audio.load();
      }

      // sync time
      const latency = (Date.now() - songData.updatedAt) / 1000;
      console.log("latency", latency)
      const adjustedTime = songData.timestamp + latency;

      // Sync Time if drift > 2s
      if (Math.abs(audio.currentTime - adjustedTime) > 2) {
          audio.currentTime = adjustedTime;
      }

      // 🔑 enforce play state
      if (songData.isPlaying) {
        audio
        .play()
        .then(() => {
          console.log("play success", {
            paused: audio.paused,
            currentTime: audio.currentTime
          });
          setIsPlaying(true);
          setUserSync(false)
        })
        .catch((err) => {
          console.error("play failed", err);
          if(err.name == "NotAllowedError"){
            console.log("user syncing")
            setUserSync(true)
          }
        });
      } else {
        audio.pause();
        setIsPlaying(false);
      }

    }, [songData?.id]);


  /* ----------------------------------------
     APPLY AUTHORITATIVE ACTIONS (HOST → ALL)
  ---------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;

    socket.on("player_action", (songData) => {
      dispatch(setCurrentSong(songData));

      if (audio.src !== songData.audioUrl) {
        audio.src = songData.audioUrl;
        audio.load();
      }

      audio.currentTime = songData.timestamp || 0;

      if (songData.isPlaying) {
        audio.play().catch(() => {});
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      socket.off("player_action");
    };
  }, [dispatch]);

  /* ----------------------------------------
     DRIFT CORRECTION syncing with host time
  ---------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;

    socket.on("player_tick", ({ time, isPlaying }) => {
      console.log("tick recieve ", time)
      if (Math.abs(audio.currentTime - time) > 0.7) {
        audio.currentTime = time;
      }

      if (isPlaying && audio.paused) audio.play().catch(() => {});
      if (!isPlaying && !audio.paused) audio.pause();
    });

    return () => {
      socket.off("player_tick");
    };
  }, []);

  /* ----------------------------------------
     AUDIO EVENTS
  ---------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    const onEnded = () => {
      if (isHost) skip("next");
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
     HOST → SEND DRIFT TICKS FOR ALIGN TIME TO ALL THE GUEST WITH HOST TIME
  ---------------------------------------- */
  useEffect(() => {
    if (!isHost || !room.roomId) return;

    const interval = setInterval(() => {
      socket.emit("player_tick", {
        roomId: room.roomId,
        time: audioRef.current.currentTime,
        isPlaying
      });
      console.log("tick ", audioRef.current.currentTime)
    }, 1000);

    return () => clearInterval(interval);
  }, [isHost, isPlaying, room.roomId]);


  // FORCE STOP WHEN EXIT / REMOVE FROM ROOM AND ROOM NOT ACTIVE
  useEffect(()=>{
    if(!room.isActive){
      stopAndResetAudio()
    }
  },[room.isActive])

  const stopAndResetAudio = ()=>{
    const audio = audioRef.current;

    audio.pause()
    audio.src = ""
    audio.load()

    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  /* ----------------------------------------
     CONTROLS (HOST ONLY)
  ---------------------------------------- */
  const handlePlayPause = () => {
      if (!isHost) return;

      /* START FIRST SONG */
      if (!songData) {
        if (room.queue.length === 0) return;

        const firstSong = room.queue[0];

        socket.emit("player_action", {
          roomId: room.roomId,
          songData: {
            ...firstSong,
            isPlaying: true,
            timestamp: 0,
            updatedAt: Date.now()
          }
        });

        return;
      }

      /* TOGGLE PLAY / PAUSE */
      const nextState = !isPlaying;

      nextState ? audioRef.current.play(): audioRef.current.pause();

      setIsPlaying(nextState);

      socket.emit("player_action", {
        roomId: room.roomId,
        songData: {
          ...songData,
          isPlaying: nextState,
          timestamp: audioRef.current.currentTime,
          updatedAt: Date.now()
        }
      });
  };


  // SEEK HOST ACTION 
  const seek = (time: number) => {
    if (!isHost || !songData) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);

    socket.emit("player_action", {
      roomId: room.roomId,
      songData: {
        ...songData,
        timestamp: time,
        updatedAt: Date.now()
      }
    });
  };

  // SKIP FORWARD / BACKWARD
  const skip = (dir: "next" | "prev") => {
    if (!isHost || !songData || room.queue.length === 0) return;

    const index = room.queue.findIndex(s => s.id === songData.id);
    if (index === -1) return;

    const nextIndex =
      dir === "next"
        ? (index + 1) % room.queue.length
        : (index - 1 + room.queue.length) % room.queue.length;

    const nextSong = room.queue[nextIndex];

    socket.emit("player_action", {
      roomId: room.roomId,
      songData: {
        ...nextSong,
        isPlaying: true,
        timestamp: 0,
        updatedAt: Date.now()
      }
    });
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
        skipPrev: () => skip("prev"),
        audioRef,
        userSync,
        setUserSync
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
