import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
