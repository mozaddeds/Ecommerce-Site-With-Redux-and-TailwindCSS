import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../type/productType";

type CartItem = Product;

interface Order {
  id: number;
  customerName: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
}

interface CartState {
  items: CartItem[];
  orders: Order[];
}

const initialState: CartState = {
  items: [],
  orders: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push({ ...action.payload });
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    placeOrder: (state, action: PayloadAction<{
      customerName: string;
      address: string;
      phone: string;
      email: string;
    }>) => {
      const newOrder: Order = {
        id: Math.floor(Math.random() * 1000000),
        customerName: action.payload.customerName,
        items: [...state.items],
        totalAmount: state.items.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toISOString()
      };
      state.orders.push(newOrder);
      state.items = [];
    }
  }
});

export const { addItem, removeItem, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;