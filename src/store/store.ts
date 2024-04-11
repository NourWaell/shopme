import { configureStore } from "@reduxjs/toolkit";

import cart from "./cart/cartSlice";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";

export const store = configureStore({
  reducer: { categories, products, cart },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
