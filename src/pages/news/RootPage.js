import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBContainer} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import AllNewsPage from "./AllNewsPage";
import NewsDetailPage from "./NewsDetailPage";
import routes from "core/routes";

import "./RootPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <MDBContainer className={"section"}>
        <Switch>
          <Route path={`${routes.news.detail}/:id`} component={NewsDetailPage}/>
          <Route path={`${routes.news.all}/:page?`} exact component={AllNewsPage}/>
          <Route component={Error404}/>
        </Switch>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
