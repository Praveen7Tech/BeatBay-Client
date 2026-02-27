import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";
import axios from "axios";
import { ArtistAlbumsResponseDTO, ArtistDashboardResponse, ArtistGrowthChartData, ArtistRevenueDashboard, ArtistSongDetails, Data, EditAlbumDetailsResponse, EditPassResponse, FansResponse, FetchSong, FileForUploadUrl, OnboardLinkResponse, SongPerformance, UploadResponse, UploadSongPayload, UploadUrlResponse } from "../utils/api.type";


export const artistApi ={
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
        const response = await axiosInstance.put(API_ROUTE_ARTIST.CHANGE_PASSWORD, data)
        return response.data
    },

    uploadSong: async(data: UploadSongPayload): Promise<UploadResponse>=>{
       const response = await axiosInstance.post(API_ROUTE_ARTIST.UPLOAD_SONG, data)
       return response.data
    },

    getSongUploadUrls: async(files: FileForUploadUrl[], uploadId?:string): Promise<UploadUrlResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.GET_SONGUPLOAD_URLS, {
        files,uploadId
      })
      return response.data
    },

    uploadToS3: async(url: string, data: File)=>{
      return await axios.put(url,data,{
        headers:{
          "Content-Type": data.type
        }
      })
    },

    fetchSongs: async(): Promise<FetchSong[]> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_SONGS,)
      return response.data
    },

    createAlbum: async(data: FormData): Promise<UploadResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.CREATE_ALBUM, data)
      return response.data
    },

    fetchAlbums: async(): Promise<ArtistAlbumsResponseDTO> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_ALBUMS)
      return response.data
    },

    updateSong: async (songId: string, data: UploadSongPayload): Promise<any> => {
        const response = await axiosInstance.put(`${API_ROUTE_ARTIST.EDIT_SONG}/${songId}`, data);
        return response.data;
    },

    getSongById: async(songId: string): Promise<ArtistSongDetails>=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.GET_SONG_BY_ID}/${songId}`)
      return response.data
    },

    getAlbumById: async(albumId: string): Promise<EditAlbumDetailsResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.GET_ALBUM_BY_ID}/${albumId}`)
      return response.data
    },

    editAlbum: async(albumId: string, data: FormData): Promise<{message: string}>=>{
      const response = await axiosInstance.put(`${API_ROUTE_ARTIST.EDIT_ALBUM}/${albumId}`, data)
      return response.data
    },

    deleteSong: async(songId: string): Promise<boolean>=>{
      const response = await axiosInstance.delete(`${API_ROUTE_ARTIST.DELETE_SONG}/${songId}`)
      return response.data
    },

    deleteAlbum: async(albumId: string): Promise<boolean>=>{
      const response = await axiosInstance.delete(`${API_ROUTE_ARTIST.DELETE_ALBUM}/${albumId}`)
      return response.data
    },

    getAllFans: async(page:number, limit: number):Promise<FansResponse>=>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.GET_FANS,{
        params:{page, limit}
      })
      return response.data
    },

    artistDashBoard: async():Promise<ArtistDashboardResponse>=> {
      const response = await axiosInstance.get(API_ROUTE_ARTIST.DASHBOARD)
      return response.data
    },

    getOnBoardingLink: async(): Promise<OnboardLinkResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.ONBOARDING)
      return response.data
    },

    getRevenue : async(): Promise<ArtistRevenueDashboard>=>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.GET_REVENUE)
      return response.data
    },

    growthAnalytics: async(days:number): Promise<ArtistGrowthChartData[]>=>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.GROWTH_ANALYTICS,{
        params:{ days}
      })
      return response.data
    },

    getSongPerformance: async(songId: string, days: number): Promise<SongPerformance[]>=> {
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.SONG_PERFORMANCE}/${songId}`,{
        params: {filter: days}
      });

      return response.data
    },

    getSongRevenue: async(songId:string, year: number)=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.SONG_REVENUE}/${songId}`,{
        params: {year}
      })
      return response.data
    }
}