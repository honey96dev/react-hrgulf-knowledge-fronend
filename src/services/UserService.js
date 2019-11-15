import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  signIn : (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.auth.signIn, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  signUp : (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.auth.signUp, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
