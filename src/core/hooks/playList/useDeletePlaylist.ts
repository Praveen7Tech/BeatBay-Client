import { userApi } from "@/features/user/services/userApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useToaster } from "../toast/useToast"

export const useDeletePlayList = () =>{
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { toast } = useToaster();

    return useMutation({
        mutationFn: (playlistId:string)=> userApi.deletePlayList(playlistId),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["userPlayLists"]});
            toast.success("Playlist deleted from your library");
            navigate("/home")
        },
        onError:()=> {
            toast.error("Error delete playlist");
        }
    })
}