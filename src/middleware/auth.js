// eslint-disable-next-line no-unused-vars
function auth({ from, next, store }) {
  let userInfo = store.$state.userInfo
  let isLoggedIn = userInfo?.token??false;
  if (!isLoggedIn) {
    return next({
      name: "Login",
    });
  }

  return next();
}
export default auth;
