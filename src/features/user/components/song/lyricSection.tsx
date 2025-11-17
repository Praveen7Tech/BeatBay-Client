import { parseLrc } from "@/core/utils/LyricsParser";
import { useEffect, useState } from "react";

interface LyricsSectionProps {
  lyricsUrl: string;
  currentTime: number
}
export interface LyricLine {
  time: number; 
  text: string; 
}

export const LyricsSection = ({ lyricsUrl, currentTime }: LyricsSectionProps) => {
 const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const URL = import.meta.env.VITE_API_URL;
  console.log("lrc--", lyrics)
  // Fetch the lyrics file content
  useEffect(() => {
    if (lyricsUrl) {
      fetch(`${URL}/songs/${lyricsUrl}`) // Assume /api/lyrics endpoint
        .then(res => res.text())
        .then(text => setLyrics(parseLrc(text)))
        .catch(err => console.error("Failed to load lyrics", err));
    }
  }, [lyricsUrl]);

  // Synchronize lyrics with playback time
  useEffect(() => {
    if (lyrics.length === 0) return;

    // Find the current active line based on currentTime
    const index = lyrics.findIndex((line, i) => {
        // If it's the last line, it stays active until the end
        if (i === lyrics.length - 1) return true; 
        return currentTime >= line.time && currentTime < lyrics[i + 1].time;
    });

    if (index !== -1 && index !== currentLineIndex) {
      setCurrentLineIndex(index);
    }
  }, [currentTime, lyrics, currentLineIndex]);

  if (lyrics.length === 0) {
    return <div className="text-gray-500">Loading lyrics or lyrics not available.</div>;
  }

  return (
    <div className="rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Lyrics</h2>
      <div className="text-white leading-relaxed whitespace-pre-wrap text-base font-light">
        {lyrics.map((line, index) => (
          <p
            key={index}
            className={`transition-colors duration-300 ${
              index === currentLineIndex
                ? 'text-[#00d084] font-bold text-lg' // Highlight the active line
                : 'text-zinc-400'
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
};
    