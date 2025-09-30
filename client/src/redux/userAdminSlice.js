import { createSlice } from "@reduxjs/toolkit";

export const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    value: [],
  },
  reducers: {
    syncDataUser: (state, action) => {
      state.value = action.payload;
    },
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      const updatedValue = state.value.filter(
        (user) => user.id !== userIdToDelete
      );
      state.value = updatedValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncDataUser, deleteUser } = userAdminSlice.actions;

export default userAdminSlice.reducer;
