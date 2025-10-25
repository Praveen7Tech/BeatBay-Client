import { data } from "react-router-dom";
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

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  message: string;
}

export const authApiArtist = {
    signUp: async(data:SignupRequest): Promise<SignupResponse>=> {
        const response = await axiosInstance.post<SignupResponse>(API_ROUTE_ARTIST.SIGNUP, data)
        return response.data
    },

    verifyOtp: async(data:VerifyOtpRequest): Promise<VerifyOtpResponse> =>{
      const response = await axiosInstance.post<VerifyOtpResponse>(API_ROUTE_ARTIST.VERIFY_OTP, data)
      return response.data
    }
}