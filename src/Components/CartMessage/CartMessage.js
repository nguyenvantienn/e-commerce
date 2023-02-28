import React from 'react';

import './CartMessage.scss';
import {correct} from '../../utils/images.js'


function CartMessage(props) {
    return (
        <div className='cart-message text-center'>
            <div className="cart-message-icon">
                <img src={correct} alt="" />
            </div>
            <h6 className='text-white fs-14 fw-15'>An Item has been added to your shopping cart</h6>
        </div>


    );
}

export default CartMessage;