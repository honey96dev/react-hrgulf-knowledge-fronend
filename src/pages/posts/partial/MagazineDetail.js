import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBIcon} from "mdbreact";

import "./MagazineDetail.scss";
import GlobalService from "../../../services/GlobalService";

export default ({data}) => {
  const {t} = useTranslation();

  const handleDownload = ({url, filename}) => {
    GlobalService.downloadFile({url, filename});
  };

  return (
    <Fragment>
      <h3 className="font-weight-bold my-3 p-0 text-center h3-response">
        <strong>{data.title}</strong>
      </h3>
      <div className="infor-section text-left">
        <p className="mr-2">
          <span className="mr-2"><MDBIcon icon="calendar-alt"/></span>
          {data.date}
        </p>
        <p className="mr-2">{data.time}</p>
        {/*<p>{t("DIRECTION") === "ltr" ? "/" : "\\"}</p>*/}
        {/*<p className="mx-2">*/}
        {/*  <span className="mr-2"><MDBIcon icon="user"/></span>*/}
        {/*  {`${data.firstName} ${data.lastName}`}*/}
        {/*</p>*/}
      </div>
      <div className="text-center">
        <MDBBtn tag="a" color="primary" rounded onClick={e => handleDownload({url: data.media, filename: data.title})}>
          <MDBIcon icon="file-pdf"/> {t("COMMON.BUTTON.DOWNLOAD")}
        </MDBBtn>
      </div>
      <div>
        <div className="text-left">
          {data.description}
        </div>
      </div>
    </Fragment>
  );
}
