import * as Action from '../action';

const initialState = {
    productTypes: [],
    productType: {}
};

export const typesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_PRODUCT_TYPES:
            return {
                ...state,
                productTypes: action.payload
            };
        case Action.ADD_PRODUCT_TYPE:
            return {
                ...state,
                productTypes: [...state.productTypes, action.payload]
            };
        case Action.GET_PRODUCT_TYPE:
            return {
                ...state,
                productType: action.payload
            };
        case Action.UPDATE_PRODUCT_TYPE:
            return {
                ...state,
                productTypes: state.productTypes.map(productType => {
                    if (productType.id === action.payload.id)
                        return action.payload;
                    return productType;
                })
            }
        case Action.REMOVE_PRODUCT_TYPE:
            return {
                ...state,
                productTypes: state.productTypes.filter(productType => {
                    return productType.id !== action.payload.id;
                })
            }
        default:
            return state;
    }
}