import React, {Fragment, useEffect, useState} from "react";

import LatestNewsListItem from "./partial/LatestNewsListItem";
import {useTranslation} from "react-i18next";

import NewsService from "../services/NewsService";
import {SUCCESS} from "../core/globals";

export default ({detailLabel, detailLink}) => {
  const {t} = useTranslation();

  const [items, setItems] = useState([]);

  const dir = t('DIRECTION');
  const count = items.length - 1;

  useEffect(e => {
    NewsService.latest({limit: 3})
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
        {t("NEWS.LATEST_NEWS")}
      </h5>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <LatestNewsListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} title={item.title} description={item.description} detailLabel={detailLabel} detailLink={detailLink} />
          {index < count && <hr className="my-2"/>}
        </Fragment>
      ))}
    </div>
  );
};

