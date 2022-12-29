// eslint-disable-next-line no-unused-vars
function auth({ to, next, store }) {
  console.log(to);
  let userInfo = store.$state.userInfo;
  let isLoggedIn = userInfo?.token ?? false;
  console.log(isLoggedIn)
  if (isLoggedIn) {
    return next({
      name: "productList",
    });
  }

  return next();
}
export default auth;
