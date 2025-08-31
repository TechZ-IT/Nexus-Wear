// redux/features/auth/authSlice.ts
import { IAuthType } from "@/@types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState: IAuthType = {
  token: null,
  expiresAt: null,
  id: null,
  email: null,
  image: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<IAuthType>) {
      const { token, id, email, image } = action.payload;
      state.token = token;
      state.id = id;
      state.email = email;
      state.image = image;
      
      const expiresIn = 12 * 60 * 60 * 1000; // 12 hours
      state.expiresAt = Date.now() + expiresIn;

      // Store in localStorage
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("tokenforauthuser", token);
        }
        localStorage.setItem("expiresAtuserstoken", state.expiresAt.toString());
        
        if (id && email) {
          localStorage.setItem("authUser", JSON.stringify({ id, email, image }));
        }
      }
    },
    clearAuth(state) {
      state.token = null;
      state.id = null;
      state.email = null;
      state.image = null;
      state.expiresAt = null;
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("tokenforauthuser");
        localStorage.removeItem("expiresAtuserstoken");
        localStorage.removeItem("authUser");
      }
    },
    checkTokenExpiry(state) {
      if (typeof window === "undefined") return;
      
      const expiresAt = Number(localStorage.getItem("expiresAtuserstoken"));
      if (expiresAt && Date.now() > expiresAt) {
        state.token = null;
        state.id = null;
        state.email = null;
        state.image = null;
        state.expiresAt = null;
        
        localStorage.removeItem("tokenforauthuser");
        localStorage.removeItem("expiresAtuserstoken");
        localStorage.removeItem("authUser");
        
        toast.error("Session Expired! Please sign in again!");
      }
    },
    initializeAuth(state) {
      if (typeof window === "undefined") return;
      
      const token = localStorage.getItem("tokenforauthuser");
      const expiresAt = localStorage.getItem("expiresAtuserstoken");
      const userStr = localStorage.getItem("authUser");

      if (token && expiresAt && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.token = token;
          state.id = user.id;
          state.email = user.email;
          state.image = user.image || null;
          state.expiresAt = Number(expiresAt);
        } catch (error) {
          console.error("Failed to parse user data from localStorage", error);
          localStorage.removeItem("tokenforauthuser");
          localStorage.removeItem("expiresAtuserstoken");
          localStorage.removeItem("authUser");
        }
      }
    },
  },
});

export const selectAuth = (state: { auth: IAuthType }) => state.auth;
export const { setAuth, clearAuth, checkTokenExpiry, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;