import { artistApi } from "@/features/artist/services/artist.api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { useToaster } from "../toast/useToast";

export const useDeleteAlbum = () =>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {toast} = useToaster()

    const mutation = useMutation({
        mutationFn: (albumId: string) => artistApi.deleteAlbum(albumId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["albums"] });
            queryClient.invalidateQueries({ queryKey: ["artist-dashboard"]})
            toast.success("Album deletion successful");
            navigate("/artist/albums");
        },
        onError: (error) => {
            console.error(error);
           toast.error("Failed to delete album."); 
        }
    });

    return {
        deleteSongMutation: mutation.mutate,
    };

}