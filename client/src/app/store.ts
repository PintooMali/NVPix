import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;