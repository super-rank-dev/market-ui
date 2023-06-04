import { combineReducers } from "redux";

import { productsReducer } from './products.reducer';
import { typesReducer } from './types.reducer';
import { salesReducer } from './sales.reducer';
import { errorReducer } from './error.reducer';

export const rootReducer = combineReducers({
    productsReducer,
    typesReducer,
    salesReducer,
    errorReducer
});