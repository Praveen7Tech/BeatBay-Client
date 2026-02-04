import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "../../components/revenue/RevenueChart";
import { RevenueSongTable } from "../../components/revenue/RevenueSongTable";
import { RevenueHistoryTable } from "../../components/revenue/RevenueHistoryTable";
import { RevenueEmptyState } from "../../components/revenue/RevenueEmptyState";
import { RevenueOverview } from "../../components/revenue/RevenueOverwiew";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useArtistOnBoarding } from "@/core/hooks/artist/revenue/useArtistOnboarding";
import { useQuery } from "@tanstack/react-query";
import { artistApi } from "../../services/artist.api";
import { SpinnerArtist } from "@/components/ui/spinner";

export default function ArtistRevenue() {

  const artist = useSelector((state:RootState)=> state.auth.user)
  const isPayoutEnabled = artist?.payOutEnabled;

  const { data: revenue, isLoading} = useQuery({
    queryKey:["revenue", artist?.id!],
    queryFn: artistApi.getRevenue,
    enabled: !!artist?.id
  })

  const {onBoarding} = useArtistOnBoarding()

  const handleActivateMonetization = () => {  
    onBoarding()
  };


  if(isLoading) return <SpinnerArtist/>
  const overView = revenue?.summary
  const currency = revenue?.summary.currency;
  const chartData = revenue?.chartData
  const songData = revenue?.songStats
  const payOuts = revenue?.payOutsHistory
  const loginLink = revenue?.stripeLoginLink
console.log("ppp", payOuts)
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Revenue</h1>
            <p className="text-[#a7a7a7]">Track your earnings and payouts</p>
          </div>
        </div>

        {isPayoutEnabled && (
          <div className="flex gap-3">
            <Button onClick={() => {
                if (loginLink) {
                  window.open(loginLink, '_blank', 'noopener,noreferrer');
                }
              }}
              variant="outline"
              className="border-[#282828] bg-transparent text-white "
            >
              <Settings size={18} className="mr-2" />
              Visit Stripe Dashboard
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {!isPayoutEnabled ? (
        <RevenueEmptyState onActivate={handleActivateMonetization} />
      ) : (
        <div className="space-y-6">
          {/* Stats Overview */}
          <RevenueOverview stats={overView!} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart data={chartData!} currency={currency!}/>
            <RevenueSongTable songs={songData!} />
          </div>

          {/* Payout History */}
          <RevenueHistoryTable payouts={payOuts!} />
        </div>
      )}
    </div>
  );
}
