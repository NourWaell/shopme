import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading } from "@types";

import actAuthRegister from "./act/actAuthRegister";

interface IAuthState {
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { actAuthRegister };
export default authSlice.reducer;
