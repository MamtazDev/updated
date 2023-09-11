import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import { api } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
