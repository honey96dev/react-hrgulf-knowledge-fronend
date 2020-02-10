import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import routes from "core/routes";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import Error404 from "components/Error404";
import images from "core/images";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

import "./RootPage.scss";

export default () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Navbar/>
      <MDBContainer>
        <MDBRow className={"section mb-5"}>
          <MDBCol lg="3" md="0"/>
          <MDBCol lg="6" md="12">
            <Switch>
              <Route path={routes.auth.signIn} component={SignInPage}/>
              <Route path={routes.auth.signUp} component={SignUpPage}/>
              <Route path={routes.auth.forgotPassword} component={ForgotPasswordPage}/>
              <Route path={`${routes.auth.resetPassword}/:email?/:token?`} component={ResetPasswordPage}/>
              <Route component={Error404}/>
            </Switch>
          </MDBCol>
          <MDBCol lg="3" md="0"/>
        </MDBRow>
      </MDBContainer>
      <Footer/>
      <BackToTop/>
    </Fragment>
  );
}
