import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const promotionDetailsSlice = createSlice({
    name: "promotionDetails",
    initialState,
    reducers: {
        setPromotionDetails: (state, action) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPromotionDetails } = promotionDetailsSlice.actions;

export default promotionDetailsSlice.reducer;
