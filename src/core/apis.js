import {isDev} from "core/globals";

console.log('isdev', isDev);
export default {
  baseUrl: isDev ? "http://localhost:8080/api/" : "/api/",
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
};
