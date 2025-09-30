import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "category",
  value: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    syncCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncCategory } = categorySlice.actions;

export default categorySlice.reducer;
