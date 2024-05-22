import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar';
import React, { useState, useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import defaultimage from './assets/adidas.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from './AuthContext';

const AddProduct = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const goBack = () => {
        navigate('/'); // Navigate back to the "/" page
    };
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        price: '',
        stock: '',
        description: '',
        picture: '',
    });

    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);



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
        console.log(formData);
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



    const handleRemovePhoto = () => {
        setFormData({ ...formData, picture: null });
        document.querySelector('input[type="file"]').value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            await axios.post('http://localhost:80/uploadproducts', formDataToSend);
            console.log('Product added successfully!');

            // Show success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product added successfully!',
            });

            // Clear form fields
            setFormData({
                productName: '',
                productCategory: '',
                price: '',
                stock: '',
                description: '',
                picture: '',
            });

            // Reset file input value
            document.querySelector('input[type="file"]').value = null;
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add product. Please try again later.',
            });
        }
    };

    return (
        <div>
            <Navbar />
            {
                auth &&
                <div className="add-product-container">
                    <div className="back-arrow" onClick={goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back</span>
                    </div>
                    <h2>Add Product</h2>
                    <div className='sub-add-product-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='add-product-img'>
                                <label>
                                    Picture:
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="picture"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </label>
                                <div className='img-container'>
                                    <img src={formData.picture ? URL.createObjectURL(formData.picture) : defaultimage} alt="Product Preview" />
                                    {formData.picture && (<button type="button" onClick={handleRemovePhoto}>Remove Photo</button>)}
                                </div>
                            </div>


                            <div className='add-product-form'>
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
                                    Unit in Stock:
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
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

                                {isSubmitting ? (
                                    <button type="submit" disabled={true}>Loading...</button>
                                ) : (
                                    <button type="submit">Submit</button>
                                )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddProduct;