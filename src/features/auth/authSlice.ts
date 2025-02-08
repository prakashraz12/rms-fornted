import {
  ACCESS_TOKEN_KEY,
  REMEMBER_ME_KEY,
  ResTaurant_INFO_KEY,
  roleKeys,
  USER_INFO_kEY,
} from "@/keys";
import { decryptData, encryptData } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  role: string | null;
  restaurantInfo: any;
  isAuthenticated: boolean;
  isRememberMe: boolean;
}

const initialState: AuthState = {
  role: localStorage?.getItem(roleKeys)
    ? decryptData(localStorage.getItem(roleKeys) as string)
    : null,
  user: localStorage?.getItem(USER_INFO_kEY)
    ? JSON.parse(localStorage.getItem(USER_INFO_kEY) as string)
    : null,
  restaurantInfo: localStorage?.getItem(ResTaurant_INFO_KEY)
    ? JSON.parse(localStorage.getItem(ResTaurant_INFO_KEY) as string)
    : null,
  isAuthenticated: localStorage.getItem(ACCESS_TOKEN_KEY) ? true : false,
  isRememberMe: localStorage.getItem(REMEMBER_ME_KEY)
    ? JSON.parse(localStorage.getItem(REMEMBER_ME_KEY) as string)
    : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.isAuthenticated = false;
      state.restaurantInfo = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(ResTaurant_INFO_KEY);
      if (!state.isRememberMe) {
        state.user = null;
        state.role = null;
        localStorage.removeItem(USER_INFO_kEY);
        localStorage.removeItem(REMEMBER_ME_KEY);
        localStorage.removeItem(roleKeys);
      }
    },
    setUserInfo(state, action) {
      state.user = action.payload;
      localStorage.setItem(USER_INFO_kEY, JSON.stringify(action.payload));
    },
    setRestaurantInfo(state, action) {
      state.restaurantInfo = action.payload;
      localStorage.setItem(ResTaurant_INFO_KEY, JSON.stringify(action.payload));
    },
    setRole(state, action) {
      const encryptedRole = encryptData(action.payload);
      state.role = encryptedRole;
      localStorage.setItem(roleKeys, encryptedRole);
    },

    setAccessToken(_, action) {
      const encryptedAccessToken = encryptData(action.payload);
      localStorage.setItem(ACCESS_TOKEN_KEY, encryptedAccessToken);
    },

    setIsRememberMe(state, action) {
      state.isRememberMe = action.payload;
      localStorage.setItem(REMEMBER_ME_KEY, action.payload);
    },

    removeRememberMe(state) {
      state.isRememberMe = false;
      localStorage.removeItem(REMEMBER_ME_KEY);
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setRole,
  setRestaurantInfo,
  clearAuthState,
  setAccessToken,
  setIsRememberMe,
  removeRememberMe,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
