import React from "react";
import {Switch, Route} from "react-router-dom";
import Loader from "components/Loader";

import FrontPage from "pages/front/FrontPage";

const AuthPage = React.lazy(() => import("pages/auth/AuthPage"));

export default () => (
  <Switch>
    <Route path={"/auth"} component={AuthPage}/>
    <Route path={"/"} component={FrontPage}/>
    <Route component={Loader}/>
  </Switch>
);
