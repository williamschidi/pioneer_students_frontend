import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      state.isAuth = true;
    },
    clearUser: (state) => {
      state.username = null;
      state.isAuth = false;
    },
  },
});

export const { setUsername, clearUser } = userSlice.actions;
export default userSlice.reducer;
