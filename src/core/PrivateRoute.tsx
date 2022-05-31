import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "./loading";
import { isLoggedIn } from "./utils";

export default function PrivateRoute(props: { children: boolean | React.ReactFragment | React.ReactPortal | Element | null | undefined; fallback?: any; lazy?: any; }) {
    let loggedIn = isLoggedIn();
    const location = useLocation();
    const { children, fallback, lazy } = props;
  
    if (!loggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to={fallback ? fallback : "/"} state={{ from: location }} replace />;
    }
  
    return lazy ? <Loading>{ children }</Loading> : <>{ children } </>;
}
