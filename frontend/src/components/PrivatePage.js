import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/index';

const PrivateRoute = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? (<h1>Welcome</h1>)
      : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
