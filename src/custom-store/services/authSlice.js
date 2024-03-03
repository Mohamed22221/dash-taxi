import { createSlice } from "@reduxjs/toolkit";

const initialState = { access_token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          access_token: action.payload.access_token,
        })
      );
      state.access_token = action.payload.access_token;
    },
    logOut(state, action) {
      sessionStorage.clear();
      state.access_token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
