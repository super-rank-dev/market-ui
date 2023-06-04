import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div><Link to='/products'>Products</Link></div>
            <div><Link to='/types'>Product Types</Link></div>
            <div><Link to='/sales'>Sales</Link></div>
        </div>
    );
}

export default Navbar;