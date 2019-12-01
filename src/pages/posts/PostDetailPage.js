import React, {Fragment, useEffect, useState} from "react";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import {Link, useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";
import {Helmet} from "react-helmet";

import routes from "core/routes";
import apis from "core/apis";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loading from "components/Loading";
import Error404 from "components/Error404";
import LatestPosts from "components/LatestPosts";
import LatestNews from "components/LatestNews";
import PostDetail from "./partial/PostDetail";
import WriteComment from "./partial/WriteComment";
import Comments from "./partial/Comments";
import PostsService from "services/PostsService";

import "./PostDetailPage.scss";


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
    PostsService.get({id, userId: !!auth.user ? auth.user.id : undefined})
      .then(res => {
        if (res.result === SUCCESS) {
          res.data["media"] = (res.data["media"].startsWith("http://") || res.data["media"].startsWith("https://")) ? res.data["media"] : sprintf("%s%s", apis.assetsBaseUrl, res.data["media"]);
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
    PostsService.commentList({postId: id})
      .then(res => {
        if (res.result === SUCCESS) {
          setComments(res.data);
        }
      })
      .catch(err => {

      })
  }, [id]);

  const handleGoBack = e => {
    history.goBack();
  };

  return (
    <div>
      <Helmet>
        <title>{t("POSTS.DETAIL.POST_DETAIL")} - {t("SITE_NAME")}</title>
      </Helmet>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.posts.all}>{t('NAVBAR.POSTS.POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('POSTS.DETAIL.POST_DETAIL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <Loading/>}
      {!loading && (!data || !data.id) && <Error404 />}
      {!loading && !!data && !!data.id && <Fragment>
        <MDBRow>
          <MDBCol md={12}>
            <div className="full-width text-left">
              <MDBBtn size="sm" color="warning" onClick={handleGoBack}>
                {t("COMMON.BUTTON.BACK")}
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={8}>
            <PostDetail data={data} comments={comments.length}/>
            {data.userId !== (!!auth.user ? auth.user.id : -1) && !data.commentId && <WriteComment commentId={data.id} />}
            {!!data.commentId && <MDBAlert className="mt-5 mb-3" color="warning">{t("POSTS.DETAIL.ALREADY_WROTE_COMMENT")}</MDBAlert>}
            <Comments data={comments} />
          </MDBCol>
          <MDBCol md={4}>
            <div className="mt-10">
              <LatestNews detailLink={routes.news.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>
            </div>
            <div className="mt-10">
              <LatestPosts detailLink={routes.posts.detail} detailLabel={t("COMMON.BUTTON.DETAILS")}/>
            </div>
          </MDBCol>
        </MDBRow>
      </Fragment>}
    </div>
  )
};
