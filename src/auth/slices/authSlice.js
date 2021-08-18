import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },
    authFailure(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload ? action.payload : 'Could not connect';
    },
    setLogout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    authComplete(state) {
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  authPending,
  setCurrentUser,
  authFailure,
  setLogout,
  authComplete,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
