import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sampleVal: 0
}

export const sampleSlice = createSlice({
    name: 'sample',
    initialState,
    reducers: {
        sampleAction: (state) => {
            state.sampleVal += 1;
        },
    },
});

export const {sampleAction} = sampleSlice.actions;
export default sampleSlice.reducer;