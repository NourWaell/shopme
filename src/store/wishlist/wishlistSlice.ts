import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";

interface IWishlistState {
  itemsId: number[];
}

const initialState: IWishlistState = {
  itemsId: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export { actLikeToggle };
export default wishlistSlice.reducer;
