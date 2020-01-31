import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBStep,
  MDBStepper
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import Service from "services/QuestionnaireService";
import {ALERT_DANGER, SCOPE_CURRENT, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import AnswerList from "./partial/AnswerList";

import "./QuestionsPage.scss";

export default () => {
  const {scope, packageId, page, page2} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});

  const currentPage = page ? parseInt(page) : 1;
  const itemsCount = items.length - 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  const loadData = e => {
    Service.getPackage({packageId})
      .then(res => {
        if (res.result === SUCCESS) {
          setPackageName(res.data.name);
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
    Service.questions({packageId, page, userId: auth.user.id})
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

  const handleUpdate = ({questionId, answeredIds}) => {
    setAnswers(Object.assign({}, answers, {[questionId]: answeredIds}));
    // Service.update({page, userId: auth.user.id, packageId, questionId, answerId})
    //   .then(res => {
    //     if (res.result === SUCCESS) {
    //       setItems(res.data);
    //       setPageCount(res.pageCount);
    //       setAlert({
    //         ...alert,
    //         show: false,
    //       });
    //     } else {
    //       setAlert({
    //         show: true,
    //         color: ALERT_DANGER,
    //         message: res.message,
    //       });
    //     }
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setAlert({
    //       show: true,
    //       color: ALERT_DANGER,
    //       message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
    //     });
    //     setLoading(false);
    //   });
  };

  const handleSubmit = e => {
    Service.update({page, userId: auth.user.id, packageId, answers})
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
          <MDBStepper vertical className="text-left">
            {items.map((item, index) => (
              <MDBStep key={index} className="completed">
                <a>
                  <span className="circle">{index + 1}</span>
                  {/*{<span className="label text-left">{t("COMMON.COMPLETE.COMPLETED")}</span>}*/}
                </a>
                <Fragment>
                  <div className="step-content grey lighten-4">
                    <h6 className="mb-0">{item.question}</h6>
                  </div>
                  <div className="step-content mt-3">
                    <AnswerList data={item} onUpdate={handleUpdate}/>
                  </div>
                </Fragment>
              </MDBStep>
            ))}
          </MDBStepper>
          <div className="text-left">
            <MDBBtn size="sm" rounded color="indigo" onClick={handleSubmit}>{t("COMMON.BUTTON.DELIVERY")}</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
