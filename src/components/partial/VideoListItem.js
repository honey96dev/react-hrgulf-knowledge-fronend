import React, {Fragment, useRef} from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBMask,
  MDBRow,
  MDBView
} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./VideoListItem.scss";

export default ({id, date, time, author, url, title, isFile, detailLabel, detailLink}) => {
  const {t} = useTranslation();
  const videoRef = useRef();

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  };

  const makeEmbedUrl = url => {
    const id = getId(url);
    const result = `//www.youtube.com/embed/${id}`;

    return result;
  };

  const play = e => {
    videoRef.current.play();
  };

  const pause = e => {
    videoRef.current.pause();
  };

  return (
    <Fragment>
      <MDBCol md={4} lg={3} className="mb-3">
        <MDBCard className="card-container">
          {!!isFile && <MDBView hover className="rounded-top mb-0" onMouseEnter={play} onMouseLeave={pause}>
            <video ref={videoRef} className="video-fluid video-media" loop>
              <source src={url} />
            </video>
            <Link to={`${detailLink}/${id}`}>
              <MDBMask overlay="white-slight" />
            </Link>
          </MDBView>}
          {!isFile && <MDBView hover className="rounded-top mb-0 video-media2">
            <iframe className="video-fluid video-media2" title={url} src={makeEmbedUrl(url)} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
            <a href={url} target="_blank">
              <MDBMask overlay="white-slight" />
            </a>
          </MDBView>}
          <MDBCardBody className="video-item-body">
            <MDBCardTitle className="video-item-title">
              {!!isFile && <Link to={`${detailLink}/${id}`}>
                <strong>{title}</strong>
              </Link>}
              {!isFile && <a href={url} target="_blank">
                <strong>{title}</strong>
              </a>}
            </MDBCardTitle>
            {/*<MDBCardText>*/}
            {/*  /!*Some quick example text to build on the card title and make*!/*/}
            {/*  /!*up the bulk of the card&apos;s content.*!/*/}
            {/*</MDBCardText>*/}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      {/*<MDBRow>*/}
      {/*  <MDBCol lg="5" xl="4">*/}
      {/*    {!!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4" onMouseEnter={play} onMouseLeave={pause}>*/}
      {/*      <video ref={videoRef} className="video-fluid post-media" loop>*/}
      {/*        <source src={url} />*/}
      {/*      </video>*/}
      {/*      <Link to={`${detailLink}/${id}`}>*/}
      {/*        <MDBMask overlay="white-slight" />*/}
      {/*      </Link>*/}
      {/*    </MDBView>}*/}
      {/*    {!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">*/}
      {/*      <iframe className="video-fluid post-media2" title={url} src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>*/}
      {/*      <a href={url} target="_blank">*/}
      {/*        <MDBMask overlay="white-slight" />*/}
      {/*      </a>*/}
      {/*    </MDBView>}*/}
      {/*  </MDBCol>*/}
      {/*  <MDBCol lg="7" xl="8">*/}
      {/*    <h3 className="font-weight-bold mb-3 p-0">*/}
      {/*      {!!isFile && <Link to={`${detailLink}/${id}`}>*/}
      {/*        <strong>{title}</strong>*/}
      {/*      </Link>}*/}
      {/*      {!isFile && <a href={url} target="_blank">*/}
      {/*        <strong>{title}</strong>*/}
      {/*      </a>}*/}
      {/*    </h3>*/}
      {/*    <div className="infor-section">*/}
      {/*      <p className="mr-2">*/}
      {/*        <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>*/}
      {/*        {date}*/}
      {/*      </p>*/}
      {/*      <p className="mr-2">{time}</p>*/}
      {/*      /!*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*!/*/}
      {/*      /!*<p className="mx-2">*!/*/}
      {/*      /!*  <span className="mr-2"><MDBIcon icon="user"/></span>*!/*/}
      {/*      /!*  {author}*!/*/}
      {/*      /!*</p>*!/*/}
      {/*      /!*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*!/*/}
      {/*      /!*<p className="mx-2">*!/*/}
      {/*      /!*  <span className="mr-2"><MDBIcon icon="comments"/></span>*!/*/}
      {/*      /!*  {comments}*!/*/}
      {/*      /!*</p>*!/*/}
      {/*    </div>*/}
      {/*    /!*<p>*!/*/}
      {/*    /!*  by <a href="#!" className="font-weight-bold">Jessica Clark</a>, 19/04/2018*!/*/}
      {/*    /!*</p>*!/*/}
      {/*    <div>*/}
      {/*      {!!isFile && <Link to={`${detailLink}/${id}`}>*/}
      {/*        <MDBBtn size="sm" color="indigo">*/}
      {/*          {detailLabel}*/}
      {/*        </MDBBtn>*/}
      {/*      </Link>}*/}
      {/*      {!isFile && <a href={url} target="_blank">*/}
      {/*        <MDBBtn size="sm" color="indigo">*/}
      {/*          {detailLabel}*/}
      {/*        </MDBBtn>*/}
      {/*      </a>}*/}
      {/*    </div>*/}
      {/*  </MDBCol>*/}
      {/*</MDBRow>*/}
    </Fragment>
  );
};
