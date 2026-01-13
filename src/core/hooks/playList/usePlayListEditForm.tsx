import { userApi } from "@/features/user/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { EditPlaylistData } from "@/features/user/pages/playlist/editPlayList"; 
import { useToaster } from "../toast/useToast";


interface UsePlaylistEditFormProps {
    playlistId: string | undefined; 
    initialData?: EditPlaylistData;
    onClose: () => void;
}

    export const usePlaylistEditForm = ({  playlistId, initialData, onClose,}: UsePlaylistEditFormProps) => {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        initialData?.coverImageUrl ?? null
    );

    const { toast } = useToaster();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: FormData) => userApi.updatePlaylistDetails(playlistId!, data),

        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
        queryClient.invalidateQueries({ queryKey: ["userPlayLists"] });
            toast.success("Playlist updated");
        onClose();
        },

        onError: () => {
            toast.error("Failed to update playlist");
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleEdit: SubmitHandler<EditPlaylistData> = (data) => {
        if (!playlistId) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description || "");

        if (imageFile) {
        formData.append("coverImage", imageFile);
        }

        mutation.mutate(formData);
    };

    return {
        preview: previewUrl,
        handleImageChange,
        handleEdit,
        loading: mutation.isPending,
    };
};

