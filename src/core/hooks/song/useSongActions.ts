import { useToggleLikesMutation } from "../likes/useToggleLikesMutation";
import { useAddSongToPlaylist } from "../playList/usePlayList";
import { useRemoveFromPlayList } from "../playList/useRemoveFromPlayList";

type Context = "song" | "album" | "playlist" | "liked";

export const useSongActions = ( context: Context, options?: { albumId?: string; playlistId?: string }) => {

    const { mutate: toggleLike } = useToggleLikesMutation(context, options?.albumId);

    const addSongMutation = useAddSongToPlaylist();
    const removeSongMutation = options?.playlistId ? useRemoveFromPlayList(options.playlistId) : null;

    const handleLike = (songId: string) => toggleLike(songId);

    const handleAddToPlaylist = (songId: string, playlistId?: string) => {
        const id = playlistId ?? options?.playlistId;
        if (!id) return;
        addSongMutation.mutate({ songId, playlistId: id });
    };

    const handleRemoveFromPlaylist = (songId: string) => {
        removeSongMutation?.mutate(songId);
    };

    return {
        handleLike,
        handleAddToPlaylist,
        handleRemoveFromPlaylist,
        isAdding: addSongMutation.isPending,
        isRemoving: removeSongMutation?.isPending,
    };
};
