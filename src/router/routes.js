import { lazy } from "react";
import Home from "@/views/Home";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "知乎首页-WebApp",
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: lazy(() => import("@/views/Detail")),
    meta: {
      title: "新闻详情-WebApp",
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: lazy(() => import("@/views/Personal")),
    meta: {
      title: "个人中心-WebApp",
    },
  },
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@/views/Login")),
    meta: {
      title: "登录注册-WebApp",
    },
  },
  {
    path: "/store",
    name: "store",
    component: lazy(() => import("@/views/Store")),
    meta: {
      title: "我的收藏-WebApp",
    },
  },
  {
    path: "/update",
    name: "update",
    component: lazy(() => import("@/views/Update")),
    meta: {
      title: "资料更新-WebApp",
    },
  },
  {
    path: "*",
    name: "404",
    component: lazy(() => import("@/views/Page404.jsx")),
    meta: {
      title: "知乎首页-WebApp",
    },
  },
];

export default routes;
