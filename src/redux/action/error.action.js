export const PRODUCT_ERROR = '[MARKET SYSTEM] PRODUCT ERROR';
export const PRODUCT_TYPE_ERROR = '[MARKET SYSTEM] PRODUCT TYPE ERROR';

export const validateProductForm = (product) => dispatch => {
    const msg = {
        name: 'Input product name.',
        type: 'Input product type',
        price: 'Input correct price'
    };
    if (product.name.length > 0) msg.name = '';
    if (product.type_id.length > 0) msg.type = '';
    if (product.price.length > 0) msg.price = '';
    dispatch({
        type: PRODUCT_ERROR,
        payload: msg
    });
}

export const validateProductTypeForm = (productType) => dispatch => {
    const msg = {
        name: 'Input product name.',
        tax: 'Input correct percentage.'
    };
    if (productType.name.length > 0) msg.name = '';
    if (productType.tax_percentage.length > 0) msg.tax = '';
    dispatch({
        type: PRODUCT_TYPE_ERROR,
        payload: msg
    });
}