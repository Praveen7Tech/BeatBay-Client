import { userApi } from "@/features/user/services/userApi"
import { useQuery } from "@tanstack/react-query"

export const useSubscriptionHistory = (userId:string) =>{

    const { data: paymentHistory, isLoading, isError } = useQuery({
        queryKey: ["subscription-history", userId!],
        queryFn: ()=> userApi.subscriptionHistory(),
        enabled: !!userId
    })

    return {
        paymentHistory,
        isLoadingHistory:isLoading,
        isError
    }
}