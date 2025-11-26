import { Play, TrendingUp, Users, Heart, ArrowLeft } from "lucide-react";
import { SongStatsCard } from "../../components/song/SongStatusCard"; 
import { SongPerformanceChart } from "../../components/song/SongPerformanceChart"; 
import { SongDemographics } from "../../components/song/SongDemoGraphics"; 
import { SongSourceBreakdown } from "../../components/song/SongSourceBreakDown"; 
import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "../../components/song/ui/Alert-Dialouge";
import { useDeleteSong } from "@/core/hooks/artist/useDeleteSong";
import { useSongDetails } from "@/core/hooks/artist/useSongDetails";

export default function ArtistSongDetail() {
  // song details and delete function hook
  const { song, isLoading, isError, CoverImageURL, songId } = useSongDetails();
  const { deleteSongMutation } = useDeleteSong();

  if (isLoading ) {
    return <div>Loading...</div>;
  }

  if (isError || !song) { 
    return <div>Error loading song details.</div>;
  }

  const HandleDelete = () => {
    if (songId) {
        deleteSongMutation(songId); 
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-8">
        {/* Back Button */}
        <Button onClick={()=> window.history.back()} variant="ghost" className="mb-6 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Songs
        </Button>

        {/* Song Header */}
        <div className="flex items-start gap-6 mb-8 bg-surface p-6 rounded-lg border border-border">
          <img
            src={CoverImageURL}
            alt={song?.title}
            className="w-32 h-32 rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">Song Performance</p>
            <h1 className="text-4xl font-bold mb-2">{song?.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">
               • {"song.album"}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Released {song?.releaseDate}</span>
              <span>•</span>
              <span>{song?.duration}</span>
            </div>
          </div>
          {/* Delete button */}
          <div className="flex gap-2">
            <AlertDialogDemo onConfirm={HandleDelete}/>
          </div>
        </div>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SongDemographics />
          <SongSourceBreakdown />
        </div>
      </div>
    </div>
    
  );
}
