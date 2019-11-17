import {
  AUTH_SIGN_IN_FAILURE_SIGNAL,
  AUTH_SIGN_IN_REQUEST_SIGNAL,
  AUTH_SIGN_IN_SUCCESS_SIGNAL,
  AUTH_SIGN_OUT_SIGNAL
} from "actions/auth.type";

const initialState = {
  signedIn: false,
  user: null,
  token: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case AUTH_SIGN_IN_REQUEST_SIGNAL:
      return {
        ...state,
        signedIn: false,
        user: null,
        token: null,
      };
    case AUTH_SIGN_IN_SUCCESS_SIGNAL:
      return {
        ...state,
        signedIn: true,
        user: payload.user,
        token: payload.token,
      };
    case AUTH_SIGN_IN_FAILURE_SIGNAL:
      return {
        ...state,
        signedIn: false,
        user: null,
        token: null,
      };
    case AUTH_SIGN_OUT_SIGNAL:
      return {
        ...state,
        signedIn: false,
        user: null,
        token: null,
      };
    default:
      return state
  }
};
