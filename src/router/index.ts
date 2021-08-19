import { 
  createRouter, 
  createWebHashHistory, 
  NavigationGuardNext, 
  RouteLocationNormalized, 
  RouteRecordRaw
} from "vue-router";

// 路由配置
const routes: RouteRecordRaw[] = [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "home",
      meta: {
        type: "home",
      },
      component: () => import("../views/home"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        type: "login",
      },
      component: () => import("../views/login"),
    },
    {
      path: "/:pathMatch(.*)*", // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
      name: "404",
      component: () => import("../views/404"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const user = localStorage.getItem("user");
    //路由守卫判断
    if(to.meta.type === "login" && user){
      next({name: "name"});
      return 
    }

    if(to.meta.type === "home" && !user){
      next({name:"login"});
      return 
    }
    next()
  })

export default router;