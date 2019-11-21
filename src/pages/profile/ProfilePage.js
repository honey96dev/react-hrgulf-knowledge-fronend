import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import SignedInRoute from "components/SignedInRoute";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import routes from "core/routes";
import MainPage from "./MainPage";
import MyPostsPage from "./MyPostsPage";
import MyPostDetailPage from "./MyPostDetailPage";

import "./ProfilePage.scss";

export default (props) => {

  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <SignedInRoute path={routes.profile.main} exact component={MainPage}/>
          <SignedInRoute path={`${routes.profile.myPosts.root}`} exact component={MyPostsPage}/>
          <SignedInRoute path={`${routes.profile.myPosts.root}/:page`} exact component={MyPostsPage}/>
          <SignedInRoute path={`${routes.profile.myPosts.detail}/:id`} component={MyPostDetailPage}/>
          <SignedInRoute path={`${routes.profile.main}/:tab`} component={MainPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
