import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./Protected-route";
import { ROLES } from "../core/types/roles";

const DashboardLayout = lazy(() => import("@/features/artist/pages/layout/DashboardLayout"));

const ArtistDashboard = lazy(() => import("@/features/artist/pages/dashboard/Dashboard.artist"));
const ProfilePageArtist = lazy(() => import("@/features/artist/pages/profile/Profile.artist"));
const EditArtistProfile = lazy(() => import("@/features/artist/pages/profile/Edit.profile"));
const EditPassword = lazy(() => import("@/features/artist/pages/profile/Change.password"));

const UploadTrack = lazy(() => import("@/features/artist/pages/songs/UploadTrack"));
const SongList = lazy(() => import("@/features/artist/pages/songs/SongList"));
const ArtistSongDetail = lazy(() => import("@/features/artist/pages/songs/SongDetails"));

const CreateAlbumRaw = lazy(() => import("@/features/artist/pages/albums/createAlbum"));
const Albums = lazy(() => import("@/features/artist/pages/albums/albumListing"));
const AlbumDetailsPage = lazy(() => import("@/features/artist/pages/albums/albumDetails"));

const ArtistFans = lazy(() => import("@/features/artist/pages/fans/ArtistFansPageListing"));
const ArtistRevenue = lazy(() => import("@/features/artist/pages/revenue/ArtistRevenue"));

export const artistRoutes = (
  <Route element={<ProtectedRoute requiredRole={ROLES.ARTIST}><DashboardLayout /></ProtectedRoute>}>
    <Route path="/artist/dashboard" element={<ArtistDashboard />} />
    <Route path="/artist/profile" element={<ProfilePageArtist />} />
    <Route path="/artist/edit-profile" element={<EditArtistProfile />} />
    <Route path="/artist/change-password" element={<EditPassword />} />

    <Route path="/artist/uploadTrack" element={<UploadTrack />} />
    <Route path="/artist/songs" element={<SongList />} />
    <Route path="/artist/edit-song/:songId" element={<UploadTrack />} />
    <Route path="/artist/song-details/:songId" element={<ArtistSongDetail />} />

    <Route path="/artist/createAlbum" element={<CreateAlbumRaw />} />
    <Route path="/artist/albums" element={<Albums />} />
    <Route path="/artist/edit-album/:albumId" element={<CreateAlbumRaw />} />
    <Route path="/artist/album-details/:albumId" element={<AlbumDetailsPage />} />

    <Route path="/artist/fans" element={<ArtistFans />} />
    <Route path="/artist/revenue" element={<ArtistRevenue />} />
  </Route>
);