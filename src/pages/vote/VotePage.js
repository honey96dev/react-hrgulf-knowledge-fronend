import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import AllVotePage from "./AllVotePage";
import routes from "core/routes";

import "./VotePage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={routes.vote.all} exact component={AllVotePage}/>
          <Route path={`${routes.vote.all}/:page`} exact component={AllVotePage}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
