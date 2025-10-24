import { API_ROUTE_ARTIST } from "../../../core/api/apiRoutes";
import { axiosInstance } from "../../../core/api/axios";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  otp?: string; 
}

export const authApiArtist = {
    signUp: async(data:SignupRequest): Promise<SignupResponse>=> {
        const response = await axiosInstance.post<SignupResponse>(API_ROUTE_ARTIST.SIGNUP, data)
        return response.data
    }
}