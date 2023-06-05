import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';
import Sale from '../../model/Sale';

import { ReactComponent as NoDataSvg } from '../../assets/img/noentry-svgrepo-com.svg';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from '../../config/key';

const ProductsPage = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();

    const products = useSelector(({ productsReducer: { products } }) => products);
    const productTypes = useSelector(({ typesReducer: { productTypes } }) => productTypes);
    const sales = useSelector(({ salesReducer: { sales } }) => sales);

    // Pagination
    const firstItemIndex = currentPage * ITEMS_PER_PAGE;
    const lastItemIndex = (currentPage + 1) * ITEMS_PER_PAGE;
    const displayedItems = products ? products.slice(firstItemIndex, lastItemIndex) : [];

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
            {products.length > 0 ? (
                <>
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
                            {displayedItems.map((product, index) => (
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
                    <ReactPaginate
                        pageCount={Math.ceil(products.length / ITEMS_PER_PAGE)}
                        onPageChange={page => setCurrentPage(page.selected)}
                        containerClassName='pagination'
                        activeClassName='active'
                        previousLinkClassName='previous_page'
                        nextLinkClassName='next_page'
                        disabledClassName='pagination_disabled'
                    />
                </>
            ) : (
                <div className='no-data'>
                    <NoDataSvg width={'100px'} />
                    <p className='msg'>No Data</p>
                    <Link className='btn btn-primary' to={'/add-product'}>Add Product</Link>
                </div>
            )}

        </div >
    );
}

export default ProductsPage;