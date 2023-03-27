import { createRouter, createWebHistory } from 'vue-router'
const timingPage = () => import('../views/timingPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'timing',
      component: timingPage
    }
  ]
})

export default router
