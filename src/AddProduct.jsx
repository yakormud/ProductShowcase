import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import defaultimage from './assets/adidas.png';
import axios from 'axios';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        price: '',
        description: '',
        picture: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:80/category`, {
        }).then((res) => res.data).then(data => {
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData({ ...formData, picture: file });
        } else {
            console.log('Please select an image file.');
            e.target.value = null;
        }
    };

    const goBack = () => {
        navigate(-1); // This is equivalent to navigate('back')
      };

    const handleRemovePhoto = () => {
        setFormData({ ...formData, picture: null });
        document.querySelector('input[type="file"]').value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            await axios.post('http://localhost:80/uploadproducts', formDataToSend);
            console.log('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="add-product-container">
                <div className="back-arrow" onClick={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back</span>
                </div>
                <h2>Add Product</h2>
                <div className='sub-add-product-container'>
                    <div className='add-product-img'>
                        <label>
                            Picture:
                            <input
                                type="file"
                                accept="image/*"
                                name="picture"
                                onChange={handleImageChange}
                            />
                        </label>
                        <div className='img-container'>
                            <img src={formData.picture ? URL.createObjectURL(formData.picture) : defaultimage} alt="Product Preview" />
                            {formData.picture && (<button type="button" onClick={handleRemovePhoto}>Remove Photo</button>)}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='add-product-form'>
                        <label>
                            Product Name:
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Product Category:
                            <select
                                name="productCategory"
                                value={formData.productCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.CategoryID} value={category.CategoryID}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;