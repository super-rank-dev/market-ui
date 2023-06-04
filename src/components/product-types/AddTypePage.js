import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Action from '../../redux/action';

import ProductType from '../../model/ProductType';

const AddTypePage = () => {

    const [name, setName] = useState('');
    const [taxPercentage, setTaxPercentage] = useState('');

    const dispatch = useDispatch();

    const productTypeError = useSelector(({ errorReducer: { productTypeError } }) => productTypeError);

    useEffect(() => {
        dispatch(Action.getProductTypes());
    }, [dispatch]);

    const handleNameChange = (event) => setName(event.target.value);
    const handleTaxChange = (event) => setTaxPercentage(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!window.confirm('Do u wanna add this product type?'))
            return;
        const newProductType = new ProductType({ name, taxPercentage });
        dispatch(Action.validateProductTypeForm(newProductType));
        dispatch(Action.addProductType(newProductType));
    };

    return (
        <div className='container'>
            <h1>Add Product Type</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group m-3">
                    <label for="name">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
                    {productTypeError.name && productTypeError.name !== '' && (
                        <div className='error'>{productTypeError.name}</div>
                    )}
                </div>
                <div className="form-group m-3">
                    <label for="tax">Tax (%):</label>
                    <input type="number" className="form-control" id="tax" value={taxPercentage} onChange={handleTaxChange} />
                    {productTypeError.tax && productTypeError.tax !== '' && (
                        <div className='error'>{productTypeError.tax}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary float-end m-3">Add Product Type</button>
            </form>
        </div>
    );
};

export default AddTypePage;