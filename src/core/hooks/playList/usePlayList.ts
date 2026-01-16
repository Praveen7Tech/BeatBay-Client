import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  userApi,
} from "@/features/user/services/userApi"
import { useNavigate } from "react-router-dom"
import { PlaylistDetailsResponse, SearchSongResponse } from "@/features/user/services/response.type"
import { useToaster } from "../toast/useToast"

const playlistKey = (id: string) => ["playlist", id] as const
const searchSongsKey = (query: string) => ["search-songs", query] as const

// playlist details
export const usePlaylistDetails = (playlistId: string) => {

  return useQuery<PlaylistDetailsResponse>({
    queryKey: playlistKey(playlistId),
    queryFn: () => userApi.getPlaylistById(playlistId),
    enabled: !!playlistId,
  })
}

// search songs
export const useSearchSongs = (query: string) => {
  return useQuery<SearchSongResponse[]>({
    queryKey: searchSongsKey(query),
    queryFn: () => userApi.searchSongs(query),
    enabled: !!query,
    staleTime: 60_000,
  })
}

// add song to playlist
export const useAddSongToPlaylist = () => {
  const queryClient = useQueryClient();
  const { toast } = useToaster()

  return useMutation({
      mutationFn: ({ playlistId, songId }: { playlistId: string; songId: string }) => 
        userApi.addToPlayList(playlistId, songId),
      
      onSuccess: (data) => {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ["playlist"] });
      },
      onError: (error:any) =>{
        if(error.status === 409){
          toast.error(error.message)
        }else{
          toast.error("Failed to add song")
        }
      } 
    });
  };

// create playlist mutation hook
export const useCreatePlayList = () => {
  const { toast } = useToaster()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: userApi.createPlaylist,

    onSuccess: (newPlaylist) => {
      toast.success(`${newPlaylist.name}`)
      queryClient.invalidateQueries({ queryKey: ["userPlayLists"] })
      navigate(`/playList/${newPlaylist.id}`)
    },

    onError: (error) => {
      console.error(error)
      toast.error("Playlist creation failed")
    },
  })
}
