// src/core/hooks/artist/useDeleteSong.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { artistApi } from "@/features/artist/services/artist.api"; 
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "@/core/utils/toast.config";

export const useDeleteSong = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (songId: string) => artistApi.deleteSong(songId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["songs"] });
            queryClient.invalidateQueries({ queryKey: ["albums"] });
            showSuccess("Song deletion successful");
            navigate("/artist-songs");
        },
        onError: (error) => {
            console.error(error);
            showError("Failed to delete song."); 
        }
    });

    return {
        deleteSongMutation: mutation.mutate,
        // isDeleting: mutation.isLoading,
    };
};
