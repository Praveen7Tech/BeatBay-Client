import { showError, showSuccess } from "@/core/utils/toast.config";
import { userApi } from "@/features/user/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLikesMutation = () => {
    const queryClient = useQueryClient();
    const queryKey = ["songDetails"]; 

    return useMutation({
        mutationFn: (songId: string) => userApi.toggleLike(songId),

        onMutate: async (songId: string) => {
        //  cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey });

        //  snapshot the previous value
        const previousData = queryClient.getQueryData(queryKey);

        //  optimistically update the cache
        queryClient.setQueryData(queryKey, (old: any) => {
            if (!old) return old;

            // is the liked song the main song or in the recommendations?
            const isMainSong = old.songs?._id === songId;

            return {
            ...old,
            // update main song boolean if it's the one clicked
            isLiked: isMainSong ? !old.isLiked : old.isLiked,
            // update the specific song in the recommendations array
            recomentations: old.recomentations?.map((s: any) =>
                s._id === songId ? { ...s, isLiked: !s.isLiked } : s
            ),
            };
        });

            return { previousData };
        },

        onSuccess: (isNowLiked) => {
        const message = isNowLiked
            ? "Song added to favourites"
            : "Song removed from favourites";
        showSuccess(message);
        },

        onError: (err, variables, context) => {
        // rollback to previous state on failure
        if (context?.previousData) {
            queryClient.setQueryData(queryKey, context.previousData);
        }
        showError("Failed to update like status");
        },

        onSettled: () => {
        // invalidate to keep server and client in perfect sync
        queryClient.invalidateQueries({ queryKey });
        },
    });
};
