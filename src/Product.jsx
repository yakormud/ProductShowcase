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
    const [productImage, setProductImage] = useState("");
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
        if (product.PathToPhoto) {
          let fileName;
          if (product.PathToPhoto.includes('\\')) {
            fileName = product.PathToPhoto.split("\\").pop();
          } else {
            fileName = product.PathToPhoto.split('/').pop();
          }
          api.get(`/image/${fileName}`)
            .then((res) => res.data)
            .then(data => {
              setProductImage(data); // Store the fetched image data
              setStatus(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [product]);

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
                            {productImage && <img src={productImage} alt={product.ProductName} className="product-image" />}
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
