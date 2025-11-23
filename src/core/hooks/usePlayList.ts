import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlaylistDetailsResponse, SongData, userApi } from "@/features/user/services/userApi"; 

const playlistKey = (id: string) => ["playlist", id] as const;
const searchSongsKey = (query: string) => ["search-songs", query] as const;

// playlist details
export const usePlaylistDetails = (playlistId: string) => {
  return useQuery<PlaylistDetailsResponse>({
    queryKey: playlistKey(playlistId),
    queryFn: () => userApi.getPlaylistById(playlistId),
    enabled: !!playlistId,
  });
};

// search songs
export const useSearchSongs = (query: string) => {
  return useQuery<SongData[]>({
    queryKey: searchSongsKey(query),
    queryFn: () => userApi.searchSongs(query),
    enabled: !!query, 
    staleTime: 60_000,
  });
};

// add song to playlist
export const useAddSongToPlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (songId: string) => userApi.addToPlayList(playlistId, songId),

    onMutate: async (songId) => {
      await queryClient.cancelQueries({ queryKey: playlistKey(playlistId) });

      const prev = queryClient.getQueryData<PlaylistDetailsResponse>(
        playlistKey(playlistId)
      );

      queryClient.setQueryData<PlaylistDetailsResponse>(
        playlistKey(playlistId),
        (old) => {
          if (!old) return old;
          const exists = old.songs.some((s) => s._id === songId);
          if (exists) return old;

          return old;
        }
      );

      return { prev };
    },

    onError: (_err, _songId, context) => {
      if (context?.prev) {
        queryClient.setQueryData(playlistKey(playlistId), context.prev);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: playlistKey(playlistId) });
    },
  });
};
