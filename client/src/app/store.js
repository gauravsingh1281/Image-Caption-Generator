import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import captionReducer from "../features/captions/captionSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        captions: captionReducer,
    },
})