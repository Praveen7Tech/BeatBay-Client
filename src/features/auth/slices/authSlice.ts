import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name:string
  email: string;
  bio?:string
  role: string;
  profilePicture?:string
  followingCount?: number
}

export interface AuthState {
  user: Partial<User> | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  initialHydrationComplete: boolean;
}

const initialState: AuthState = {
  user: null, 
  accessToken: null,
  loading: false,
  error: null,
  initialHydrationComplete: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setAccessToken(state, action:PayloadAction<string>){
      state.accessToken = action.payload
    },
    loginSuccess(state, action: PayloadAction<{user:User; accessToken: string}>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.accessToken = null;
      state.error = action.payload;
      state.initialHydrationComplete = true
    },
    update(state, action: PayloadAction<{user:User}>){
      state.user = action.payload.user
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.loading= false
    },
    setAuthLoading(state) {
      state.loading = true;
      state.error = null
    },
    setAuthFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload
    },
    completeInitialHydration(state, action:PayloadAction<{user: User; accessToken: string} | null>) {
      if(action.payload){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }else{
        state.user = null
        state.accessToken = null
      }
      state.initialHydrationComplete = true
    }
  }

});

export const { loginSuccess, loginFailure, logout, setAuthLoading, setAuthFailure, completeInitialHydration, setAccessToken, update } = authSlice.actions;
export default authSlice.reducer;

