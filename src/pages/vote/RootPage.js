import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import SignedInRoute from "components/SignedInRoute";
import routes from "core/routes";
import PackagesPage from "./PackagesPage";
import QuestionsPage from "./QuestionsPage";
import ResultPage from "./ResultPage";

import "./RootPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.vote.all}/:scope/:page?`} exact component={PackagesPage}/>
          <SignedInRoute path={`${routes.vote.questions}/:packageId/:page?/:page2?`} exact component={QuestionsPage}/>
          <Route path={`${routes.vote.result}/:packageId/:page?/:page2?`} exact component={ResultPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
