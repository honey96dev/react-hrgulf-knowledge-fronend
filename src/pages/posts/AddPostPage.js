import React, {Fragment, useState} from "react";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow
} from "mdbreact";
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useFormState} from "react-use-form-state";
import {useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";

import routes from "core/routes";
import {ALERT_DANGER, TEXTAREA_ROWS2, TRANSITION_TIME} from "core/globals";
import PostsService from "services/PostsService";

import "./AddPostPage.scss";

export default ({}) => {
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);
  const history = useHistory();


  const [alert, setAlert] = useState({});
  const [postId, setPostId] = useState(null);
  const [formState, {text, textarea}] = useFormState();

  const {values: {title, description, media}, touched} = formState;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let res = await PostsService.save({userId: auth.user.id, id: postId, title, description, media});
      !postId && setPostId(res.data.insertId);
      setAlert({
        show: true,
        color: res.result,
        message: res.message,
      });
    } catch (err) {
      setAlert({
        show: true,
        color: ALERT_DANGER,
        message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
      });
    }
  };

  const handleGoBack = e => {
    history.goBack();
  };

  // console.log(formState);
  return (
    <Fragment>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.posts.all}>{t('NAVBAR.POSTS.POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.POSTS.ADD')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBCard>
        <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{t("NAVBAR.POSTS.ADD")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={8}>
                <MDBInput label={t("POSTS.TITLE")} outline {...text("title")}>
                  {touched.title && title.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.TITLE")})}</div>}
                </MDBInput>
                <MDBInput label={t("POSTS.DESCRIPTION")} outline {...textarea("description")} type="textarea" rows={TEXTAREA_ROWS2} >
                  {touched.description && description.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.DESCRIPTION")})}</div>}
                </MDBInput>
              </MDBCol>
              <MDBCol md={4}>
                <MDBInput label={t("POSTS.MEDIA")} outline {...text("media")} >
                  {touched.media && media.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.MEDIA")})}</div>}
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title || !title.length || !description || !description.length || !media || !media.length}>{t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </Fragment>
  )
};
