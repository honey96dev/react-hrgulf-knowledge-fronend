import React, {Fragment, useEffect, useState} from "react";
import {MDBAlert, MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBIcon, MDBRow} from "mdbreact";
import {Link, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {sprintf} from "sprintf-js";
import {animateScroll as scroll} from "react-scroll";

import routes from "core/routes";
import apis from "core/apis";
import {ALERT_DANGER, SUCCESS, TRANSITION_TIME} from "core/globals";
import Loader from "components/Loader";
import Error from "components/Error";
import PostDetail from "./partial/PostDetail";
import WriteComment from "./partial/WriteComment";
import PostsService from "services/PostsService";

import "./PostDetailPage.scss";
import Comments from "./partial/Comments";


export default ({}) => {
  const {id} = useParams();
  const {t} = useTranslation();
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

  return (
    <div>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.posts.all}>{t('NAVBAR.POSTS.POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.POSTS.ADD')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <div className="loading-page"><Loader/></div>}
      {!loading && (!data || !data.id) && <div className="loading-page"><Error heading={404} message={t("COMMON.ERROR.NO_DATA")} /></div>}
      {!loading && !!data && !!data.id && <MDBRow>
        <MDBCol md={9}>
          <PostDetail data={data}/>
          {!data.commentId && <WriteComment commentId={data.id} />}
          {!!data.commentId && <MDBAlert className="mt-5 mb-3" color="warning">{t("POSTS.DETAIL.ALREADY_WROTE_COMMENT")}</MDBAlert>}
          <Comments data={comments} />
        </MDBCol>
        <MDBCol md={3}>

        </MDBCol>
      </MDBRow>}
    </div>
  )
};
