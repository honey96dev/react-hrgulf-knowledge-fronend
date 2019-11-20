import React, {Fragment, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {MDBAlert, MDBBtn, MDBCardBody, MDBCol, MDBInput} from "mdbreact";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useFormState} from "react-use-form-state";

import routes from "core/routes";
import {ALERT_DANGER, SUCCESS, TEXTAREA_ROWS1, TRANSITION_TIME} from "core/globals";
import PostsService from "services/PostsService";
import {CSSTransition} from "react-transition-group";

export default ({commentId}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [alert, setAlert] = useState({});
  const [written, setWritten] = useState(false);
  const [formState, {textarea}] = useFormState();

  const pathname = history.location.pathname;
  const {values: {comment}, touched} = formState;

  const handleSubmit = e => {
    e.preventDefault();

    PostsService.writeComment({commentId, userId: auth.user.id, comment})
      .then(res => {
        setWritten(res.result === SUCCESS);
        setAlert({
          show: true,
          color: res.result,
          message: res.message,
        });
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
      })
  };

  return (
    <Fragment>
      <h4 className="font-weight-bold mt-5 mb-3 p-0 text-left">
        <strong>{t("POSTS.DETAIL.WRITE")} <span className="blue-text">{t("POSTS.DETAIL.COMMENT")}</span></strong>
      </h4>
      {!!auth.signedIn && <form onSubmit={handleSubmit} className="text-left">
        <MDBInput label={t("POSTS.DESCRIPTION")} outline {...textarea("comment")} type="textarea" containerClass="mb-2" rows={TEXTAREA_ROWS1} >
          {touched.comment && comment.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.DETAIL.COMMENT")})}</div>}
        </MDBInput>
        <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
          <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
        </CSSTransition>
        <Fragment>
          <MDBBtn type="submit" color="indigo" size="sm" disabled={!!written || !comment || !comment.length}>{t("COMMON.BUTTON.SEND")}</MDBBtn>
        </Fragment>
      </form>}
      {!auth.signedIn && <Fragment>
        <MDBAlert color="warning">
          {t("POSTS.DETAIL.REQUIRE_SIGN_IN")} <Link to={`${routes.auth.signIn}?redirect=${pathname}`} className="blue-text">{t("AUTH.SIGN_IN")}</Link>
        </MDBAlert>
      </Fragment>}
    </Fragment>
  )
};
