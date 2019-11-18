import React from "react";
import {useHistory, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import authActions from "actions/auth";
import routes from "core/routes";

export default ({component, ...props}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const history = useHistory();

  const pathname = history.location.pathname;
  if (!auth.signedIn && pathname !== routes.auth.signIn) {
    // dispatch(authActions.setRedirectUrl(history.location.pathname));
    // history.push(routes.auth.signIn);
  }

  // return (
    {/*<Route component={component} {...props}/>*/}
  // );
  return (
    !auth.signedIn && pathname !== routes.auth.signIn ? <Redirect to={`${routes.auth.signIn}?redirect=${history.location.pathname}`}/> : <Route component={component} {...props}/>
  );
}