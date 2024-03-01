import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import jwt from 'jsonwebtoken'; // Add this import

interface PrivateWrapperProps {
  children: ReactNode;
  requiredRole?: string;
}

const PrivateWrapper: React.FC<PrivateWrapperProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken: { role: string } = jwt.decode(token) as { role: string };
  
  if (requiredRole && decodedToken.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default PrivateWrapper;
