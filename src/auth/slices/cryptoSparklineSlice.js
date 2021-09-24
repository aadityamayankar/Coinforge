import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const cryptoSparklineSlice = createSlice({
  name: 'cryptoSparklineData',
  initialState,
  reducers: {
    initCryptoSparklineData: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setCryptoSparklineData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setCryptoSparklineDataFailure: (state, action) => {
      state.error = action.payload ? action.payload : 'Could not connect';
      state.isLoading = false;
    },
    cryptoSparklineComplete: (state) => {
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const { setCryptoSparklineData, setCryptoSparklineDataFailure,initCryptoSparklineData,cryptoSparklineComplete } = cryptoSparklineSlice.actions;
export default cryptoSparklineSlice.reducer;