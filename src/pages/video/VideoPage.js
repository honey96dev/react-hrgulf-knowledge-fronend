import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import AllVideoPage from "./AllVideoPage";
import VideoDetailPage from "./VideoDetailPage";
import routes from "core/routes";

import "./VideoPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.video.detail}/:id`} component={VideoDetailPage}/>
          <Route path={routes.video.all} exact component={AllVideoPage}/>
          <Route path={`${routes.video.all}/:page`} exact component={AllVideoPage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
