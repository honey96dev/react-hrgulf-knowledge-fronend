import React from "react";
import {Switch, Route} from "react-router-dom";
import i18n from "i18next";

import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

import "./AuthPage.scss";
import {useTranslation} from "react-i18next";
import {MDBCard, MDBCol, MDBContainer, MDBRow} from "mdbreact";

export default () => {
  const {t} = useTranslation();
  const changeLanguage = () => {
    const lang = t("CODE");
    i18n.changeLanguage(lang === "en" ? "ar" : "en");
  };

  return (
    <>
      <button onClick={changeLanguage}>{t("NAME")}</button>
      <MDBContainer>
        <MDBRow className={"section"}>
          <MDBCol lg="3" md="0"/>
          <MDBCol lg="6">
            <Switch>
              <Route path={"/auth/sign-in"} component={SignInPage}/>
              <Route path={"/auth/sign-up"} component={SignUpPage}/>
              <Route
                render={function () {
                  return <h1>Not Found</h1>;
                }}
              />
            </Switch>
          </MDBCol>
          <MDBCol lg="3" md="0"/>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
