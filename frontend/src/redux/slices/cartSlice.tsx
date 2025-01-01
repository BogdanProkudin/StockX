import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartSlice {
  price: number;
}

const initialState: ICartSlice = {
  price: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
});

export const { setCartPrice } = cartSlice.actions;
export default cartSlice.reducer;
