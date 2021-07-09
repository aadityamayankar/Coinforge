import {combineReducers} from "@reduxjs/toolkit";
//import all your reducres
import sampleReducer from "./sampleSlice";

export default combineReducers({
    sample: sampleReducer,
});