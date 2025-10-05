import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((store) => store.user);

  if (!isAuthChecked) return <Preloader />;

  if (onlyUnAuth && user) return <Navigate to='/' replace />;

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' state={{ from: location }} replace />;

  return children;
};
