import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";

import { STATUS } from "../utils/status";

const searchSlice = createSlice({
    name: "Search",
    initialState : {
        searchProducts :[],
        searchProductsStatus :STATUS.IDLE,
    },
    reducers: {
        clearSearch: (state , action)=>{
            state.searchProducts = [];
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchAsyncSearchProduct.pending,(state,action)=>{
            state.searchProductsStatus = STATUS.LOADING;
        })
        .addCase(fetchAsyncSearchProduct.fulfilled ,(state,action)=>{
            state.searchProducts = action.payload;
            state.searchProductsStatus = STATUS.SUCCEEDED;
        })
        .addCase(fetchAsyncSearchProduct.rejected , (state,action)=>{
            state.searchProductsStatus = STATUS.FAILED;
        })

    }

})

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch',async(searchTerm)=>{
    const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products/search?q=${searchTerm}`);
    const data= await response.json();
    // console.log(data);
    return data.products;
})

export const {setSearchTerm , clearSearch} = searchSlice.actions;

export default searchSlice.reducer;
