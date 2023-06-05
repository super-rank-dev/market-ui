import axios from 'axios';

import { SERVER_ADDRESS } from '../../config/key';

export const GET_PRODUCT_TYPES = '[MARKET SYSTEM] GET PRODUCT TYPES';
export const ADD_PRODUCT_TYPE = '[MARKET SYSTEM] ADD PRODUCT TYPE';
export const GET_PRODUCT_TYPE = '[MARKET SYSTEM] GET PRODUCT TYPE';
export const UPDATE_PRODUCT_TYPE = '[MARKET SYSTEM] UPDATE PRODUCT TYPE';
export const REMOVE_PRODUCT_TYPE = '[MARKET SYSTEM] REMOVE PRODUCT TYPE';

export const getProductTypes = () => dispatch => {
    return axios.get(`${SERVER_ADDRESS}/api/product-types`)
        .then(({ data }) => {
            dispatch({
                type: GET_PRODUCT_TYPES,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const addProductType = (productType) => dispatch => {
    return axios.post(`${SERVER_ADDRESS}/api/product-types`, productType)
        .then(({ data }) => {
            dispatch({
                type: ADD_PRODUCT_TYPE,
                payload: data
            });
            window.location.href = '/types';
        })
        .catch(error => {
            console.log(error);
        });
}

export const getProductType = (id) => dispatch => {
    return axios.get(`${SERVER_ADDRESS}/api/product-types/${id}`)
        .then(({ data }) => {
            dispatch({
                type: GET_PRODUCT_TYPE,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateProductType = (id, productType) => dispatch => {
    return axios.put(`${SERVER_ADDRESS}/api/product-types/${id}`, productType)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PRODUCT_TYPE,
                payload: data
            });
            window.location.href = '/types';
        })
        .catch(error => {
            console.log(error);
        });
}

export const removeProductType = (id) => dispatch => {
    return axios.delete(`${SERVER_ADDRESS}/api/product-types/${id}`)
        .then(({ data }) => {
            dispatch({
                type: REMOVE_PRODUCT_TYPE,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}