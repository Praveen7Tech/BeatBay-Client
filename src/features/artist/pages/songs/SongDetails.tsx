import { Play, TrendingUp, Users, Heart, DollarSign} from "lucide-react";
import { SongStatsCard } from "../../components/song/SongStatusCard"; 
import { SongPerformanceChart } from "../../components/song/SongPerformanceChart"; 
import { SongDemographics } from "../../components/song/SongDemoGraphics"; 
import { SongSourceBreakdown } from "../../components/song/SongSourceBreakDown"; 
import { DetailHeader } from "../../components/common/DeatailsHeader";
import { useSongDetails } from "@/core/hooks/artist/useSongDetails";
import { SpinnerArtist } from "@/components/ui/spinner";

export default function ArtistSongDetail() {

  const { song, isLoading, songId } = useSongDetails();
  if(isLoading) return <SpinnerArtist/>

  return (
    <div className="min-h-screen text-foreground mx-auto p-8">
        {/* Header */}
        <DetailHeader/>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           <SongStatsCard
            title="Total Revenue"
            value={song?.totalPlays!}
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
          <SongPerformanceChart songId={songId!}/>
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
