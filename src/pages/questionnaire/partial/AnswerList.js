import React, {Fragment, useEffect, useState} from "react";
import {MDBBtn, MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./AnswerList.scss";

export default ({data, onUpdate}) => {

  const {t} = useTranslation();
  const [values, setValues] = useState({});

  useEffect(e => {
    let answered = {};
    if (!!data.answered) {
      for (let item of data.answered) {
        answered[item] = true;
      }
    }
    setValues(answered);
  }, [data]);

  const handleCheck = e => {
    setValues(e);

    let answeredIds = [];
    Object.keys(e).map(item => {
      if (!!e[item]) {
        answeredIds.push(item);
      }
    });
    onUpdate({questionId: data.id, answeredIds});
  };

  return (
    <div className="text-left">
      <form>
        {data.answers.map((item, index) => (
          <Fragment key={index}>
            <MDBInput onClick={e => handleCheck(Object.assign({}, values, {[item.id]: !values[item.id]}))} checked={values[item.id] || false} label={item.answer} type="checkbox" filled id={`checkbox${item.id}`} />
          </Fragment>
        ))}
      </form>
    </div>
  );
}
