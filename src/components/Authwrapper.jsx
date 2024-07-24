import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    alert("please login first to access this page!")
    return <Navigate to="/clientLogin" replace />;
  }

  return children;
};

export default AuthWrapper;