import { createSlice } from "@reduxjs/toolkit";

export const productAdminSlice = createSlice({
  name: "productsAdmin",
  initialState: {
    value: [],
  },
  reducers: {
    syncDataProductAdmin: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncDataProductAdmin } = productAdminSlice.actions;

export default productAdminSlice.reducer;
