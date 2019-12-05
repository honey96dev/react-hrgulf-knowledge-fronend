import React, {Fragment, useEffect, useState} from "react";
import {MDBBtn, MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./AnswerList.scss";

export default ({data, onUpdate}) => {

  const {t} = useTranslation();
  const [value, setValue] = useState();

  useEffect(e => {
    setValue(data.answered);
  }, [data]);

  const handleSubmit = e => {
    e.preventDefault();

    !!onUpdate && onUpdate({questionId: data.id, answerId: value});
  };

  return (
    <div className="text-left">
      <form onSubmit={handleSubmit}>
        {data.answers.map((item, index) => (
          <Fragment key={index}>
            <MDBInput onClick={e => setValue(item.id)} checked={value === item.id} label={item.answer} type="radio"
                      id={`radio${item.id}`} />
          </Fragment>
        ))}
        <MDBBtn type="submit" size="sm" color="indigo" rounded className="mt-3" disabled={!value}>{t("VOTE.VOTE")}</MDBBtn>
      </form>
    </div>
  );
}
