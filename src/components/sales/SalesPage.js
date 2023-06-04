import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';

const SalesPage = () => {

    const dispatch = useDispatch();

    const products = useSelector(({ productsReducer: { products } }) => products);
    const sales = useSelector(({ salesReducer: { sales } }) => sales);

    useEffect(() => {
        dispatch(Action.getProducts());
        dispatch(Action.getSales());
    }, [dispatch]);

    return (
        <div className='container'>
            <h1>Sales</h1>
            <Link className='btn btn-primary m-3 float-end' to={'/sales-history'}>History</Link>
            <table className='table table-bordered table-hover mt-3 text-center'>
                <thead>
                    <tr>
                        <th style={{ width: '10px' }}>No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Sale Price</th>
                        <th>Tax Amount</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={sale.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{products.filter(product => product.id === sale.product_id)[0].name}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.sale_price}</td>
                            <td>{sale.tax_amount}</td>
                            <td>{sale.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesPage;