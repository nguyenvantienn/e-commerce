import React from 'react';

import './Loader.scss'
import {loader} from '../../utils/images'

function Loader(props) {
    return (
        <div className='container'>
            <div className="loader flex justify-center">
                <img src={loader} alt="Loading...." />
            </div> 
        </div>
    );
}

export default Loader;