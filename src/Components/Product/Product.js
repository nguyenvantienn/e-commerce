import React,{useEffect , useState, useRef} from 'react';
import {Link} from 'react-router-dom'

import './Product.scss';
import {formatPrice} from '../../utils/fn' 
import {onepx} from '../../utils/images'

function Product({product}) {
    // console.log(product);
    const [check , setCheck] = useState(false);
    const containerRef = useRef(null);
    const CBfunc = (entries) =>{
        const [ entry ] = entries;
        // Element.isInterseting : gia tri boolean(true , false) Element co nam tron ViewPost hay ko
        // setCheck(entry.isIntersecting ); Co an phan tu Element da luot qua,.
        setCheck(state => state?state:entry.isIntersecting);
    }
    const options = {
        root: null,
        rootMargin:'0px',
        threshold: 0.3,
    }

    useEffect(()=>{
        const observer = new IntersectionObserver(CBfunc , options)
        if(containerRef.current){
            observer.observe(containerRef.current)
        }
        return ()=>{
            if(containerRef.current) observer.unobserve(containerRef.current);
        }
    },[containerRef , options]);


    return (
        <>
{
                product ? <Link to={`/product/${product?.id}`} key={product?.id}>
                <div className="product-item bg-white">
                    <div className="category">{product?.category}</div>
                    <div className="product-item-img">
                        {/* {console.log(product?.images[0])} */}
                        <img ref={containerRef} src={check? product?.images[0] : onepx} alt={product.title} className="img-cover" />
                    </div>
                    <div className="product-item-info fs-1">
                        <div className="brand">
                            <span>Brand:</span>
                            <span className='fw-7'>{product?.brand}</span>
                        </div>
                        <div className="title py-2">
                            {product?.title}
                        </div>
                        <div className="price flex align-center justify-center">
                            <span className="old-price">
                                {formatPrice(product?.price)}
                            </span>
                            <span className="new-price">
                                {formatPrice(product?.discountedPrice)}
                            </span>
                            <span className="discount fw-6">
                                ({product?.discountedPercentage}% Off)
                            </span>
                        </div>
                    </div>
                </div>
            </Link>: ''
            }
        </>
        // <Link to={`/product/${product?.id}`} key={product?.id}>
        //     <div className="product-item bg-white">
        //         <div className="category">{product?.category}</div>
        //         <div className="product-item-img">
        //             {/* {console.log(product?.images[0])} */}
        //             <img src={product?.images[0]} alt={product.title} className="img-cover" />
        //         </div>
        //         <div className="product-item-info fs-1">
        //             <div className="brand">
        //                 <span>Brand:</span>
        //                 <span className='fw-7'>{product?.brand}</span>
        //             </div>
        //             <div className="title py-2">
        //                 {product?.title}
        //             </div>
        //             <div className="price flex align-center justify-center">
        //                 <span className="old-price">
        //                     {formatPrice(product?.price)}
        //                 </span>
        //                 <span className="new-price">
        //                     {formatPrice(product?.discountedPrice)}
        //                 </span>
        //                 <span className="discount fw-6">
        //                     ({product?.discountedPercentage}% Off)
        //                 </span>
        //             </div>
        //         </div>
        //     </div>
        // </Link>
    );
}

export default Product;