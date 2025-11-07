
import { API_ROUTE_ARTIST } from "../../../core/api/apiRoutes";
import { axiosInstance } from "../../../core/api/axios";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
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
interface googleSignUp {
  token: string
}
interface VerifyEmailRequest {
  email: string
}

interface ResetPassRequest {
  password: string,
  token: string
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
    editProfile: async (data: FormData): Promise<EditProfileResponse> => {
        const response = await axiosInstance.put<EditProfileResponse>(API_ROUTE_ARTIST.EDIT_PROFILE, data);
        return response.data;
    },
    
    googleSignup: async(data: googleSignUp)=> {
      const response = await axiosInstance.post(API_ROUTE_ARTIST.GOOGLE_SIGNUP, data)
      return response.data
    },    

    verifyEmail: async(data:VerifyEmailRequest)=> {
      const response = await axiosInstance.post(API_ROUTE_ARTIST.VERIFY_EMAIL, data)
      return response.data
    },

    ResetPassword: async(data: ResetPassRequest)=> {
      const response = await axiosInstance.put(API_ROUTE_ARTIST.RESET_PASSWORD, data)
      return response.data
    },    
}