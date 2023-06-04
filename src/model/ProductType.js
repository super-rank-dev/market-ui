class ProductType {
    constructor(data) {
        const { name, taxPercentage } = data;
        this.name = name;
        this.tax_percentage = taxPercentage;
    }
}

export default ProductType;