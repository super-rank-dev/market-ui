import axios from "axios";

import { SERVER_ADDRESS } from "../../config/key";

export const GET_PRODUCTS = '[MARKET SYSTEM] GET PRODUCTS';
export const ADD_PRODUCT = '[MARKET SYSTEM] ADD PRODUCT';
export const GET_PRODUCT = '[MARKET SYSTEM] GET PRODUCT';
export const UPDATE_PRODUCT = '[MARKET SYSTEM] UPDATE PRODUCT';
export const REMOVE_PRODUCT = '[MARKET SYSTEM] REMOVE PRODUCT';

export const getProducts = () => dispatch => {
    return axios.get(`${SERVER_ADDRESS}/api/products`)
        .then(({ data }) => {
            dispatch({
                type: GET_PRODUCTS,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const addProduct = (product) => dispatch => {
    return axios.post(`${SERVER_ADDRESS}/api/products`, product)
        .then(({ data }) => {
            dispatch({
                type: ADD_PRODUCT,
                payload: data
            });
            window.location.href = '/products';
        })
        .catch(error => {
            console.log(error);
        });
}

export const getProduct = (id) => dispatch => {
    return axios.get(`${SERVER_ADDRESS}/api/products/${id}`)
        .then(({ data }) => {
            dispatch({
                type: GET_PRODUCT,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateProduct = (id, product) => dispatch => {
    return axios.put(`${SERVER_ADDRESS}/api/products/${id}`, product)
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: data
            });
            window.location.href = '/products';
        })
        .catch(error => {
            console.log(error);
        });
}

export const removeProduct = (id) => dispatch => {
    return axios.delete(`${SERVER_ADDRESS}/api/products/${id}`)
        .then(({ data }) => {
            dispatch({
                type: REMOVE_PRODUCT,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}