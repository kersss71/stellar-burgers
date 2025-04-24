import React from 'react';
import { useAppSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { isAuth, user } = useAppSelector((state) => state.userSlice);
  const location = useLocation();

  if (!isAuth) {
    return <Preloader />;
  }

  if (!user) {
    <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to='/' />;
  }

  if (!onlyUnAuth && !user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
