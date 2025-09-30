import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    value: [],
  },
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
    deleteProduct: (state, action) => {
      const userIdToDelete = action.payload;
      const updatedValue = state.value.filter(
        (user) => user.id !== userIdToDelete
      );
      state.value = updatedValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData, deleteProduct } = bookSlice.actions;

export default bookSlice.reducer;
