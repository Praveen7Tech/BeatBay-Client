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
  
  // Fetch the lyrics file content
  useEffect(() => {
    if (lyricsUrl) {
      fetch(lyricsUrl) 
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

    {/*only show 5 lines at a time */}
    {(() => {
      const VISIBLE_LINES = 5;
      const half = Math.floor(VISIBLE_LINES / 2);

      const start = Math.max(0, currentLineIndex - half);
      const end = start + VISIBLE_LINES;

      const visibleLyrics = lyrics.slice(start, end);

      return (
        <div className="text-white leading-relaxed whitespace-pre-wrap text-xl font-medium min-h-[200px]">
          {visibleLyrics.map((line, index) => {
            const realIndex = start + index; // real position in array

            return (
              <p
                key={realIndex}
                className={`transition-colors duration-300 ${
                  realIndex === currentLineIndex
                    ? "text-[#00d084] font-bold text-2xl"
                    : "text-zinc-400"
                }`}
              >
                {line.text}
              </p>
            );
          })}
        </div>
      );
    })()}
  </div>
);

};
    