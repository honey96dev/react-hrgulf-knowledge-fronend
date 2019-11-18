import fetch, {setHeader} from "apis/fetch";
import {POST} from "apis/constants";
import apis from "core/apis";
import {SUCCESS} from "core/globals";

export default {
  list: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.list, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
  save: (params) => {
    return new Promise((resolve, reject) => {
      fetch(POST, apis.posts.save, params)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
