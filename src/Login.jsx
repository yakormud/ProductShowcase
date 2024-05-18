import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react'
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Swal from 'sweetalert2';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
const Login = () => {
    const signIn = useSignIn();
    const [user, setUsers] = useState([]);
    const auth = useAuthUser();


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
        axios.post('http://localhost:80/auth', form)
            .then((res, err) => {
                // console.log(res.data);
                if(err){
                    console.log("error eiei");
                }
                // if (res.status === 200) {
                //     if (signIn({
                //         auth: {
                //             token: 'res.data.token',
                //             type: 'Bearer'
                //         },
                //         authState: {username: form.username},
                //         expireIn: 3600,
                //     })) {
                //         Swal.fire({
                //             icon: 'success',
                //             title: 'done!',
                //             text: 'done!',
                //         });
                //     } else {
                //         Swal.fire({
                //             icon: 'error',
                //             title: 'Error!',
                //             text: err,
                //         });
                //     }
                // }
            }).catch( err => {
                console.log("catch");
            })

        // try{ 
        //     const res = await axios.post(`http://localhost:80/auth`, form)
        //     console.log(res.data);
        //     signIn({
        //         token: res.data.token,
        //         expiresIn: 3600,
        //         tokenType: 'Bearer',
        //         authState: { username : form.username}
        //     });

        //     Swal.fire({
        //         icon: 'done',
        //         title: 'done!',
        //         text: 'done!',
        //     });
        // } 
        // catch(err){
        //     console.log(err);''
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error!',
        //         text: err,
        //     });
        // }
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