import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import LoadingPage from "pages/common/LoadingPage";
// import PostsPage from "../pages/posts/PostsPage";

const AuthPage = React.lazy(() => import("pages/auth/AuthPage"));
const FrontPage = React.lazy(() => import("pages/front/FrontPage"));
const PostsPage = React.lazy(() => import("pages/posts/PostsPage"));
const ProfilePage = React.lazy(() => import("pages/profile/ProfilePage"));

export default () => (
  <Switch>
    <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
    <Route path={routes.posts.root} component={PostsPage}/>
    <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
    <Route path={"/"} component={FrontPage}/>
    <Route component={LoadingPage}/>
  </Switch>
);
