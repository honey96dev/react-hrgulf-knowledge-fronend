import React, {Fragment, useState} from "react";
import {MDBBtn, MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";

import "./EndedVote.scss";

export default ({data, onUpdate}) => {

  const {t} = useTranslation();
  const [value, setValue] = useState();

  const handleSubmit = e => {
    e.preventDefault();

    onUpdate({questionId: data.id, answerId: value});
  };

  return (
    <div className="text-left">
      <h4 className="text-primary font-weight-bold mb-3 p-0">{data.question}</h4>
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
