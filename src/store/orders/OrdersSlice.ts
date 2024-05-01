import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IOrderSlice {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrderSlice = {
  orderList: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //Place Order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    //Get Orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
