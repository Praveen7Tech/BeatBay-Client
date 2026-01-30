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

export interface SearchSongResponse {
  id: string;
  title: string;
  coverImageUrl: string;
  artistName: string;
  duration: number;
  audioUrl: string;
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
  likedAt?:string
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
    createdAt: string
}


export interface SongDehydration{
  songs: SongDetails
}

export interface AlbumResponse {
   id: string;
   title: string;
   artistName: string;
   coverImageUrl: string;
   description: string;
   releaseYear: string
   songs: SongDetails[]
}

export interface AlbumResponseRaw {
  id: string;
  title: string;
  coverImageUrl: string;
}

export interface SongResponseData {
  id: string;
  title: string;
  coverImageUrl: string;
  artistName: string;
}

export interface ArtistDetailsResponse {
  id: string;
  name: string;
  profilePicture: string;
  bio: string;
  albums: AlbumResponseRaw[];
  songs: SongResponseData[];
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

export interface PlayListsResposne{
  playlists: PlayListData[];
  totalPages: number
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
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  totalDuration: number
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
    songs: SongDetails[];
    artists: Artist[];
    users: Artist[]
}

export interface Follow {
  id: string;
  name: string;
  profilePicture: string;
  role: string
}

export interface PlayList{
  id: string;
  name: string;
  coverImageUrl: string;
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
  followingUsers:Follow[]
  playlists: PlayList[];
  followers: Follow[]
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
  coverImageUrl: string
  duration: number
  artistName: string
  likedAt: string
}

export interface LikedSondResponse{
  songs: SongDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubscriptionResponse{
    id:string
    planName: string
    amount: number
    currency: string
    nextBillingDate: Date
    autoReniewEnable: boolean
    cardInfo: string
    subscriptionId: string
    status: string
}

export interface PaymentHistory{
    id: string
    date: Date
    amount: number
    currency: string
    status: string
    receiptUrl: string
}