import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

interface Data{
  currentPassword: string;
  newPassword: string
}

interface EditPassResponse{
  message: string
}

export const artistApi ={
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
        const response = await axiosInstance.put(API_ROUTE_ARTIST.CHANGE_PASSWORD, data)
        return response.data
    }
}