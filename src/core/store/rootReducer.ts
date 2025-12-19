import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slices/authSlice';
import searchReducer from '../../features/user/slice/searchSlice'
import privateRoomReducer from '../../features/user/slice/privateRoomSlice'
import inviteStateReducer from '../../features/user/slice/inviteState.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  privateRoom: privateRoomReducer,
  inviteState: inviteStateReducer
});

export default rootReducer;
