import { TProduct, TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";

import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanupProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload) {
        state.records = action.payload;
      }
    });

    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanupProductsRecords } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
