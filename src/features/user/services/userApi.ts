import { API_ROUTES_USER } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

interface EditProfleRequest {
  name: string;
  email: string;
  password: string;
}

interface EditProfileResponse {
  message: string;
}

export const userApi ={
    editProfile: async (data: EditProfleRequest): Promise<EditProfileResponse> => {
        const response = await axiosInstance.post<EditProfileResponse>(API_ROUTES_USER.EDIT_PROFILE, data);
        return response.data;
      },
}