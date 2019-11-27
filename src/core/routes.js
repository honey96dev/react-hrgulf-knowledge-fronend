export const routes = {
  root: "/",
  admin: "/admin",
  auth: {
    root: "/auth",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  profile: {
    root: "/profile",
    main: "/profile/main",
    myPosts: {
      root: "/profile/my-posts",
      detail: "/profile/my-posts/detail",
    },
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
    all: "/news",
    detail: "/news/detail",
  },
  video: {
    root: "/video",
    all: "/video",
    detail: "/video/detail",
  },
  vote: {
    root: "/vote",
  },
};

export default routes;
