import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useProtectedQuery } from "./redux/apiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUser, setUsername } from "./redux/userSlice";

function ProtectedRoute({ children }) {
  const { data, isError, isLoading, isSuccess } = useProtectedQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data.firstName) {
      dispatch(setUsername(data.firstName));
    }
  }, [dispatch, data, isSuccess]);

  if (!isLoading && isError) {
    dispatch(clearUser());
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
