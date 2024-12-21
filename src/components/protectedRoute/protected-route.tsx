import { useSelector } from '..//..//services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { selectIsCheck, selectUser } from '..//..//services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isCheck = useSelector(selectIsCheck);

  if (!isCheck) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.pathname || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
