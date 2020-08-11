import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRoute;
