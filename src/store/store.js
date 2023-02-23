import { configureStore } from "@reduxjs/toolkit";
import { calculatorSlice } from "./calculator.slice";

export const store = configureStore({
    reducer: {
        calculator: calculatorSlice.reducer
    }
})