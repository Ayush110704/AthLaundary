import React from 'react';
import { Navigate } from 'react-router-dom';

// Wrap any admin route with this so it can't be reached by just typing
// the URL — it requires a token + session that only exist after a real login.
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const session = localStorage.getItem('adminSession');

  if (!token || !session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;