import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ShipForm = {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: number;
  phoneNumber: number;
};
interface ICartSlice {
  price: number;
  shipForm: ShipForm[];
}

const initialState: ICartSlice = {
  price: 0,
  shipForm: [
    {
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: 0,
      phoneNumber: 0,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setFormShip: (state, action: PayloadAction<ShipForm[]>) => {
      state.shipForm = action.payload;
    },
  },
});

export const { setCartPrice, setFormShip } = cartSlice.actions;
export default cartSlice.reducer;
