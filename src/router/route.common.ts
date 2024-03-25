/*
 * @Author: WH
 * @Date: 2024-03-24 15:55:55
 * @Description: 
 * @LastEditTime: 2024-03-24 19:07:16
 * @LastEditors:  
 */
// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

import Editor from "@/pages/PageEditor.vue";
import Home from "@/pages/Home.vue";

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/preview',
    name: 'preview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Preview.vue')
  }
];

export default commonRoutes;
