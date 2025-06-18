import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Book } from '../../../types/types'
import Swal from 'sweetalert2'

export interface CartItem extends Book {
  _id: string
}

export interface CartState {
    cartItems: CartItem[]
}

const initialState: CartState = {
    cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem> ) => {
        const existingItem = state.cartItems.find((item: CartItem) => item._id === action.payload._id);
        if (!existingItem) {
            state.cartItems.push(action.payload)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Product added to cart!",
              showConfirmButton: false,
              timer: 1500
            });
        } else {
          Swal.fire({
            title: "Product already in cart!",
            text: "Are you sure you want to add another?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes please!"
          })
        }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
        state.cartItems = state.cartItems.filter((item: CartItem) => item._id !== action.payload._id)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  },
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer

