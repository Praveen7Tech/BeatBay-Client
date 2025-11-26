import { showError, showSuccess } from "@/core/utils/toast.config";
import { artistApi } from "@/features/artist/services/artist.api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export const useDeleteAlbum = () =>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (albumId: string) => artistApi.deleteAlbum(albumId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["albums"] });
            showSuccess("Album deletion successful");
            navigate("/artist-albums");
        },
        onError: (error) => {
            console.error(error);
            showError("Failed to delete album."); 
        }
    });

    return {
        deleteSongMutation: mutation.mutate,
    };

}