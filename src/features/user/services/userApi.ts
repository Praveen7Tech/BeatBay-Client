import { API_ROUTES_USER } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

// interface EditProfleRequest {
//   name: string;
//   email: string;
//   password: string;
//   image:FormData
// }

interface EditProfileResponse {
  message: string;
}

export const userApi ={
    editProfile: async (data: FormData): Promise<EditProfileResponse> => {
        const response = await axiosInstance.put<EditProfileResponse>(API_ROUTES_USER.EDIT_PROFILE, data);
        return response.data;
      },
}