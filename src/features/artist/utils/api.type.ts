export interface Data{
  currentPassword: string;
  newPassword: string
}

export interface EditPassResponse{
  message: string
}
export interface UploadResponse {
  message: string
}

export interface FetchSong {
  id: string;
  title: string;
  coverImageUrl: string;
  duration: number;
  createdAt: string;
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
  totalPlays: string;
  songs: InitialAlbumSongs[];
}

export interface Fans{
    id:string
    name:string
    profilePicture:string
    followerdSince: string
}

export interface FansResponse{
    fans: Fans[]
    totalCount: number
    totalPages: number
}
export interface TopPlayedSong {
    songId: string;
    title: string;
    playCount: number;
    coverImageUrl: string;
}

export interface TopPlayedAlbums{
    albumId: string
    title: string
    playCount: number
    coverImageUrl:string
    songs: number
}

export interface ArtistDashboardResponse{
    totalSongs: number
    totalAlbums:number
    totalFans: number
    totalRevenue: number
    topPlayedSongs:TopPlayedSong[];
    topPlayedAlbums:TopPlayedAlbums[]
}

export interface OnboardLinkResponse{
  success: boolean
  link: string
}

export interface FileForUploadUrl {
  field: "cover" | "audio" | "lrc";   
  fileName: string;                   
  mimeType: string;                   
}


export interface GetSongUploadUrlsRequest {
  files: FileForUploadUrl[];
  uploadId?: string;
}


export type UploadField = "cover" | "audio" | "lrc";

export interface UploadUrlItem {
  uploadUrl: string;
  key: string;
}

export interface UploadUrlResponse {
  uploadId: string;
  links: Partial<Record<UploadField, UploadUrlItem>>;
}


export interface UploadSongPayload {
  title: string;
  description?: string;
  genre: string;
  tags: string;
  coverKey?: string;
  audioKey?: string;
  lyricsKey?: string;
}

export interface SongRevenue {
    songId: string;
    songTitle: string; 
    coverImageUrl: string
    playCount: number;
    estimatedRevenue: number;
}

export interface chartData{
    month: string;
    revenue: number;
    streams: number;
}

export interface Summary{
    totalRevenue: number;
    revenueThisMonth: number;
    pendingPayout: number;
    nextPayoutDate: string;
    currency: string
}

export interface PayOuts{
     id: string;
    date: string;
    amount: number;
    status: "completed" | "pending" | "failed";
    method: string;
    reference: string;
}

export interface ArtistRevenueDashboard {
    summary: Summary
    chartData: chartData[]
    songStats: SongRevenue[]
    payOutsHistory: PayOuts[]
    stripeLoginLink: string
}

export interface ArtistGrowthChartData {
  label: string;
  fans: number;
  streams: number;
  revenue: number;
  songs: number;
  albums: number
}

export interface ArtistSongDetails{
    id:string;
    uploadId: string
    title:string
    description:string
    tags: string[];
    genre:string
    coverImageUrl:string;
    audioUrl:string;
    lyricsUrl:string;
    createdAt:Date
    duration: number
    totalPlays: string;
    likes: string
}

export interface SongPerformance {
  label: string;     
  streams: number;
}
