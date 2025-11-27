import { API_ROUTE_ADMIN } from "@/core/api/apiRoutes"
import { axiosInstance } from "@/core/api/axios"

export interface AdminFetchUsersResponse {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  status: boolean;
  joinDate: string;
  followersCount: number;
}
export interface UsersTableResponse{
    users: AdminFetchUsersResponse[]
    totalCount: number
    page: number
    limit: number
    totalPages: number
}

export interface UserDataResponse {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  role: "user" | "artist" | "admin";
  status: boolean;
  playLists: string[];          // playlist IDs
  followingArtists: string[];   // artist IDs
  followingCount: number;
  createdAt: string;            // ISO string
  updatedAt: string;            // ISO string
}


export const adminApi = {
     fetchUser: async(page:number,limit: number, search: string):Promise<UsersTableResponse> =>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.FETCH_USERS,{params: {page, limit, search}})
      return response.data
    },

    getUserById: async(userId: string): Promise<UserDataResponse>=>{
        const response = await axiosInstance.get(`${API_ROUTE_ADMIN.GET_USER_BYID}/${userId}`)
        return response.data
    },

    blockUser: async(userId: string): Promise<boolean>=>{
        const response = await axiosInstance.put(`${API_ROUTE_ADMIN.BLOCK_USER}/${userId}`)
        return response.data
    }
}