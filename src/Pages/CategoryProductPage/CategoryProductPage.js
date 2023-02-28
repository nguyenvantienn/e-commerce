import React, {  useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {ProductList , Loader} from '../../Components'
import "./CategoryProductPage.scss";
// import {} from '../../store/categorySlice';
import { fetchAsyncProductsOfCategory } from '../../store/categorySlice';
import {STATUS} from '../../utils/status';

function CategoryProductPage() {

    const {category} = useParams();
    const categoryProducts = useSelector(state => state.category.categoryProducts);
    const categoryProductsStatus = useSelector(state => state.category.categoryProductsStatus);
    // console.log(categoryProductsStatus);
    // console.log(categoryProducts);
    const dispatch = useDispatch();
    // console.log('checkout');

    useEffect(() => {
        // console.log('check');
        dispatch(fetchAsyncProductsOfCategory(category));
    },[dispatch , category]);
    
    return (
        <div className='cat-products py-5 bg-whitesmoke'>
            <div className="container">
                <div className="cat-products-content">
                    <div className="title-md">
                        <h3>See our <span className='text-capitalize'>{category.replace("-"," ")}</span></h3>
                    </div>
                    {
                        categoryProductsStatus && categoryProductsStatus === STATUS.LOADING ? <Loader/> :<ProductList products = {categoryProducts}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryProductPage;