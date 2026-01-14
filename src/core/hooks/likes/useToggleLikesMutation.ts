import { userApi } from "@/features/user/services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../toast/useToast";

type TableType = "song" | "album" | "liked" | "playlist"

export const useToggleLikesMutation = ( tableType: TableType,albumId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToaster();

  return useMutation({
    mutationFn: (songId: string) => userApi.toggleLike(songId),

    onMutate: async (songId: string) => {
      const context: any = {};

      // always cancel liked songs
      await queryClient.cancelQueries({ queryKey: ["liked-songs"] });

      // cancel song query and store old song details for rollback
      if (tableType === "song") {
        await queryClient.cancelQueries({ queryKey: ["songDetails"] });
        context.previousSongDetails = queryClient.getQueryData(["songDetails"]);
      }

      // cancel album query and store cache for rollback
      if (tableType === "album" && albumId) {
        await queryClient.cancelQueries({queryKey: ["albumDetails", albumId]});

        context.previousAlbumDetails = queryClient.getQueryData(["albumDetails", albumId]);
      }

      // always store liked song page data for roll back
      context.previousLikedSongs = queryClient.getQueryData(["liked-songs"]);

      // optimistically update the song header or song table UI
      if (tableType === "song") {
        queryClient.setQueryData(["songDetails"], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            song: {
              ...old.song,
              isLiked: !old.song.isLiked,
            },
            recommendations: old.recommendations?.map((s: any) =>
              s.id === songId ? { ...s, isLiked: !s.isLiked } : s
            ),
          };
        });
      }

      // opstimically update album table
      if (tableType === "album" && albumId) {
        queryClient.setQueryData(["albumDetails", albumId],(old: any) => {
            if (!old) return old;
            return {
              ...old,
              songs: old.songs.map((s: any) =>
                s.id === songId ? { ...s, isLiked: !s.isLiked } : s
              ),
            };
          }
        );
      }

      // liked-songs page - always update
      queryClient.setQueryData(["liked-songs"], (old: any) => {
        if (!old?.songs) return old;

        const isAlreadyLiked = old.songs.some(
          (s: any) => s.id === songId
        );

        return {
          ...old,
          songs: isAlreadyLiked
            ? old.songs.filter((s: any) => s.id !== songId)
            : old.songs,
        };
      });

      return context;
    },

    onSuccess: (isNowLiked) => {
      toast.success( isNowLiked ? "Added to Liked Songs" : "Removed from Liked Songs");
    },

    // on error roll back to old stored data
    onError: (_err, _songId, context) => {
      if (context?.previousSongDetails) {
        queryClient.setQueryData( ["songDetails"], context.previousSongDetails);
      }

      if (context?.previousAlbumDetails && albumId) {
        queryClient.setQueryData( ["albumDetails", albumId], context.previousAlbumDetails );
      }

      if (context?.previousLikedSongs) {
        queryClient.setQueryData( ["liked-songs"], context.previousLikedSongs );
      }

      toast.error("Failed to update like status");
    },

    // if toggle like success invalidate qury and update dynamically new data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["liked-songs"] });

      if (tableType === "song") {
        queryClient.invalidateQueries({ queryKey: ["songDetails"] });
      }

      if (tableType === "album" && albumId) {
        queryClient.invalidateQueries({ queryKey: ["albumDetails", albumId] });
      }
    },
  });
};

