# Market System Frontend

## Summary

This is the frontend code for a market system application. It's built with React and Redux, and it provides a user interface for managing products, product types, and sales.

## Running App
- Open cmd window in project root directory
- Run `"npm start"` to start server
- Server running on `localhost:3000`


## Project Architecture
- config
    - `key.js`  
    You can change backend server address here.  
    Currently connect with `localhost:8000`
- model
    - `Product.js`  
    A class that represents a product.
    - `ProductType.js`  
    A class that represents a product type.
    - `Sale.js`  
    A class that represents a sale.
- redux
    - `index.js`  
    The main file that combines all the reducers.
    - action
        - `index.js`  
        A file that exports all the action creators.
        - `error.action.js`  
        A file that contains the action creators for handling errors.
        - `products.action.js`  
        A file that contains the action creators for managing products.
        - `types.action.js`  
        A file that contains the action creators for managing product types.
        - `sales.action.js`  
        A file that contains the action creators for managing sales.
    - reducer
        - `index.js`  
        The main file that combines all the reducers.
        - `error.reducer.js`  
        A reducer that handles errors.
        - `products.reducer.js`  
        A reducer that handles product-related actions.
        - `types.reducer.js`  
        A reducer that handles product type-related actions.
        - `sales.reducer.js`  
        A reducer that handles sales-related actions.
- components
    - layout
        - `Navbar.js`  
        A component that displays the app's header.
        - `Footer.js`  
        A component that displays the app's footer.
    - products
        - `Products.js`  
        A component that displays a list of all the products in the market system, along with details such as the product name, product type, price, and remaining quantity.
        - `AddProduct.js`  
        A component that allows the user to add a new product to the market system by entering the product name, product type, price, and quantity.
        - `EditProduct.js`  
        A component that allows the user to edit an existing product by changing its name, product type, price, or quantity.
    - product-types
        - `ProductTypesPage.js`  
        A component that displays a list of all the product types in the market system, along with details such as the product type name and the number of products associated with it.
        - `AddTypePage.js`  
        A component that allows the user to add a new product type to the market system by entering the product type name.
        - `EditTypePage.js`  
        A component that allows the user to edit an existing product type by changing its name.
    - sales
        - `SalesPage.js`  
        A component that summarize all sales history data.
        - `SalesHistoryPage.js`  
        A component that displays a list of all the sales made in the market system, along with details such as the date of sale, the product sold, the quantity sold, and the price.