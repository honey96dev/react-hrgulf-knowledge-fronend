import React from "react";
import {Route, Switch} from "react-router-dom";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BackToTop from "components/BackToTop";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

import "./AuthPage.scss";

export default () => {
  return (
    <>
      <BackToTop/>
      <Navbar/>
      <MDBContainer>
        <MDBRow className={"section mb-5"}>
          <MDBCol lg="3" md="0"/>
          <MDBCol lg="6">
            <Switch>
              <Route path={"/auth/sign-in"} component={SignInPage}/>
              <Route path={"/auth/sign-up"} component={SignUpPage}/>
            </Switch>
          </MDBCol>
          <MDBCol lg="3" md="0"/>
        </MDBRow>
      </MDBContainer>
      <Footer/>
    </>
  );
}
