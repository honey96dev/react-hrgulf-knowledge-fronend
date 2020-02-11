import React, {useEffect, useState} from "react";
import {MDBInput} from "mdbreact";
import {useTranslation} from "react-i18next";
import {PREFIX_INPUT} from "core/globals";

import "./AnswerInput.scss";
import validators from "../../../core/validators";

export default ({data, onUpdate, onIsValid}) => {

  const {t} = useTranslation();

  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState('');

  useEffect(e => {
    if (!!data.answered) {
      for (let answer of data.answers) {
        if (data.answered[0] === answer.id) {
          setValue(answer.answer);
          handleUpdate(answer.answer);
        }
      }
    }
  }, [data]);

  const handleUpdate = e => {
    setValue(e);

    onUpdate({questionId: data.id, type: PREFIX_INPUT, answer: e});
    onIsValid({[data.id]: !!e.length});
  };

  return (
    <div className="text-left">
      <form>
        <MDBInput id={`answer${data.id}`} name={`answer${data.id}`} type="text" background containerClass="my-0" label={t("QUESTIONNAIRE.ANSWER")} value={value}
                  getValue={handleUpdate} onBlur={() => setTouched(true)}>
          {touched && !value.length && <div className="invalid-field2">
            {t("COMMON.VALIDATION.REQUIRED", {field: t("AUTH.EMAIL")})}
          </div>}
        </MDBInput>
      </form>
    </div>
  );
}
