export default function unauthenticated({ next }) {
  let isLoggedIn = false; // Can be calculated through store
  if (isLoggedIn) {
    return next({
      name: "Dashboard",
    });
  }

  return next();
}
