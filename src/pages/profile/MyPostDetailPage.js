import React, {Fragment, useEffect, useState} from "react";
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
import MDBFileupload from "mdb-react-fileupload";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useFormState} from "react-use-form-state";
import {useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";

import routes from "core/routes";
import {ALERT_DANGER, FILEUPLOAD_MAXSIZE1, SUCCESS, TEXTAREA_ROWS2, TRANSITION_TIME} from "core/globals";
import PostsService from "services/PostsService";

import "./MyPostDetailPage.scss";
import {sprintf} from "sprintf-js";
import apis from "../../core/apis";

export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);
  const history = useHistory();

  const [alert, setAlert] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [file, setFile] = useState(null);

  const extensions = ["jpg", "jpeg", "png"];

  useEffect(e => {
    PostsService.get({id})
      .then(res => {
        if (res.result === SUCCESS) {
          const data = res.data;
          setTitle(data["title"]);
          setDescription(data["description"]);
          setMedia((data["media"].startsWith("http://") || data["media"].startsWith("https://")) ? data["media"] : sprintf("%s%s", apis.assetsBaseUrl, data["media"]));
          setLoading(false);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
      });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let params = new FormData();
      params.append('userId', auth.user.id);
      params.append('id', id);
      params.append('title', title);
      params.append('description', description);
      params.append('file', file);
      let res = await PostsService.save(params);
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

  console.log(title, description, file);
  return (
    <Fragment>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.profile.main}>{t('PROFILE.PROFILE')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={routes.profile.myPosts.root}>{t('PROFILE.MY_POSTS.MY_POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('PROFILE.MY_POSTS.DETAIL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBCard>
        {!!loading && <MDBCardBody className="mx-md-4 mx-sm-1 text-left">

        </MDBCardBody>}
        {!loading && <MDBCardBody className="mx-md-4 mx-sm-1 text-left">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="dark-grey-text mt-3 mb-0">
                <strong>{t("PROFILE.MY_POSTS.DETAIL")}</strong>
              </h3>
            </div>
            <MDBRow>
              <MDBCol md={8}>
                <MDBInput label={t("POSTS.TITLE")} outline value={title} onChange={e => setTitle(e.target.value)} onBlur={() => setTouched(Object.assign({}, touched, {title: true}))}>
                  {touched.title && title.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.TITLE")})}</div>}
                </MDBInput>
                <MDBInput label={t("POSTS.DESCRIPTION")} outline type="textarea" rows={TEXTAREA_ROWS2} value={description} onChange={e => setDescription(e.target.value)} onBlur={() => setTouched(Object.assign({}, touched, {description: true}))} >
                  {touched.description && description.length === 0 && <div className="invalid-field">{t("COMMON.VALIDATION.REQUIRED", {field: t("POSTS.DESCRIPTION")})}</div>}
                </MDBInput>
              </MDBCol>
              <MDBCol md={4}>
                <div className="md-form">
                  <MDBFileupload getValue={setFile} defaultFileSrc={media} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1} allowedFileExtensions={extensions}
                                 messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                                 messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                                 errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                                 errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})} />
                </div>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title || !title.length || !description || !description.length}>{t("COMMON.BUTTON.SAVE")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>}
      </MDBCard>
    </Fragment>
  )
};
