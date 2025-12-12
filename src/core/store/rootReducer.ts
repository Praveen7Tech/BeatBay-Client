import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/slices/authSlice';
import searchReducer from '../../features/user/slice/searchSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer
});

export default rootReducer;
