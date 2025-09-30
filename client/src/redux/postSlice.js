import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    value: [],
  },
  reducers: {
    syncDataPost: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncDataPost } = postSlice.actions;

export default postSlice.reducer;
