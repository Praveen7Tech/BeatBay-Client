export const API_ROUTES = {
  SIGNUP: '/user/signup',
  VERIFY_OTP: '/user/verify-otp',
  RESEND_OTP: '/user/resend-otp',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  VERIFY_EMAIL: '/user/verify-email',
  RESET_PASSWORD: '/user/reset-password',
  GOOGLE_SIGNUP: '/user/google-signup',
  AUTH_STATUS: '/user/auth-status'
};

export const API_ROUTE_ADMIN = {
  LOGIN: "/admin/login",
  LOGOUT: '/admin/logout'
}

export const API_ROUTE_ARTIST = {
  SIGNUP: '/artist/signup',
  VERIFY_OTP: '/artist/verify-otp',
  RESEND_OTP: '/artist/resend-otp',
  LOGIN: '/artist/login',
  LOGOUT: '/artist/logout',
  EDIT_PROFILE: '/artist/edit-profile',
  GOOGLE_SIGNUP: '/artist/google-signup',
  VERIFY_EMAIL: '/artist/verify-email',
  RESET_PASSWORD: '/artist/reset-password',
  CHANGE_PASSWORD: '/artist/change-password',

  UPLOAD_SONG: '/artist/upload-song',
  FETCH_SONGS: '/artist/fetch-songs',
  CREATE_ALBUM: '/artist/create-album',
  FETCH_ALBUMS: '/artist/fetch-albums',
  EDIT_SONG: '/artist/edit-song',
  GET_SONG_BY_ID: '/artist/get-song',
  GET_ALBUM_BY_ID: '/artist/get-album',
  EDIT_ALBUM: '/artist/edit-album',
  DELETE_SONG: '/artist/delete-song',
  DELETE_ALBUM: '/artist/delete-album'
}

export const API_ROUTES_USER ={
  EDIT_PROFILE: '/user/edit-profile',
  CHANGE_PASSWORD: '/user/change-password',
  FETCH_SONGS: '/user/fetch-songs',
  FETCH_ALBUMS: '/user/fetch-albums',
  SONG_DETAILS: '/user/song-details',
  ALBUM_DETAILS: '/user/album-details',
  ARTIST_DETAILS: '/user/artist-details',
  IS_FOLLOWING: '/user/is-following',
  FOLLOW: '/user/follow',
  FOLLOWING: '/user/following',
  CREATE_PLAYLIST: '/user/create-playlist',
  ADD_TO_PLAYLIST: '/user/addTo-playList',
  GET_PLAYLIST_BY_ID: '/user/get-playlist',
  GET_USER_PLAYLIST: '/user/get-user-playlist',
  SEARCH_SONGS: '/user/searchSong',
  EDIT_PLAYLIST: '/user/edit-playList'
}
