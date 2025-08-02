import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../type/productType";

interface CartItem extends Product {
  quantity: number;
}

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
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
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
        totalAmount: state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
      };
      state.orders.push(newOrder);
      state.items = [];
    }
  }
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;