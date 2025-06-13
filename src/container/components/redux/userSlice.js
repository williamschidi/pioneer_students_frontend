import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchedMembers: {},
  username: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      state.isAuth = true;
    },
    setSearchedMembers: (state, action) => {
      state.searchedMembers = action.payload;
    },
    resetSearchedMembers: (state) => {
      state.searchedMembers = {};
    },
    clearUser: (state) => {
      state.username = null;
      state.isAuth = false;
    },
  },
});

export const {
  setUsername,
  clearUser,
  resetSearchedMembers,
  setSearchedMembers,
} = userSlice.actions;
export default userSlice.reducer;
