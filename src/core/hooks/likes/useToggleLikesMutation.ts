import { showError, showSuccess } from "@/core/utils/toast.config";
import { userApi } from "@/features/user/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLikesMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (songId: string) => userApi.toggleLike(songId),

        onMutate: async (songId: string) => {
            // cancel all related queries to prevent overwrites
            await queryClient.cancelQueries({ queryKey: ["songDetails"] });
            await queryClient.cancelQueries({ queryKey: ["liked-songs"] });

            // snapshot previous values for rollback
            const previousDetails = queryClient.getQueryData(["songDetails"]);
            const previousLibrary = queryClient.getQueryData(["liked-songs"]);

            //  Update Song Details 
            queryClient.setQueryData(["songDetails"], (old: any) => {
                if (!old) return old;
                const isMainSong = old.songs?._id === songId;
                return {
                    ...old,
                    isLiked: isMainSong ? !old.isLiked : old.isLiked,
                    recomentations: old.recomentations?.map((s: any) =>
                        s._id === songId ? { ...s, isLiked: !s.isLiked } : s
                    ),
                };
            });

            // update Liked Songs page (unlike)
            queryClient.setQueriesData({ queryKey: ["liked-songs"] }, (old: any) => {
                if (!old?.songs) return old;
                return {
                    ...old,
                    songs: old.songs.filter((s: any) => s.id !== songId)
                };
            });

            return { previousDetails, previousLibrary };
        },

        onSuccess: (isNowLiked) => {
            showSuccess(isNowLiked ? "Added to Liked Songs" : "Removed from Liked Songs");
        },

        onError: (err, variables, context) => {
            // Rollback both caches on failure
            if (context?.previousDetails) {
                queryClient.setQueryData(["songDetails"], context.previousDetails);
            }
            if (context?.previousLibrary) {
                queryClient.setQueriesData({ queryKey: ["liked-songs"] }, context.previousLibrary);
            }
            showError("Failed to update like status");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["songDetails"] });
            queryClient.invalidateQueries({ queryKey: ["liked-songs"] });
        },
    });
};
