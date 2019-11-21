import React, {Fragment, useState} from "react";
import {useHistory} from "react-router-dom";
import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import useWindowScrollPosition from "@rehooks/window-scroll-position";

import {changeLanguage} from "core/i18n";
import routes from "core/routes";
import authActions from "actions/auth";
import UserService from "../services/UserService";

export default ({thresholdY}) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);

  const options = {
    throttle: 100,
  };
  const position = useWindowScrollPosition(options);
  const flag = position.y > (thresholdY || 200);

  const pathname = history.location.pathname;

  const toggleCollapse = e => {
    setCollapse(!collapse);
  };

  const handleMouseEnter = e => {
    console.log(e);
  };

  const handleMouseLeave = e => {
    console.log(e);
  };

  const handleSignOut = e => {
    UserService.signOut();
    dispatch(authActions.signOut());
  };

  return (
    <MDBNavbar color={flag ? "mdb-color" : "white"} light={!flag} dark={flag} expand="md" scrolling fixed="top">
      <MDBNavbarBrand href="/">
        <strong>{t("SITE_NAME")}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse}/>
      <MDBCollapse isOpen={collapse} navbar className="text-left">
        <MDBNavbarNav left>
          <MDBNavItem active={pathname === routes.root}>
            <MDBNavLink to={routes.root}>{t("NAVBAR.HOME")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.posts.root)}>
            <MDBDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("NAVBAR.POSTS.POSTS")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => history.push(routes.posts.add)}>{t("NAVBAR.POSTS.ADD")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.posts.all)}>{t("NAVBAR.POSTS.ALL")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.news.root)}>
            <MDBNavLink to={routes.news.root}>{t("NAVBAR.NEWS")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.video.root)}>
            <MDBNavLink to={routes.video.root}>{t("NAVBAR.VIDEO")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.vote.root)}>
            <MDBNavLink to={routes.vote.root}>{t("NAVBAR.VOTE")}</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("COMMON.LANGUAGE.LANGUAGE")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => changeLanguage("ar")}>{t("COMMON.LANGUAGE.ARABIC")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => changeLanguage("en")}>{t("COMMON.LANGUAGE.ENGLISH")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" className="d-inline-inline"/>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                {!auth.signedIn && <Fragment>
                  <MDBDropdownItem onClick={() => history.push(routes.auth.signIn)}>{t("AUTH.SIGN_IN")}</MDBDropdownItem>
                  <MDBDropdownItem onClick={() => history.push(routes.auth.signUp)}>{t("AUTH.SIGN_UP")}</MDBDropdownItem>
                </Fragment>}
                {auth.signedIn && <Fragment>
                  <MDBDropdownItem onClick={() => history.push(routes.profile.main)}>{t("AUTH.MY_ACCOUNT")}</MDBDropdownItem>
                  <MDBDropdownItem onClick={() => history.push(routes.profile.myPosts.root)}>{t("PROFILE.MY_POSTS.MY_POSTS")}</MDBDropdownItem>
                  <MDBDropdownItem onClick={handleSignOut}>{t("AUTH.SIGN_OUT")}</MDBDropdownItem>
                </Fragment>}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}
