export const API_ROUTES = {
  SIGNUP: '/user/signup',
  VERIFY_OTP: '/user/verify-otp',
  RESEND_OTP: '/user/resend-otp',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  VERIFY_EMAIL: '/user/verify-email',
  RESET_PASSWORD: '/user/reset-password',
  GOOGLE_SIGNUP: '/user/google-signup',
  AUTH_STATUS: '/user/auth-status',
  AUTH_CHECK: '/auth-status',
  UNAUTHARIZED : '/unauthorized'
};

export const API_ROUTE_ADMIN = {
  LOGIN: "/admin/login",
  LOGOUT: '/admin/logout',

  FETCH_USERS: '/admin/fetch-allusers',
  GET_USER_BYID: '/admin/get-userById',
  BLOCK_USER: '/admin/block-user',
  UN_BLOCK_USER: '/admin/unBlock-user',

  FETCH_ARTIST: '/admin/fetch-allArtist',
  GET_ARTIST_BYID: '/admin/get-artistById',
  BLOCK_ARTIST: '/admin/block-artist',
  UN_BLOCK_ARTIST: '/admin/unBlock-artist',

  GET_DASHBOARD_DATA:'/admin/get-dashboard-data',
  GET_SONGS: '/admin/get-allsongs',
  GET_SONG_BYID:'/admin/get-songbyid/:id',
  TOGGLE_STATUS: '/admin/song/:id/status',

  GET_ALBUMS: '/admin/get-allalbums',
  GET_ALBUM_BYID: '/admin/get-albumbyid/:id',
  TOGGLE_ALBUM_STATUS:'/admin/album/:id/status',

  DEMOGRAPHICS: '/admin/demographics',
  GET_DASHBOARD_ENTITY_DATA: '/admin/dashboard-entity'
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
  DELETE_ALBUM: '/artist/delete-album',

  GET_SONGUPLOAD_URLS: '/artist/song/upload-urls',

  GET_FANS: '/artist/get-allfans',
  DASHBOARD: '/artist/dashboard',
  GROWTH_ANALYTICS: '/artist/growth-analytics',

  ONBOARDING: '/artist/payouts/onboard',
  GET_REVENUE: '/artist/get-revenue'
}

export const API_ROUTES_USER ={
  EDIT_PROFILE: '/user/edit-profile',
  CHANGE_PASSWORD: '/user/change-password',
  FETCH_SONGS: '/user/fetch-songs',
  FETCH_ALBUMS: '/user/fetch-albums',
  SONG_DETAILS: '/user/song-details',
  SONG_HYDRATION: '/user/song-hydration',
  ALBUM_DETAILS: '/user/album-details',
  ARTIST_DETAILS: '/user/artist-details',
  IS_FOLLOWING: '/user/is-following',
  FOLLOW: '/user/follow',
  FOLLOWING: '/user/following',
  FOLLOWERS: '/user/followers',
  CREATE_PLAYLIST: '/user/create-playlist',
  ADD_TO_PLAYLIST: '/user/addTo-playList',
  GET_PLAYLIST_BY_ID: '/user/get-playlist',
  GET_USER_PLAYLIST: '/user/get-user-playlist',
  SEARCH_SONGS: '/user/searchSong',
  EDIT_PLAYLIST: '/user/edit-playList',
  DELETE_PLAYLIST:'/user/playlist/:playlistId/delete',
  SEARCH: '/user/search',
  USER_DETAILS: '/user/user-details',
  FRIENDS: '/user/friends',
  SONG_LIKE:'/user/song/:id/toggle-like',
  LIKED_SONGS: '/user/liked-songs',
  REMOVE_FROM_PLAYLIST: '/user/playlist/:playlistId/song/:songId',

  SUBSCRIPTION_CHECKOUT: '/user/subscription/checkout',
  SUBSCRIPTION: '/user/subscription',
  AUTO_SUBSCRIPTION_TOGGLE: '/user/auto-subscription-toggle',
  CANCELL_SUBSCRIPTION: '/user/subscription/cancel',
  SUBSCRIPTION_HISTORY: '/user/subscription/history',

  TRACK_PLAY: '/user/song/track-play'
}
