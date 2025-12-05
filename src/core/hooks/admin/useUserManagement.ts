import { adminApi } from "@/features/admin/services/adminApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../artist/queryClientSetup"
import { useState } from "react"


export const useUserManagement = (userId: string) =>{

    // initial user details
    const { data: user, isLoading: fetchLoading, isError} = useQuery({
        queryKey: ["userDatabyId", userId],
        queryFn: ()=> adminApi.getUserById(userId!),
        enabled: !!userId
    })

    const [isLoading, setIsLoading] = useState(false)

    const BlockUserMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.blockUser(userId!),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["userDatabyId", userId]})
            queryClient.invalidateQueries({queryKey: ["allUsers"]})
            setIsLoading(false)
        },
        onError: (error)=>{
            console.error("error in blocking user", error)
            setIsLoading(false)
        }
    })

    const UnBlockUserMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.unBlockUser(userId!),
        onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ["userDatabyId", userId]})
        queryClient.invalidateQueries({queryKey: ["allUsers"]})
        setIsLoading(false)
        },
        onError: (error)=>{
        console.error("error in unBlock user",error)
        setIsLoading(false)
        }
    })

    const HanleTooglrBlock = () =>{
        setIsLoading(true)
        if(user?.status){
            BlockUserMutation.mutate(userId)
        }else{
            UnBlockUserMutation.mutate(userId)
        }
    }


    return {user, isLoading, HanleTooglrBlock, fetchLoading, isError}
}