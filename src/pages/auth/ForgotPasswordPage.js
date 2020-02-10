import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {MDBAlert, MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {CSSTransition} from "react-transition-group";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {Formik} from "formik";

import auth from "actions/auth";
import {
  ALERT_DANGER,
  ALERT_SUCCESS,
  INVALID,
  REQUIRED,
  SUCCESS,
  TRANSITION_TIME,
  UNKNOWN_SERVER_ERROR
} from "core/globals";
import validators from "core/validators";
import Service from "services/AuthService";

import "./ForgotPasswordPage.scss";
import images from "../../core/images";
import {Link} from "react-router-dom";
import routes from "../../core/routes";

export default (props) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
  }, [props]);

  const handleSubmit = async ({email}) => {
    // event.preventDefault();
    try {
      const params = {email};
      setLoading(true);
      let res = await Service.sendForgotPasswordMail(params);
      setLoading(false);
      setAlert({
        show: true,
        color: res.result === SUCCESS ? ALERT_SUCCESS : ALERT_DANGER,
        message: res.message,
      });
    } catch (err) {
      setLoading(false);
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
      });
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("AUTH.FORGOT_PASSWORD")} - {t("SITE_NAME")}</title>
      </Helmet>
      <div className="admin-nav text-center">
        <img className="logo-img mb-5" src={images.ghcs200}/>
      </div>
      <MDBCard className="auth-bg">
        <MDBCardBody className="mx-md-4 mx-sm-1">
          <MDBRow className="text-center">
            <MDBCol className="col-12 underlined white-border">
              <p className="text-white h5">{t("AUTH.FORGOT_PASSWORD")}</p>
            </MDBCol>
          </MDBRow>
          <Formik
            initialValues={{email: ""}}
            validate={({email}) => {
              const errors = {};
              if (!email.length) {
                errors["email"] = REQUIRED;
              } else if (!validators.isEmail(email)) {
                errors["email"] = INVALID;
              }

              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}>
            {({values: {email}, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting}) => (
              <form onSubmit={handleSubmit}>
                <div className="white-text mt-5">
                  <MDBInput id="email" name="email" type="email" icon="envelope" label={t("AUTH.EMAIL")} background
                            value={email}
                            onChange={handleChange} onBlur={handleBlur}>
                    {touched.email && errors.email === REQUIRED && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")})}
                    </div>}
                    {touched.email && errors.email === INVALID && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")})}
                    </div>}
                  </MDBInput>
                </div>
                <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit
                               appear>
                  <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
                </CSSTransition>
                <div className="text-center mt-4 mb-3 mx-5">
                  <MDBBtn type="submit" color="white" rounded className="full-width z-depth-1a blue-grey-text"
                          disabled={loading || (!!errors && !!Object.keys(errors).length)}>
                    {!loading && <MDBIcon icon={"lock"}/>}
                    {!!loading && <div className="spinner-grow spinner-grow-sm" role="status"/>}
                    {t("AUTH.RESET_PASSWORD")}
                  </MDBBtn>
                </div>
                <p className="font-small white-text d-flex justify-content-end pb-3">
                  <Link className="ml-1 white-text" to={routes.auth.signIn}>{t("AUTH.SIGN_IN")}</Link>
                </p>
              </form>
            )}
          </Formik>
        </MDBCardBody>
      </MDBCard>
    </Fragment>
  );
};
