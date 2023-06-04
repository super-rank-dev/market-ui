import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Action from '../../redux/action';

import ProductType from '../../model/ProductType';
import { useParams } from 'react-router-dom';

const EditTypePage = () => {

    const [name, setName] = useState('');
    const [taxPercentage, setTaxPercentage] = useState('');

    const dispatch = useDispatch();

    const productType = useSelector(({ typesReducer: { productType } }) => productType);
    const productTypeError = useSelector(({ errorReducer: { productTypeError } }) => productTypeError);

    const { id } = useParams();

    useEffect(() => {
        dispatch(Action.getProductType(id));
    }, [dispatch, id]);

    useEffect(() => {
        setName(productType.name || '');
        setTaxPercentage(productType.tax_percentage || '')
    }, [productType]);

    const handleNameChange = (event) => setName(event.target.value);
    const handleTaxChange = (event) => setTaxPercentage(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!window.confirm('Do u wanna save this product type?'))
            return;
        const newProductType = new ProductType({ name, taxPercentage });
        dispatch(Action.validateProductTypeForm(newProductType));
        dispatch(Action.updateProductType(id, newProductType));
    };

    return (
        <div className='container'>
            <h1>Edit Product Type</h1>
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
                <button type="submit" className="btn btn-success float-end m-3">Save Product Type</button>
            </form>
        </div>
    );
};

export default EditTypePage;