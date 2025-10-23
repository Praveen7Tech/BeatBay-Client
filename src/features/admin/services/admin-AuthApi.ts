import { API_ROUTE_ADMIN } from "../../../core/api/apiRoutes";
import { axiosInstance } from "../../../core/api/axios";


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  accessToken: string; 
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authApiAdmin = {
    login: async(data:LoginRequest): Promise<LoginResponse> => {
        const response =  await axiosInstance.post<LoginResponse>(API_ROUTE_ADMIN.LOGIN, data)
        return response.data
    },

      logout: async() =>{
        const response = await axiosInstance.post(API_ROUTE_ADMIN.LOGOUT);
        return response.data
      },
}