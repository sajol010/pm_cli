import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "@/middleware/middlewarePipeline";
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import { useUserStore } from "@/stores/user";
let middlewares = { auth: auth, guest: guest };
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "productList",
      component: () => import("../views/products/ProductListView.vue"),
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
      meta: { layout: "LoginLayout", middleware: ["guest"] },
    },
    {
      path: "/register",
      name: "Register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
      meta: { layout: "LoginLayout", middleware: ["guest"] },
    },
    {
      path: "/product/create",
      name: "productCreate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/products/ProductCreateView.vue"),
      meta: { middleware: ["auth"] },
    },
    {
      path: "/product/edit/:slug",
      name: "productUpdate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/products/ProductEditView.vue"),
      meta: { middleware: ["auth"] },
    },

    {
      path: "/categories",
      name: "categoryList",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/categories/CategoryListView.vue"),
      meta: { middleware: ["auth"] },
    },
    {
      path: "/category/create",
      name: "categoryCreate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/categories/CategoryCreateView.vue"),
      meta: { middleware: ["auth"] },
    },
    {
      path: "/categories/edit/:id",
      name: "categoryUpdate",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/categories/CategoryEditView.vue"),
      meta: { middleware: ["auth"] },
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
  let store = useUserStore();
  const context = { to, from, next, store };

  return middlewares[middleware[0]]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
