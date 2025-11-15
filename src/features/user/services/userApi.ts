import { API_ROUTES_USER } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

interface EditProfileResponse {
  message: string;
  accessToken: string; 
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
interface Data{
  currentPassword: string;
  newPassword: string
}

interface EditPassResponse{
  message: string
}
interface SongData {
    [x: string]: any;
    id: string;
    title: string;
}

export const userApi ={
    editProfile: async (data: FormData): Promise<EditProfileResponse> => {
        const response = await axiosInstance.put<EditProfileResponse>(API_ROUTES_USER.EDIT_PROFILE, data);
        return response.data;
      },
     
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
       const response = await axiosInstance.put(API_ROUTES_USER.CHANGE_PASSWORD, data)
       return response.data
    },
    
    fetchSong: async():Promise<SongData> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_SONGS)
      return response.data
    },

    fetchAlbums: async():Promise<SongData> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_ALBUMS)
      return response.data
    },
}