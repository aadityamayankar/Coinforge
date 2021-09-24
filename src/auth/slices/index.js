import {combineReducers} from "@reduxjs/toolkit";
//import all your reducres
import authSlice from './authSlice';
import cryptoDataSlice from './cryptoDataSlice';
import cryptoSparklineSlice from './cryptoSparklineSlice';
import coinDataSlice from './coinDataSlice';

export default combineReducers({
    auth:authSlice,
    cryptoData:cryptoDataSlice,
    cryptoSparklineData:cryptoSparklineSlice,
    coinData:coinDataSlice
});