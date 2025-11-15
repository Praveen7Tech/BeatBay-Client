import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

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
    [x: string]: any;
    id: string;
    title: string;
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

    fetchSongs: async(): Promise<SongData> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_SONGS,)
      return response.data
    },

    createAlbum: async(data: FormData): Promise<UploadResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.CREATE_ALBUM, data)
      return response.data
    },

    fetchAlbums: async(): Promise<SongData> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_ALBUMS)
      return response.data
    }
}