import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';

const SalesHistoryPage = () => {

    const dispatch = useDispatch();

    const products = useSelector(({ productsReducer: { products } }) => products);
    const salesHistory = useSelector(({ salesReducer: { salesHistory } }) => salesHistory);

    useEffect(() => {
        dispatch(Action.getProducts());
        dispatch(Action.getSales());
    }, [dispatch]);

    return (
        <div className='container'>
            <h1>Sales History</h1>
            <Link className='btn btn-primary m-3 float-end' to={'/sales'}>Summarize</Link>
            <table className='table table-bordered table-hover mt-3'>
                <thead>
                    <tr>
                        <th style={{ width: '10px' }}>No</th>
                        <th>Product Name</th>
                        <th>Sale Price</th>
                        <th>Tax Amount (%)</th>
                        <th>Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {salesHistory.map((sale, index) => (
                        <tr key={sale.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{products.filter(product => product.id === sale.product_id)[0].name}</td>
                            <td>{sale.sale_price}</td>
                            <td>{sale.tax_amount}</td>
                            <td>{sale.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesHistoryPage;