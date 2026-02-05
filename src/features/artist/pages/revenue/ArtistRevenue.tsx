import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "../../components/revenue/RevenueChart";
import { RevenueSongTable } from "../../components/revenue/RevenueSongTable";
import { RevenueHistoryTable } from "../../components/revenue/RevenueHistoryTable";
import { RevenueEmptyState } from "../../components/revenue/RevenueEmptyState";
import { RevenueOverview } from "../../components/revenue/RevenueOverwiew";
import { SpinnerArtist } from "@/components/ui/spinner";
import { useArtistRevenue } from "@/core/hooks/artist/revenue/useArtistRevenue";

export default function ArtistRevenue() {

  const {isLoadingChart, isPayoutEnabled,loginLink,chartData,currency,handleActivateMonetization,overView,payOuts,songData} = useArtistRevenue()

  if(isLoadingChart) return <SpinnerArtist/>
  
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
