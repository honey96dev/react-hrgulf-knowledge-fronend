import React from "react";
import {MDBBtn, MDBCol, MDBIcon, MDBMask, MDBRow, MDBView} from "mdbreact";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {DESCRIPTION_LENGTH_BREAKPOINT} from "core/globals";

import "./LatestNewsListItem.scss";

export default ({id, date, time, author, comments, media, title, description, detailLabel, detailLink}) => {
  return (
    <MDBRow>
      <MDBCol md={12}>
        <h5 className="mb-3 p-0">
          <Link to={`${detailLink}/${id}`}>
            <strong>{title}</strong>
          </Link>
        </h5>
        <div className="infor-section">
          <p className="mb-0 mr-2">
            <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
            {date}
          </p>
          <p className="mb-0 mr-2">{time}</p>
        </div>
      </MDBCol>
    </MDBRow>
  );
};
