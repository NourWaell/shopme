import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";
import { RootState } from "@store/store";

type TResponse = TProduct[];
type TDataTypes = "productsFullInfo" | "productsIds";

const actGetWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (dataType: TDataTypes, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "productsIds") {
        const concatenatedProductIds = userWishlist.data.map(
          (el) => el.productId
        );

        return { data: concatenatedProductIds, dataType: "productsIds" };
      } else {
        const concatenatedProductIds = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `products?${concatenatedProductIds}`
        );

        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
