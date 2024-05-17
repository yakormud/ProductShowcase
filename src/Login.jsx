import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react'
import axios from 'axios';



const Login = () => {
    const [user, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/login`, {
        }).then((res) => res.data).then(data => {
            setUsers(data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
      });
    //After the form state is defined, we have the onUpdateField function, which is passed to each input field as an onChange handler. Even though we have three form fields, we don’t need separate handlers for them. We can use just one function by utilizing field’s name attribute as a form key.
      const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
      };
      //Further, the onSubmitForm method will be executed when the form is submitted. At the moment, it just prevents the default form submit behavior and then shows an alert with the form’s values.
      const onSubmitForm = e => {
        e.preventDefault();
        alert(JSON.stringify(form, null, 2));
        alert(user);
      };


    return (<form onSubmit={onSubmitForm}>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input
                className="form-control"
                type="text"
                aria-label="Email field"
                name="email"
                value={form.email}
                onChange={onUpdateField}
            />
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input
                className="form-control"
                type="password"
                aria-label="Password field"
                name="password"
                value={form.password}
                onChange={onUpdateField}
            />
        </div>
       
        <div className="mb-3">
            <button className="btn btn-primary" type="submit">
                Login
            </button>
        </div>
    </form>
    );

}

export default Login