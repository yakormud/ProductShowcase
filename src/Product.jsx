import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import './App.css'; // นำเข้าไฟล์ CSS

function Product() {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const queryParameters = new URLSearchParams(window.location.search);
    const productId = queryParameters.get("id");

    useEffect(() => {
        axios.get(`http://localhost:80/product/${productId}`)
            .then((res) => {
                setProduct(res.data);

                // ทำคำขอเพิ่มเติมสำหรับข้อมูลหมวดหมู่
                return axios.get(`http://localhost:80/category/${res.data.CategoryID}`);
            })
            .then((res) => {
                setCategory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching product or category:', error);
            });
    }, [productId]);

    return (
        <>
            <Navbar />
            <div className="product-container">
                <h1 className="product-name">{product.ProductName}</h1>
                {product.PathToPhoto && <img src={product.PathToPhoto} alt={product.ProductName} className="product-image" />}
                <p className="product-price">Price: ${product.ProductPrice}</p>
                <div className="product-details">
                    <p><strong>Description:</strong> {product.ProductDetail}</p>
                    <p><strong>Category:</strong> {category.CategoryID}</p>
                    <p><strong>Stock:</strong> {product.ProductStock}</p>
                </div>
            </div>
        </>
    );
}

export default Product;
