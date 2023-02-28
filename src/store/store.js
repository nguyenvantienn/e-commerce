import {configureStore } from "@reduxjs/toolkit";

import sidebarReducer from './sidebarSlice';
import categoryReducer from './categorySlice';
import productReducer from "./productSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice"

const store = configureStore({
    reducer: {
        sidebar : sidebarReducer,
        category : categoryReducer,
        product : productReducer,
        cart : cartSlice,
        search : searchSlice,
    },
});

export default store;