import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Action from '../../redux/action';
import { Link } from 'react-router-dom';
import Sale from '../../model/Sale';

const ProductsPage = () => {

    const dispatch = useDispatch();

    const products = useSelector(({ productsReducer: { products } }) => products);
    const productTypes = useSelector(({ typesReducer: { productTypes } }) => productTypes);
    const sales = useSelector(({ salesReducer: { sales } }) => sales);

    useEffect(() => {
        dispatch(Action.getProducts());
        dispatch(Action.getProductTypes());
        dispatch(Action.getSales());
    }, [dispatch]);

    const handlePurchase = (product) => {
        if (!window.confirm('Do u wanna purchase this item?'))
            return;
        const newSale = new Sale(product, productTypes);
        dispatch(Action.addSale(newSale))
            .then(dispatch(Action.getSales()));
    }

    const handleRemove = (id) => {
        if (!window.confirm('Do u wanna remove this item?'))
            return;
        dispatch(Action.removeProduct(id));
    }

    return (
        <div className='container'>
            <h1>Products</h1>
            <Link className='btn btn-primary m-3 float-end' to={'/add-product'}>Add Product</Link>
            <table className='table table-bordered table-hover align-middle text-center'>
                <thead>
                    <tr>
                        <th style={{ width: '10px' }}>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Count</th>
                        <th style={{ width: '270px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.type.name}</td>
                            <td>{sales.filter(sale => sale.product_id === product.id)[0] ?
                                sales.filter(sale => sale.product_id === product.id)[0].quantity : 0}</td>
                            <td>
                                <button className='btn btn-warning me-2' onClick={() => handlePurchase(product)}>Purchase</button>
                                <Link className='btn btn-success me-2' to={`/edit-product/${product.id}`}>Edit</Link>
                                <button className='btn btn-danger me-2' onClick={() => handleRemove(product.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default ProductsPage;