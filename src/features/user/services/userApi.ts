import { API_ROUTES_USER } from "@/core/api/apiRoutes";
import { axiosInstance } from "@/core/api/axios";
import { AlbumResponse, ArtistDetailsResponse, Data, EditPassResponse, EditProfileResponse, FetchAlbum, FetchSongs, FollowersResponse, FriendsResponse, LikedSondResponse, NewPlayListResponse, PlaylistDetailsResponse, PlayListsResposne, SearchResponse, SearchSongResponse, SongDehydration, SongDetailsResponse, UserProfileResponseDTO } from "./response.type";


export const userApi ={
    editProfile: async (data: FormData): Promise<EditProfileResponse> => {
        const response = await axiosInstance.put<EditProfileResponse>(API_ROUTES_USER.EDIT_PROFILE, data);
        return response.data;
      },
     
    changePassword: async(data: Data): Promise<EditPassResponse >=> {
       const response = await axiosInstance.put(API_ROUTES_USER.CHANGE_PASSWORD, data)
       console.log("error", response.data)
       return response.data
    },
    
    fetchSong: async():Promise<FetchSongs[]> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_SONGS)
      return response.data
    },

    fetchAlbums: async():Promise<FetchAlbum[]> =>{
      const response = await axiosInstance.get(API_ROUTES_USER.FETCH_ALBUMS)
      return response.data
    },

    SongDetail: async(songId:string): Promise<SongDetailsResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.SONG_DETAILS}/${songId}`)
      return response.data
    },

    SongDetailHydration: async(songId:string): Promise<SongDehydration>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER. SONG_HYDRATION}/${songId}`)
      return response.data
    },

    AlbumDetails: async(albumId:string): Promise<AlbumResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.ALBUM_DETAILS}/${albumId}`)
      return response.data
    },
    
    artistDetails:async(artistId:string): Promise<ArtistDetailsResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.ARTIST_DETAILS}/${artistId}`)
      return response.data
    }, 

    toggleFollow: async(targetId: string, role: string, action: string):Promise<{message: string}>=>{
      const method = action === "follow" ? "post" : "delete"
      const response = await axiosInstance[method](`${API_ROUTES_USER.FOLLOW}/${targetId}?role=${role}`)
      return response.data
    },

    checkFollowStatus: async(targetId: string, role: string): Promise<{isFollowing: boolean}>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.IS_FOLLOWING}/${targetId}?role=${role}`)
      return response.data
    },

    following : async(page: number, limit: number): Promise<FollowersResponse>=>{
      const response = await axiosInstance.get(API_ROUTES_USER.FOLLOWING,{
        params: {page, limit}
      })
      return response.data
    },

    followers : async(page:number, limit:number): Promise<FollowersResponse>=>{
      const response = await axiosInstance.get(API_ROUTES_USER.FOLLOWERS,{
        params: {page, limit}
      })
      return response.data
    },

    createPlaylist: async(): Promise<NewPlayListResponse>=>{
      const response = await axiosInstance.post(API_ROUTES_USER.CREATE_PLAYLIST)
      return response.data
    },

    getUserPlayLits: async(page?:number, limit?:number): Promise<PlayListsResposne>=>{
      const response = await axiosInstance.get(API_ROUTES_USER.GET_USER_PLAYLIST, {
        params:{page,limit}
      })
      return response.data
    },

    getPlaylistById: async (playlistId: string): Promise<PlaylistDetailsResponse> => {
      const response = await axiosInstance.get(`${API_ROUTES_USER.GET_PLAYLIST_BY_ID}/${playlistId}`);
      return response.data;
    },

    searchSongs: async (query: string): Promise<SearchSongResponse[]> => {
      const response = await axiosInstance.get(API_ROUTES_USER.SEARCH_SONGS, {
        params: { q: query },
      });
      return response.data;
    },

    addToPlayList: async ( playlistId: string,  data: string ): Promise<{ message: string }> => {
      const response = await axiosInstance.post(`${API_ROUTES_USER.ADD_TO_PLAYLIST}/${playlistId}`,{ songId:data });
      return response.data;
    },

    updatePlaylistDetails: async(playlistId: string, data: FormData): Promise<{message: string}>=>{
      const response = await axiosInstance.post(`${API_ROUTES_USER.EDIT_PLAYLIST}/${playlistId}`, data)
      return response.data
    },

    search: async(query: string): Promise<SearchResponse>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.SEARCH}?q=${encodeURIComponent(query)}`)
      return response.data
    },

    userProfileDetails: async(userId: string):Promise<UserProfileResponseDTO>=>{
      const response = await axiosInstance.get(`${API_ROUTES_USER.USER_DETAILS}/${userId}`)
      return response.data
    },

    getFriends: async():Promise<FriendsResponse>=>{
      const response = await axiosInstance.get(API_ROUTES_USER.FRIENDS)
      return response.data
    },

    fetchPaginatedData: async ({ type, page, limit, q, genre }: any) => {
      const endpoint = type === 'songs' ? '/user/songs' : '/user/albums';
      const response = await axiosInstance.get(endpoint, {
        params: { page, limit, q, genre }
      });
      return response.data;
    },

    toggleLike: async(songId: string): Promise<boolean>=>{
      const path = API_ROUTES_USER.SONG_LIKE.replace(':id', songId);
      const response = await axiosInstance.put(path)
      return response.data
    },

    LikedSongs: async(): Promise<LikedSondResponse>=>{
      const response = await axiosInstance.get(API_ROUTES_USER.LIKED_SONGS)
      return response.data
    },

    removeFromPlayList: async(playListId:string,songId: string): Promise<boolean>=>{
      const path = API_ROUTES_USER.REMOVE_FROM_PLAYLIST.replace(":playlistId", playListId)
      .replace(":songId",songId)

      const response = await axiosInstance.delete(path)
      return response.data
    },

    deletePlayList: async(playlistId:string): Promise<boolean>=>{
      const path = API_ROUTES_USER.DELETE_PLAYLIST.replace(":playlistId", playlistId)
      const response = await axiosInstance.delete(path)
      return response.data
    }
}