import React, {useState} from "react";
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

import {changeLanguage} from "core/i18n";
import routes from "core/routes";
import authActions from "actions/auth";
import UserService from "../services/UserService";

export default (props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleSignOut = () => {
    UserService.signOut();
    dispatch(authActions.signOut());
  };

  return (
    <MDBNavbar color="mdb-color" dark expand="md" scrolling fixed="top">
      <MDBNavbarBrand href="/">
        <strong>{t('SITE_NAME')}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse}/>
      <MDBCollapse isOpen={collapse} navbar className="text-left">
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="#">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#">Features</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#">Pricing</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#">Options</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">{t('COMMON.LANGUAGE.LANGUAGE')}</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                <MDBDropdownItem onClick={() => changeLanguage('ar')}>{t('COMMON.LANGUAGE.ARABIC')}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => changeLanguage('en')}>{t('COMMON.LANGUAGE.ENGLISH')}</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" className="d-inline-inline"/>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="text-left">
                {!auth.signedIn && <><MDBDropdownItem onClick={() => history.push(routes.auth.signIn)}>{t('AUTH.SIGN_IN')}</MDBDropdownItem>
                <MDBDropdownItem onClick={() => history.push(routes.auth.signUp)}>{t('AUTH.SIGN_UP')}</MDBDropdownItem></>}
                {auth.signedIn && <><MDBDropdownItem onClick={() => history.push(routes.auth.myAccount)}>{t('AUTH.MY_ACCOUNT')}</MDBDropdownItem>
                <MDBDropdownItem onClick={handleSignOut}>{t('AUTH.SIGN_OUT')}</MDBDropdownItem></>}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}
