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

const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
  });


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider store={store}>
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App/>} />
            <Route path="/product/:id" element={<Product/>} />
            <Route path="/addProduct" element={
                <RequireAuth fallbackPath={'/'}>
                    <AddProduct/>
                </RequireAuth>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </BrowserRouter>
    </AuthProvider>
    
);
