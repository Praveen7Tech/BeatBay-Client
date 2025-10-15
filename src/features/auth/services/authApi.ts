import { axiosInstance } from "../../../core/api/axios";
import { API_ROUTES } from "../../../core/api/apiRoutes";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  otp?: string; // For development
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
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await axiosInstance.post<SignupResponse>(API_ROUTES.SIGNUP, data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await axiosInstance.post<VerifyOtpResponse>(API_ROUTES.VERIFY_OTP, data);
    return response.data;
  },

  resendOtp: async (data: ResendOtpRequest): Promise<VerifyOtpResponse> => {
    const response = await axiosInstance.post<VerifyOtpResponse>(API_ROUTES.RESEND_OTP, data);
    console.log("rese ", response)
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(API_ROUTES.LOGIN, data);
    return response.data;
  },
};

