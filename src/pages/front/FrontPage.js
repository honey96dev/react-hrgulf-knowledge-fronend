import React from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Loader from "components/Loader";

import "./FrontPage.scss";

export default () => {
  return (
    <>
      <Navbar/>
      <div className="fixed-bottom">
        <Footer/>
      </div>
      {/*<Loader />*/}
    </>
  );
}
