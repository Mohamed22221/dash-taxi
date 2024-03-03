import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";
import { useCookies } from "react-cookie";

const AuthProtected = (props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  // const { userProfile, loading, token } = useProfile();
  useEffect(() => {
    if (!cookies.user) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      );
    }
  }, [cookies.user]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!cookies.user) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };