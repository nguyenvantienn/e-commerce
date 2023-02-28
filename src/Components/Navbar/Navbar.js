import React, { useEffect , useState } from 'react';
import {Link} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux';

import { setSidebarOn } from '../../store/sidebarSlice';
import {getCartTotal} from '../../store/cartSlice'
import {CartModal} from '../'

import './Navbar.scss'

function Navbar() {
    const [searchTerm ,setSearchTerm] = useState("")

    const dispatch = useDispatch();
    const isSideBarShow = useSelector(state => state.sidebar.isSidebarShow);
    // console.log(isSideBarShow);
    const categories = useSelector(state => state.category.categories);
    // console.log(categories);
    const {carts ,itemsCount } = useSelector(state => state.cart);
    // console.log(itemsCount);
    useEffect(()=>{
        // console.log('Check navbar');
        dispatch(getCartTotal())
    },[carts]);

    const handleClickShowSideBar = () =>{
        // console.log("Toggle");
        dispatch(setSidebarOn(!isSideBarShow));
    }

    //Search Item
    const handleSearchTerm =(e)=>{
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    return (
        <nav className='navbar'>
            <div className="navbar-cnt flex align-center">
                <div className="brand-and-toggler flex align-center">
                    <button 
                        type='button'
                        className="sidebar-show-btn text-white"
                        onClick={handleClickShowSideBar}
                        >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link to = '/' className='navbar-brand flex align-center'>
                        <span className="navbar-brand-ico">
                            <i className="fa-solid fa-bag-shopping "></i>
                        </span>
                        <span className="navbar-brand-txt mx-2">
                            <span className="fw-6">Z</span>Shop
                        </span>
                    </Link>
                </div>
                <div className="navbar-collapse w-100">
                    <div className="navbar-search bg-white">
                        <div className="flex align-center">
                            <input type="text" placeholder='Nhập sản phẩm bạn muốn tìm'
                                className="form-control fs-14" 
                                value={searchTerm}
                                onChange={(e)=>{handleSearchTerm(e)}}
                            />
                            <Link to={`search/${searchTerm}`} className="text-white search-btn flex align-center justify-center">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Link>
                        </div>
                    </div>

                    <ul className="navbar-nav flex align-center fs-12 fw-4 font-manrope">
                        {/* Lay 8 phan tu trong all category */}
                        {categories.slice(0,8).map((category,index)=>{
                            return(
                                <li key={category} className="nav-item no-wrap">
                                    <Link to={`category/${category}`} className="nav-link text-capialize">{category.replace('-',' ')}</Link>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>

                <div className="navbar-cart flex align-center">
                    <Link to='/cart' className="cart-btn">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className="cart-items-value">{itemsCount}</div>
                        <CartModal carts={carts}/>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;