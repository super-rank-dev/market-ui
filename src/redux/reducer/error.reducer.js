import * as Action from '../action';

const initialState = {
    productError: {},
    productTypeError: {},
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PRODUCT_ERROR:
            return {
                ...state,
                productError: action.payload
            };
        case Action.PRODUCT_TYPE_ERROR:
            return {
                ...state,
                productTypeError: action.payload
            };
        default:
            return state;
    }
}