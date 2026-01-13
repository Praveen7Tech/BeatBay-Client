
import { userApi } from "@/features/user/services/userApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToaster } from "../toast/useToast"

export const useRemoveFromPlayList = (playListId:string)=>{
    const queryClient = useQueryClient()
    const { toast } = useToaster()

    return useMutation({
        mutationFn: (songId: string)=> userApi.removeFromPlayList(playListId,songId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ["playlist", playListId]});
            toast.success("Song removed from playlist")
        },
        onError:()=> toast.error("Error in remove song from playlist")
    })
}