import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TOrderItem } from "@types";

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
  reducers: {},
});

export default orderSlice.reducer;
