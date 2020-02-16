import React, {Fragment, useEffect, useState} from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBRow} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {animateScroll as scroll} from "react-scroll";
import {sprintf} from "sprintf-js";
import {Helmet} from "react-helmet";

import routes from "core/routes";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import apis from "core/apis";
import Loading from "components/Loading";
import Error404 from "components/Error404";
import MagazineDetail from "./partial/MagazineDetail";
import Service from "services/PostsService";
import LatestNews from "components/LatestNews";

import "./MagazineDetailPage.scss";


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
    Service.getMagazine({id, userId: !!auth.user ? auth.user.id : undefined})
      .then(res => {
        if (res.result === SUCCESS) {
          !!res.data["media"].length && (res.data["media"] = sprintf("%s%s", apis.assetsBaseUrl, res.data["media"]));
          setData(res.data);
          console.log(res.data);
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
  }, [id]);

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{t("POSTS.MAGAZINES.MAGAZINE_DETAIL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>{t("NAVBAR.POSTS.POSTS")}</MDBBreadcrumbItem>
        <MDBBreadcrumbItem><Link to={routes.posts.magazines}>{t("NAVBAR.POSTS.MAGAZINES")}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t("POSTS.MAGAZINES.MAGAZINE_DETAIL")}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && (!data || !data.id) && <Error404 />}
      {!loading && !!data && !!data.id && <Fragment>
        <MDBRow>
          <MDBCol md={8}>
            <MagazineDetail data={data}/>
          </MDBCol>
          <MDBCol md={4}>
            {/*<div className="mt-10">*/}
            {/*  <LatestPosts detailLink={routes.posts.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>*/}
            {/*</div>*/}
            <div className="mt-10">
              <LatestNews detailLink={routes.news.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>
            </div>
          </MDBCol>
        </MDBRow>
      </Fragment>}
    </div>
  )
};
