import { adminApi } from "@/features/admin/services/adminApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { queryClient } from "../artist/queryClientSetup"


export const useArtistManagement = (artistId: string) =>{
    // initial artist details
    const { data: artist, isLoading: fetchLoading, isError} = useQuery({
        queryKey: ["artistDatabyId", artistId],
        queryFn: ()=> adminApi.getArtistById(artistId!),
        enabled: !!artistId
    })

     const [isLoading, setIsLoading] = useState(false)

    const BlockArtistMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.blockArtist(userId!),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["artistDatabyId", artistId]})
            queryClient.invalidateQueries({queryKey: ["allArtists"]})
            setIsLoading(false)
        },
        onError: (error)=>{
            console.error("error in blocking artist", error)
            setIsLoading(false)
        }
    })

    const UnBlockArtistMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.unBlockArtist(userId!),
        onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ["artistDatabyId", artistId]})
        queryClient.invalidateQueries({queryKey: ["allArtists"]})
        setIsLoading(false)
        },
        onError: (error)=>{
        console.error("error in unBlock artist",error)
        setIsLoading(false)
        }
    })

    const HanleTooglrBlock = () =>{
        setIsLoading(true)
        if(artist?.status){
            BlockArtistMutation.mutate(artistId)
        }else{
            UnBlockArtistMutation.mutate(artistId)
        }
    }


    return {artist, isLoading, HanleTooglrBlock, fetchLoading, isError}
}