import { userApi } from "@/features/user/services/userApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "./artist/queryClientSetup"
import { showSuccess } from "../utils/toast.config"

export const useFollowStatus = (artistId: string) =>{

    // initial follow status check
    const {data } = useQuery({
        queryKey: ["followStatus", artistId],
        queryFn: ()=> userApi.checkFollowStatus(artistId),
        enabled: !!artistId
    })

    console.log("data ",data)
    const isFollowing = data

    // handle Following
    const follow = useMutation({
        mutationFn: userApi.followArtist,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["followStatus", artistId]}),
            showSuccess("following")
        }
        
    })

    // handle unfollowing
    const unfollow = useMutation({
        mutationFn: userApi.unfollowArtist,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["followStatus", artistId]}),
            showSuccess("un followed")
        }
    })

    // toogle selection
    const toggleFollow = () =>{
        if(isFollowing){
            unfollow.mutate(artistId)
        }else{
            follow.mutate(artistId)
        }
    }

    return { isFollowing, toggleFollow, isLoading: follow.isPending || unfollow.isPending}
}