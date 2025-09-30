import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
