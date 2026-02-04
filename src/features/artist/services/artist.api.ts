import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";
import { SongResponse } from "@/features/user/services/response.type";
import axios from "axios";

interface Data{
  currentPassword: string;
  newPassword: string
}

interface EditPassResponse{
  message: string
}
interface UploadResponse {
  message: string
}

export interface FetchSong {
  id: string;
  title: string;
  coverImageUrl: string;
  duration: number;
  createdAt: string;
}

export interface AlbumResponseDTO {
  id: string;
  name: string;
  coverImageUrl: string;
  totalSongs: number;
  createdAt: Date;
}

export interface ArtistAlbumsResponseDTO {
  artistId: string;
  totalAlbums: number;
  totalSongs: number;   
  albums: AlbumResponseDTO[];
}

export interface  InitialAlbumSongs{
  id: string; 
  title: string; 
  coverImageUrl: string 
}

export interface EditAlbumDetailsResponse{
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  songs: InitialAlbumSongs[];
}

export interface Fans{
    id:string
    name:string
    profilePicture:string
    followerdSince: string
}

export interface FansResponse{
    fans: Fans[]
    totalCount: number
    totalPages: number
}

export interface ArtistDashboardResponse{
    totalSongs: number
    totalAlbums:number
    totalFans: number
}

export interface OnboardLinkResponse{
  success: boolean
  link: string
}

export interface FileForUploadUrl {
  field: "cover" | "audio" | "lrc";   
  fileName: string;                   
  mimeType: string;                   
}


export interface GetSongUploadUrlsRequest {
  files: FileForUploadUrl[];
  uploadId?: string;
}


export type UploadField = "cover" | "audio" | "lrc";

export interface UploadUrlItem {
  uploadUrl: string;
  key: string;
}

export interface UploadUrlResponse {
  uploadId: string;
  links: Partial<Record<UploadField, UploadUrlItem>>;
}


export interface UploadSongPayload {
  title: string;
  description?: string;
  genre: string;
  tags: string;
  coverKey?: string;
  audioKey?: string;
  lyricsKey?: string;
}

export interface SongRevenue {
    songId: string;
    songTitle: string; 
    playCount: number;
    estimatedRevenue: number;
}

export interface chartData{
    month: string;
    revenue: number;
}

export interface Summary{
    totalRevenue: number;
    revenueThisMonth: number;
    pendingPayout: number;
    nextPayoutDate: string;
    currency: string
}

export interface PayOuts{
     id: string;
    date: string;
    amount: number;
    status: "completed" | "pending" | "failed";
    method: string;
    reference: string;
}

export interface ArtistRevenueDashboard {
    summary: Summary
    chartData: chartData[]
    songStats: SongRevenue[]
    payOutsHistory: PayOuts[]
    stripeLoginLink: string
}

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

    getSongById: async(songId: string): Promise<SongResponse>=>{
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
      console.log("linku ", response.data)
      return response.data
    },

    getRevenue : async(): Promise<ArtistRevenueDashboard>=>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.GET_REVENUE)
      return response.data
    }
}