import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios';


function Product() {
    const [product, setProduct] = useState({});


    useEffect(() => {
        axios.get('http://localhost:80/product/17')
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, []);

    return (
        <>
        <Navbar />
        <h3>{productId}</h3>
        <h3>{product.ProductName}</h3>
        </>
    );
}


export default Product