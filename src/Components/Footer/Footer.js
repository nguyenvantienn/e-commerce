import React from 'react';
import {Link} from 'react-router-dom'

import './Footer.scss'

function Footer(props) {
    return (
        <footer className='footer bg-orange'>
            <div className="container py-4 text-center">
                <div className="flex align-center justify-center text-white fw-3 fs-14">
                    <Link to='/' className="text-uppercase">Privacy Policy</Link>
                    <div className="vert-line"></div>
                    <Link to='/' className="text-uppercase">Term of service</Link>
                    <div className="vert-line"></div>
                    <Link to='/' className="text-uppercase">About ZShop</Link>
                </div>
                <span className="text-white copyright-text text-manrope fs-14 fw-13">
                    &copy;2023 ZShop. All Right Reserved.
                </span>
            </div>
        </footer>
    );
}



export default Footer;