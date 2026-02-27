import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./Protected-route";
import { ROLES } from "../core/types/roles";
import AdminPlatFormRevenue from "@/features/admin/pages/revenue/RevenueDashboard";

const AdminLayout = lazy(() => import("@/features/admin/pages/Layout/adminLayout"));
const AdminDashboard = lazy(() => import("@/features/admin/pages/dashboard/dashBoardNew"));

const UserListing = lazy(()=> import("@/features/admin/pages/users/userListing"))
const UserDetails = lazy(() => import("@/features/admin/pages/users/userDetails"));

const ArtistListing = lazy(() => import("@/features/admin/pages/artists/artistListing"));
const ArtistDetails = lazy(() => import("@/features/admin/pages/artists/artistDetails"));

const AdminSongs = lazy(() => import("@/features/admin/pages/songs/song.listing"));
const AdminSongDetail = lazy(() => import("@/features/admin/pages/songs/songDetails"));

const AdminAlbums = lazy(() => import("@/features/admin/pages/album/adminAlbumListing"));
const AdminAlbumDetail = lazy(() => import("@/features/admin/pages/album/adminAlbumDetails"));

export const adminRoutes = (
  <Route element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminLayout /></ProtectedRoute>}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />

    <Route path="/admin/users" element={<UserListing />} />
    <Route path="/admin/users/:userId" element={<UserDetails />} />

    <Route path="/admin/artists" element={<ArtistListing />} />
    <Route path="/admin/artists/:artistId" element={<ArtistDetails />} />

    <Route path="/admin/songs" element={<AdminSongs />} />
    <Route path="/admin/songs/:id" element={<AdminSongDetail />} />

    <Route path="/admin/albums" element={<AdminAlbums />} />
    <Route path="/admin/album/:id" element={<AdminAlbumDetail />} />

    <Route path='/admin/platform/revenue' element={<AdminPlatFormRevenue/>}/>
  </Route>
);