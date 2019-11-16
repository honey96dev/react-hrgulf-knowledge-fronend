import React from "react";

import "./Loader.scss";

export default () => {
  return (
    <>
      <div className="match-parent">
        <div className="spinner-grow big center-in-parent loader-indicator" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}