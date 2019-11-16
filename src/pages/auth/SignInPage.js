import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {MDBAlert, MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBModalFooter, MDBRow} from "mdbreact";
import {useDispatch, useSelector} from "react-redux";

import auth from "actions/auth";
import UserService from "services/UserService";
import {
  ALERT_LIFETIME,
  DEFAULT_EMAIL,
  DEFAULT_PASSWORD,
  isDev,
  PASSWORD_MIN_LENGTH,
  SUCCESS, TRANSITION_TIME,
  UNKNOWN_SERVER_ERROR
} from "core/globals";
import routes from "core/routes";
import validators from "core/validators";
import {ALERT_SUCCESS, ALERT_DANGER} from "core/globals";

import "./SignInPage.scss";
import {CSSTransition} from "react-transition-group";

export default (props) => {
  const signedIn = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [email, setEmail] = useState(isDev ? DEFAULT_EMAIL : "");
  const [password, setPassword] = useState(isDev ? DEFAULT_PASSWORD : "");

  useEffect(() => {

  });

  const handleSignIn = async event => {
    event.preventDefault();
    try {
      const params = {email, password};
      dispatch(auth.requestSignIn(params));
      setLoading(true);
      let res = await UserService.signIn(params);
      setLoading(false);
      if (res.result === SUCCESS) {
        dispatch(auth.successSignIn(res.data));
      } else {
        dispatch(auth.failureSignIn(res.message));
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: res.message,
        });
      }
    } catch (err) {
      setLoading(false);
      dispatch(auth.failureSignIn(UNKNOWN_SERVER_ERROR));
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
      });
    }
  };

  return (
    <MDBCard>
      <MDBCardBody className="mx-md-4 mx-sm-1">
        <form onSubmit={handleSignIn}>
          <div className="text-center">
            <h3 className="dark-grey-text mb-5">
              <strong>{t("AUTH.SIGN_IN")}</strong>
            </h3>
          </div>
          <div className="grey-text">
            <MDBInput id="email" name="name" type="email" label={t("AUTH.EMAIL")} background value={email} getValue={setEmail} onBlur={() => setTouched(Object.assign({}, touched, {email: true}))}>
              {touched.email && !validators.isEmail(email) && <div className="invalid-field">
                {email.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")}) : !validators.isEmail(email) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")}) : ""}
              </div>}
            </MDBInput>
            <MDBInput id="password" name="password" label={t("AUTH.PASSWORD")} type="password" background containerClass="mb-0" value={password} getValue={setPassword} onBlur={() => setTouched(Object.assign({}, touched, {password: true}))}>
              {touched.password && password.length < PASSWORD_MIN_LENGTH && <div
                className="invalid-field">{password.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PASSWORD")}) : t("COMMON.VALIDATION.MIN_LENGTH", {
                field: t("AUTH.PASSWORD"),
                length: PASSWORD_MIN_LENGTH
              })}</div>}
            </MDBInput>
          </div>
          <p className="font-small blue-text d-flex justify-content-end pb-3">
            <a className="blue-text ml-1">{t("AUTH.FORGOT_PASSWORD")}</a>
          </p>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
          <div className="text-center mb-3 mx-5">
            <MDBBtn type="submit" color="indigo" rounded className="full-width z-depth-1a"
                    disabled={loading || !validators.isEmail(email) || password.length < PASSWORD_MIN_LENGTH}>
              {!loading && <MDBIcon icon={"sign-in-alt"}/>}
              {!!loading && <div className="spinner-grow spinner-grow-sm" role="status"/>}
              {t("AUTH.SIGN_IN")}
            </MDBBtn>
          </div>
        </form>
      </MDBCardBody>
      <MDBModalFooter className="mx-5 pt-3 mb-1">
        <p className="font-small grey-text d-flex justify-content-end">
          {t("AUTH.NOT_REGISTERED")}
          <Link to={routes.auth.signUp} className="blue-text ml-1">{t("AUTH.SIGN_UP")}</Link>
        </p>
      </MDBModalFooter>
    </MDBCard>
  );
};
