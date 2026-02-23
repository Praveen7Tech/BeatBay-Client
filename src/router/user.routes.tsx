import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./Protected-route";
import { ROLES } from "../core/types/roles";

const UserLayout = lazy(() => import("@/features/user/pages/layout/layout"));
const HomeContent = lazy(() => import("@/features/user/pages/home/Home"));
const ProfilePage = lazy(() => import("@/features/user/pages/profile/ProfilePage"));

const SongDetail = lazy(() => import("@/features/user/pages/song/songDetails"));
const AlbumDetail = lazy(() => import("@/features/user/pages/album/albumDetails"));
const ArtistDetail = lazy(() => import("@/features/user/pages/artist/artistDetals"));

const PlaylistDetail = lazy(() => import("@/features/user/pages/playlist/playList"));
const Playlists = lazy(() => import("@/features/user/pages/playlist/playList-listing"));

const Following = lazy(() => import("@/features/user/pages/following/Following"));
const FollowingListing = lazy(() => import("@/features/user/pages/following/Following"));

const Discover = lazy(() => import("@/features/user/pages/discover/Discover"));
const BrowseSection = lazy(() => import("@/features/user/pages/discover/BrowseSection"));

const UserProfile = lazy(() => import("@/features/user/pages/users-profile/ProfileDetails"));
const Room = lazy(() => import("@/features/user/pages/private-room/PrivateRoom"));
const ExplorePage = lazy(() => import("@/features/user/pages/home/allSongs"));

const LikedSongs = lazy(() => import("@/features/user/pages/favorites/LikedSong"));

const Premium = lazy(() => import("@/features/user/pages/premium/Premium"));
const SubscriptionSuccess = lazy(() => import("@/features/user/pages/premium/SubscriptionSuccess"));
const SubscriptionError = lazy(() => import("@/features/user/pages/premium/SubscriptionError"));
const PremiumDetails = lazy(() => import("@/features/user/pages/premium/PremiumDetails"));

export const userRoutes = (
  <Route element={<ProtectedRoute requiredRole={ROLES.USER}><UserLayout /></ProtectedRoute>}>
    <Route path="/home" element={<HomeContent />} />
    <Route path="/profile" element={<ProfilePage />} />

    <Route path="/song/:songId" element={<SongDetail />} />
    <Route path="/album/:albumId" element={<AlbumDetail />} />
    <Route path="/artist/:artistId" element={<ArtistDetail />} />

    <Route path="/playList/:playlistId" element={<PlaylistDetail />} />
    <Route path="/playLists" element={<Playlists />} />
    <Route path="/:userId/playlists" element={<Playlists />} />

    <Route path="/following" element={<Following />} />
    <Route path="/connections/:type" element={<FollowingListing />} />
    <Route path="/:userId/:type" element={<FollowingListing />} />

    <Route path="/search/:query" element={<Discover />} />
    <Route path="/browse" element={<BrowseSection />} />

    <Route path="/profile/:userId" element={<UserProfile />} />

    <Route path="/private-room" element={<Room />} />
    <Route path="/showall" element={<ExplorePage />} />

    <Route path="/liked-songs" element={<LikedSongs />} />

    <Route path="/subscription" element={<Premium />} />
    <Route path="/payment-success" element={<SubscriptionSuccess />} />
    <Route path="/payment-failed" element={<SubscriptionError />} />
    <Route path="/premium/details" element={<PremiumDetails />} />
  </Route>
);