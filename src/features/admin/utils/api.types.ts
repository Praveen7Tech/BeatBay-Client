
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
  followersCount: number
  createdAt: Date;            
  updatedAt: string;            
}

export interface Song{
    id: string;
    title: string
    coverImageUrl: string;
    status: boolean;
    duration: number
}
export interface Album{
    id: string;
    title: string;
    coverImageUrl: string; 
    status: boolean
    createdAt: Date
    songsCount: number
}

export interface ArtistProfileResponse {
  name: string;
  bio: string ;
  profilePicture: string
  status: boolean;
  email: string;
  joinDate: Date;
  followersCount: string

  songs: Song[]
  albums: Album[]
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
  totalPlaylists: number
  message?:string
}

export interface AdminSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImageUrl: string;
  duration: number;
  streams: number;
  status: boolean;
  uploadDate: string;
  genre: string;
  likesCount?:number
}

export interface SongResponse {
  songs: AdminSong[];
  totalCount: number;
  totalPages: number;
}

export interface DemographicsResponse{
    entity: string
    range:string
    data: DemoGraphics[]
    totalDocs: number
}

export interface DemoGraphics{
    date: string
    total: number
}

export interface EntityItem{
    label: string
    count: number
}

export interface EntityBreakDownResponse{
    users: EntityItem[]
    artists: EntityItem[]
    songs: EntityItem[]
    albums:EntityItem[]
    playlists: EntityItem[]
}

export interface TopArtist {
  rank: number;
  artistId: string;
  name: string;
  profilePicture: string | null;
  revenue: number;       // in USD
  streams: number;       // total streams
}

export interface TopSong {
  rank: number;
  songId: string;
  title: string;
  image: string; 
  streams: number;
  revenue: number;
}

export interface AdminRevenueDashboard {
  stats: {
    totalRevenue: number
    thisMonthRevenue: number
    thisYearRevenue: number
    nextPayoutDate: Date
  }
  topArtists: TopArtist[]
  topSongs: TopSong[]
}

export interface AdminRevenueChartItem {
  label: string;
  revenue: number;
}

export interface AdminPayoutHistory {
  id: string;
  date: string;
  artist: string;
  amount: number;
  status: "completed" | "failed";
  method: string;
}

export interface AdminPayoutPagination {
  items: AdminPayoutHistory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}