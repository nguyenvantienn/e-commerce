import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';

// import {STATUS} from '../utils/status';

const STATUS = Object.freeze({
    IDLE: 'IDLE',
    FAILED: 'FAILED',
    LOADING: 'LOADING',
    SUCCEEDED: 'SUCCEEDED'
});

const productSlice = createSlice({
    name: "product",
    initialState:{
        products: [],
        productsStatus : 'IDLE',
        productSingle: [],
        productSingleStatus : 'IDLE',
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchAsyncProducts.pending ,(state , action)=>{
            state.productsStatus =  'LOADING';
        })

        .addCase(fetchAsyncProducts.fulfilled ,(state,action)=>{
            // console.log('Check');
            state.products = action.payload;
            state.productsStatus = 'SUCCEEDED';
        })

        .addCase(fetchAsyncProducts.rejected ,(state,action)=>{
            state.productsStatus = 'FAILED';
        })

        .addCase(fetchAsyncProductSingle.pending ,(state , action)=>{
            state.productSingleStatus = 'IDLE';
        })

        .addCase(fetchAsyncProductSingle.fulfilled ,(state , action)=>{
            state.productSingle = action.payload;
            state.productSingleStatus = 'SUCCEEDED' ;
        })

        .addCase(fetchAsyncProductSingle.rejected ,(state , action)=>{
            state.productSingleStatus = 'FAILED';
        })
    },
});


//Lay danh sach san pham theo so luong
// export const fetchAsyncProducts = createAsyncThunk('products/fetch',async(limit)=>{
//     const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products?limit=${limit}`);
//     const data = await response.json();
//     console.log(data);
//     return data.products; 
// });

export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(limit) => {
    const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products?limit=${limit}`);
    const data = await response.json();
    // console.log(data);
    return data.products;
});

//Lay 1 du lieu san pham theo id
export const fetchAsyncProductSingle = createAsyncThunk('products-single/fetch',async(id)=>{
    const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products/${id}`);
    const data = await response.json();
    return data; 
})

// export default productSlice.reducer;
export default productSlice.reducer;
