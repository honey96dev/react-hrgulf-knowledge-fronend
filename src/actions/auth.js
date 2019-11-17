import {
  AUTH_SIGN_IN_REQUEST_SIGNAL,
  AUTH_SIGN_IN_SUCCESS_SIGNAL,
  AUTH_SIGN_IN_FAILURE_SIGNAL,
  AUTH_SIGN_OUT_SIGNAL
} from "./auth.type";
import UserService from "services/UserService";
import {SUCCESS} from "core/globals";

const requestSignIn = (payload) => {
  return {type: AUTH_SIGN_IN_REQUEST_SIGNAL, payload}
};
const successSignIn = (payload) => {
  return {type: AUTH_SIGN_IN_SUCCESS_SIGNAL, payload}
};
const failureSignIn = (payload) => {
  return {type: AUTH_SIGN_IN_FAILURE_SIGNAL, payload}
};
const requestSignUp = (payload) => {
  return {type: AUTH_SIGN_IN_REQUEST_SIGNAL, payload}
};
const successSignUp = (payload) => {
  return {type: AUTH_SIGN_IN_SUCCESS_SIGNAL, payload}
};
const failureSignUp = (payload) => {
  return {type: AUTH_SIGN_IN_FAILURE_SIGNAL, payload}
};
const signOut = (payload) => {
  return {type: AUTH_SIGN_OUT_SIGNAL}
};

export default {
  requestSignIn,
  successSignIn,
  failureSignIn,
  requestSignUp,
  successSignUp,
  failureSignUp,
  signOut,
};
