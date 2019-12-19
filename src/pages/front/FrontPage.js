import React, {Fragment} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow} from "mdbreact";
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
      <MDBContainer className="section front-section no-max-width">
        <MDBRow>
          <MDBCol md={12}>
            <h2 className="welcome-message text-center font-weight-bold mb-5">{t("FRONT.WELCOME_MESSAGE")}</h2>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-5 row-only-in-sm">
          <MDBCol className="mb-5">
            <Link to={routes.posts.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.post} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.POSTS.POSTS")}</p>
                  {/*<MDBCardText>{t("FRONT.POST_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.news.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.news} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.NEWS")}</p>
                  {/*<MDBCardText>{t("FRONT.NEWS_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.video.all}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.video} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.VIDEO")}</p>
                  {/*<MDBCardText>{t("FRONT.VIDEO_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.questionnaire.result}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.questionnaire} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}</p>
                  {/*<MDBCardText>{t("FRONT.QUESTIONNAIRE_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.vote.result}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.vote} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.VOTE.VOTE")}</p>
                  {/*<MDBCardText>{t("FRONT.VOTE_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.contact.us}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.contactUs} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.CONTACT.US")}</p>
                  {/*<MDBCardText>{t("FRONT.CONTACT_US_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.contact.consultants}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.consultants} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("NAVBAR.CONTACT.CONSULTANTS")}</p>
                  {/*<MDBCardText>{t("FRONT.CONSULTANTS_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
          <MDBCol className="mb-5">
            <Link to={routes.about.portal}>
              <MDBCard className="section-card">
                <MDBCardImage className="img-fluid card-image mx-auto" src={images.about} waves />
                <MDBCardBody>
                  <p className="h5 text-center text-black-50">{t("ABOUT.ABOUT_THE_KNOWLEDGE_PORTAL")}</p>
                  {/*<MDBCardText>{t("FRONT.CONSULTANTS_DESCRIPTION")}</MDBCardText>*/}
                </MDBCardBody>
              </MDBCard>
            </Link>
          </MDBCol>
        </MDBRow>
        {/*<MDBRow>*/}
        {/*  <MDBCol md={12}>*/}
        {/*    <ContactUsPage/>*/}
        {/*  </MDBCol>*/}
        {/*  <MDBCol md={12}>*/}
        {/*    <ConsultantsPage/>*/}
        {/*  </MDBCol>*/}
        {/*</MDBRow>*/}
      </MDBContainer>
      <Footer/>
      {/*<Loader />*/}
    </Fragment>
  );
}
