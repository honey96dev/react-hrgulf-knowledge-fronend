import React, {Fragment} from "react";

import CurrentVote from "./CurrentVote";
import EndedVote from "./EndedVote";

import "./Votes.scss";

export default ({items, onUpdate}) => {

  const count = items.length - 1;
  return (
    <Fragment>
      {items.map((item, index) => (
        <div key={index}>
          {/*{!!item.answersCount && !!item.isEnded && <EndedVote data={item}/>}*/}
          {/*{!!item.answersCount && !item.isEnded && <CurrentVote data={item}/>}*/}
          {/*{!!item.answersCount && index < count && <hr className="my-5"/>}*/}

          {(!!item.isEnded || !!item.answered) && <EndedVote data={item}/>}
          {(!item.isEnded && !item.answered) && <CurrentVote data={item} onUpdate={onUpdate}/>}
          {index < count && <hr className="my-5"/>}
        </div>
      ))}
    </Fragment>
  )
};
