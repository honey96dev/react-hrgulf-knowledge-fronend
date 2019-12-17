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
import images from "core/images";
import authActions from "actions/auth";
import UserService from "services/UserService";

import "./Navbar.scss";

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
        {/*<strong>{t("SITE_NAME")}</strong>*/}
        <strong><img className="navbar-logo-icon" src={images.logo}/></strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse}/>
      {/*<MDBCollapse isOpen={collapse} navbar className="text-left font-weight-bold">*/}
      <MDBCollapse isOpen={collapse} navbar className="text-left">
        <MDBNavbarNav left>
          <MDBNavItem active={pathname === routes.root}>
            <MDBNavLink to={routes.root}>{t("NAVBAR.HOME")}</MDBNavLink>
            {/*<MDBNavLink to={routes.root}><img src={images.logo}/></MDBNavLink>*/}
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.posts.root)}>
            <MDBDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("NAVBAR.POSTS.POSTS")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => history.push(routes.posts.all)}>{t("NAVBAR.POSTS.ALL")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.posts.add)}>{t("NAVBAR.POSTS.ADD")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.news.root)}>
            <MDBNavLink to={routes.news.root}>{t("NAVBAR.NEWS")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.video.root)}>
            <MDBNavLink to={routes.video.root}>{t("NAVBAR.VIDEO")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.questionnaire.root)}>
            <MDBDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("NAVBAR.QUESTIONNAIRE.QUESTIONNAIRE")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => history.push(routes.questionnaire.current)}>{t("NAVBAR.QUESTIONNAIRE.CURRENT")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.questionnaire.previous)}>{t("NAVBAR.QUESTIONNAIRE.PREVIOUS")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem active={pathname.startsWith(routes.vote.root)}>
            <MDBDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("NAVBAR.VOTE.VOTE")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => history.push(routes.vote.current)}>{t("NAVBAR.VOTE.CURRENT")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.vote.previous)}>{t("NAVBAR.VOTE.PREVIOUS")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          {/*<MDBNavItem active={pathname.startsWith(routes.contact.us)}>*/}
          {/*  <MDBNavLink to={routes.contact.us}>{t("NAVBAR.CONTACT.US")}</MDBNavLink>*/}
          {/*</MDBNavItem>*/}
          {/*<MDBNavItem active={pathname.startsWith(routes.contact.consultants)}>*/}
          {/*  <MDBNavLink to={routes.contact.consultants}>{t("NAVBAR.CONTACT.CONSULTANTS")}</MDBNavLink>*/}
          {/*</MDBNavItem>*/}
          <MDBNavItem active={pathname.startsWith(routes.contact.root)}>
            <MDBDropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t("NAVBAR.CONTACT.CONTACT")}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => history.push(routes.contact.us)}>{t("NAVBAR.CONTACT.US")}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.contact.consultants)}>{t("NAVBAR.CONTACT.CONSULTANTS")}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
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
