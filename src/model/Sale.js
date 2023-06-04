class Sale {
    constructor(product, productTypes) {
        const productType = productTypes.filter(productType => productType.id === product.type_id)[0];
        this.product_id = product.id;
        this.sale_price = product.price;
        this.tax_amount = productType.tax_percentage;
    }
}

export default Sale;