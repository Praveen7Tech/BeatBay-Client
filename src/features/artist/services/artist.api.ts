import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";
import { SongResponse } from "@/features/user/services/userApi";

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

interface SongData {
  _id: string; 
  title: string;
  album: string;
  artistId: string;
  audioUrl: string;
  coverImageUrl: string;
  description?: string; 
  genre: string;
  tags?: string; 
  releaseDate: string; 
  createdAt: string;
  updatedAt: string;
}

export const artistApi ={
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
        const response = await axiosInstance.put(API_ROUTE_ARTIST.CHANGE_PASSWORD, data)
        return response.data
    },

    uploadSong: async(data: FormData): Promise<UploadResponse>=>{
       const response = await axiosInstance.post(API_ROUTE_ARTIST.UPLOAD_SONG, data)
       return response.data
    },

    fetchSongs: async(): Promise<SongData[]> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_SONGS,)
      return response.data
    },

    createAlbum: async(data: FormData): Promise<UploadResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.CREATE_ALBUM, data)
      return response.data
    },

    fetchAlbums: async(): Promise<SongData[]> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_ALBUMS)
      return response.data
    },

    updateSong: async (songId: string, data: FormData): Promise<any> => {
        const response = await axiosInstance.put(`${API_ROUTE_ARTIST.EDIT_SONG}/${songId}`, data);
        return response.data;
    },

    getSongById: async(songId: string): Promise<SongResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.GET_SONG_BY_ID}/${songId}`)
      console.log("res--", response.data)
      return response.data
    }
}