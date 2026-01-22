import { adminApi } from "@/features/admin/services/adminApi"
import { useQuery } from "@tanstack/react-query"

export const useDasboard = () =>{
    
    const {data, isLoading} = useQuery({
      queryKey: ["admin-dashboard"],
      queryFn: ()=> adminApi.getDahsboardDetils()
    })

    const totalUser = data?.totalUser ?? 0;
    const totalArtist = data?.totalArtist ?? 0;
    const totalSongs = data?.totalSongs ?? 0;
    const totalAlbums = data?.totalAlbums ?? 0;
    const totalPlaylists = data?.totalPlaylists ?? 0

    return{
        isLoading,
        totalUser,
        totalArtist,
        totalAlbums,
        totalSongs,
        totalPlaylists
    }
}