import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";
import {CSSTransition} from "react-transition-group";

import Posts from "components/Posts";
import Loading from "components/Loading";
import ErrorNoData from "components/ErrorNoData";
import Pagination from "components/Pagination";
import TopicsList from "components/TopicsList";
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
  const [topicList, setTopicList] = useState([]);
  const [topicChecked, setTopicChecked] = useState([]);
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
    setAlert({});
    PostsService.topics()
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
    loadItems();
  }, [page, t, topicChecked]);

  const loadItems = e => {
    PostsService.list({page, topics: topicChecked})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          for (let item of res.data) {
            item["media"].length && (item["media"] = (item["media"].startsWith("http://") || item["media"].startsWith("https://")) ? item["media"] : sprintf("%s%s", apis.assetsBaseUrl, item["media"]));
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
  };

  const handleTopicChange = e => {
    setTopicChecked(e);
  };
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
      <MDBRow>
        <MDBCol md={12}>
          <CSSTransition in={alert.show} classNames="fade-transition" timeout={TRANSITION_TIME} unmountOnExit appear>
            <MDBAlert color={alert.color} dismiss onClosed={() => setAlert({})}>{alert.message}</MDBAlert>
          </CSSTransition>
        </MDBCol>
        <MDBCol md={9} className="order-1 order-md-0">
          {!loading && !posts.length && <ErrorNoData/>}
          {!loading && !!posts.length && <Fragment>
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
            <div className="full-width text-left">
              <Link to={routes.posts.add}>
                <MDBBtn size="sm" color="primary" rounded >
                  {t("NAVBAR.POSTS.ADD")}
                </MDBBtn>
              </Link>
            </div>
            <Posts items={posts} detailLabel={t("COMMON.BUTTON.READ_MORE")} detailLink={routes.posts.detail} />
            <div className="mt-5 text-center">
              <Pagination circle current={currentPage} pageCount={pageCount} onChange={handlePageChange}/>
            </div>
          </Fragment>}
        </MDBCol>
        <MDBCol md={3} className="order-0 order-md-1">
          <div className="topic-list text-left">
            <TopicsList topics={topicList} onUpdate={handleTopicChange} />
          </div>
        </MDBCol>
      </MDBRow>
    </Fragment>
  )
};
