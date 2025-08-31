import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@/lib/getStorage"; // Make sure to import your storage

// Create persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};

// Create persisted auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer, // Use the persisted reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create and export the persistor
export const persistor = persistStore(store);