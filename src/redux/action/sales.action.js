import axios from "axios";
import { SERVER_ADDRESS } from "../../config/key";

export const GET_SALES = '[MARKET SYSTEM] GET SALES';
export const ADD_SALE = '[MARKET SYSTEM] ADD SALE';

export const getSales = () => dispatch => {
    return axios.get(`${SERVER_ADDRESS}/api/sales`)
        .then(({ data }) => {
            dispatch({
                type: GET_SALES,
                payload: data
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const addSale = (sale) => dispatch => {
    return axios.post(`${SERVER_ADDRESS}/api/sales`, sale)
        .then(({ data }) => {
            dispatch({
                type: ADD_SALE,
                payload: data
            });
        })
        .catch(error => {
            console.log(error)
        });
}