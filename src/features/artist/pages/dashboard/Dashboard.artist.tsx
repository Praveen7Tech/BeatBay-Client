import { useArtistDashboard } from "@/core/hooks/artist/dashboard/useDashboard";
import { ArtistDashboardStats } from "../../components/dashboard/artistDashboardStats";
import { ArtistGrowthChart } from "../../components/dashboard/artistGrowthChart";
import { ArtistTopContent } from "../../components/dashboard/artistTopContents";
import { RevenueChart } from "../../components/revenue/RevenueChart";
import { useArtistRevenue } from "@/core/hooks/artist/revenue/useArtistRevenue";
import { SpinnerArtist } from "@/components/ui/spinner";
import { useState } from "react";

export default function ArtistDashboard() {

  const [days, setDays] = useState<number>(7);
  const {stats, isLoading, topSongs, topAlbums, growthAnalytics} = useArtistDashboard(days)
  //const {chartData, currency, isLoadingChart} = useArtistRevenue()

   if(isLoading ) return <SpinnerArtist/>

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Artist Dashboard</h1>
            <p className="text-[#a7a7a7]">Track your performance and growth</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <ArtistDashboardStats stats={stats}/>
      </div>

      {/* Charts Grid */}
      <div className=" mb-8">
        {/* <RevenueChart data={chartData!} currency={currency!}/> */}
        <ArtistGrowthChart data={growthAnalytics} days={days} setDays={setDays}/>
      </div>

      {/* Top Content */}
      <ArtistTopContent songs={topSongs!} albums={topAlbums!}/>
    </div>
  );
}
