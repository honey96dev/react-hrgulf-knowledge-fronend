import React, {Fragment, useEffect, useState} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";

import routes from "core/routes";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";
import Error404 from "components/Error404";
import NewsDetail from "./partial/NewsDetail";
import NewsService from "services/NewsService";
import LatestPosts from "components/LatestPosts";
import LatestNews from "components/LatestNews";

import "./NewsDetailPage.scss";


export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    NewsService.get({id, userId: !!auth.user ? auth.user.id : undefined})
      .then(res => {
        if (res.result === SUCCESS) {
          setData(res.data);
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
        console.log(err);
        setAlert({
          show: true,
          color: ALERT_DANGER,
          message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
        });
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{t("NEWS.DETAIL.NEWS_DETAIL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.news.all}>{t('NEWS.NEWS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NEWS.DETAIL.NEWS_DETAIL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && (!data || !data.id) && <Error404 />}
      {!loading && !!data && !!data.id && <Fragment>
        <MDBRow>
          <div className="full-width text-left">
            <MDBBtn size="sm" color="warning" onClick={handleGoBack}>
              {t("COMMON.BUTTON.BACK")}
            </MDBBtn>
          </div>
        </MDBRow>
        <MDBRow>
          <MDBCol md={8}>
            <NewsDetail data={data}/>
          </MDBCol>
          <MDBCol md={4}>
            <div className="mt-10">
              <LatestPosts detailLink={routes.posts.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>
            </div>
            <div className="mt-10">
              <LatestNews detailLink={routes.news.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>
            </div>
          </MDBCol>
        </MDBRow>
      </Fragment>}
    </div>
  )
};
