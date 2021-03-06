import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {
  MDBAlert,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBDatePicker,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOption,
  MDBSelectOptions,
} from "mdbreact";
import {useDispatch} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {
  ALERT_DANGER,
  DATE_FORMAT_ISO,
  DEFAULT_CITY,
  DEFAULT_COMPANY,
  DEFAULT_EMAIL,
  DEFAULT_FATHER_NAME,
  DEFAULT_FIRST_NAME,
  DEFAULT_JOB_TITLE,
  DEFAULT_LAST_NAME,
  DEFAULT_PASSWORD,
  DEFAULT_PHONE,
  DEFAULT_SECTOR,
  DEFAULT_USERNAME,
  GENDER_FEMALE,
  GENDER_MALE,
  isDev,
  PASSWORD_MIN_LENGTH,
  PHONE_PREFIX_BAHRAIN,
  PHONE_PREFIX_KUWAIT,
  PHONE_PREFIX_OMAN,
  PHONE_PREFIX_QATAR,
  PHONE_PREFIX_SAUDI_ARABIA,
  PHONE_PREFIX_UAE,
  SUCCESS,
  TRANSITION_TIME,
  UNKNOWN_SERVER_ERROR,
  USERNAME_MAX_LENGTH
} from "core/globals";
import routes from "core/routes";
import validators from "core/validators";
import images from "core/images";
import Service from "services/AuthService";
import auth from "actions/auth";

import "./SignUpPage.scss";

// import "moment/locale/ar";

export default (props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});

  const [email, setEmail] = useState(isDev ? DEFAULT_EMAIL : "");
  const [username, setUsername] = useState(isDev ? DEFAULT_USERNAME : "");
  const [firstName, setFirstName] = useState(isDev ? DEFAULT_FIRST_NAME : "");
  const [fatherName, setFatherName] = useState(isDev ? DEFAULT_FATHER_NAME : "");
  const [lastName, setLastName] = useState(isDev ? DEFAULT_LAST_NAME : "");
  const [gender, setGender] = useState(isDev ? GENDER_MALE : "");
  const [birthday, setBirthday] = useState(isDev ? new Date() : "");
  const [jobTitle, setJobTitle] = useState(isDev ? DEFAULT_JOB_TITLE : "");
  const [sector, setSector] = useState(isDev ? DEFAULT_SECTOR : "");
  const [company, setCompany] = useState(isDev ? DEFAULT_COMPANY : "");
  // const [country, setCountry] = useState("");
  const [city, setCity] = useState(isDev ? DEFAULT_CITY : "");
  const [countryCode, setCountryCode] = useState(isDev ? PHONE_PREFIX_SAUDI_ARABIA : "");
  const [phone, setPhone] = useState(isDev ? DEFAULT_PHONE : "");
  const [password, setPassword] = useState(isDev ? DEFAULT_PASSWORD : "");
  const [password2, setPassword2] = useState(isDev ? DEFAULT_PASSWORD : "");

  useEffect(() => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
  }, [props]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const birthdayStr = birthday.toISOString().substr(0, 10);
      const params = {email, username, firstName, fatherName, lastName, gender, birthday: birthdayStr, jobTitle, sector, company, city, countryCode, phone, password};
      dispatch(auth.requestSignUp(params));
      let res = await Service.signUp(params);
      if (res.result === SUCCESS) {
        dispatch(auth.successSignUp(res.data));
      } else {
        dispatch(auth.failureSignUp(res.message));
      }
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      dispatch(auth.failureSignUp(UNKNOWN_SERVER_ERROR));
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
        <title>{t("AUTH.SIGN_UP")} - {t("SITE_NAME")}</title>
      </Helmet>
      <div className="admin-nav text-right">
        <MDBBtn href={routes.admin2} size="sm" rounded color="indigo">{t("COMMON.BUTTON.ADMIN_PAGE")}</MDBBtn>
      </div>
      <div className="text-center">
        <img className="logo-img mb-5" src={images.ghcs200}/>
      </div>
      <MDBCard className="auth-bg">
        <MDBCardBody className="mx-md-4 mx-sm-1">
          <MDBRow className="text-center">
            <MDBCol className="col-6 col-lg-4">
              <Link to={routes.auth.signIn}><p className="text-white h5">{t("AUTH.SIGN_IN")}</p></Link>
            </MDBCol>
            <MDBCol className="col-6 col-lg-4 underlined white-border">
              <p className="text-white h5">{t("AUTH.SIGN_UP")}</p>
            </MDBCol>
          </MDBRow>
          <form onSubmit={handleSubmit}>
            {/*<div className="text-center">*/}
            {/*  <h3 className="dark-grey-text mb-3 h1-responsive">*/}
            {/*    <strong>{t("AUTH.SIGN_UP")}</strong>*/}
            {/*  </h3>*/}
            {/*</div>*/}
            <div className="white-text">
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="email" name="email" type="email" label={t("AUTH.EMAIL")} background containerClass="mb-0" value={email} getValue={setEmail} onBlur={() => setTouched(Object.assign({}, touched, {email: true}))}>
                    {touched.email && !validators.isEmail(email) && <div className="text-left invalid-field2">
                      {email.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")}) : !validators.isEmail(email) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.EMAIL")}) : ""}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="username" name="username" type="text" label={t("AUTH.USERNAME")} background containerClass="mb-0" value={username} getValue={setUsername} onBlur={() => setTouched(Object.assign({}, touched, {username: true}))}>
                    {touched.username && !validators.isUsername(username) && <div className="text-left invalid-field2">
                      {username.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.USERNAME")}) : username.length > USERNAME_MAX_LENGTH ? t('COMMON.VALIDATION.MAX_LENGTH', {field: t('AUTH.USERNAME'), length: t("CODE") === "en" ? USERNAME_MAX_LENGTH : "٢٠"}) : !validators.isUsername(username) ? t("COMMON.VALIDATION.INVALID", {field: t("AUTH.USERNAME")}) : ""}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="firstName" name="firstName" type="text" label={t("AUTH.FIRST_NAME")} background containerClass="mt-3 mb-0" value={firstName} getValue={setFirstName} onBlur={() => setTouched(Object.assign({}, touched, {firstName: true}))}>
                    {touched.firstName && firstName.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.FIRST_NAME")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="fatherName" name="fatherName" type="text" label={t("AUTH.FATHER_NAME")} background containerClass="mt-3 mb-0" value={fatherName} getValue={setFatherName} onBlur={() => setTouched(Object.assign({}, touched, {fatherName: true}))}>
                    {touched.fatherName && fatherName.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.FATHER_NAME")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="lastName" name="lastName" type="text" label={t("AUTH.LAST_NAME")} background containerClass="mt-3 mb-0" value={lastName} getValue={setLastName} onBlur={() => setTouched(Object.assign({}, touched, {lastName: true}))}>
                    {touched.lastName && lastName.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.LAST_NAME")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBSelect label={t('AUTH.GENDER')} className="mt-3 mb-0 white" selected={[gender]} getValue={val => setGender(val[0])} >
                    <MDBSelectInput selected={[gender]} />
                    <MDBSelectOptions>
                      <MDBSelectOption value={GENDER_MALE} checked={gender === GENDER_MALE}>{t("COMMON.GENDER.MALE")}</MDBSelectOption>
                      <MDBSelectOption value={GENDER_FEMALE} checked={gender === GENDER_FEMALE}>{t("COMMON.GENDER.FEMALE")}</MDBSelectOption>
                    </MDBSelectOptions>
                  </MDBSelect>
                  {!!gender && gender.length === 0 && <div className="text-left invalid-field2">
                    {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.GENDER")})}
                  </div> }
                </MDBCol>
                <MDBCol md={6}>
                  <MDBDatePicker format={DATE_FORMAT_ISO} autoOk keyboard /*locale={moment.locale(t("CODE"))}*/ background className="date-picker white grey-text" value={birthday} getValue={val => setBirthday(val)}
                                 // TextFieldComponent={<MDBInput label={t("AUTH.BIRTHDAY")}/>}
                  />
                  <label className="date-picker-label">{t("AUTH.BIRTHDAY")}</label>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="jobTitle" name="jobTitle" type="text" label={t("AUTH.JOB_TITLE")} background containerClass="mt-3 mb-0" value={jobTitle} getValue={setJobTitle} onBlur={() => setTouched(Object.assign({}, touched, {jobTitle: true}))}>
                    {touched.jobTitle && jobTitle.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.JOB_TITLE")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="sector" name="sector" type="text" label={t("AUTH.SECTOR")} background containerClass="mt-3 mb-0" value={sector} getValue={setSector} onBlur={() => setTouched(Object.assign({}, touched, {sector: true}))}>
                    {touched.sector && sector.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.SECTOR")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="company" name="company" type="text" label={t("AUTH.COMPANY")} background containerClass="mt-3 mb-0" value={company} getValue={setCompany} onBlur={() => setTouched(Object.assign({}, touched, {company: true}))}>
                    {touched.company && company.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.COMPANY")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="city" name="city" type="text" label={t("AUTH.CITY")} background containerClass="mt-3 mb-0" value={city} getValue={setCity} onBlur={() => setTouched(Object.assign({}, touched, {city: true}))}>
                    {touched.city && city.length === 0 && <div className="text-left invalid-field2">
                      {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.CITY")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBSelect label={t('AUTH.COUNTRY_CODE')} className="mt-3 mb-0 white" selected={[countryCode]} getValue={val => setCountryCode(val[0])} >
                    <MDBSelectInput selected={[countryCode]} />
                    <MDBSelectOptions>
                      <MDBSelectOption value={PHONE_PREFIX_BAHRAIN} checked={countryCode === PHONE_PREFIX_BAHRAIN}>{PHONE_PREFIX_BAHRAIN} - {t("COMMON.GCC_COUNTRIES.BAHRAIN")}</MDBSelectOption>
                      <MDBSelectOption value={PHONE_PREFIX_KUWAIT} checked={countryCode === PHONE_PREFIX_KUWAIT}>{PHONE_PREFIX_KUWAIT} - {t("COMMON.GCC_COUNTRIES.KUWAIT")}</MDBSelectOption>
                      <MDBSelectOption value={PHONE_PREFIX_OMAN} checked={countryCode === PHONE_PREFIX_OMAN}>{PHONE_PREFIX_OMAN} - {t("COMMON.GCC_COUNTRIES.OMAN")}</MDBSelectOption>
                      <MDBSelectOption value={PHONE_PREFIX_QATAR}
                                       checked={countryCode === PHONE_PREFIX_QATAR}>{PHONE_PREFIX_QATAR} - {t("COMMON.GCC_COUNTRIES.QATAR")}</MDBSelectOption>
                      <MDBSelectOption value={PHONE_PREFIX_SAUDI_ARABIA} checked={countryCode === PHONE_PREFIX_SAUDI_ARABIA}>{PHONE_PREFIX_SAUDI_ARABIA} - {t("COMMON.GCC_COUNTRIES.SAUDI_ARABIA")}</MDBSelectOption>
                      <MDBSelectOption value={PHONE_PREFIX_UAE} checked={countryCode === PHONE_PREFIX_UAE}>{PHONE_PREFIX_UAE} - {t("COMMON.GCC_COUNTRIES.UAE")}</MDBSelectOption>
                    </MDBSelectOptions>
                  </MDBSelect>
                  {!!countryCode && countryCode.length === 0 && <div className="text-left invalid-field2">
                    {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.COUNTRY_CODE")})}
                  </div> }
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="phone" name="phone" type="text" label={t("AUTH.PHONE")} background containerClass="mt-3 mb-0" value={phone} getValue={setPhone} onBlur={() => setTouched(Object.assign({}, touched, {phone: true}))}>
                    {touched.phone && (phone.length === 0 || !validators.isPhoneNumber(`${countryCode}${phone}`)) && <div className="text-left invalid-field2">
                      {!phone.length ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PHONE")}) : t("COMMON.VALIDATION.INVALID", {field: t("AUTH.PHONE")})}
                    </div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <MDBInput id="password" name="password" label={t("AUTH.PASSWORD")} type="password" background containerClass="mt-3" value={password} getValue={setPassword} onBlur={() => setTouched(Object.assign({}, touched, {password: true}))}>
                    {touched.password && password.length < PASSWORD_MIN_LENGTH && <div
                      className="text-left invalid-field2">{password.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PASSWORD")}) : t("COMMON.VALIDATION.MIN_LENGTH", {
                      field: t("AUTH.PASSWORD"),
                      length: PASSWORD_MIN_LENGTH
                    })}</div>}
                  </MDBInput>
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput id="password2" name="password2" label={t("AUTH.PASSWORD2")} type="password" background containerClass="mt-3" value={password2} getValue={setPassword2} onBlur={() => setTouched(Object.assign({}, touched, {password2: true}))}>
                    {touched.password2 && (password2.length < PASSWORD_MIN_LENGTH || password2 !== password) && <div
                      className="text-left invalid-field2">{password2.length === 0 ? t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.PASSWORD2")}) : password2.length < PASSWORD_MIN_LENGTH ? t("COMMON.VALIDATION.MIN_LENGTH", {
                      field: t("AUTH.PASSWORD2"),
                      length: PASSWORD_MIN_LENGTH
                    }) : t("COMMON.VALIDATION.NOT_SAME", {field: t("AUTH.PASSWORD")})}</div>}
                  </MDBInput>
                </MDBCol>
              </MDBRow>
            </div>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <div className="text-center mt-4 mb-3 mx-5">
              <MDBBtn type="submit" color="white" rounded className="full-width z-depth-1a blue-grey-text" disabled={loading || !validators.isEmail(email) || !username.length || username.length > USERNAME_MAX_LENGTH || !validators.isUsername(username) || !firstName.length || !fatherName.length || !lastName.length || !gender.length || !jobTitle.length || !sector.length || !company.length || !city.length || !countryCode.length || !phone.length || !validators.isPhoneNumber(`${countryCode}${phone}`) || !password.length || password.length < PASSWORD_MIN_LENGTH || password2 !== password || password.length < PASSWORD_MIN_LENGTH }>
                {!loading && <MDBIcon icon={"user-plus"} />}
                {!!loading && <div className="spinner-grow spinner-grow-sm" role="status"/>}
                {t("AUTH.SIGN_UP")}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
        {/*<MDBModalFooter className="mx-5 pt-3 mb-1">*/}
        {/*  <p className="font-small grey-text d-flex justify-content-end">*/}
        {/*    {t("AUTH.ALREADY_REGISTERED")}*/}
        {/*    <Link to={routes.auth.signIn} className="blue-text ml-1">{t("AUTH.SIGN_IN")}</Link>*/}
        {/*  </p>*/}
        {/*</MDBModalFooter>*/}
      </MDBCard>
    </Fragment>
  );
};
