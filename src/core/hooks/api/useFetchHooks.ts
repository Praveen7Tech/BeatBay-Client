import { artistApi } from "@/features/artist/services/artist.api"
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
        queryFn: artistApi.fetchSongs
    })
}

export const useArtistAlbums = () =>{
    return useQuery({
        queryKey: ["albums"],
        queryFn: artistApi.fetchAlbums
    })
}

export const useUserPlayLists = ()=>{
    return useQuery({
        queryKey: ["userPlayLists"],
        queryFn: ()=> userApi.getUserPlayLits()
    })
}

export const useUserFollowing = () =>{
    return useQuery({
        queryKey: ["followingList"],
        queryFn: () => userApi.following()
    })
}

export const useFetchsongById =(songId: string) =>{
    return useQuery({
        queryKey: ["songDetails", songId],
        queryFn: () => userApi.SongDetail(songId!),
        enabled: !!songId,
    })
}    


export const useFetchArtistDetails = (artistId: string)=>{
    return useQuery({
        queryKey: ["artistData", artistId],
        queryFn: () => userApi.artistDetails(artistId!),
    enabled: !!artistId,
    })
}
