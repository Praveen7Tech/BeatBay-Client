import { API_ROUTE_ARTIST } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";
import { SongResponse } from "@/features/user/services/userApi";

interface Data{
  currentPassword: string;
  newPassword: string
}

interface EditPassResponse{
  message: string
}
interface UploadResponse {
  message: string
}

export interface SongData {
  _id: string; 
  title: string;
  album: string;
  artistId: string;
  audioUrl: string;
  coverImageUrl: string;
  duration: string
  description?: string; 
  genre: string;
  tags?: string; 
  releaseDate: string; 
  createdAt: string;
  updatedAt: string;
}

export interface AlbumResponseDTO {
  id: string;
  name: string;
  coverImageUrl: string;
  totalSongs: number;
  createdAt: Date;
}

export interface ArtistAlbumsResponseDTO {
  artistId: string;
  totalAlbums: number;
  totalSongs: number;   
  albums: AlbumResponseDTO[];
}

export interface  InitialAlbumSongs{
  id: string; 
  title: string; 
  coverImageUrl: string 
}

export interface EditAlbumDetailsResponse{
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  songs: InitialAlbumSongs[];
}

export const artistApi ={
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
        const response = await axiosInstance.put(API_ROUTE_ARTIST.CHANGE_PASSWORD, data)
        return response.data
    },

    uploadSong: async(data: FormData): Promise<UploadResponse>=>{
       const response = await axiosInstance.post(API_ROUTE_ARTIST.UPLOAD_SONG, data)
       return response.data
    },

    fetchSongs: async(): Promise<SongData[]> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_SONGS,)
      return response.data
    },

    createAlbum: async(data: FormData): Promise<UploadResponse>=>{
      const response = await axiosInstance.post(API_ROUTE_ARTIST.CREATE_ALBUM, data)
      return response.data
    },

    fetchAlbums: async(): Promise<ArtistAlbumsResponseDTO> =>{
      const response = await axiosInstance.get(API_ROUTE_ARTIST.FETCH_ALBUMS)
      return response.data
    },

    updateSong: async (songId: string, data: FormData): Promise<any> => {
        const response = await axiosInstance.put(`${API_ROUTE_ARTIST.EDIT_SONG}/${songId}`, data);
        return response.data;
    },

    getSongById: async(songId: string): Promise<SongResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.GET_SONG_BY_ID}/${songId}`)
      return response.data
    },

    getAlbumById: async(albumId: string): Promise<EditAlbumDetailsResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTE_ARTIST.GET_ALBUM_BY_ID}/${albumId}`)
      console.log("res--1", response.data)
      return response.data
    },

    editAlbum: async(albumId: string, data: FormData): Promise<{message: string}>=>{
      const response = await axiosInstance.put(`${API_ROUTE_ARTIST.EDIT_ALBUM}/${albumId}`, data)
      return response.data
    },

    deleteSong: async(songId: string): Promise<boolean>=>{
      const response = await axiosInstance.delete(`${API_ROUTE_ARTIST.DELETE_SONG}/${songId}`)
      return response.data
    },

    deleteAlbum: async(albumId: string): Promise<boolean>=>{
      const response = await axiosInstance.delete(`${API_ROUTE_ARTIST.DELETE_ALBUM}/${albumId}`)
      return response.data
    }
}