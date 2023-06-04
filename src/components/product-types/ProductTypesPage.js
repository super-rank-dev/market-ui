import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';

const ProductTypesPage = () => {

    const dispatch = useDispatch();

    const productTypes = useSelector(({ typesReducer: { productTypes } }) => productTypes);

    useEffect(() => {
        dispatch(Action.getProductTypes());
    }, [dispatch]);

    const handleRemove = (id) => {
        if (!window.confirm('Do u wanna remove this item?'))
            return;
        dispatch(Action.removeProductType(id));
    }

    return (
        <div className='container'>
            <h1>Product Types</h1>
            <Link className='btn btn-primary m-3 float-end' to={'/add-type'}>Add Product Type</Link>
            <table className='table table-bordered table-hover align-middle m3 text-center'>
                <thead>
                    <tr>
                        <th style={{ width: '10px' }}>No</th>
                        <th>Name</th>
                        <th>Tax Percentage</th>
                        <th style={{ width: '160px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productTypes.map((productType, index) => (
                        <tr key={productType.id}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{productType.name}</td>
                            <td>{productType.tax_percentage}%</td>
                            <td>
                                <Link className='btn btn-success me-2' to={`/edit-type/${productType.id}`}>Edit</Link>
                                <button className='btn btn-danger' onClick={() => handleRemove(productType.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTypesPage;