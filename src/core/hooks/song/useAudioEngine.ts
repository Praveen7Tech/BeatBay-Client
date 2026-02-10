import { useRef, useState, useCallback, useEffect } from "react";

export const useAudioEngine = () => {
  const audio = useRef<HTMLAudioElement>(new Audio()).current;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [audio]);

  // LOAD AND PLAY SONG
  const loadAndPlay = useCallback(
    async (url: string, startTime = 0) => {
      return new Promise<void>((resolve) => {
  
        if (audio.src !== url) {
          audio.src = url;
          audio.load();
        }

        const onLoaded = async () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.currentTime = startTime;

          try {
            await audio.play();
          } catch {
            console.warn("Playback blocked");
          }
          resolve();
        };

        audio.addEventListener("loadedmetadata", onLoaded);
      });
    },
    [audio]
  );

  const toggle = useCallback(() =>{
    (audio.paused ? audio.play() : audio.pause())
  },[audio] );

  const seek = useCallback((time: number) => {
    audio.currentTime = time;
  }, [audio]);

  const setVol = useCallback((v: number) => {
    audio.volume = v / 100;
  }, [audio]);

  const setLoop = useCallback((loop: boolean) => {
    audio.loop = loop;
  }, [audio]);

  return {
    audio,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    setVol,
    loadAndPlay,
    setLoop,
  };
};
