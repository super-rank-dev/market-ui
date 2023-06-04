import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import store from './redux';

import ProductsPage from './components/products/ProductsPage';
import ProductTypesPage from './components/product-types/ProductTypesPage';
import SalesPage from './components/sales/SalesPage';
import SalesHistoryPage from './components/sales/SalesHistoryPage';

import AddProductPage from './components/products/AddProductPage';
import EditProductPage from './components/products/EditProductPage';

import AddTypePage from './components/product-types/AddTypePage';
import EditTypePage from './components/product-types/EditTypePage';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/products" element={<ProductsPage />} />
                    <Route exact path="/types" element={<ProductTypesPage />} />
                    <Route exact path="/sales" element={<SalesPage />} />
                    <Route exact path="/sales-history" element={<SalesHistoryPage />} />

                    <Route exact path="/add-product" element={<AddProductPage />} />
                    <Route exact path="/edit-product/:id" element={<EditProductPage />} />

                    <Route exact path="/add-type" element={<AddTypePage />} />
                    <Route exact path="/edit-type/:id" element={<EditTypePage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
