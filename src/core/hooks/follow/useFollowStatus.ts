import { userApi } from "@/features/user/services/userApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../artist/queryClientSetup"
import { useToaster } from "../toast/useToast"

export const useFollowStatus = (targetId: string, role: string) => {
    const {toast} = useToaster()
    // initail state
    const { data } = useQuery({
        queryKey: ["followStatus", targetId, role],
        queryFn: () => userApi.checkFollowStatus(targetId, role),
        enabled: !!targetId
    });

    const isFollowing = !!data

    // 2. Optimized handle Following
    const follow = useMutation({
        mutationFn: () => userApi.toggleFollow(targetId, role, "follow"),
        onSuccess: () => {
            // Invalidate with the specific role to keep cache clean
            queryClient.invalidateQueries({ queryKey: ["followStatus", targetId, role] });
            queryClient.invalidateQueries({ queryKey: ["followingList"] });
            queryClient.invalidateQueries({queryKey: ["userDetails", targetId!]})
            // If it's a user, invalidate mutual friends for your Private Room feature
            if (role === 'user') queryClient.invalidateQueries({ queryKey: ["friendsActivity"] });
            
            toast.success(`Now following ${role}`)
        },
        onError:()=> toast.error("Error in unfollow")
    });

    // 3. Optimized handle unfollowing
    const unfollow = useMutation({
        mutationFn: () => userApi.toggleFollow(targetId, role, "unfollow"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["followStatus", targetId, role] });
            queryClient.invalidateQueries({ queryKey: ["followingList"] });
            queryClient.invalidateQueries({queryKey: ["userDetails", targetId!]})

            if(role === 'user') queryClient.invalidateQueries({ queryKey: ["friendsActivity"] })
            toast.success(`Unfollowed ${role}`)
        },
        onError:()=> toast.error("Error in unfollow")
    });

    const toggleFollow = () => {
        if (isFollowing) {
            unfollow.mutate();
        } else {
            follow.mutate();
        }
    };

    return { 
        isFollowing, 
        toggleFollow, 
        isLoading: follow.isPending || unfollow.isPending 
    };
}
