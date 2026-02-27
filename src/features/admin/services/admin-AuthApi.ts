import { API_ROUTE_ADMIN } from "../../../core/api/apiRoutes";
import { axiosInstance } from "../../../core/api/axios";
import { LoginRequest, LoginResponse } from "../utils/auth-api.types";

export const authApiAdmin = {
    login: async(data:LoginRequest): Promise<LoginResponse> => {
        const response =  await axiosInstance.post<LoginResponse>(API_ROUTE_ADMIN.LOGIN, data)
        return response.data
    },

    logout: async() =>{
        const response = await axiosInstance.post(API_ROUTE_ADMIN.LOGOUT);
        return response.data
    }
}