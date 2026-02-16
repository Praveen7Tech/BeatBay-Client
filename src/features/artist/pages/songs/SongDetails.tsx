import { Play, Heart, DollarSign} from "lucide-react";
import { SongStatsCard } from "../../components/song/SongStatusCard"; 
import { SongPerformanceChart } from "../../components/song/SongPerformanceChart"; 
import { SongDemographics } from "../../components/song/SongDemoGraphics"; 
import { SongSourceBreakdown } from "../../components/song/SongSourceBreakDown"; 
import { DetailHeader } from "../../components/common/DeatailsHeader";
import { useSongDetails } from "@/core/hooks/artist/useSongDetails";
import { SpinnerArtist } from "@/components/ui/spinner";
import { SongRevenueYearly } from "../../components/song/SongRevenueTable";
import { SongPayoutTable } from "../../components/song/SongPayoutTable";
import { useSongPerformance, useSongRevenueData } from "@/core/hooks/song/useSongPerformance";
import { useState } from "react";
const currentYear = new Date().getFullYear();

export default function ArtistSongDetail() {

  const [days, setDays] = useState<number>(7);

  const { song, isLoading, songId } = useSongDetails();

  const { data : SongPerformance = [], isLoading:songPerformanceloading } = useSongPerformance(songId!, days);

  const { data: revenueData, isLoading: revenueLoading } = useSongRevenueData(songId!, currentYear)

  if (isLoading || revenueLoading || songPerformanceloading) return <SpinnerArtist />;

  return (
    <div className="min-h-screen text-foreground mx-auto p-8">
        {/* Header */}
        <DetailHeader/>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           <SongStatsCard
            title="Total Revenue"
            value={revenueData.lifetimeRevenue}
            change="18.7%"
            isPositive={true}
            icon={DollarSign}
          />
          <SongStatsCard
            title="This Year Revenue"
            value={revenueData.thisYearRevenue}
            change="18.7%"
            isPositive={true}
            icon={DollarSign}
          />
          <SongStatsCard
            title="Total Streams"
            value={song?.totalPlays!}
            change="12.5%"
            isPositive={true}
            icon={Play}
          />
          <SongStatsCard
            title="Saves"
            value={song?.likes!}
            change="15.7%"
            isPositive={true}
            icon={Heart}
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <SongPerformanceChart 
            data={SongPerformance}
            days={days}
            setDays={setDays}
          />
        </div>

        {/* Demographics & Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SongRevenueYearly revenue={revenueData!} />
          <SongPayoutTable payouts={revenueData?.payouts ?? []}/>
          {/* <SongDemographics />
          <SongSourceBreakdown /> */}
        </div>
      {/* </div> */}
    </div>
    
  );
}
