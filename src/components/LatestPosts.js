import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {SUCCESS} from "core/globals";
import PostsService from "services/PostsService";

import LatestPostListItem from "./partial/LatestPostListItem";
import {sprintf} from "sprintf-js";
import apis from "../core/apis";
import {Link} from "react-router-dom";
import {MDBCol} from "mdbreact";

export default ({detailLabel, detailLink}) => {
  const {t} = useTranslation();

  const [items, setItems] = useState([]);

  const dir = t('DIRECTION');
  const count = items.length - 1;

  useEffect(e => {
    PostsService.latest({limit: 3})
      .then(res => {
        if (res.result === SUCCESS) {
          setItems(res.data);
        }
      })
      .catch(err => {

      });
  }, [detailLabel, detailLink, t]);

  return (
    <div className={"text-left"}>
      <h5 className="mb-3 p-0">
        {t("POSTS.LATEST_POSTS")}
      </h5>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <LatestPostListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} comments={item.comments} media={item.media} title={item.title} description={item.description} detailLabel={detailLabel} detailLink={detailLink} />
          {index < count && <hr className="my-2"/>}
        </Fragment>
      ))}
    </div>
  );
};

