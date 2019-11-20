export const routes = {
  root: "/",
  auth: {
    root: "/auth",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    myAccount: "/auth/my-account",
  },
  posts: {
    root: "/posts",
    all: "/posts",
    add: "/posts/add",
    detail: "/posts/detail",
    comment: "/posts/comment",
  },
  news: {
    root: "/news",
  },
  video: {
    root: "/video",
  },
  vote: {
    root: "/vote",
  },
};

export default routes;
