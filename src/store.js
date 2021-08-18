import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux';
import rootReducer from './auth/slices/index';

export default configureStore({
  reducer: rootReducer,
  devTools:true,
});
