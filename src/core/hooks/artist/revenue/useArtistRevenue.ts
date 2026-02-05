import { RootState } from "@/core/store/store";
import { artistApi } from "@/features/artist/services/artist.api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useArtistOnBoarding } from "./useArtistOnboarding";

export const useArtistRevenue = () =>{
    const artist = useSelector((state:RootState)=> state.auth.user)
    const isPayoutEnabled = artist?.payOutEnabled;

    const { data: revenue, isLoading:isLoadingChart} = useQuery({
        queryKey:["revenue", ],
        queryFn: artistApi.getRevenue,
    })

    const {onBoarding} = useArtistOnBoarding()

    const handleActivateMonetization = () => {  
        onBoarding()
    };

    const overView = revenue?.summary
    const currency = revenue?.summary.currency;
    const chartData = revenue?.chartData
    const songData = revenue?.songStats
    const payOuts = revenue?.payOutsHistory
    const loginLink = revenue?.stripeLoginLink

    return {
        overView,
        currency,
        chartData,
        songData,
        payOuts,
        loginLink,
        isPayoutEnabled,
        handleActivateMonetization,
        isLoadingChart
    }
}