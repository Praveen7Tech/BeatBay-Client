import { adminApi } from "@/features/admin/services/adminApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { queryClient } from "../artist/queryClientSetup"
import { useToaster } from "../toast/useToast"


export const useArtistManagement = (artistId: string) =>{
    const {toast} =useToaster()
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
            queryClient.invalidateQueries({queryKey: ["dashboard-entity-breakdown"]})
            toast.success("Artist blocked successfully.")
            setIsLoading(false)
        },
        onError: (error)=>{
            console.error(error)
            toast.error("error in blocking artist")
            setIsLoading(false)
        }
    })

    const UnBlockArtistMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.unBlockArtist(userId!),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["artistDatabyId", artistId]})
            queryClient.invalidateQueries({queryKey: ["allArtists"]})
            queryClient.invalidateQueries({queryKey: ["dashboard-entity-breakdown"]})
            setIsLoading(false)
            toast.success("Artist un-blocked successfully.")
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