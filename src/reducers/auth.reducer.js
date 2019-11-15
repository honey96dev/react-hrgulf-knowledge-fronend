import {
  AUTH_SIGN_IN_FAILURE_SIGNAL,
  AUTH_SIGN_IN_REQUEST_SIGNAL,
  AUTH_SIGN_IN_SUCCESS_SIGNAL,
  AUTH_SIGN_OUT_SIGNAL
} from "actions/auth.type";
import {CURRENT_USER} from "core/globals";

let user = JSON.parse(sessionStorage.getItem(CURRENT_USER));
const initialState = {
  user,
  jwtToken: null,
};
initialState["signedIn"] = !!user;

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST_SIGNAL:
      return {
        ...state,
        signedIn: true,
        user: action.user,
        jwtToken: null,
      };
    case AUTH_SIGN_IN_SUCCESS_SIGNAL:
      return {
        ...state,
        signedIn: true,
        user: action.user,
        jwtToken: action.jwtToken,
      };
    case AUTH_SIGN_IN_FAILURE_SIGNAL:
      return {
        ...state,
        signedIn: false,
        jwtToken: null,
      };
    case AUTH_SIGN_OUT_SIGNAL:
      return {
        ...state,
        signedIn: false,
        jwtToken: null,
      };
    default:
      return state
  }
};
