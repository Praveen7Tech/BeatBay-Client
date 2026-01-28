import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToaster } from "../toast/useToast"
import { userApi } from "@/features/user/services/userApi"
import { SubscriptionResponse } from "@/features/user/services/response.type"
import { useDispatch } from "react-redux"
import { setPremiumStatus } from "@/features/auth/slices/authSlice"

export const useCancelSubscription = (userId: string) =>{
    const queryClient = useQueryClient()
    const {toast} = useToaster()
    const dispatch = useDispatch()

    const {mutate: cancelSubscription} = useMutation({
        mutationFn: (subscriptionId: string)=> userApi.cancelSubscription(subscriptionId),

        onSuccess: () => {
            dispatch(setPremiumStatus(false))
            toast.success("Subscription cancelled!");
            
            // manually update the local cache immediately so the UI changes 
            queryClient.setQueryData(["subscription", userId], (old: SubscriptionResponse) => ({
                ...old,
                status: 'canceled', 
                autoReniewEnable: false 
            }));

            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["subscription", userId] });
            }, 3000); 
        },
        onError:()=>{
            toast.error("Failed to cancel subscription!")
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey: ["subscription", userId]})
        }
    })

    return {cancelSubscription}
}