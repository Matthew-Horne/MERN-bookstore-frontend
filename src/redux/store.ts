import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import { booksApi } from "./features/books/booksApi";
import { orderApi } from "./features/orders/orderAPI";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
