import actGetWishlist from "./act/actGetWishlist";
import actLikeToggle from "./act/actLikeToggle";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";

interface IWishlistState {
  itemsId: number[];
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IWishlistState = {
  itemsId: [],
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanupWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    //getWishlist
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.loading = "failed";
        state.error = action.payload;
      }
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { cleanupWishlistProductsFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
