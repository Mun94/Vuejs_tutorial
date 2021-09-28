/* eslint-disable linebreak-style */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeCom',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL) || true,
  routes,
});

export default router;
