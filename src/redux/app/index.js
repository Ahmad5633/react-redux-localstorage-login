import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      name: "",
      email: "",
    };
const initialState = {
  user: {
    data: userData,
  },
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserData: (state = 0, action) => {
      state.user = action.payload;
    },
  },
});

export const getUserData = (state) => state.app.user;

export const { setUserData } = appReducer.actions;

export default appReducer.reducer;
