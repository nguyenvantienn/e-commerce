import React, { useEffect, useState ,useMemo} from 'react';
import { useParams } from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'

import './ProductSinglePage.scss';
import {Loader , CartMessage } from '../../Components'

import {fetchAsyncProductSingle} from '../../store/productSlice'
import {STATUS} from '../../utils/status'
import {formatPrice} from '../../utils/fn'
import {addToCart ,setCartMessageOn ,setCartMessageOff} from '../../store/cartSlice'

function ProductSimplePage() {
    const [quantity , setQuantity] = useState(1);

    const {id} =useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.productSingle);
    const productSingleStatus = useSelector(state => state.product.productSingleStatus);
    const cartMessageStatus = useSelector(state => state.cart.isCartMessageOn);
    // console.log(id);
    // console.log(product);

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    
    useEffect(()=>{
        console.log('re-Render');
        dispatch(fetchAsyncProductSingle(id));

        //Tat cartMessage sau 2s
        if(cartMessageStatus){
            setTimeout(()=>{
                dispatch(setCartMessageOff());
            },2000)
        }
    },[id , dispatch, cartMessageStatus]);


    let discountedPrice =  useMemo(()=>{
        console.log('re-render');
        let price = (product?.price) - (product?.price * product?.discountPercentage /100);
        return price;
    },[JSON.stringify(product)]);

    //Them so luong san pham muon mua
    const increaseQty = () =>{
        setQuantity(prev =>{
            let temQty = prev >= product?.stock ? product.stock : prev+1;
            return temQty;
        })
    }

    const decreaseQty = () =>{
        setQuantity(prev =>{
            let temQty = prev <= 1 ? 1 : prev -1;
            return temQty;
        })
    }

    //Handle Add To Cart
    const handleAddToCart = (product)=>{
        let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage /100));
        let totalPrice = quantity * discountedPrice;
        
        dispatch(addToCart({...product , quantity:quantity , totalPrice , discountedPrice }));
        dispatch(setCartMessageOn());
        
    };


    if(productSingleStatus === STATUS.LOADING) {
        return <Loader />
    }

    return ( 
        <>
        {/* { productSingleStatus === STATUS.LOADING ? <Loader />: */}
            <main className='py-5 bg-whitesmoke'>
                <div className="product-single">
                    <div className="container">
                        <div className="product-single-content bg-white grid">
                            <div className="product-single-l">
                                <div className="product-img">
                                    <div className="product-img-zoom">
                                        <img src={product?(product.images ? product.images[0]:'') : ''} alt="" className='img-cover' />
                                    </div>

                                    <div className="product-img-thumbs flex align-center my-2">
                                        {
                                            product && product?.images?.filter((item,index)=>index>0).map((item)=>{
                                                // console.log(item);
                                                return(
                                                    <div className="thumb-item" key={item}>
                                                        <img src={item} alt="" className='img-cover' />
                                                    </div>
                                                )
                                            }) 
                                        }
                                        {/* <div className="thumb-item">
                                            <img src={product?(product.images ? product.images[1]:''):''} alt="" className='img-cover' />
                                        </div>
                                        <div className="thumb-item">
                                            <img src={product?(product.images ? product.images[2]:''):''} alt="" className='img-cover' />
                                        </div>
                                        <div className="thumb-item">
                                            <img src={product?(product.images ? product.images[3]:''):''} alt="" className='img-cover' />
                                        </div>
                                        <div className="thumb-item">
                                            <img src={product?(product.images ? product.images[4]:''):''} alt="" className='img-cover' />4
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="product-single-r">
                                <div className="product-details font-manrope">
                                    <div className="title fs-20 fw-5">
                                        {product?.title}
                                    </div>
                                    <div>
                                        <p className="para fw-3 fs-15">
                                            {product?.description}
                                        </p>
                                    </div>
                                    <div className="info flex align-center flex-wrap fs-">
                                        <div className="rating">
                                            <span className="text-orange fw-5">Rating :</span>
                                            <span className="mx-1">{product?.rating}</span>
                                        </div>
                                        <div className="vert-line"></div>
                                        <div className="brand">
                                            <span className="text-orange fw-5">Brand:</span>
                                            <span className="mx-1">{product?.brand}</span>
                                        </div>
                                        <div className="vert-line"></div>
                                        <div className="brand">
                                            <span className="text-orange fw-5">Category:</span>
                                            <span className="mx-1">{product?.category ? product.category.replace('-'," "):''}</span>
                                        </div>
                                    </div>

                                    <div className="price">
                                        <div className="flex align-center">
                                            <div className="old-price text-gray">
                                                {formatPrice(product?.price)}
                                            </div>
                                            <span className="fs-14 mx-2 text-dark">
                                                Inclusive of all taxes
                                            </span>
                                        </div>

                                        <div className="flex align-center my-1">
                                            <div className="new-price fs-24 text-orange">
                                                {formatPrice(discountedPrice)}
                                            </div>
                                            <div className="discout bg-orange fs-13 text-white fw-6 font-poppins px-1 mx-2">
                                                {product?.discountPercentage}% OFF
                                            </div>
                                        </div>

                                        <div className="qty flex align-center my-4">
                                            <div className="qty-text">Quantity:</div>
                                            <div className="qty-change flex align-center mx-3">
                                                <button
                                                    type='button'
                                                    className='qty-decrease flex align-center justify-center'
                                                    onClick={decreaseQty}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <div className="qty-value flex align-center justify-center">{quantity}</div>
                                                <button
                                                    type='button'
                                                    className='qty-increase flex align-center justify-center'
                                                    onClick={increaseQty}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                            {
                                                (product?.stock ===0 ? 
                                                <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out of stock</div>
                                                :'')
                                            }
                                        </div>

                                        <div className="btns">
                                            <button
                                                type='button'
                                                className='add-to-cart-btn btn'
                                                onClick ={()=>{handleAddToCart(product)}}
                                            >
                                                add to cart
                                            </button>
                                            <button
                                                type='button'
                                                className='buy-now btn mx-3'
                                            >
                                                <span className="btn-text">buy now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {cartMessageStatus && <CartMessage/>}
            </main>
    {/* } */}
    </>
    );
}

export default ProductSimplePage;