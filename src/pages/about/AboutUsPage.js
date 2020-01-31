import React, {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBRow} from "mdbreact";
import images from "core/images";

import "./AboutUsPage.scss";

export default () => {
  const {t} = useTranslation();

  const lang = t("CODE");

  const navBar = document.getElementById("nav-bar");
  const topOffset = 60;

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.ABOUT.US")} - {t("SITE_NAME")}</title>
      </Helmet>

      <div className="about-us-section">
        <img src={lang === "en" ? images.aboutUsEn : images.aboutUsAr} className={`about-us-img about-us-img-${lang}`} style={{top: topOffset,}}/>
        <h3 className="font-weight-bold mb-5 text-center h3-response">{t("ABOUT.US.HEADING")}</h3>
        <div className="text-left">
          <h5 className="h5-response">{t("ABOUT.US.DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.POSTS.POSTS")}: </span>{t("ABOUT.US.POSTS_DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.NEWS")}: </span>{t("ABOUT.US.NEWS_DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.VIDEO")}: </span>{t("ABOUT.US.VIDEO_DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}: </span>{t("ABOUT.US.QUESTIONNAIRE_DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.VOTE.VOTE")}: </span>{t("ABOUT.US.VOTE_DESCRIPTION")}</h5>
          <h5 className="h5-response mt-3"><span className="font-weight-bold">{t("NAVBAR.CONTACT.US")}: </span>{t("ABOUT.US.CONTACT_US_DESCRIPTION")}</h5>
        </div>
      </div>
    </Fragment>
  );
}
