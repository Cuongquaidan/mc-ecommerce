import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
