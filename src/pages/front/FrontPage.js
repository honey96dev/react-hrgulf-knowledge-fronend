import React, {Fragment} from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

import "./FrontPage.scss";

export default () => {
  return (
    <Fragment>
      <Navbar/>
      <div className="fixed-bottom">
        <Footer/>
      </div>
      {/*<Loader />*/}
    </Fragment>
  );
}
