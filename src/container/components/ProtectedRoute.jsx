import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isAuth, children }) {
  if (isAuth === 'false') {
    return <Navigate to="login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;
