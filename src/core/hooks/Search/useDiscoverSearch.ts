import { userApi } from "@/features/user/services/userApi";
import { useDebouncing } from "../admin/useDebouncing";
import { useApi } from "../api/useApi";
import { useEffect, useRef, useState } from "react";
import type {
  SearchResponse,
  TopResult,
  Song as SongType,
  Artist as ArtistType,
  Album as AlbumType,
} from "@/features/user/services/response.type";

export const useSearch =(query: string) =>{
    const DebounceSearchQuery = useDebouncing(query, 500)
    
      const lastSuccessQuery = useRef("")
      const [activeFilter, setActiveFilter] = useState("All");
    
      const [topResult, setTopResult] = useState<TopResult | null>(null);
      const [songs, setSongs] = useState<SongType[]>([]);
      const [albums, setAlbums] = useState<AlbumType[]>([]);
      const [artists, setArtists] = useState<ArtistType[]>([]);
      const [users, setUsers] = useState<ArtistType[]>([]);
    
      const { execute: Search, loading } = useApi<SearchResponse & { message?: string }, string>(userApi.search);
    
      useEffect(()=>{
        const HandleSearchResult = async()=>{
    
          if(DebounceSearchQuery.length === 0) return
    
          if(DebounceSearchQuery !== lastSuccessQuery.current){
             try {
              const data = await Search(DebounceSearchQuery);
              if (!data) return;
              setTopResult(data.topResult ?? null);
              setSongs(data.songs ?? []);
              setAlbums(data.albums ?? []);
              setArtists(data.artists ?? []);
              setUsers(data.users ?? []);
    
              lastSuccessQuery.current = DebounceSearchQuery
            } catch (error) {
              console.error(error);
            }
          }
         
        }
    
        HandleSearchResult()
      },[DebounceSearchQuery, Search])


      return {topResult, songs, albums, artists, users, loading,activeFilter, setActiveFilter}
}