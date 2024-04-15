import { TProduct } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
} from "./selectors";
import actGetProductsByItem from "./act/actGetProductsByItem";
import { TLoading } from "@customTypes/shared";

interface ICartState {
  items: {
    [key: string]: number;
  };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    productsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItem.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItem.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export {
  getCartTotalQuantitySelector,
  itemQuantityAvailabilityCheckingSelector,
  actGetProductsByItem,
};
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  productsFullInfoCleanUp,
} = cartSlice.actions;
export default cartSlice.reducer;
