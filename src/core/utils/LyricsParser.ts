// src/utils/lyricsParser.ts

interface LyricLine {
  time: number; // Time in seconds
  text: string;
}

export const parseLrc = (lrcText: string): LyricLine[] => {
  const lines = lrcText.split('\n');
  const lyrics: LyricLine[] = [];

  lines.forEach(line => {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      // Handle 2-digit or 3-digit milliseconds
      const milliseconds = parseInt(match[3].padEnd(3, '0'), 10); 
      const text = match[4].trim();
      const timeInSeconds = minutes * 60 + seconds + milliseconds / 1000;
      
      if (text) {
          lyrics.push({ time: timeInSeconds, text });
      }
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
};
