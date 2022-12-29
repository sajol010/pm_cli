import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "@/middleware/middlewarePipeline";
import auth from "@/middleware/auth";
let middlewares = { auth: auth };
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "product-list",
      component: () => import("../views/ProductListView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      meta: { layout: "LoginLayout" },
    },
    {
      path: "/register",
      name: "Register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
      meta: { layout: "LoginLayout" },
    },
    {
      path: "/product/create",
      name: "productCreate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProductCreateView.vue"),
      // meta: { layout: "LoginLayout" },
    },
    {
      path: "/product/edit/:slug",
      name: "productUpdate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProductEditView.vue"),
      // meta: { layout: "LoginLayout" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/NotFoundView.vue"),
      // meta: { layout: "EmptyLayout" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next();

  const middleware = to.meta.middleware;
  const context = { to, from, next };

  return middlewares[middleware[0]]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
