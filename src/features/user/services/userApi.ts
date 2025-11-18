import { API_ROUTES_USER } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";

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
interface Data{
  currentPassword: string;
  newPassword: string
}

interface EditPassResponse{
  message: string
}
export interface SongData {
  _id: string; 
  title: string;
  album: string;
  artistId: string;
  audioUrl: string;
  coverImageUrl: string;
  description?: string; 
  duration?:string
  genre: string;
  tags?: string; 
  releaseDate: string; 
  createdAt: string;
  updatedAt: string;
}

export interface ArtistInfo {
  _id: string;
  name: string;
  profilePicture: string;
}

export interface SongResponse {
  _id: string;
  artistId: ArtistInfo;
  title: string;
  genre: string;
  audioUrl: string;
  lyricsUrl: string
  coverImageUrl: string;
  description: string;
  album: string;
  releaseDate: string;    
  duration:string 
  tags: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SongPageResponse{
  songs: SongResponse
  recomentations: SongData[]
}


interface AlbumResponse {
   _id: string;
   title: string;
   artistId: ArtistInfo;
   coverImageUrl: string;
   createdAt: string;
   description: string;
   songs: SongData[]
}


export const userApi ={
    editProfile: async (data: FormData): Promise<EditProfileResponse> => {
        const response = await axiosInstance.put<EditProfileResponse>(API_ROUTES_USER.EDIT_PROFILE, data);
        return response.data;
      },
     
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
       const response = await axiosInstance.put(API_ROUTES_USER.CHANGE_PASSWORD, data)
       return response.data
    },
    
    fetchSong: async():Promise<SongData[]> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_SONGS)
      return response.data
    },

    fetchAlbums: async():Promise<SongData[]> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_ALBUMS)
      return response.data
    },

    SongDetail: async(songId:string): Promise<SongPageResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.SONG_DETAILS}/${songId}`)
      return response.data
    },

    AlbumDetails: async(albumId:string): Promise<AlbumResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.ALBUM_DETAILS}/${albumId}`)
      console.log("album--", response.data)
      return response.data
    } 
}