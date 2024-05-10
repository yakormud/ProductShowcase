import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import adidaspic from './assets/adidas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:80/product`, {
    }).then((res) => res.data).then(data => {
      setProducts(data);
    }).catch((error) => {
      console.log(error);
    });
    axios.get(`http://localhost:80/category`, {
    }).then(res => res.data)
      .then(categoryData => {
        const categoryHashMap = categoryData.reduce((map, category) => {
          map[category.CategoryID] = category.CategoryName;
          return map;
        }, {});
        setCategoryMap(categoryHashMap);
        console.log(categoryHashMap);
      })
      .catch(error => console.error('Error fetching categories:', error));

  }, []);

  const filteredProducts = products.filter(product => {
    return product.ProductName.toLowerCase().includes(search.toLowerCase());

  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='catalog-container'>
      <div className='sort-bar'>
        <div className='page-header'>
          <h1>FILTERS</h1>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, laborum!</p>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="card" key={product.ProductID}>
                {/* <img src={`url_to_your_image_directory/${product.ProductID}.jpg`} alt={product.ProductName} /> */}
                <img src={adidaspic} alt={product.ProductName} />
                <div className="card-details">
                  <h3>{product.ProductName}</h3>
                  <p>{categoryMap[product.CategoryID] || 'Category Not Found'}</p>
                  <p className='card-price'>${product.UnitPrice}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog
