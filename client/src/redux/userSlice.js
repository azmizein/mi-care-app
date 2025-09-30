import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    username: "",
    email: "",
    isVerified: "",
    phoneNumber: "",
    age: "",
    address: "",
    images: "",
    cart: 0,
    loan: 0,
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isVerified = action.payload.isVerified;
      state.value.phoneNumber = action.payload.phoneNumber;
      state.value.images = action.payload.images;
      state.value.age = action.payload.age;
      state.value.cart = action.payload.cart;
      state.value.loan = action.payload.loan;
    },
    logout: (state) => {
      state.value.id = 0;
      state.value.username = "";
      state.value.email = "";
      state.value.isVerified = "";
      state.value.phoneNumber = "";
      state.value.address = "";
      state.value.cart = 0;
      state.value.loan = 0;
    },

    setAddress: (state, action) => {
      state.value = action.payload;
    },
    addCart: (state) => {
      state.value.cart += 1;
    },
    delCart: (state) => {
      state.value.cart -= 1;
    },
    CartLoan: (state) => {
      state.value.cart = 0;
    },
    addLoan: (state) => {
      state.value.loan = 1;
    },
    delLoan: (state) => {
      state.value.loan = 0;
    },
  },
});

export const { login, logout, addCart, delCart, CartLoan, addLoan, delLoan } =
  userSlice.actions;

export default userSlice.reducer;
