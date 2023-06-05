import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../redux/action';

import { ReactComponent as NoDataSvg } from '../../assets/img/noentry-svgrepo-com.svg';
import { ITEMS_PER_PAGE } from '../../config/key';
import ReactPaginate from 'react-paginate';

const SalesHistoryPage = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();

    const products = useSelector(({ productsReducer: { products } }) => products);
    const salesHistory = useSelector(({ salesReducer: { salesHistory } }) => salesHistory);

    // Pagination
    const firstItemIndex = currentPage * ITEMS_PER_PAGE;
    const lastItemIndex = (currentPage + 1) * ITEMS_PER_PAGE;
    const displayedItems = salesHistory ? salesHistory.slice(firstItemIndex, lastItemIndex) : [];

    useEffect(() => {
        dispatch(Action.getProducts());
        dispatch(Action.getSales());
    }, [dispatch]);

    return (
        <div className='container'>
            <h1>Sales History</h1>
            {salesHistory.length > 0 ? (
                <>
                    <Link className='btn btn-primary m-3 float-end' to={'/sales'}>Summarize</Link>
                    <table className='table table-bordered table-hover mt-3 text-center'>
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
                            {displayedItems.map((sale, index) => (
                                <tr key={sale.id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{products.filter(product => product.id === sale.product_id)[0].name}</td>
                                    <td>{sale.sale_price}</td>
                                    <td>{sale.tax_amount}</td>
                                    <td>{(new Date(sale.created_at))
                                        .toLocaleDateString('en-US', { timeZone: 'EST' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        pageCount={Math.ceil(salesHistory.length / ITEMS_PER_PAGE)}
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
                </div>
            )}
        </div>
    );
}

export default SalesHistoryPage;