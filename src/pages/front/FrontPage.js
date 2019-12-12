import React, {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import routes from "core/routes";
import images from "core/images";

import "./FrontPage.scss";

export default () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.HOME")} - {t("SITE_NAME")}</title>
      </Helmet>
      <Navbar/>
      <MDBContainer className="section no-max-width">
        <MDBRow>
          <MDBCol md={12}>
            <h2 className="welcome-message text-center font-weight-bold mb-5">{t("FRONT.WELCOME_MESSAGE")}</h2>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-5">
          <MDBCol md={4} lg={2}>
            <Link to={routes.posts.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.post} waves />
                <MDBCardBody>
                  <MDBCardText>{t("FRONT.POST_DESCRIPTION")}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol md={4} lg={2}>
            <Link to={routes.news.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.news} waves />
                <MDBCardBody>
                  <MDBCardText>{t("FRONT.NEWS_DESCRIPTION")}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol md={4} lg={2}>
            <Link to={routes.video.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.video} waves />
                <MDBCardBody>
                  <MDBCardText>{t("FRONT.VIDEO_DESCRIPTION")}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol md={4} lg={2}>
            <Link to={routes.posts.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.questionnaire} waves />
                <MDBCardBody>
                  <MDBCardText>{t("FRONT.QUESTIONNAIRE_DESCRIPTION")}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol md={4} lg={2}>
            <Link to={routes.vote.result}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.vote} waves />
                <MDBCardBody>
                  <MDBCardText>{t("FRONT.VOTE_DESCRIPTION")}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer/>
      {/*<Loader />*/}
    </Fragment>
  );
}
