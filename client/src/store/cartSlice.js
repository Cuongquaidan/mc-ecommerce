import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload,
            };
        },
        setCurrentCartOrder: (state, action) => {
            return {
                ...state,
                cartOrder: action.payload,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCart, setCurrentCartOrder } = cartSlice.actions;

export default cartSlice.reducer;
