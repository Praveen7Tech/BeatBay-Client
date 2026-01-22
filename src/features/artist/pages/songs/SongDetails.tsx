import { Play, TrendingUp, Users, Heart} from "lucide-react";
import { SongStatsCard } from "../../components/song/SongStatusCard"; 
import { SongPerformanceChart } from "../../components/song/SongPerformanceChart"; 
import { SongDemographics } from "../../components/song/SongDemoGraphics"; 
import { SongSourceBreakdown } from "../../components/song/SongSourceBreakDown"; 
import { DetailHeader } from "../../components/common/DeatailsHeader";

export default function ArtistSongDetail() {

  return (
    <div className="min-h-screen bg-background text-foreground mx-auto p-8">
        {/* Header */}
        <DetailHeader/>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SongStatsCard
            title="Total Streams"
            value="1.2M"
            change="12.5%"
            isPositive={true}
            icon={Play}
          />
          <SongStatsCard
            title="Listeners"
            value="856K"
            change="8.3%"
            isPositive={true}
            icon={Users}
          />
          <SongStatsCard
            title="Saves"
            value="234K"
            change="15.7%"
            isPositive={true}
            icon={Heart}
          />
          <SongStatsCard
            title="Growth Rate"
            value="18.9%"
            change="3.2%"
            isPositive={false}
            icon={TrendingUp}
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <SongPerformanceChart />
        </div>

        {/* Demographics & Sources */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SongDemographics />
          <SongSourceBreakdown />
        </div> */}
      {/* </div> */}
    </div>
    
  );
}
