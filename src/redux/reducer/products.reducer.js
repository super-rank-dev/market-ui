import * as Action from '../action';

const initialState = {
    products: [],
    product: {}
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case Action.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case Action.GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case Action.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.id === action.payload.id)
                        return action.payload;
                    return product;
                })
            }
        case Action.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => {
                    return product.id !== action.payload.id;
                })
            }
        default:
            return state;
    }
}