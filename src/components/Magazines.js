import React, {Fragment} from "react";

import MagazineListItem from "./partial/MagazineListItem";

export default ({items, detailLabel, detailLink}) => {
  const count = items.length - 1;

  return (
    <div className={"text-left mt-3"}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <MagazineListItem id={item.id} date={item.date} time={item.time} author={`${item.firstName} ${item.lastName}`} title={item.title} description={item.description} media={item.media} detailLabel={detailLabel} detailLink={detailLink} />
          {index < count && <hr className="my-5"/>}
        </Fragment>
      ))}
    </div>
  );
};

