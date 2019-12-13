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
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useFormState} from "react-use-form-state";
import {useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {Helmet} from "react-helmet";

import routes from "core/routes";
import {ALERT_DANGER, FILEUPLOAD_MAXSIZE1, SUCCESS, TEXTAREA_ROWS2, TRANSITION_TIME} from "core/globals";
import Service from "services/PostsService";
import TopicsList from "components/TopicsList";

import "./AddPostPage.scss";

export default ({}) => {
  const {t} = useTranslation();
  const {auth} = useSelector(state => state);
  const history = useHistory();

  const [alert, setAlert] = useState({});
  const [topicList, setTopicList] = useState([]);
  const [postId, setPostId] = useState(undefined);
  const [formState, {text, textarea}] = useFormState();
  const [file, setFile] = useState(null);
  const [topics, setTopics] = useState([]);

  const {values: {title, description}, touched} = formState;
  const extensions = ["jpg", "jpeg", "png"];

  useEffect(e => {
    Service.topics()
      .then(res => {
        if (res.result === SUCCESS) {
          setTopicList(res.data);
        } else {
          setTopicList([]);
        }
      })
      .catch(err => {
        setTopicList([]);
      });
  }, [t]);

  const handleTopicUpdate = e => {
    setTopics(e);
  };
  
  const handleSubmit = async e => {
    e.preventDefault();

    console.log(topics);

    try {
      let params = new FormData();
      params.append('userId', auth.user.id);
      !!postId && params.append('id', postId);
      params.append('title', title);
      params.append('description', description);
      params.append('file', file);
      params.append("topicIds", topics);
      let res = await Service.save(params);
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

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.POSTS.ADD")} - {t("SITE_NAME")}</title>
      </Helmet>
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
                <div className="md-form">
                  <MDBFileupload getValue={setFile} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1} allowedFileExtensions={extensions}
                                 messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                                 messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                                 errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                                 errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})} />
                </div>
                <div className="md-form">
                  <TopicsList topics={topicList} onUpdate={handleTopicUpdate}/>
                </div>
              </MDBCol>
            </MDBRow>
            <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
              <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
            </CSSTransition>
            <Fragment>
              <MDBBtn type="submit" color="indigo" size="sm" disabled={!title || !title.length || !description || !description.length || !file}>{t("COMMON.BUTTON.ADD")}</MDBBtn>
              <MDBBtn flat size="sm" onClick={handleGoBack}>{t("COMMON.BUTTON.BACK")}</MDBBtn>
            </Fragment>
          </form>
        </MDBCardBody>
      </MDBCard>
    </Fragment>
  )
};
