import React, {useRef} from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import "./VideoListItem.scss";

export default ({id, date, time, author, url, title, isFile, detailLabel, detailLink}) => {
  const {t} = useTranslation();
  const videoRef = useRef();

  const play = e => {
    videoRef.current.play();
  };

  const pause = e => {
    videoRef.current.pause();
  };

  return (
    <MDBRow>
      <MDBCol lg="5" xl="4">
        {!!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4" onMouseEnter={play} onMouseLeave={pause}>
          <video ref={videoRef} className="video-fluid post-media" loop>
            <source src={url} />
          </video>
          <Link to={`${detailLink}/${id}`}>
            <MDBMask overlay="white-slight" />
          </Link>
        </MDBView>}
        {!isFile && <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
          <iframe className="video-fluid post-media2" src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
          <a href={url} target="_blank">
            <MDBMask overlay="white-slight" />
          </a>
        </MDBView>}
      </MDBCol>
      <MDBCol lg="7" xl="8">
        <h3 className="font-weight-bold mb-3 p-0">
          {!!isFile && <Link to={`${detailLink}/${id}`}>
            <strong>{title}</strong>
          </Link>}
          {!isFile && <a href={url} target="_blank">
            <strong>{title}</strong>
          </a>}
        </h3>
        <div className="infor-section">
          <p className="mr-2">
            <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
            {date}
          </p>
          <p className="mr-2">{time}</p>
          {/*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*/}
          {/*<p className="mx-2">*/}
          {/*  <span className="mr-2"><MDBIcon icon="user"/></span>*/}
          {/*  {author}*/}
          {/*</p>*/}
          {/*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*/}
          {/*<p className="mx-2">*/}
          {/*  <span className="mr-2"><MDBIcon icon="comments"/></span>*/}
          {/*  {comments}*/}
          {/*</p>*/}
        </div>
        {/*<p>*/}
        {/*  by <a href="#!" className="font-weight-bold">Jessica Clark</a>, 19/04/2018*/}
        {/*</p>*/}
        <div>
          {!!isFile && <Link to={`${detailLink}/${id}`}>
            <MDBBtn size="sm" color="indigo">
              {detailLabel}
            </MDBBtn>
          </Link>}
          {!isFile && <a href={url} target="_blank">
            <MDBBtn size="sm" color="indigo">
              {detailLabel}
            </MDBBtn>
          </a>}
        </div>
      </MDBCol>
    </MDBRow>
  );
};
