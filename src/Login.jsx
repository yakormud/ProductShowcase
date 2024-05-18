import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react'
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';


const Login = () => {
    const signIn = useSignIn();
    const [user, setUsers] = useState([]);

    
    
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
        axios.post(`http://localhost:80/auth`, form).then((res) => {
            if(res.status == 200){
                if(signIn({
                    auth: {
                        token: res.data.token,
                        type: 'Bearer'
                    },
                    refresh: res.data.refreshToken,
                    userState: res.data.authUserState
                })){ 
                    Swal.fire({
                        icon: 'success',
                        title: 'Yes!',
                        text: 'Yes!',
                        showCancelButton: true,
                        confirmButtonText: 'Try Again',
                        cancelButtonText: 'Close',
                    });
                }else {
                    Swal.fire({
                        icon: 'fail',
                        title: 'Failed!',
                        text: 'Invalid Login!',
                        showCancelButton: true,
                        confirmButtonText: 'Try Again',
                        cancelButtonText: 'Close',
                    });
                }
            }
            })
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