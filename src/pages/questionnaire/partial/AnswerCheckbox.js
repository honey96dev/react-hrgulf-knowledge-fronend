import React, {Fragment, useEffect, useState} from "react";
import {MDBBtn, MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";

import {PREFIX_CHECKBOX} from "core/globals";

import "./AnswerCheckbox.scss";

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
    onUpdate({questionId: data.id, type:PREFIX_CHECKBOX, answer: answeredIds});
  };

  return (
    <div className="text-left">
      <form>
        {data.answers.map((item, index) => (
          <div key={index} className="my-2">
            <MDBInput onClick={e => handleCheck(Object.assign({}, values, {[item.id]: !values[item.id]}))} checked={values[item.id] || false} label={item.answer} type="checkbox" filled id={`checkbox${item.id}`} />
          </div>
        ))}
      </form>
    </div>
  );
}
