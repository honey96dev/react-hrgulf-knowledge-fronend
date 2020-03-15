import React, {Fragment, useEffect, useMemo, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow, MDBStep, MDBStepper} from "mdbreact";
import MDBFileupload from "mdb-react-fileupload";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import {
  ALERT_DANGER,
  ALERT_SUCCESS,
  FILEUPLOAD_MAXSIZE1,
  PREFIX_CHECKBOX,
  PREFIX_INPUT,
  SUCCESS,
  TRANSITION_TIME
} from "core/globals";
import ext2mime from "core/ext2mime";
import routes from "core/routes";
import Loading from "components/Loading";
import MakeFilePreview from "components/MakeFilePreview";
import Service from "services/QuestionnaireService";
import AnswerCheckbox from "./partial/AnswerCheckbox";
import AnswerInput from "./partial/AnswerInput";

import "./QuestionsPage.scss";
import apis from "core/apis";

export default () => {
  const {scope, packageId, page, page2} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [requireAttachment, setRequireAttachment] = useState(false);
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attachment, setAttachment] = useState("");
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState({});

  const [deliverable, setDeliverable] = useState(false);

  // const extensions = ["jpg", "jpeg", "png"];

  const fileRef = useRef(null);

  const currentPage = page ? parseInt(page) : 1;
  const itemsCount = items.length - 1;

  const loadData = e => {
    Service.getPackage({packageId})
      .then(res => {
        if (res.result === SUCCESS) {
          const {name, requireAttachment, attachment} = res.data;
          setPackageName(name);
          setRequireAttachment(requireAttachment);
          setAttachment(!!attachment ? `${apis.assetsBaseUrl}${attachment}` : "");
          setAlert({
            ...alert,
            show: false,
          });
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

    Service.questions({packageId, page, userId: auth.user && auth.user.id})
      .then(res => {
        if (res.result === SUCCESS) {
          setItems(res.data);
          setPageCount(res.pageCount);
          setAlert({
            ...alert,
            show: false,
          });
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  };

  const handleUpdate = ({questionId, type, answer}) => {
    setAnswers(Object.assign({}, answers, {[questionId]: {type, answer}}));
  };

  const handleSubmit = e => {
    const formData = new FormData();
    formData.append("questionnaireId", packageId);
    auth.user && formData.append("userId", auth.user.id);
    formData.append("packageId", packageId);
    formData.append("answers", JSON.stringify(answers));
    file && formData.append("file", file);
    // Service.update({page, userId: auth.user && auth.user.id, packageId, answers})
    Service.update(formData)
      .then(res => {
        if (res.result === SUCCESS) {
          setItems(res.data);
          setPageCount(res.pageCount);
          setAlert({
            show: true,
            color: ALERT_SUCCESS,
            message: res.message,
          });
          scroll.scrollToTop({
            duration: TRANSITION_TIME,
          });
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  };

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  useMemo(e => {
    const keys = Object.keys(isValid);
    let result = true;
    if (!!keys.length) {
      keys.map(key => {
        !isValid[key] && (result = false);
      });
    }
    if (!attachment.length && !file) {
      result = false;
    }
    setDeliverable(result);
  }, [isValid, attachment, file]);

  useMemo(e => {
    if (!!fileRef.current && !!attachment.length) {
      const name = attachment.split("/").pop();
      const ext = attachment.split(".").pop();
      const mime = ext2mime[`.${ext}`];
      if (!mime || !mime.startsWith("image")) {
        const div = document.createElement("div");
        const root = document.querySelector("#file .file-upload");
        ReactDOM.render(
          <MakeFilePreview container={div} name={name} ext={ext}/>,
          root.appendChild(div)
        );
      }
    }
  }, [fileRef.current, attachment]);

  return (
    <Fragment>
      <Helmet>
        <title>{t("QUESTIONNAIRE.QUESTIONS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('QUESTIONNAIRE.QUESTIONNAIRE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.questionnaire.current}/${page2}`}>{t('NAVBAR.QUESTIONNAIRE.CURRENT')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('QUESTIONNAIRE.QUESTIONS')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !items.length && <Fragment>
        <h4 className="text-primary font-weight-bold no-data-section p-0 text-center">{t("COMMON.ERROR.NO_DATA")}</h4>
      </Fragment>}
      {!loading && !!items.length && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center h3-response">{t('QUESTIONNAIRE.QUESTIONNAIRE')}</h3>
          <p className="text-left"><span className="font-weight-bold">{t("QUESTIONNAIRE.PACKAGE")}: </span>{packageName}</p>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12}>
          <div className="survey-card z-depth-1 pb-4">
            <MDBStepper vertical className="text-left">
              {items.map((item, index) => (
                <MDBStep key={index} className="completed">
                  <a>
                    <span className="circle">{index + 1}</span>
                    {/*{<span className="label text-left">{t("COMMON.COMPLETE.COMPLETED")}</span>}*/}
                  </a>
                  <Fragment>
                    <div className="step-content lighten-4 white-text">
                      <h6 className="mb-0">{item.question}</h6>
                    </div>
                    <div className="step-content mt-3">
                      {item.type === PREFIX_CHECKBOX && <AnswerCheckbox data={item} onUpdate={handleUpdate}/>}
                      {item.type === PREFIX_INPUT && <AnswerInput data={item} onUpdate={handleUpdate} onIsValid={setIsValid}/>}
                    </div>
                  </Fragment>
                </MDBStep>
              ))}
            </MDBStepper>
            {!loading && <div className="md-form">
              <div id="file" className="fileupload-wrapper mx-auto">
                <p className="text-white">{t("QUESTIONNAIRE.ATTACHMENT")}</p>
                <MDBFileupload
                  ref={fileRef}
                  defaultFileSrc={attachment} getValue={setFile} showRemove={false} maxFileSize={FILEUPLOAD_MAXSIZE1}
                  // allowedFileExtensions={extensions}
                  messageDefault={t("COMMON.FILE_UPLOAD.DEFAULT")} messageReplace={t("COMMON.FILE_UPLOAD.REPLACE")}
                  messageRemove={t("COMMON.FILE_UPLOAD.REMOVE")} messageError={t("COMMON.FILE_UPLOAD.ERROR")}
                  errorFileSize={t("COMMON.FILE_UPLOAD.ERROR_FILESIZE", {max: FILEUPLOAD_MAXSIZE1})}
                  // errorFileExtension={t("COMMON.FILE_UPLOAD.ERROR_FILEEXTENSION", {extensions: extensions.join(", ")})}
                />
              </div>
            </div>}
            <div className="ml-4 text-left">
              <MDBBtn size="sm" rounded color="indigo" onClick={handleSubmit} disabled={!deliverable}>{t("COMMON.BUTTON.DELIVERY")}</MDBBtn>
            </div>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
