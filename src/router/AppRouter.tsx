import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from '../features/auth/pages/Signup';
import VerifyOTPPage from '../features/auth/pages/VerifyOTP';
import LoginPage from '../features/auth/pages/Login';
//import HomePage from '../pages/Home';
import ForgotPassword from '../features/auth/pages/Forgot-passowrd';
import ResetPassword from '../features/auth/pages/reset-password';
// import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Protected-route';
import PublicOnlyRoute from './Public-route';
import { ROLES } from '../core/types/roles';
import NotFound from '../pages/page-notFound';
import Unauthorized from '../pages/unAutharized-page';
import AdminLogin from '../features/admin/pages/auth/Login';
import AdminDashboard from '../features/admin/pages/dashboard/dashBoard'; 
import SignupPageArtist from '../features/artist/pages/auth/Signup.artist';
import VerifyOTPartist from '../features/artist/pages/auth/VerifyOTP.artist';
import ArtistDashboard from '../features/artist/pages/dashboard/Dashboard.artist'; 
import SignInPageArtist from '../features/artist/pages/auth/SignIn.artist';
import ProfilePage from '@/features/user/pages/profile/ProfilePage'; 
import UserLayout from '@/features/user/pages/layout/layout';
import HomeContent from '@/features/user/pages/home/Home'; 
import DashboardLayout from '@/features/artist/pages/layout/DashboardLayout';
import ProfilePageArtist from '@/features/artist/pages/profile/Profile.artist';
import { EditArtistProfile } from '@/features/artist/pages/profile/Edit.profile'; 
import ForgotPasswordArtist from '@/features/artist/pages/auth/ForgotPassword.artist';
import ResetPasswordArtist from '@/features/artist/pages/auth/Reset-password';
import LandingPage from '@/features/artist/pages/landing page/LandingPage';
import { EditPassword } from '@/features/artist/pages/profile/Change.password';
import UploadTrack from '@/features/artist/pages/songs/UploadTrack';
import SongList from '@/features/artist/pages/songs/SongList';
import CreateAlbumRaw from '@/features/artist/pages/albums/createAlbum';
import Albums from '@/features/artist/pages/albums/albumListing';
import SongDetail from '@/features/user/pages/song/songDetails';
import AlbumDetail from '@/features/user/pages/album/albumDetails';
import ArtistDetail from '@/features/user/pages/artist/artistDetals';
import PlaylistDetail from '@/features/user/pages/playlist/playList';
import ArtistSongDetail from '@/features/artist/pages/songs/SongDetails';
import AlbumDetailsPage from '@/features/artist/pages/albums/albumDetails';
import AdminLayout from '@/features/admin/pages/Layout/adminLayout';
import { UserListing } from '@/features/admin/pages/users/userListing';
import { UserDetails } from '@/features/admin/pages/users/userDetails';
import { ArtistListing } from '@/features/admin/pages/artists/artistListing';
import { ArtistDetails } from '@/features/admin/pages/artists/artistDetails';
import Playlists from '@/features/user/pages/playlist/playList-listing';
import Following from '@/features/user/pages/following/Following';
import Discover from '@/features/user/pages/discover/Discover';
import BrowseSection from '@/features/user/pages/discover/BrowseSection';
import UserProfile from '@/features/user/pages/users-profile/ProfileDetails';
import Room from '@/features/user/pages/private-room/PrivateRoom';
import ExplorePage from '@/features/user/pages/home/allSongs';
import FollowingListing from '@/features/user/pages/following/Following';
import AdminSongs from '@/features/admin/pages/songs/song.listing';
import AdminSongDetail from '@/features/admin/pages/songs/songDetails';
import AdminAlbums from '@/features/admin/pages/album/adminAlbumListing';
import AdminAlbumDetail from '@/features/admin/pages/album/adminAlbumDetails';
import LikedSongs from '@/features/user/pages/favorites/LikedSong';
import { Toaster } from '@/components/ui/sonner';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<PublicOnlyRoute />}>
          {/* User */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />

          {/* Admin */}
          <Route path='/admin' element={<AdminLogin/>} />

          {/* Artist */}
          <Route path='/artist/signup' element={<SignupPageArtist/>} />
          <Route path='/artist/verify-otp' element={<VerifyOTPartist/>} />
          <Route path='/artist/login' element={<SignInPageArtist/>} />
          <Route path='/artist/forgot-password' element={<ForgotPasswordArtist/>}/>
          <Route path='/artist/reset-password' element={<ResetPasswordArtist/>}/>

          <Route path='/artist' element={<LandingPage/>}/>
        </Route>

        {/* USER ROUTES WITH PERSISTENT LAYOUT */}
        <Route element={<ProtectedRoute requiredRole={ROLES.USER}><UserLayout /></ProtectedRoute>}>
          <Route path="/home" element={<HomeContent/>} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path='/song/:songId' element={<SongDetail/>}/>
          <Route path='/album/:albumId' element={<AlbumDetail/>}/>

          <Route path='/artist/:artistId' element={<ArtistDetail/>}/>
          <Route path='/playList/:playlistId' element={<PlaylistDetail/>}/>
          <Route path='/playLists' element={<Playlists/>}/>
          <Route path='/:userId/playlists' element={<Playlists/>}/>
          <Route path='/following' element={<Following/>}/>

          <Route path='/search/:query' element={<Discover/>}/>
          <Route path='/browse' element={<BrowseSection/>}/>
          <Route path='/profile/:userId' element={<UserProfile/>}/>

          <Route path='/private-room' element={<Room/>}/>

          <Route path='/showall' element={<ExplorePage/>}/>
          <Route path="/connections/:type" element={<FollowingListing />} />
          <Route path='/:userId/:type' element={<FollowingListing/>}/>

          <Route path='/liked-songs' element={<LikedSongs/>}/>
        </Route>

        {/* admin routes */}
        <Route element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminLayout/> </ProtectedRoute>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/users' element={<UserListing/>}/>
          <Route path='/admin/users/:userId' element={<UserDetails/>}/>

          <Route path='/admin/artists' element={<ArtistListing/>}/>
          <Route path='/admin/artists/:artistId' element={<ArtistDetails/>}/>

          <Route path='/admin/songs' element={<AdminSongs/>}/>
          <Route path='/admin/songs/:id' element={<AdminSongDetail/>}/>
          <Route path='/admin/albums' element={<AdminAlbums/>}/>
          <Route path='/admin/album/:id' element={<AdminAlbumDetail/>}/>
        </Route>

        {/* artist routes */}
        <Route element={<ProtectedRoute requiredRole={ROLES.ARTIST}><DashboardLayout/></ProtectedRoute>}>
          <Route path='/artist/dashboard' element={<ArtistDashboard/>}/>
          <Route path='/artist/profile' element={<ProfilePageArtist/>}/>
          <Route path='/artist/edit-profile' element={<EditArtistProfile/>}/>
          <Route path='/artist/change-password' element={<EditPassword/>}/>
          
          <Route path='/artist/uploadTrack' element={<UploadTrack/>}/>
          <Route path='/artist/songs' element={<SongList/>}/>
          <Route path='/artist/edit-song/:songId' element={<UploadTrack/>}/>
          <Route path='/artist/song-details/:songId' element={<ArtistSongDetail/>}/>

          <Route path='/artist/createAlbum' element={<CreateAlbumRaw/>}/>
          <Route path='/artist/albums' element={<Albums/>}/>
          <Route path='/artist/edit-album/:albumId' element={<CreateAlbumRaw/>}/>
          <Route path='/artist/album-details/:albumId' element={<AlbumDetailsPage/>}/>
        </Route>
   
        {/* un authorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      {/* <Toaster/> */}
      <Toaster />
      </BrowserRouter>
  );
};


export default AppRouter;
