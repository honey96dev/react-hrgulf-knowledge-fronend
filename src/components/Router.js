import React from "react";
import {Switch, Route} from "react-router-dom";

const AuthPage = React.lazy(() => import("pages/auth/AuthPage"));

export default () => (
  <Switch>
    <Route path={"/auth"} component={AuthPage}/>
    <Route
      render={() => (<h1>Not Found</h1>)}
    />
  </Switch>
);
