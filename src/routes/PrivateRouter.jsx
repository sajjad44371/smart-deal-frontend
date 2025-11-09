import React, { use } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.email) {
    return children;
  } else {
    return <Navigate to="/register" state={location.pathname} replace></Navigate>;
  }
};

export default PrivateRouter;
