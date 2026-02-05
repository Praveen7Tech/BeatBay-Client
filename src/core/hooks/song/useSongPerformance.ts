import { artistApi } from "@/features/artist/services/artist.api";
import { useQuery } from "@tanstack/react-query";

export const useSongPerformance = (songId: string, days: number) => {
  return useQuery({
    queryKey: ["song-performance", songId, days],
    queryFn: () => artistApi.getSongPerformance(songId, days),
    placeholderData: (prev) => prev,
    enabled: !!songId
  });
};
