import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';

import {setSidebarOn} from '../../store/sidebarSlice'
import './Sidebar.scss';
import { fetchAsyncCategories } from '../../store/categorySlice';

function Sidebar(props) {
    const isSidebarShow = useSelector(state => state.sidebar.isSidebarShow)
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);
    useEffect(()=>{
        dispatch(fetchAsyncCategories());
    },[dispatch])
    // console.log(process.env.REACT_APP_SEVER_URL);

    return (
        <>
        <aside className={`sidebar ${isSidebarShow ? 'hide-sidebar' : ''}`}>
            <button type='button' className='sidebar-hide-btn'
                onClick={()=>{dispatch(setSidebarOn(false))}}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="sidebar-cnt">
                <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
                    All Categories
                </div>
                <ul className='cat-list'>
                    {categories?.map((category , index) =>{
                        return(
                            <li key={category} onClick={()=>{dispatch(setSidebarOn(false))}}>
                                <Link to={`category/${category}`} className='cat-list-link text-capitalize'>{category.replace('-',' ')}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
        {isSidebarShow ? <><div className='cover' onClick={()=>{dispatch(setSidebarOn(false))}}></div></> :<></>}
        </>
    );
}

export default Sidebar;