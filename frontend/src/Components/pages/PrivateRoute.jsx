import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const PrivateRoute = ({ children }) => {
  const { pagesPaths } = routes;
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to={pagesPaths.loginPage()} />;
};

export default PrivateRoute;
