import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';

import { ReactComponent as NoDataSvg } from '../../assets/img/noentry-svgrepo-com.svg';
import { ITEMS_PER_PAGE } from '../../config/key';
import ReactPaginate from 'react-paginate';

const ProductTypesPage = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();

    const productTypes = useSelector(({ typesReducer: { productTypes } }) => productTypes);

    // Pagination
    const firstItemIndex = currentPage * ITEMS_PER_PAGE;
    const lastItemIndex = (currentPage + 1) * ITEMS_PER_PAGE;
    const displayedItems = productTypes ? productTypes.slice(firstItemIndex, lastItemIndex) : [];

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
            {productTypes.length > 0 ? (
                <>
                    <Link className='btn btn-primary m-3 float-end' to={'/add-type'}>Add Product Type</Link>
                    <table className='table table-bordered table-hover align-middle m3 text-center'>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>No</th>
                                <th>Name</th>
                                <th>Tax Percentage</th>
                                <th style={{ width: '170px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedItems.map((productType, index) => (
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
                    <ReactPaginate
                        pageCount={Math.ceil(productTypes.length / ITEMS_PER_PAGE)}
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
                    <Link className='btn btn-primary' to={'/add-type'}>Add Product Type</Link>
                </div>
            )}
        </div>
    );
};

export default ProductTypesPage;