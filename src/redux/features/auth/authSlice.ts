// redux/features/auth/authSlice.ts
import { IAuthType } from "@/@types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState: IAuthType = {
    token: null,
    expiresAt: null,
    id: null,
    email: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IAuthType>) {
            const { token, id, email } = action.payload;
            state.token = token;
            state.id = id;
            state.email = email;
            
            const expiresIn = 12 * 60 * 60 * 1000;
            state.expiresAt = Date.now() + expiresIn;
            
            // Store token and expiration in localStorage
            if (token) {
                localStorage.setItem("tokenforauthuser", token);
            }
            localStorage.setItem("expiresAtuserstoken", (Date.now() + expiresIn).toString());
            
            // Store user info if needed
            if (id && email) {
                localStorage.setItem("authUser", JSON.stringify({ id, email }));
            }
        },
        clearAuth(state) {
            state.token = null;
            state.id = null;
            state.email = null;
            state.expiresAt = null;
            localStorage.removeItem("tokenforauthuser");
            localStorage.removeItem("expiresAtuserstoken");
            localStorage.removeItem("authUser");
        },
        checkTokenExpiry(state) {
            const expiresAt = Number(localStorage.getItem("expiresAtuserstoken"));
            if (expiresAt && Date.now() > expiresAt) {
                state.token = null;
                state.id = null;
                state.email = null;
                state.expiresAt = null;
                localStorage.removeItem("tokenforauthuser");
                localStorage.removeItem("expiresAtuserstoken");
                localStorage.removeItem("authUser");
                toast.error("Session Expired! Please sign in again!");
            } else if (expiresAt) {
                // Update expiration time
                const expiresIn = expiresAt - Date.now();
                localStorage.setItem("expiresAtuserstoken", (Date.now() + expiresIn).toString());
            }
        },
        initializeAuth(state) {
            const token = localStorage.getItem("tokenforauthuser");
            const expiresAt = localStorage.getItem("expiresAtuserstoken");
            const userStr = localStorage.getItem("authUser");
            
            if (token && expiresAt && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    state.token = token;
                    state.id = user.id;
                    state.email = user.email;
                    state.expiresAt = Number(expiresAt);
                } catch (error) {
                    console.error("Failed to parse user data from localStorage", error);
                    localStorage.removeItem("tokenforauthuser");
                    localStorage.removeItem("expiresAtuserstoken");
                    localStorage.removeItem("authUser");
                }
            }
        }
    }
});

export const selectAuth = (state: { auth: IAuthType }) => state.auth;
export const { setAuth, clearAuth, checkTokenExpiry, initializeAuth } = authSlice.actions;
export default authSlice.reducer;