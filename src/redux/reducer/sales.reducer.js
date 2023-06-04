import * as Action from '../action';

const initialState = {
    sales: [],
    salesHistory: []
};

export const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_SALES:
            const sales = action.payload;
            const salesArray = [];
            let count = 0;
            sales.forEach(sale => {
                const filteredItem = salesArray.findIndex(item => item.product_id === sale.product_id);
                if (filteredItem < 0) {
                    salesArray.push({
                        id: count++,
                        product_id: sale.product_id,
                        quantity: 1,
                        sale_price: sale.sale_price,
                        tax_amount: sale.tax_amount,
                        total_price:
                            (Number(sale.sale_price)) *
                            (Number(sale.tax_amount) + 100) / 100
                    });
                }
                else {
                    salesArray[filteredItem].quantity++;
                    salesArray[filteredItem].total_price +=
                        (Number(sale.sale_price)) *
                        (Number(sale.tax_amount) + 100) / 100;
                }
            });
            return {
                ...state,
                sales: salesArray,
                salesHistory: action.payload
            };
        case Action.ADD_SALE:
            const sale = state.sales.filter(sale =>
                sale.product_id === action.payload.product_id
            )[0];
            if (sale) {
                return {
                    ...state,
                    sales: state.sales.map(sale => {
                        if (sale.product_id === action.payload.product_id) {
                            return {
                                ...sale,
                                quantity: sale.quantity + 1
                            };
                        }
                        return sale;
                    })
                }
            }
            else {
                const sale = action.payload;
                return {
                    ...state,
                    sales: [...state.sales, {
                        id: state.sales.length,
                        product_id: sale.product_id,
                        quantity: 1,
                        sale_price: sale.sale_price,
                        tax_amount: sale.tax_amount,
                        total_price:
                            (Number(sale.sale_price)) *
                            (Number(sale.tax_amount) + 100) / 100
                    }]
                }
            }
        default:
            return state;
    }
}