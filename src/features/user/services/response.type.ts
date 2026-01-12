export interface EditProfileResponse {
  message: string;
  accessToken: string; 
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
export interface Data{
  currentPassword: string;
  newPassword: string
}

export interface EditPassResponse{
  message: string
}
export interface SongData {
  _id: string; 
  title: string;
  artistId: string;
  artistName?:string
  audioUrl: string;
  coverImageUrl: string;
  description?: string; 
  duration:string
  genre: string;
  tags?: string; 
  releaseDate: string; 
  createdAt: string;
  updatedAt: string;
}

export interface FetchSongs {
  id: string;
  title: string;
  coverImageUrl: string;
  duration: number;
  createdAt: string;
}

export interface FetchAlbum {
  id: string;
  title: string;
  coverImageUrl: string;
}

export interface ArtistDTO {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface SongDetails {
  id: string;
  title: string;
  coverImageUrl: string;
  audioUrl: string;
  lyricsUrl?: string;
  duration: number;
  artist: ArtistDTO;
  artistName?:string
  isLiked: boolean;
}

export interface SongDetailsResponse {
  song: SongDetails;
  recommendations: SongDetails[];
}

export interface ArtistInfo {
    _id: string;
    name: string;
    profilePicture: string;
}


export interface SongResponse {
    _id: string;
    description: string
    title: string;
    genre: string
    tags: string[]
    coverImageUrl: string;
    audioUrl: string;
    lyricsUrl: string;
    artistId: ArtistInfo; 
    duration: number; 
    isLiked?:boolean
    likesCount: number;
}


export interface SongDehydration{
  songs: SongDetails
}

export interface AlbumResponse {
   id: string;
   title: string;
   artistName: ArtistInfo;
   coverImageUrl: string;
   description: string;
   songs: SongDetails[]
}

export interface ArtistDetailsResponse {
  _id: string;
  name: string;
  email: string;
  googleId?: string;
  role: string
  bio: string;
  profilePicture: string;
  albums: AlbumResponse[];
  songs: SongData[];
  status: boolean;
  createdAt: string;     
  updatedAt: string; 
}

export interface FollowingResponse {
  id: string;
  name: string;
  role: string
  profilePicture: string;
}

export interface FollowersResponse{
  docs: FollowingResponse[]
  totalPages: number
  currentPage: number
  totalDocs: number
}

export interface NewPlayListResponse{
  id: string
  name: string
}

export interface PlayListData{
  id: string
  name: string
  coverImageUrl?: string | null
}

export interface PlaylistSong {
  _id: string;
  title: string;
  artistName: string;
  album: string;
  duration: string;
  coverImageUrl: string;
  dateAdded?: string;
}

export interface PlaylistDetailsResponse {
  _id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  songs: SongDetails[];
}

export interface Song{
    id: string
    title: string
    artist: string
    duration: number
    coverImageUrl: string
}

export interface Artist {
  id: string 
  name: string;
  profilePicture: string
}

export interface Album{
  id: string;
  title: string;
  artist: string; 
  coverImageUrl: string;
}

export interface TopResult {
  id: string;
  title: string;
  artist: string;
  coverImageUrl: string;
}

export interface SearchResponse{
    topResult: TopResult
    albums: Album[]
    songs: Song[];
    artists: Artist[];
    users: Artist[]
}

export interface Follow {
  id: string;
  name: string;
  profilePicture: string;
}

export interface PlayList{
  id: string;
  name: string;
  coverImage: string;
}

export interface User{
  id: string;
  name: string;
  profilePicture: string;
  followingCount: number;
  playListCount: number;
}

export interface UserProfileResponseDTO {
  user: User;
  followingArtists: Follow[];
  playlists: PlayList[];
}

export interface Friends{
  id:string
  name:string
  status: boolean
  profilePicture: string
}

export interface FriendsResponse{
  friends: Friends[]
}

export interface LikedSong{
  id: string
  title: string
  coverImage: string
  duration: number
  artistName: string
  likedAt: string
}

export interface LikedSondResponse{
  songs: LikedSong[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}