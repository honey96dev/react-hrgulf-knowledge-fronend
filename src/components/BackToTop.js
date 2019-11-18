import React from "react";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import {animateScroll as scroll} from "react-scroll";
import {CSSTransition} from "react-transition-group";

import {TRANSITION_TIME} from "core/globals";

export default ({thresholdY, duration, transitionTime, ...props}) => {
  const handleBackToTop = e => {
    scroll.scrollToTop({
      duration: duration || 500,
    });
  };

  const options = {
    throttle: 100,
  };
  const position = useWindowScrollPosition(options);
  const flag = position.y > (thresholdY || 200);

  return (
    <CSSTransition in={flag} classNames="fade-transition" timeout={transitionTime || TRANSITION_TIME} appear {...props}>
      <div>
        {!!flag && <div className="fixed-action-btn smooth-scroll back-to-top-container">
          <a id="back-to-top" className="btn-floating btn-large mdb-color" onClick={handleBackToTop}>
            <i className="fa fa-arrow-up" />
          </a>
        </div>}
      </div>
    </CSSTransition>
  )
}