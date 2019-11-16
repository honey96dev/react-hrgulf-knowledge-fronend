import React, {Suspense} from "react";
import ReactDOM from "react-dom";

import "core/i18n";
import AppPage from "pages/AppPage";
import Loader from "components/Loader";

import "@fortawesome/fontawesome-pro/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "assets/scss/mdb.scss";
import "assets/index.scss";

import registerServiceWorker from "core/registerServiceWorker";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <AppPage/>
  </Suspense>,
  document.getElementById("root")
);

registerServiceWorker();