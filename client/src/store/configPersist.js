import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import promotionDetailsReducer from "./promotionDetailsSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    promotionDetails: promotionDetailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
