import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react'
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Swal from 'sweetalert2';

const Login = () => {
    const signIn = useSignIn();
    const [user, setUsers] = useState([]);

    
    
    const [form, setForm] = useState({
        username: "",
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
        
        axios.post(`http://localhost:80/auth`, form).then((res) => {
            
            if(res.status === 200){
                if(signIn({
                    auth: {
                        token: res.data.token,
                        type: 'Bearer'
                    },
                    refresh: res.data.refreshToken,
                    userState: res.data.authUserState
                })){ 
                    console.log(res.data);
                }
            }
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add product. Please try again later.',
                    showCloseButton: true,
                });
            });
    };


    return (<form onSubmit={onSubmitForm}>
        <div className="mb-3">
            <label className="form-label">Username</label>
            <input
                className="form-control"
                type="text"
                aria-label="Email field"
                name="username"
                value={form.username}
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