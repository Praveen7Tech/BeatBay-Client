import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";

export const useSongDetails = (id: string) => {
  return useQuery({
    queryKey: ['song', id],
    queryFn: () => adminApi.getSongDetails(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useAlbumDetails = (id: string)=>{
  return useQuery({
    queryKey: ['album', id],
    queryFn: () => adminApi.getAlbumDetails(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000, 
  })
}