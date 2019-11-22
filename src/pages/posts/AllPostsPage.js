import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";

import Posts from "components/Posts";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import PostsService from "services/PostsService";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import routes from "core/routes";
import apis from "core/apis";

import "./AllPostsPage.scss";

export default ({}) => {
  const {page} = useParams();
  const {t} = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);

  const currentPage = page ? parseInt(page) : 1;

  const handlePageChange = page => {
    history.push(`${routes.posts.all}/${page}`);
  };

  useEffect(e => {
    scroll.scrollToTop({
      duration: TRANSITION_TIME,
    });
    PostsService.list({page})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          for (let item of res.data) {
            item["media"] = (item["media"].startsWith("http://") || item["media"].startsWith("https://")) ? item["media"] : sprintf("%s%s", apis.assetsBaseUrl, item["media"]);
          }
          setPosts(res.data);
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
  }, [page, t]);

  return (
    <Fragment>
      <Helmet>
        <title>{t("NAVBAR.POSTS.ALL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.posts.all}>{t('NAVBAR.POSTS.POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.POSTS.ALL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && <MDBRow>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
        <MDBCol md={12} className="text-left mt-3">
          <div className="full-width">
            <Link to={routes.posts.add}>
              <MDBBtn size="sm" color="primary">
                {t("NAVBAR.POSTS.ADD")}
              </MDBBtn>
            </Link>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          <Posts items={posts} detailLabel={t("COMMON.BUTTON.READ_MORE")} detailLink={routes.posts.detail} />
        </MDBCol>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
      </MDBRow>}
    </Fragment>
  )
};
