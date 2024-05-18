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
      });
    
      const onUpdateField = e => {
        const nextFormState = {
          ...form,
          [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
      };
      
      const onSubmitForm = e => {
        e.preventDefault();
        
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