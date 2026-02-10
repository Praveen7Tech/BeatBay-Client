import { adminApi } from "@/features/admin/services/adminApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useToaster } from "../toast/useToast"
import { queryClient } from "@/core/config/query.client"


export const useUserManagement = (userId: string) =>{

    const {toast} = useToaster()

    // initial user details
    const { data: user, isLoading: fetchLoading, isError, error} = useQuery({
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
            queryClient.invalidateQueries({queryKey: ["dashboard-entity-breakdown"]})
            setIsLoading(false)
            toast.success("blocked user successfully.")
        },
        onError: (error)=>{
            console.error("error in blocking user", error)
            setIsLoading(false)
            toast.error("error in blocking user")
        }
    })

    const UnBlockUserMutation = useMutation({
        mutationFn: (userId: string)=> adminApi.unBlockUser(userId!),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["userDatabyId", userId]})
            queryClient.invalidateQueries({queryKey: ["allUsers"]})
            queryClient.invalidateQueries({queryKey: ["dashboard-entity-breakdown"]})
            setIsLoading(false)
            toast.success("un-blocked user successfully.")
        },
            onError: (error)=>{
            console.error("error in unBlock user",error)
            setIsLoading(false)
            toast.error("error in blocking user")
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


    return {user, isLoading, HanleTooglrBlock, fetchLoading, isError, error}
}