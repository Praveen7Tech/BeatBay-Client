
import { userApi } from "@/features/user/services/userApi"; 
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react"; 
import { useUserSongs } from "./useFetchHooks"; 
import { queryClient } from "./artist/queryClientSetup";
import { showSuccess } from "../utils/toast.config"; 

interface AddToPlaylistMutationVars {
    songId: string;
    playListId: string;
}

interface UsePlayListReturn {
  playList: any; // use proper interface pending
  songs: any;    
  songIsLoading: boolean;
  playlistLoading: boolean;
  playlisterror: boolean;
  songIsError: boolean;
  error: Error | null;
  onAddSongClick: boolean;
  setOnAddSongClick: React.Dispatch<React.SetStateAction<boolean>>;
  AddSongs: (songId: string) => void;
}

export const usePlayList = (playListId: string | undefined): UsePlayListReturn => {
  
  const [onAddSongClick, setOnAddSongClick] = useState(false);

  // Fetch play list
  const { data: playList, isLoading: playlistLoading, isError: playlisterror, error: playlistError } = useQuery({
    queryKey: ["playListId", playListId],
    queryFn: () => userApi.fetchPlayList(playListId!),
    enabled: !!playListId,
  });

  // Fetch all available songs
  const { data: songs, isLoading: songIsLoading, isError: songIsError, error: songsError } = useUserSongs();

  // Add to playlist Mutation
  const AddToPlayListMutation = useMutation<
    { message: string },
    Error,
    AddToPlaylistMutationVars
  >({
    mutationFn: ({ playListId, songId }) => userApi.addToPlayList(playListId, songId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playListId", variables.playListId] });
      showSuccess("Song added to playlist");
      setOnAddSongClick(false); 
    },
  });

  const AddSongs = useCallback((songId: string) => {
    if (playListId) {
        AddToPlayListMutation.mutate({ playListId, songId });
    }
  }, [playListId, AddToPlayListMutation.mutate]);


  return {
    playList,
    songs,
    songIsLoading,
    playlistLoading,
    playlisterror,
    songIsError,
    error: playlistError || songsError, 
    onAddSongClick,
    setOnAddSongClick,
    AddSongs, 
  };
};

