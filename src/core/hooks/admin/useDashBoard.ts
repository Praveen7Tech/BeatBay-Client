import { adminApi } from "@/features/admin/services/adminApi"
import { useApi } from "../api/useApi"
import { useEffect } from "react"

export const useDasboard = () =>{
    
    const {execute: fetchDashboardData, data, loading} = useApi(adminApi.getDahsboardDetils)

    useEffect(()=>{
        LoadStatus()
    },[fetchDashboardData])

    const LoadStatus = async () => {
      try {
        await fetchDashboardData({}); 
      } catch (error) {
        console.error("Dashboard fetch failed in component:", error);
      }
    };

    const totalUser = data?.totalUser ?? 0;
    const totalArtist = data?.totalArtist ?? 0;
    const totalSongs = data?.totalSongs ?? 0;
    const totalAlbums = data?.totalAlbums ?? 0;

    return{
        loading,
        totalUser,
        totalArtist,
        totalAlbums,
        totalSongs
    }
}