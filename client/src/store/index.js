import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import promotionDetailsReducer from "./promotionDetailsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        promotionDetails: promotionDetailsReducer,
    },
});
