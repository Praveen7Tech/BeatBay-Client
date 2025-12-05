import { userApi } from "@/features/user/services/userApi";
import { showSuccess } from "@/core/utils/toast.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { EditPlaylistData } from "@/features/user/pages/playlist/editPlayList"; 


interface UsePlaylistEditFormProps {
    playlistId: string | undefined; 
    initialData?: EditPlaylistData;
    onClose: () => void;
}

export const usePlaylistEditForm = ({ playlistId, initialData, onClose }: UsePlaylistEditFormProps) => {
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null);

    const queryClient = useQueryClient();

    // Use Mutation Hook for API submission
    const mutation = useMutation({
        mutationFn: (data: FormData) => userApi.updatePlaylistDetails(playlistId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
            queryClient.invalidateQueries({queryKey: ["userPlayLists"]})
            showSuccess("Playlist updated successfully!");
            onClose(); 
        },
        onError: (err) => {
            console.error("Mutation error:", err);
        }
    });

    const {isPending} = mutation

    // Handle File Input Change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // The function called when RHF handleSubmit succeeds and validates
    const handleEdit: SubmitHandler<EditPlaylistData> = useCallback(async (data) => {
        if (!playlistId) return;

        const formData = new FormData();
        
        if (data.name) formData.append("name", data.name);
        if (data.description) formData.append("description", data.description || "");
        
        if (imageFile) {
            formData.append("coverImage", imageFile); 
        } 

        mutation.mutate(formData);

    }, [playlistId, imageFile, mutation]);


    return {
        preview: previewUrl,
        handleImageChange,
        handleEdit, 
        loading: isPending
    };
};
