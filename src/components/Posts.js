import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {sprintf} from "sprintf-js";

import PostListItem from "./partial/PostListItem";
import apis from "../core/apis";

export default ({items}) => {
  const {t} = useTranslation();

  const dir = t('DIRECTION');
  const count = items.length - 1;

  return (
    <div className={"text-left mt-3"}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <PostListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} comments={item.comments} media={item.media} title={item.title} description={item.description}/>
          {index < count && <hr className="my-5"/>}
        </Fragment>
      ))}
    </div>
  );
};

