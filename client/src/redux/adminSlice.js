import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    username: "",
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
    },
    logoutAdmin: (state) => {
      state.value.id = "";
      state.value.username = "";
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
