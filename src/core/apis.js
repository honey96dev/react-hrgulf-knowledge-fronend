import {isDev} from "core/globals";

export default {
  baseUrl: isDev ? "http://localhost:8080/api/" : "/api/",
  assetsBaseUrl: isDev ? "http://localhost:8080/assets/" : "/assets/",
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
  profile: {
    avatar: "profile/avatar",
    saveAvatar: "profile/save-avatar",
    save: "profile/save",
    changePassword: "profile/change-password",
  },
  posts: {
    list: "posts/list",
    latest: "posts/latest",
    save: "posts/save",
    delete: "posts/delete",
    get: "posts/get",
    post2Topics: "posts/post2topics",
    commentList: "posts/comment-list",
    writeComment: "posts/write-comment",
    topics: "posts/topics",
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
  questionnaire: {
    packages: "questionnaire/packages",
    getPackage: "questionnaire/get-package",
    questions: "questionnaire/questions",
    update: "questionnaire/update",
    result: "questionnaire/result",
  },
  vote: {
    packages: "vote/packages",
    getPackage: "vote/get-package",
    questions: "vote/questions",
    update: "vote/update",
    result: "vote/result",
  },
  contact: {
    us: "contact/us",
    consultants: "contact/consultants",
    // consultants: "https://eliteresources.co/api/director-board/list",
  },
  about: {
    loadAboutUs: "about/load-aboutus",
  },
};
