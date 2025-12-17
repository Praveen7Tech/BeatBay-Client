import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slices/authSlice';
import searchReducer from '../../features/user/slice/searchSlice'
import privateRoomReducer from '../../features/user/slice/privateRoomSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  privateRoom: privateRoomReducer
});

export default rootReducer;
