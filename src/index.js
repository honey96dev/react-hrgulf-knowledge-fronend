import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {PersistGate} from "redux-persist/integration/react";

import configureStore from "core/store";
import registerServiceWorker from "core/registerServiceWorker";
import "core/i18n";
import AppPage from "pages/AppPage";
import Loader from "components/Loader";

import "@fortawesome/fontawesome-pro/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "assets/scss/mdb.scss";
import "assets/index.scss";
import {Provider} from "react-redux";


const {store, persistor} = configureStore();

ReactDOM.render(
  <Suspense fallback={<Loader/>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppPage/>
      </PersistGate>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

registerServiceWorker();