import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveProducts: []
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSaveProducts: (state, action) => {
      state.saveProducts = action.payload
    }
  },
});

export const {
  setSaveProducts,
} = productSlice.actions;

export default productSlice.reducer;
