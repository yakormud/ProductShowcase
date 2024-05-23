import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import api from './api';

function Product() {
    const [product, setProduct] = useState({});
    const [categoryMap, setCategoryMap] = useState({});
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const productId = queryParameters.get("id");
    const [status, setStatus] = useState(false);

    useEffect(() => {
        api.get(`/product/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setStatus(true);
            })
            .catch((error) => {
                console.error('Error fetching product or category:', error);
            });
    }, [productId]);

    useEffect(() => {
        api.get(`/category`, {
        }).then(res => res.data)
            .then(categoryData => {
                setCategories(categoryData);
                const categoryHashMap = categoryData.reduce((map, category) => {
                    map[category.CategoryID] = category.CategoryName;
                    return map;
                }, {});
                setCategoryMap(categoryHashMap);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const goBack = () => {
        navigate('/'); // Navigate back to the "/" page
    };

    return (
        <>
            <Navbar />
            {
                status === false ? (<p className="loading">Loading...</p>) : (
                    <div>
                        <div className="back-arrow" onClick={goBack}>
                            <FontAwesomeIcon icon={faArrowLeft} className='left80'/>
                            <span>Back</span>
                        </div>
                        <div className="product-container">
                            <h1 className="product-name">{product.ProductName}</h1>
                            {product.PathToPhoto && <img src={product.PathToPhoto} alt={product.ProductName} className="product-image" />}
                            <p className="product-price">Price : {product.ProductPrice} $</p>
                            <div className="product-details">
                                <p><strong>Description :</strong> {product.ProductDetail}</p>
                                <p><strong>Category :</strong> {categoryMap[product.CategoryID] || 'Category Not Found'}</p>
                                <p><strong>Stock :</strong> {product.ProductStock}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Product;
