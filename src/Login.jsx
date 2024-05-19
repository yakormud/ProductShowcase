import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState,useContext } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from './AuthContext';
const Login = () => {
    const { setAuth } = useContext(AuthContext);

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

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:80/auth`, form)
            console.log(res.data);

            if (res.data.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
                setAuth(true);
                Swal.fire({ icon: 'success', title: 'done!', text: 'done!' });
            } else {
                delete axios.defaults.headers.common["Authorization"];
                setAuth(false); 
                Swal.fire({ icon: 'error', title: 'Error!', text: 'Invalid credentials' });
            }

            Swal.fire({
                icon: 'success',
                title: 'done!',
                text: 'done!',
            })
            
            console.log("Headers before request:", axios.defaults.headers);


        }
        catch (err) {
            console.log(err); ''
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err,
            });
        }
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