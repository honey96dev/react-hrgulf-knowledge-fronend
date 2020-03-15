import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBIcon, MDBRow, MDBStep, MDBStepper} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import VoteService from "services/VoteService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import AnswerList from "./partial/AnswerList";

import "./QuestionsPage.scss";

export default () => {
  const {packageId, page, page2} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);

  const currentPage = page ? parseInt(page) : 1;
  const itemsCount = items.length - 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [page, t]);

  const loadData = e => {
    VoteService.getPackage({packageId})
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
    VoteService.questions({packageId, page, userId: auth.user.id})
      .then(res => {
        if (res.result === SUCCESS) {
          let lastIndex = 0;
          for (let item of res.data) {
            if (!item.answered) break;
            lastIndex++;
          }
          setCurrentIndex(lastIndex);
          setLastIndex(lastIndex);
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

  const handleUpdate = ({questionId, answerId}) => {
    VoteService.update({page, userId: auth.user.id, packageId, questionId, answerId})
      .then(res => {
        if (res.result === SUCCESS) {
          let lastIndex = 0;
          for (let item of res.data) {
            if (!item.answered) break;
            lastIndex++;
          }
          setCurrentIndex(currentIndex + 1);
          setLastIndex(lastIndex);
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

  const handlePageChange = page => {
    history.push(`${routes.vote.all}/${page}`);
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("VOTE.QUESTIONS")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('VOTE.VOTE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={`${routes.vote.current}/${page2}`}>{t('NAVBAR.VOTE.CURRENT')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('VOTE.QUESTIONS')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !items.length && <Fragment>
        <h4 className="text-primary font-weight-bold no-data-section p-0 text-center">{t("COMMON.ERROR.NO_DATA")}</h4>
      </Fragment>}
      {!loading && !!items.length && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center h3-response">{t('VOTE.VOTE')}</h3>
          <p className="text-left"><span className="font-weight-bold">{t("VOTE.PACKAGE")}: </span>{packageName}</p>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12}>
          <div className="survey-card z-depth-1">
            <MDBStepper vertical className="text-left">
              {items.map((item, index) => (
                <MDBStep key={index} className={`${!!item.answered || index <= lastIndex ? "completed" : ""}`}>
                  <a onClick={e => (!!item.answered || index <= lastIndex) && setCurrentIndex(index)}>
                    <span className="circle">{index + 1}</span>
                    {!!item.answered && <span className="label text-left white-text">{t("COMMON.COMPLETE.COMPLETED")}</span>}
                  </a>
                  {index === currentIndex && <Fragment>
                    <div className="step-content lighten-4 white-text">
                      <h6 className="mb-0">{item.question}</h6>
                    </div>
                    <div className="step-content mt-3">
                      <AnswerList data={item} onUpdate={handleUpdate}/>
                    </div>
                  </Fragment>}
                </MDBStep>
              ))}
            </MDBStepper>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
