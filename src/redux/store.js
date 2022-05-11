import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./Slices"

export const store = configureStore({
    reducer: {
        nav: navReducer
    }
})