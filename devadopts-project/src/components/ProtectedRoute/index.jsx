import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useProfileContext } from '../../contexts/UserContext';

const ProtectedRoute = ({ redirectTo }) => {
  const { userId } = useProfileContext();

  return (userId ? <Outlet /> : <Navigate to={redirectTo} />)
};

export default ProtectedRoute;
