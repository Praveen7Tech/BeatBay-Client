// src/core/hooks/usePlayList.ts

import { userApi, SongResponse, PlaylistDetailResponse } from "@/features/user/services/userApi"; 
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react"; 
import { useUserSongs } from "./useFetchHooks"; 
import { queryClient } from "./artist/queryClientSetup";
import { showSuccess } from "../utils/toast.config"; 

// Define the shape of the variables passed to the mutate function
interface AddToPlaylistMutationVars {
    songId: string;
    playListId: string; // The ID is known inside the hook scope now
}

interface UsePlayListReturn {
  playList: PlaylistDetailResponse | undefined; // Use specific types
  songs: SongResponse[] | undefined;    
  songIsLoading: boolean;
  playlistLoading: boolean;
  playlisterror: boolean;
  songIsError: boolean;
  error: Error | null;
  onAddSongClick: boolean;
  setOnAddSongClick: React.Dispatch<React.SetStateAction<boolean>>;
  // FIX: This function signature now accepts only the songId
  AddSongs: (songId: string) => void; 
}

export const usePlayList = (playListId: string | undefined): UsePlayListReturn => {
  
  const [onAddSongClick, setOnAddSongClick] = useState(false);

  // Fetch playlist data
  const { data: playList, isLoading: playlistLoading, isError: playlisterror, error: playlistError } = useQuery({
    queryKey: ["playListId", playListId],
    queryFn: () => userApi.fetchPlayList(playListId!),
    enabled: !!playListId,
  });

  // Fetch all available songs
  const { data: songs, isLoading: songIsLoading, isError: songIsError, error: songsError } = useUserSongs();

  const addToListMutation = useMutation<
    { message: string },       
    Error,                     
    string                    
  >({
    mutationFn: (songId) => {
        if (!playListId) throw new Error("Playlist ID is missing");
        return userApi.addToPlayList(playListId, songId);
    },
    onSuccess: () => {
      // Invalidate the playlist query key to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["playListId", playListId] });
      showSuccess("Song added to play list");
      // Optional: Close search section on success
      setOnAddSongClick(false);
    }
  });

  // FIX 3: Create the AddSongs callback function that calls the mutation's mutate function
  const AddSongs = useCallback((songId: string) => {
    console.log("fuckked", songId)
    // We call the 'mutate' function provided by the hook, passing only the songId
    addToListMutation.mutate(songId);
  }, [addToListMutation]); // Dependency ensures the latest mutate function is used


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
    AddSongs, // Return the actual function we defined above
  };
};
