import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const statusSlice = createSlice({
  name: "statusSlice",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
