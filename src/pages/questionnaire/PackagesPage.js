import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import Service from "services/QuestionnaireService";
import {ALERT_DANGER, SCOPE_CURRENT, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";

import "./PackagesPage.scss";

export default () => {
  const {scope, page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;
  const itemsCount = items.length - 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    loadData();
  }, [scope, page, t]);

  const loadData = e => {
    Service.packages({scope, page, userId: (auth.user ? auth.user.id : undefined)})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
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
    history.push(`${routes.questionnaire.all}/${scope}/${page}`);
  };

  return (
    <Fragment>
      <Helmet>
        <title>{t("QUESTIONNAIRE.QUESTIONNAIRE")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t('NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE')}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{scope === SCOPE_CURRENT ? t('NAVBAR.QUESTIONNAIRE.CURRENT') : t("NAVBAR.QUESTIONNAIRE.PREVIOUS")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && !items.length && <ErrorNoData/>}
      {!loading && !!items.length && <MDBRow>
        <MDBCol md={12}>
          <h3 className="mt-4 font-weight-bold text-center">{scope === SCOPE_CURRENT ? t('NAVBAR.QUESTIONNAIRE.CURRENT') : t("NAVBAR.QUESTIONNAIRE.PREVIOUS")}</h3>
        </MDBCol>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          {items.map((item, index) => (
            <div key={index} className="text-left">
              <h4 className="text-primary font-weight-bold mb-2 p-0"><Link to={`${scope === SCOPE_CURRENT ? routes.questionnaire.questions : routes.questionnaire.result}/${item.id}/1/${page || 1}`}>{item.name}</Link></h4>
              <p>{t("COMMON.BUTTON.QUESTIONS")}: <span className="font-weight-bold">{item.questions}</span></p>
              {index < itemsCount && <hr className="my-3"/>}
            </div>
          ))}
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-3">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
