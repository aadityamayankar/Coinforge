import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isData: false,
  error: null,
};

export const coinDataSlice = createSlice({
  name: 'coinData',
  initialState,
  reducers: {
    setCoinData: (state, action) => {
      state.data = action.payload;
      state.isData = true;
    },
    setCoinDataFailure: (state, action) => {
      state.isData = false;
      state.error = action.payload ? action.payload : 'Could not connect';
    },
  },
});

export const { setCoinData, setCoinDataFailure } = coinDataSlice.actions;
export default coinDataSlice.reducer;