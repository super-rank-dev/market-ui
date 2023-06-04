import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Action from '../../redux/action';

import Product from '../../model/Product';
import { useParams } from 'react-router-dom';

const EditProductPage = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [typeId, setTypeId] = useState('');

    const dispatch = useDispatch();

    const product = useSelector(({ productsReducer: { product } }) => product);
    const productTypes = useSelector(({ typesReducer: { productTypes } }) => productTypes);
    const productError = useSelector(({ errorReducer: { productError } }) => productError);

    const { id } = useParams();

    useEffect(() => {
        dispatch(Action.getProduct(id));
        dispatch(Action.getProductTypes());
    }, [dispatch, id]);

    useEffect(() => {
        setName(product.name || '');
        setPrice(product.price || '');
        setTypeId(product.type_id || '');
    }, [product]);

    const handleNameChange = (event) => setName(event.target.value);
    const handlePriceChange = (event) => setPrice(event.target.value);
    const handleTypeSelection = (event) => setTypeId(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!window.confirm('Do u wanna save this product?'))
            return;
        const newProduct = new Product({ name, price, typeId });
        dispatch(Action.validateProductForm(newProduct));
        dispatch(Action.updateProduct(id, newProduct));
    };

    return (
        <div className='container'>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group m-3">
                    <label for="name">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
                    {productError.name && productError.name !== '' && (
                        <div className='error'>{productError.name}</div>
                    )}
                </div>
                <div className="form-group m-3">
                    <label for="price">Price ($):</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={handlePriceChange} />
                    {productError.price && productError.price !== '' && (
                        <div className='error'>{productError.price}</div>
                    )}
                </div>
                <div className="form-group m-3">
                    <label for="type">Type:</label>
                    <select className="form-control" id="type" value={typeId} onChange={handleTypeSelection}>
                        <option value="">Select type...</option>
                        {productTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                    {productError.type && productError.type !== '' && (
                        <div className='error'>{productError.type}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-success float-end m-3">Save Product</button>
            </form>
        </div>
    );
};

export default EditProductPage;