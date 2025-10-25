
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

interface ResendOtpRequest {
  email: string;
}

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

export const authApiArtist = {
    signUp: async(data:SignupRequest): Promise<SignupResponse>=> {
        const response = await axiosInstance.post<SignupResponse>(API_ROUTE_ARTIST.SIGNUP, data)
        return response.data
    },

    verifyOtp: async(data:VerifyOtpRequest): Promise<VerifyOtpResponse> =>{
      const response = await axiosInstance.post<VerifyOtpResponse>(API_ROUTE_ARTIST.VERIFY_OTP, data)
      return response.data
    },

     resendOtp: async (data: ResendOtpRequest): Promise<VerifyOtpResponse> => {
        const response = await axiosInstance.post<VerifyOtpResponse>(API_ROUTE_ARTIST.RESEND_OTP, data);
        return response.data;
    },

    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>(API_ROUTE_ARTIST.LOGIN, data);
        return response.data;
    },

    logout: async() =>{
        const response = await axiosInstance.post(API_ROUTE_ARTIST.LOGOUT);
        return response.data
    },
}