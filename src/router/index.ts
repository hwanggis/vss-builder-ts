/*
 * @Author: WH
 * @Date: 2024-03-24 15:55:55
 * @Description: 
 * @LastEditTime: 2024-03-24 15:58:18
 * @LastEditors:  
 */
import { createRouter, createWebHistory, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import exceptionRoutes from '@/router/route.exception';
import asyncRoutes from '@/router/route.async';
import commonRoutes from '@/router/route.common';
// import useAuth from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  // ...asyncRoutes,
  // // 异常页必须放在路由匹配规则的最后
  // ...exceptionRoutes,
];

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  // history: createWebHistory(import.meta.env.VITE_BASE),
  history: createWebHashHistory(),
  routes,
});

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  // console.log('全局路由前置守卫：to,from\n', to, from);
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;  
  next();
});

router.afterEach((to, from) => {
  // console.log('全局路由后置守卫：to,from\n', to, from);
  // if (to && to.matched && to.matched.length > 0) {
  //   const menuName = to.matched[0]?.name ?? '';
  //   useAuth().setCurrentTopMenuName(menuName.toString());
  // }
  NProgress.done();
});

export default router;
