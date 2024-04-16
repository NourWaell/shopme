import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItem = createAsyncThunk(
  "cart/actGetProductsByItem",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsId.map((id) => `id=${id}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItem;
