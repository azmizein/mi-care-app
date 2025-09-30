import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    firstName: "",
  },
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    loginDoctor: (state, action) => {
      state.value.id = action.payload.id;
      state.value.firstName = action.payload.firstName;
    },
    logoutDoctor: (state) => {
      state.value.id = 0;
      state.value.firstName = "";
    },
  },
});

export const { loginDoctor, logoutDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
