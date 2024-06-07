import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userRole, requiredRole }) => {
  if (!userRole || userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
