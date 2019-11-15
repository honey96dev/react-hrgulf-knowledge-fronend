import React from "react";
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import Router from "components/Router";
import configureStore from "core/store";
import apis from "core/apis";
import {setBaseUrl, setHeader} from "apis/fetch";
import i18n from "core/i18n";

const store = configureStore();

setBaseUrl(apis.baseUrl);
setHeader({lang: i18n.language});

export default () => {
  const {t} = useTranslation();
  // setHeader({lang: t("CODE")});
  const direction = t("DIRECTION");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div dir={direction} className={direction === "rtl" ? "rtl-content" : ""}>
          {/*<MDBContainer>*/}
            <Router/>
          {/*</MDBContainer>*/}
        </div>
      </BrowserRouter>
    </Provider>
  );
};

