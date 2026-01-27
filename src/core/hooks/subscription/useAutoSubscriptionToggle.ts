
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/features/user/services/userApi";
import { useToaster } from "../toast/useToast";

export const useSubscription = (userId: string | undefined) => {
    const queryClient = useQueryClient();
    const { toast } = useToaster();

    // fetch subscription data
    const { data: plan, isLoading, isError } = useQuery({
        queryKey: ["subscription", userId],
        queryFn: () => userApi.subscriptionDetails(),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, 
    });

    // handle auto subscription toggle
    const { mutate: toggleAutoRenew, isPending: isToggling } = useMutation({
        mutationFn: (autoRenew: boolean) =>  userApi.autoSubscriptionToggle(plan?.subscriptionId!, autoRenew),
        onSuccess: (_, autoRenew) => {
            queryClient.invalidateQueries({ queryKey: ["subscription", userId] });
            toast.success(autoRenew ? "Auto-renewal enabled" : "Auto-renewal disabled");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update payment settings");
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
