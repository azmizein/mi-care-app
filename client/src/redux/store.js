import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./userSlice";
import bookSlice from "./bookSlice";
import adminSlice from "./adminSlice";
import listSlice from "./listSlice";
import nameSlice from "./nameSlice";
import cartSlice from "./cartSlice";
import loanSlice from "./loanSlice";
import categorySlice from "./categorySlice";
import postSlice from "./postSlice";
import addressSlice from "./addressSlice";
import userAdminSlice from "./userAdminSlice";
import orderSlice from "./orderSlice";
import productAdminSlice from "./productAdminSlice";
import statusSlice from "./statusSlice";
import doctorSlice from "./doctorSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["statusSlice"],
};

const rootReducer = combineReducers({
  userSlice,
  bookSlice,
  adminSlice,
  listSlice,
  nameSlice,
  cartSlice,
  loanSlice,
  categorySlice,
  postSlice,
  addressSlice,
  userAdminSlice,
  orderSlice,
  productAdminSlice,
  statusSlice,
  doctorSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
