import React, { createContext, useState, useEffect } from 'react';
import { isAuth } from './isAuth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     const authorization = axios.defaults.headers.common["Authorization"];
    //     if (authorization) {
    //         setAuth(isAuth());
    //     }
    // }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');      
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuth(true);
            console.log(isAuth());
        }else{
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