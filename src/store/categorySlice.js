import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';

// import STATUS from '../utils/status';

const STATUS = Object.freeze({
    IDLE: 'IDLE',
    FAILED: 'FAILED',
    LOADING: 'LOADING',
    SUCCEEDED: 'SUCCEEDED'
});

const categorySlice = createSlice({
    name: 'category',
    initialState :{
        categories: [],
        categoriesStatus: STATUS.IDLE,
        categoryProducts: [],
        categoryProductsStatus: STATUS.IDLE,
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchAsyncCategories.pending, (state, action) => {
            state.categoriesStatus = STATUS.LOADING;
        })
        .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.categoriesStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncCategories.rejected, (state, action) => {
            state.categoriesStatus = STATUS.FAILED;
        })

        .addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
            state.categoryProductsStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.categoryProducts = action.payload;
            state.categoryProductsStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
            state.categoryProductsStatus = STATUS.FAILED;
        })
    }
});

export const fetchAsyncCategories = createAsyncThunk('categories/fetch', async() => {
        const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products/categories`);
        const data = await response.json();
        return data;
})

// export const fetchAsyncProductsOfCategory  = createAsyncThunk('category-products/fetch', async(category)=>{
//         const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products/category/${category}`);
//         const data = await response.json();
//         return data.products;
// })
export const fetchAsyncProductsOfCategory = createAsyncThunk('category-products/fetch', async(category) => {
    const response = await fetch(`${process.env.REACT_APP_SEVER_URL}products/category/${category}`);
    const data = await response.json();
    return data.products;
});



export default categorySlice.reducer;