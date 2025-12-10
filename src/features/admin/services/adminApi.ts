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

export interface AdminFetchArtistResponse {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  status: boolean;
  joinDate: string;
  followersCount: number;
  songsCount: number
}

export interface ArtistsTableResponse{
    artist: AdminFetchArtistResponse[]
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
  playLists: string[];          
  followingArtists: string[];   
  followingCount: number;
  createdAt: string;            
  updatedAt: string;            
}

export interface ArtistDataResponse {
  _id: string;
  name: string;
  email: string;
  googleId?: string | null;
  role: "artist";
  bio: string;
  profilePicture: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  songs: ArtistSong[];
  albums: ArtistAlbum[];
}

/* ---------------- SONG ---------------- */
export interface ArtistSong {
  _id: string;
  artistId: string;
  title: string;
  description: string;
  genre: string[];
  tags: string[];
  audioUrl: string;
  coverImageUrl: string;
  lyricsUrl: string;
  duration: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  status: "active"
}

/* ---------------- ALBUM ---------------- */
export interface ArtistAlbum {
  _id: string;
  artistId: string;
  title: string;
  description: string;
  coverImageUrl: string;
  songs: string[]; 
  createdAt: string;
  updatedAt: string;
  status: "active"
}

export interface  DashBordResponse{
  totalUser: number
  totalArtist: number
  totalSongs: number
  totalAlbums: number
  message?: string
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
    },

    unBlockUser: async(userId: string): Promise<boolean>=>{
      const response = await axiosInstance.put(`${API_ROUTE_ADMIN.UN_BLOCK_USER}/${userId}`)
      return response.data
    },

    fetchArtists: async(page:number,limit: number, search: string):Promise<ArtistsTableResponse> =>{
      const response = await axiosInstance.get(API_ROUTE_ADMIN.FETCH_ARTIST,{params: {page, limit, search}})
      return response.data
    },

    getArtistById: async(artistId: string): Promise<ArtistDataResponse>=>{
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
    }
}