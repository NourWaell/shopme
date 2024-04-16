import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExists = await axios.get(
        `/wishlist?userId=1&productId=${id}`
      );

      if (isRecordExists.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExists.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: 1, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
