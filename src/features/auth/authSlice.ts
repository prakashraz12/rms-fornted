import { USER_INFO_kEY } from "@/keys";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string; avatar: string } | null;
  role: string | null;
  restaurantInfo: any;
}

const initialState: AuthState = {
  role: null,
  user: null,
  restaurantInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem(USER_INFO_kEY, JSON.stringify(action.payload.user));
      localStorage.setItem(
        "restro",
        JSON.stringify(action.payload.restaurantInfo)
      );
    },
    clearAuthState(state) {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
