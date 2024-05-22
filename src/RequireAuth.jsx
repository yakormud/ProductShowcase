import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const RequireAuth = ({ element }) => {
  const { auth } = useContext(AuthContext);
    console.log(auth);
    return auth ? element : <Navigate to="/" />;
};

export default RequireAuth;