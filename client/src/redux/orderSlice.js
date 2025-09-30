import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "trans",
  initialState: {
    value: [],
  },
  reducers: {
    transSync: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { transSync } = orderSlice.actions;

export default orderSlice.reducer;
