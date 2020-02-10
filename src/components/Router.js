import React, {lazy} from "react";
import {Switch, Route} from "react-router-dom";

import routes from "core/routes";
import SignedInRoute from "components/SignedInRoute";
import SignedOutRoute from "components/SignedOutRoute";
import Error404Page from "pages/common/Error404Page";

const AuthPage = lazy(() => import("pages/auth/RootPage"));
const ProfilePage = lazy(() => import("pages/profile/RootPage"));
const FrontPage = lazy(() => import("pages/front/RootPage"));
const PostsPage = lazy(() => import("pages/posts/RootPage"));
const NewsPage = lazy(() => import("pages/news/RootPage"));
const VideoPage = lazy(() => import("pages/video/RootPage"));
const QuestionnairePage = lazy(() => import("pages/questionnaire/RootPage"));
const VotePage = lazy(() => import("pages/vote/RootPage"));
const ContactPage = lazy(() => import("pages/contact/RootPage"));
const AboutPage = lazy(() => import("pages/about/RootPage"));

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
    <Route path={routes.about.root} component={AboutPage}/>
    {/*<Route path={routes.admin} exact render={() => (window.location.href = `${routes.admin}/`)}/>*/}
    <Route component={Error404Page}/>
  </Switch>
);
