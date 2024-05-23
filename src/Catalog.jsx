import { useState, useEffect, useContext } from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom';
import adidaspic from './assets/adidas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './AuthContext';
import api from './api';


function Catalog() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryMap, setCategoryMap] = useState({});
  const [productImages, setProductImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    productCategory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  useEffect(() => {
    api.get(`/product`, {
    }).then((res) => res.data).then(data => {
      setProducts(data);
    }).catch((error) => {
      console.log(error);
    });
    api.get(`/category`, {
    }).then(res => res.data)
      .then(categoryData => {
        setCategories(categoryData);
        // console.log(categories);
        const categoryHashMap = categoryData.reduce((map, category) => {
          map[category.CategoryID] = category.CategoryName;
          return map;
        }, {});
        setCategoryMap(categoryHashMap);
        // console.log(categoryHashMap);
      })
      .catch(error => console.error('Error fetching categories:', error));

  }, []);

  useEffect(() => {
    // Fetch images for products with pictures
    products.forEach(product => {
      if (product.PathToPhoto) {
        const fileName = product.PathToPhoto.split("\\").pop();
        api.get(`/image/${fileName}`)
          .then((res) => res.data)
          .then(data => {
            setProductImages(prevImages => ({
              ...prevImages,
              [product.ProductID]: data // Store the fetched image data
            }));
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    // console.log('All images fetched:', productImages);
  }, [products]);

  const filteredProducts = products.filter(product => {
    // Filter by product name
    const matchesSearch = product.ProductName.toLowerCase().includes(search.toLowerCase());
    // Filter by product category
    const matchesCategory = formData.productCategory === '' || formData.productCategory === product.CategoryID.toString();
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='catalog-container'>
      <div className='sort-bar'>
        <div className='sort-header'>
          <h1>FILTERS</h1>
        </div>
        <label>
          Product Category:
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.CategoryID} value={category.CategoryID}>
                {category.CategoryName}
              </option>
            ))}
          </select>
        </label>
        { auth && (<div className="simplebutton" onClick={() => navigate("/addProduct")}>
                    <p>Add a product</p>
                </div>) }
      </div>
      <div className='content-bar'>
        <div className='content-header'>
          <div className='flex page-header'>
            <h1>PRODUCTS</h1>
            <span>({filteredProducts.length})</span>
          </div>
          <div className='search-wrap'>
            <input type='text' value={search} onChange={handleSearchChange} placeholder='Search products...'></input>
            <div className='fit-content'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
        <div className='flex-center width90'>
          {isLoading ? ( // If loading state 
            <p style={{ margin: 'auto' }}>Loading...</p>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div className="card" key={product.ProductID} onClick={() => navigate(`/product?id=${product.ProductID}`)}>
                    <img
                      src={productImages[product.ProductID] || adidaspic}
                      alt={product.ProductName}
                    />
                    <div className="card-details">
                      <h3>{product.ProductName}</h3>
                      <p>{categoryMap[product.CategoryID] || 'Category Not Found'}</p>
                      <p className='card-price'>${product.ProductPrice}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ margin: 'auto' }}>No products found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog
