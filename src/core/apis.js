import {isDev} from "core/globals";

export default {
  baseUrl: isDev ? "http://localhost:8080/api/" : "/api/",
  assetsBaseUrl: isDev ? "http://localhost:8080/assets/" : "/assets/",
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
  profile: {
    save: "profile/save",
    changePassword: "profile/change-password",
  },
  posts: {
    list: "posts/list",
    latest: "posts/latest",
    save: "posts/save",
    delete: "posts/delete",
    get: "posts/get",
    commentList: "posts/comment-list",
    writeComment: "posts/write-comment",
  },
  news: {
    list: "news/list",
    latest: "news/latest",
    get: "news/get",
  },
  video: {
    list: "video/list",
    get: "video/get",
  },
  vote: {
    packages: "vote/packages",
    getPackage: "vote/get-package",
    questions: "vote/questions",
    update: "vote/update",
    result: "vote/result",
  },
};
