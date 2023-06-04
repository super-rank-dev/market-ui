class Product {
    constructor(data) {
        const { name, price, typeId } = data;
        this.name = name;
        this.price = price;
        this.type_id = typeId;
    }
}

export default Product;