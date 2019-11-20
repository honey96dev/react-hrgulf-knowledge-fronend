import React, {Fragment, useEffect, useState} from "react";
import {MDBPageItem, MDBPageNav, MDBPagination} from "mdbreact";

export default ({circle, current, pageCount, width, onChange}) => {
  const [pages, setPages] = useState([]);

  useEffect(e => {
    const half = Math.ceil((width || 10) / 2);
    let begin = (current - half) < 1 ? 1 : (current - half);
    let end = (current + half - 1) > pageCount ? pageCount : (current + half - 1);
    if ((end - begin) < width) {
      begin === 1 && (end = pageCount < width ? pageCount : width);
      end === pageCount && (begin = (pageCount - width + 1) < 1 ? 1 : (pageCount - width + 1));
    }

    let pages = [];
    for (let i = begin; i <= end; i++) {
      pages.push(i);
    }
    setPages(pages);
  }, [current, pageCount, width]);

  return (
    <Fragment>
      {pageCount > 0 && <MDBPagination circle={circle}>
        <MDBPageItem disabled={current === 1} onClick={() => onChange(1)}>
          <MDBPageNav className="page-link">
            <span>First</span>
          </MDBPageNav>
        </MDBPageItem>
        {pages.map((page, index) => (
          <MDBPageItem key={page} active={page === current} onClick={() => onChange(page)}>
            <MDBPageNav className="page-link">{page}</MDBPageNav>
          </MDBPageItem>
        ))}
        <MDBPageItem disabled={current === pageCount} onClick={() => onChange(pageCount)}>
          <MDBPageNav className="page-link">
            Last
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>}
    </Fragment>
  )
}
