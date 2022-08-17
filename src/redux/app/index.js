import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).data
  : {
    name: "",
    email: "",
  };
const initialState = {
  user,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const getUserData = (state) => state.app.user;

export const { setUserData } = appReducer.actions;

export default appReducer.reducer;
