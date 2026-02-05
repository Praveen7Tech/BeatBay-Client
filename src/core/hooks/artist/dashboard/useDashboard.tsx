import { artistApi, ArtistGrowthChartData } from "@/features/artist/services/artist.api"
import { useQuery } from "@tanstack/react-query"
import { Music, Disc, Users, DollarSign } from "lucide-react";

export const useArtistDashboard = (days:number)=>{

    const {data, isLoading: dashboardLoading} = useQuery({
        queryKey: ["artist-dashboard"],
        queryFn: ()=> artistApi.artistDashBoard(),
    })

    const {data: growth=[], isLoading:growthLoading} = useQuery<ArtistGrowthChartData[]>({
          queryKey: ["growth", days],
          queryFn:()=> artistApi.growthAnalytics(days),
          placeholderData: (prev) => prev,
    })

    const songs = data?.totalSongs ?? 0
    const Albums = data?.totalAlbums ?? 0
    const fans = data?.totalFans ?? 0
    const revenue = data?.totalRevenue.toLocaleString() ?? 0
    const topSongs = data?.topPlayedSongs
    const topAlbums = data?.topPlayedAlbums

    const stats = [
        { title: "Total Songs", value: songs, icon: <Music size={20} className="text-[#1DB954]" /> },
        { title: "Total Albums", value: Albums, icon: <Disc size={20} className="text-[#1DB954]" /> },
        { title: "Total Fans", value: fans, icon: <Users size={20} className="text-[#1DB954]" /> },
        { title: "Revenue", value: revenue, icon: <DollarSign size={20} className="text-[#1DB954]" /> },
    ];

    return {
        stats,
        isLoading:dashboardLoading || growthLoading,
        topSongs,
        topAlbums,
        growthAnalytics:growth
    }
}