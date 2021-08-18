import {combineReducers} from "@reduxjs/toolkit";
//import all your reducres
import authSlice from './authSlice';

export default combineReducers({
    auth:authSlice,
});