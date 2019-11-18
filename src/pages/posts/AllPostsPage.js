import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBRow} from "mdbreact";
import {useTranslation} from "react-i18next";

import Posts from "components/Posts";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import PostsService from "services/PostsService";
import {ALERT_DANGER, SUCCESS} from "core/globals";
import routes from "core/routes";

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
    PostsService.list({page})
      .then(res => {
        if (res.result === SUCCESS) {
          setPageCount(res.pageCount);
          setPosts(res.data);
        } else {
          setAlert({
            show: true,
            color: ALERT_DANGER,
            message: t('COMMON.ERROR.UNKNOWN_SERVER_ERROR'),
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
      <MDBBreadcrumb>
        <MDBBreadcrumbItem><Link to={routes.posts.all}>{t('NAVBAR.POSTS.POSTS')}</Link></MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>{t('NAVBAR.POSTS.ALL')}</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      {!!loading && <div className="loading-page"><Loader/></div>}
      {!loading && <MDBRow>
        <MDBCol md={12} className="text-center">
          <div className="mt-5">
            <Pagination circle current={currentPage} pageCount={pageCount} width={10} onChange={handlePageChange}/>
          </div>
        </MDBCol>
        <MDBCol md={12}>
          <Posts items={posts} />
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
