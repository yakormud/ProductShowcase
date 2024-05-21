import React, { createContext, useState, useEffect } from 'react';
import { isAuth } from './isAuth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(isAuth());

    useEffect(() => {
        const authorization = axios.defaults.headers.common["Authorization"];
        if (authorization) {
            setAuth(isAuth());
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;