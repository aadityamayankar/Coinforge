import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
  isLoading: false,
};

export const cryptoDataSlice = createSlice({
  name: 'cryptoData',
  initialState,
  reducers: {
    initCryptoData: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setCryptoData: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setCryptoDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? action.payload : 'Could not connect';
    },
    cryptoDataComplete: (state) => {
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const { setCryptoData, setCryptoDataFailure,initCryptoData,cryptoDataComplete } = cryptoDataSlice.actions;
export default cryptoDataSlice.reducer;
