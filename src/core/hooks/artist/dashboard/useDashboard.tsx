import { artistApi } from "@/features/artist/services/artist.api"
import { useQuery } from "@tanstack/react-query"
import { Music, Disc, Users, DollarSign } from "lucide-react";

export const useArtistDashboard = ()=>{

    const {data, isLoading} = useQuery({
        queryKey: ["artist-dashboard"],
        queryFn: ()=> artistApi.artistDashBoard(),
    })

    const songs = data?.totalSongs ?? 0
    const Albums = data?.totalAlbums ?? 0
    const fans = data?.totalFans ?? 0

    const stats = [
        { title: "Total Songs", value: songs, icon: <Music size={20} className="text-[#1DB954]" /> },
        { title: "Total Albums", value: Albums, icon: <Disc size={20} className="text-[#1DB954]" /> },
        { title: "Total Fans", value: fans, icon: <Users size={20} className="text-[#1DB954]" /> },
        { title: "Revenue", value: "$8,542", icon: <DollarSign size={20} className="text-[#1DB954]" /> },
    ];

    return {
        stats,
        isLoading
    }
}