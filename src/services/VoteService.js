import fetch from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },

  update: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.vote.update, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
