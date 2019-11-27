import React from "react";
import {Switch, Route} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = React.lazy(() => import("pages/auth/AuthPage"));
const ProfilePage = React.lazy(() => import("pages/profile/ProfilePage"));
const FrontPage = React.lazy(() => import("pages/front/FrontPage"));
const PostsPage = React.lazy(() => import("pages/posts/PostsPage"));
const NewsPage = React.lazy(() => import("pages/news/NewsPage"));
const VideoPage = React.lazy(() => import("pages/video/VideoPage"));

export default () => (
  <Switch>
    <Route path={"/"} exact component={FrontPage}/>
    <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
    <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
    <Route path={routes.posts.root} component={PostsPage}/>
    <Route path={routes.news.root} component={NewsPage}/>
    <Route path={routes.video.root} component={VideoPage}/>
    {/*<Route path={routes.admin} exact render={() => (window.location.href = `${routes.admin}/`)}/>*/}
    <Route component={Error404Page}/>
  </Switch>
);
