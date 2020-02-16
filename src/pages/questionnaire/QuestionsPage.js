import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow, MDBStep, MDBStepper} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import Service from "services/QuestionnaireService";
import {ALERT_DANGER, ALERT_SUCCESS, PREFIX_CHECKBOX, PREFIX_INPUT, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import AnswerCheckbox from "./partial/AnswerCheckbox";
import AnswerInput from "./partial/AnswerInput";

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
  const [isValid, setIsValid] = useState({});

  const [deliverable, setDeliverable] = useState(false);

  const currentPage = page ? parseInt(page) : 1;
  const itemsCount = items.length - 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  useMemo(e => {
    const keys = Object.keys(isValid);
    if (!!keys.length) {
      let result = true;
      keys.map(key => {
        !isValid[key] && (result = false);
      });
      setDeliverable(result);
    }
  }, [isValid]);

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

  const handleUpdate = ({questionId, type, answer}) => {
    setAnswers(Object.assign({}, answers, {[questionId]: {type, answer}}));
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
        <MDBCol md={12} className="survey-card z-depth-1">
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
          <div className="text-left">
            <MDBBtn size="sm" rounded color="indigo" onClick={handleSubmit} disabled={!deliverable}>{t("COMMON.BUTTON.DELIVERY")}</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
