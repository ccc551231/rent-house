import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=> import('../views/front/front.vue'),
      children: [
        {
          //首頁
          path: 'home',
          component: ()=>import('../views/front/home.vue')
        },
        {
          //首頁
          path: 'product',
          component: () => import('../views/front/product.vue')
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { title: '登入' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/BackNav.vue'),
      children: [
        {
          path: 'product',
          name: 'product',
          component: () => import('../views/Back/BackProduct.vue'),
          meta: { title: '商品管理' },
        }
      ]
    }
  ]
})

export default router
