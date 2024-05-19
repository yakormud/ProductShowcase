import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App from './App.jsx';
import Product from './Product.jsx';
import AddProduct from './AddProduct.jsx';
import Login from './Login.jsx';
import './index.css';
import AuthProvider from 'react-auth-kit';
import { RequireAuth } from "react-auth-kit";
import createStore from 'react-auth-kit/createStore'; 


ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App/>} />
            <Route path="/product/:id" element={<Product/>} />
            <Route path="/addProduct" element={<AddProduct/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </BrowserRouter>
);
