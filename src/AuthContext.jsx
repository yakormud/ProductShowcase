import React, { createContext, useState, useEffect } from 'react';
import { isAuth } from './isAuth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     const authorization = axios.defaults.headers.common["Authorization"];
    //     if (authorization) {
    //         setAuth(true);
    //     }else{
    //         setAuth(false);
    //     }
    // }, []);

    // useEffect(() => {
    //     const token = sessionStorage.getItem('token');      
    //     if (token) {
    //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //         setAuth(true);
    //         // console.log(isAuth());
    //     }else{
    //         setAuth(false);
    //     }
    // }, []);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                setAuth(true);
            } catch (error) {
                sessionStorage.removeItem('token');
                setAuth(false);
            }
        } else {
            setAuth(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {/* {children} */}
            {auth === null ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;