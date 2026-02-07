import { userApi } from "@/features/user/services/userApi"
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionPlanPrices = () => {

  const priceIds = [
    import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
    import.meta.env.VITE_STRIPE_SIX_MONTH_PRICE_ID,
    import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
  ];

  const {data: priceData, isLoading} = useQuery({
    queryKey: ["price-data", priceIds],
    queryFn: ()=> userApi.getPrices(priceIds),
    enabled: !!priceIds
  })

  return { priceData, loading:isLoading };
};