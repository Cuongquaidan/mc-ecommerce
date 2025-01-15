import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./configPersist";
import persistStore from "redux-persist/es/persistStore";

export const store = configureStore({
    reducer: persistedReducer, // Sử dụng persistedReducer
});

export const persistor = persistStore(store); // Tạo persistor
