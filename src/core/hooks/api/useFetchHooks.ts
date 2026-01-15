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

export const useUserPlayLists = (page?:number, limit?:number,options = {})=>{
    return useQuery({
        queryKey: ["userPlayLists", page, limit],
        queryFn: ()=> userApi.getUserPlayLits(page, limit),
        placeholderData: (previousData)=> previousData,
        ...options
    })
}

export const useUserFollowing = (page:number, limit :number) =>{
    return useQuery({
        queryKey: ["followingList", page, limit],
        queryFn: () => userApi.following(page, limit),
        placeholderData: (previousData) => previousData
    })
}

export const useUserFollowers = (page:number, limit:number) =>{
    return useQuery({
        queryKey: ["followersList",  page, limit],
        queryFn: () => userApi.followers(page, limit),
        placeholderData: (previousData) => previousData
    })
}


export const useFetchsongById = (songId: string) =>{
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

export const useArtistDetails = (artistId: string) => {
    return useQuery({
        queryKey: ["artistDetails", artistId],
        queryFn: () => userApi.artistDetails(artistId!),
        enabled: !!artistId,
    });
};


export const useUserProfileDetails = (userId: string) => {
    return useQuery({
        queryKey: ["userDetails", userId],
        queryFn: () => userApi.userProfileDetails(userId!),
        enabled: !!userId,
    });
};

export const useLikesSongs = (userId: string)=>{
    return useQuery({
        queryKey:["liked-songs", userId],
        queryFn: ()=> userApi.LikedSongs(),
        enabled: !!userId
    })
}

export const useAlbumDetails = (albumId:string)=>{
    return useQuery({
        queryKey: ["albumDetails", albumId],
        queryFn: () => userApi.AlbumDetails(albumId!),
        enabled: !!albumId,
    })
}
