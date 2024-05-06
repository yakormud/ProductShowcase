import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.jsx';
import Product from './Product.jsx';
import Login from './Login.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App/>} />
            <Route path="/product/:id" element={<Product/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    </BrowserRouter>
);
