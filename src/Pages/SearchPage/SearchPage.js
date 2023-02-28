import React, { useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { STATUS } from '../../utils/status';
import './SearchPage.scss';
import {Loader, Product, ProductList} from '../../Components'
import {clearSearch, fetchAsyncSearchProduct} from '../../store/searchSlice'

function SearchPage() {

    const {searchTerm} = useParams();
    const {searchProducts , searchProductsStatus} =useSelector(state =>state.search);
    const dispatch = useDispatch();

    console.log(searchProducts);
    useEffect(()=>{
        dispatch(clearSearch);
        console.log('check');
        dispatch(fetchAsyncSearchProduct(searchTerm))
    },[dispatch , searchTerm]);

    if(searchProducts.length === 0){
        return(<div className='fw-5 text-danger py-5' style={{minHeight:"80vh"}}><h1>No Products Found</h1></div>);
    }

    return (
        <main>
            <div className="search-content bg-whitesmoke">
                <div className="container">
                    <div className="py-5">
                        <div className="title-md">
                            <h3>Search results :</h3>
                        </div>
                        <br />
                        {
                            searchProductsStatus === STATUS.LOADING ?<Loader/>
                            :<ProductList products ={searchProducts}/> 
                        }
                    </div>
                </div>
            </div>    
        </main>
    );
}

export default SearchPage;