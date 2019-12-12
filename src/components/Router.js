import React, {lazy} from "react";
import {Switch, Route} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/AuthPage"));
const ProfilePage = lazy(() => import("pages/profile/ProfilePage"));
const FrontPage = lazy(() => import("pages/front/FrontPage"));
const PostsPage = lazy(() => import("pages/posts/PostsPage"));
const NewsPage = lazy(() => import("pages/news/NewsPage"));
const VideoPage = lazy(() => import("pages/video/VideoPage"));
const QuestionnairePage = lazy(() => import("pages/questionnaire/RootPage"));
const VotePage = lazy(() => import("pages/vote/VotePage"));
const ContactPage = lazy(() => import("pages/contact/ContactPage"));

export default () => (
  <Switch>
    <Route path={"/"} exact component={FrontPage}/>
    <SignedOutRoute path={routes.auth.root} component={AuthPage}/>
    <SignedInRoute path={routes.profile.root} component={ProfilePage}/>
    <Route path={routes.posts.root} component={PostsPage}/>
    <Route path={routes.news.root} component={NewsPage}/>
    <Route path={routes.video.root} component={VideoPage}/>
    <Route path={routes.questionnaire.root} component={QuestionnairePage}/>
    <Route path={routes.vote.root} component={VotePage}/>
    <Route path={routes.contact.root} component={ContactPage}/>
    {/*<Route path={routes.admin} exact render={() => (window.location.href = `${routes.admin}/`)}/>*/}
    <Route component={Error404Page}/>
  </Switch>
);
