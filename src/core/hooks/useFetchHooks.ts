import { userApi } from "@/features/user/services/userApi"
import { useQuery } from "@tanstack/react-query"

export const useUserSongs = ()=>{
    return useQuery({
        queryKey: ["songs"],
        queryFn: userApi.fetchSong
    })
}

export const useUserAlbums = () =>{
    return useQuery({
        queryKey: ["albums"],
        queryFn: userApi.fetchAlbums
    })
}

export const useArtistSongs = ()=>{
    return useQuery({
        queryKey: ["songs"],
        queryFn: userApi.fetchSong
    })
}

export const useArtistAlbums = () =>{
    return useQuery({
        queryKey: ["albums"],
        queryFn: userApi.fetchAlbums
    })
}