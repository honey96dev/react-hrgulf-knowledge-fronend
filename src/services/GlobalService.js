import fetch from "apis/fetch";
import {GET} from "apis/constants";
import apis from "core/apis";

export default {
  downloadFile: ({url, filename, params}) => {
    if (!url.startsWith("http")) {
      url = `${apis.origin}${url}`;
    }
    return new Promise((resolve, reject) => {
      fetch(GET, url, params, {Accept: "application/pdf"}, {responseType: "blob"})
        .then(res => {
          console.log(res, window.URL);
          let url = window.URL.createObjectURL(res);
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", filename);

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);

          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
