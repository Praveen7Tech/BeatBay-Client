
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/features/user/services/userApi";
import { useToaster } from "../toast/useToast";
import { SubscriptionResponse } from "@/features/user/services/response.type";

export const useAutoSubscriptionToggle = (userId: string, isPremium:boolean) => {
    const queryClient = useQueryClient();
    const { toast } = useToaster();

    // fetch subscription data
    const { data: plan, isLoading, isError } = useQuery({
        queryKey: ["subscription", userId],
        queryFn: () => userApi.subscriptionDetails(),
        enabled: !!userId && isPremium,
        staleTime: 1000 * 60 * 5, 
    });

    // handle auto subscription toggle
    const { mutate: toggleAutoRenew, isPending: isToggling } = useMutation({
        mutationFn: (autoRenew: boolean) =>  userApi.autoSubscriptionToggle(plan?.subscriptionId!, autoRenew),

        onMutate: async(newValue)=>{
            await queryClient.cancelQueries({queryKey: ["subscription", userId]})
            const previousData = await queryClient.getQueryData(["subscription", userId])

            queryClient.setQueryData(["subscription", userId], (old: SubscriptionResponse)=>({
                ...old,
                autoReniewEnable: !newValue
            }))

            return {previousData}
        },
        onSuccess: (_, autoRenew) => {
            toast.success(autoRenew ? "Auto-renewal enabled" : "Auto-renewal disabled");
        },
        onError: (err,newValue, context) => {
            queryClient.setQueryData(["subscription", userId], context?.previousData)
            toast.error(err.message || "Failed to update payment settings");
        },
        onSettled:()=>{
            setTimeout(() => {
                queryClient.invalidateQueries({queryKey: ["subscription", userId]})
            }, 2000);
        }
    });

    return { 
        plan, 
        isLoading, 
        isError, 
        toggleAutoRenew, 
        isToggling 
    };
};
