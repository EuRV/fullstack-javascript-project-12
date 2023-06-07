import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const PrivatePage = ({ children }) => {
  const { loggedIn } = useAuth();

  return (
    loggedIn ? children
      : <Navigate to="/login" replace />
  );
};

export default PrivatePage;
