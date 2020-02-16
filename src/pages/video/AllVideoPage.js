import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import Videos from "components/Videos";
import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import SectionsList from "components/SectionsList";
import Service from "services/VideoService";

import "./AllVideoPage.scss";

export default () => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const [sectionList, setSectionList] = useState([]);
  const [sectionChecked, setSectionChecked] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    Service.list({page, sections: sectionChecked})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          setItems(res.data);
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

    Service.sections({})
      .then(res => {
        if (res.result === SUCCESS) {
          setSectionList(res.data);
        } else {
          setSectionList([]);
        }
      })
      .catch(err => {
        setSectionList([]);
      });
  }, [page, t, sectionChecked]);

  const handlePageChange = page => {
    history.push(`${routes.video.all}/${page}`);
  };
  
  return (
    <Fragment>
      <Helmet>
        <title>{t("VIDEO.VIDEO")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>{t('VIDEO.VIDEO')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      <MDBRow>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={9} className="order-1 order-md-0">
          {!loading && !items.length && <ErrorNoData/>}
          {!loading && !!items.length && <Fragment>
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
            <div className="full-width text-left">
              <Link to={routes.video.add}>
                <MDBBtn size="sm" color="primary">
                  {t("NAVBAR.VIDEO.ADD")}
                </MDBBtn>
              </Link>
            </div>
            <Videos items={items} detailLink={routes.video.detail} />
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </Fragment>}
        </MDBCol>
        <MDBCol md={3} className="order-0 order-md-1">
          <div className="section-list text-left">
            <SectionsList sections={sectionList} onUpdate={setSectionChecked} />
          </div>
        </MDBCol>
      </MDBRow>
    </Fragment>
  )
};
