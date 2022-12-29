// eslint-disable-next-line no-unused-vars
function auth({ next }) {
  console.log(next)
  let isLoggedIn = true; // Can be calculated through store
  if (!isLoggedIn) {
    return next({
      name: "Login",
    });
  }

  return next();
}
export default auth;
