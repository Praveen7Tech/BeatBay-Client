import { API_ROUTE_ADMIN } from "@/core/api/apiRoutes"
import { axiosInstance } from "@/core/api/axios"
import { AdminPayoutPagination, AdminRevenueChartItem, AdminRevenueDashboard, ArtistProfileResponse, ArtistsTableResponse, DashBordResponse, DemographicsResponse, EntityBreakDownResponse, SongResponse, UserDataResponse, UsersTableResponse } from "../utils/api.types"

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
    },

    unBlockUser: async(userId: string): Promise<boolean>=>{
      const response = await axiosInstance.put(`${API_ROUTE_ADMIN.UN_BLOCK_USER}/${userId}`)
      return response.data
    },

    fetchArtists: async(page:number,limit: number, search: string):Promise<ArtistsTableResponse> =>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.FETCH_ARTIST,{params: {page, limit, search}})
      return response.data
    },

    getArtistById: async(artistId: string): Promise<ArtistProfileResponse>=>{
        const response = await axiosInstance.get(`${API_ROUTE_ADMIN.GET_ARTIST_BYID}/${artistId}`)
        return response.data
    },

    blockArtist: async(artistId: string): Promise<boolean>=>{
        const response = await axiosInstance.put(`${API_ROUTE_ADMIN.BLOCK_ARTIST}/${artistId}`)
        return response.data
    },

    unBlockArtist: async(artistId: string): Promise<boolean>=>{
      const response = await axiosInstance.put(`${API_ROUTE_ADMIN.UN_BLOCK_ARTIST}/${artistId}`)
      return response.data
    },

    getDahsboardDetils: async(): Promise<DashBordResponse>=>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.GET_DASHBOARD_DATA)
      return response.data
    },

    getAllSongs: async (params: {page: number;  limit: number;search?: string;status?: string; 
      genre?: string; sort?: string; }): Promise<SongResponse> => {
      const response = await axiosInstance.get(API_ROUTE_ADMIN.GET_SONGS, {
        params: params
      });
      return response.data;
    },

    getSongDetails: async (id: string) => {
      const path = API_ROUTE_ADMIN.GET_SONG_BYID.replace(':id', id);
      const response = await axiosInstance.get(path);;
      console.log("admin song data ", response.data)
      return response.data.data; 
    },

    toggleSongStatus: async (id: string, status: boolean) => {
        const path = API_ROUTE_ADMIN.TOGGLE_STATUS.replace(':id', id);
        const response = await axiosInstance.put(path, { isBlocked: status });
        return response.data;
    },

    getAllAlbums: async (params: { page: number; limit: number; search?: string; status?: string; sort?: string; }) => {
      const response = await axiosInstance.get(API_ROUTE_ADMIN.GET_ALBUMS, { params });
      return response.data; 
    },

    getAlbumDetails: async (id: string) => {
      const path = API_ROUTE_ADMIN.GET_ALBUM_BYID.replace(':id', id);
      const response = await axiosInstance.get(path);
      return response.data.data; 
    },

    toggleAlbumStatus: async (id: string, status: boolean) => {
        const path = API_ROUTE_ADMIN.TOGGLE_ALBUM_STATUS.replace(':id', id);
        const response = await axiosInstance.put(path, { status });
        return response.data;
    },

    demogarphics: async(entity:string, range:string): Promise<DemographicsResponse>=>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.DEMOGRAPHICS,{
        params:{entity, range}
      })
      return response.data
    },

    dashBoardEntity: async(): Promise<EntityBreakDownResponse>=>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.GET_DASHBOARD_ENTITY_DATA)
      return response.data
    },


    getStats: async ():Promise<AdminRevenueDashboard> => {
      const response = await axiosInstance.get(API_ROUTE_ADMIN.PLATFORM_REVENUE_STATS);
      return response.data
    },

    getChart: async (range: "weekly" | "monthly" | "yearly"):Promise<AdminRevenueChartItem[]> => {
      const response = await axiosInstance.get(API_ROUTE_ADMIN.PLATFORM_REVENUE_CHART,{
        params: {range}
      });
      return response.data
    },

    getPayoutHistory: async (page: number, limit = 5):Promise<AdminPayoutPagination> => {
      const response = await axiosInstance.get(API_ROUTE_ADMIN.PLATFORM_PAYOUT_HISTORY,{
        params:{page, limit}
      });
      return response.data;
    },

}