import {AUTH_SIGN_IN_REQUEST_SIGNAL, AUTH_SIGN_IN_SUCCESS_SIGNAL, AUTH_SIGN_IN_FAILURE_SIGNAL} from "./auth.type";
import UserService from "services/UserService";
import {SUCCESS} from "core/globals";

const request = (payload) => {
  return {type: AUTH_SIGN_IN_REQUEST_SIGNAL, payload}
};
const success = (payload) => {
  return {type: AUTH_SIGN_IN_SUCCESS_SIGNAL, payload}
};
const failure = (payload) => {
  return {type: AUTH_SIGN_IN_FAILURE_SIGNAL, payload}
};

export default {
  request,
  success,
  failure,
};
