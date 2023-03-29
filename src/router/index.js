import { createRouter, createWebHistory } from 'vue-router'
const timingPage = () => import('../views/timingPage.vue')
const sentencePage = () => import('../views/sentencePage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'timing',
      component: timingPage
    },
    {
      path: '/mode2',
      name: 'mode2',
      component: sentencePage
    }
  ]
})

export default router
