import { artistApi } from "@/features/artist/services/artist.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useSongDetails = () => {
    const { songId } = useParams<{ songId: string }>();
    const URL_BASE = import.meta.env.VITE_API_URL;

    // Use query hook to fetch the data
    const { data: song, isLoading, isError, error } = useQuery({
        queryKey: ["songDetails", songId],
        queryFn: () => artistApi.getSongById(songId!),
        enabled: !!songId, 
    });

    const CoverImageURL = song?.coverImageUrl ? `${URL_BASE}/songs/${song.coverImageUrl}` : undefined;

    return {
        song,
        isLoading,
        isError,
        error,
        CoverImageURL,
        songId,
    };
}