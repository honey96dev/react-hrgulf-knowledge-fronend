import {isDev} from "core/globals";

export default {
  baseUrl: isDev ? "http://localhost:8080/api/" : "/api/",
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
};
