import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import adidaspic from './assets/adidas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:80/product`, {
    }).then((res) => res.data).then(data => {
      setProducts(data);
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <div className='catalog-container'>
      <div className='sort-bar'>
        <h2>Filter Option</h2>
        <h3>price</h3>
      </div>
      <div className='content-bar'>
        <div className='content-header'>
          <h2>Products</h2>
          <div className='search-wrap'>
            <input type='text'></input>
            <div className='fit-content'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
        <div className='flex-center width90'>
          {products.map(product => (
            <div className="card" key={product.ProductID}>
              {/* <img src={`url_to_your_image_directory/${product.ProductID}.jpg`} alt={product.ProductName} /> */}
              <img src={adidaspic} alt={product.ProductName} />
              <div className="card-details">
                <h3>{product.ProductName}</h3>
                <p>Price: ${product.UnitPrice}</p>
                <p>In Stock: {product.UnitsInStock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog
